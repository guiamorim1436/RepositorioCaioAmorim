import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollAnimationOptions {
  totalFrames: number;
  framePathPattern: (index: number) => string;
  containerRef: React.RefObject<HTMLElement>;
  onFrameUpdate?: (frameIndex: number, progress: number, virtualSpeed: number) => void;
}

/**
 * Piecewise monotonic mapping ensuring:
 * - Scene 1 (Parking exit, frames 0..85): 0.00 -> 0.42 (~42% of scroll)
 * - Scene 2 (Avenue acceleration, frames 86..180): 0.42 -> 0.80 (~38% of scroll)
 * - Scene 3 (Light sweep & BMW logo, frames 181..191): 0.80 -> 0.94 (~14% of scroll)
 * - Final frame hold (frame 191): 0.94 -> 1.00 (~6% of scroll, holding logo cleanly)
 */
export function progressToFrameIndex(p: number, totalFrames = 192): number {
  if (p <= 0) return 0;
  if (p >= 1) return totalFrames - 1;

  if (p < 0.42) {
    const localT = p / 0.42;
    return Math.min(85, Math.round(localT * 85));
  }
  if (p < 0.80) {
    const localT = (p - 0.42) / (0.80 - 0.42);
    return Math.min(180, Math.round(86 + localT * (180 - 86)));
  }
  if (p < 0.94) {
    const localT = (p - 0.80) / (0.94 - 0.80);
    return Math.min(191, Math.round(181 + localT * (191 - 181)));
  }
  return totalFrames - 1;
}

export function useScrollAnimation({
  totalFrames,
  framePathPattern,
  containerRef,
  onFrameUpdate,
}: UseScrollAnimationOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [allReady, setAllReady] = useState(false);

  // Cached canvas rendering dimensions to prevent layout thrashing
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const targetFrameRef = useRef(0);
  const currentRenderedFrameRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);
  const onFrameUpdateRef = useRef(onFrameUpdate);
  onFrameUpdateRef.current = onFrameUpdate;

  // Helper to find nearest loaded frame so canvas never flickers black
  const getNearestLoadedImage = useCallback((index: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images[index]?.complete && images[index]?.naturalWidth) {
      return images[index];
    }
    // Search outwards from current index
    for (let offset = 1; offset < totalFrames; offset++) {
      const prev = index - offset;
      if (prev >= 0 && images[prev]?.complete && images[prev]?.naturalWidth) {
        return images[prev];
      }
      const next = index + offset;
      if (next < totalFrames && images[next]?.complete && images[next]?.naturalWidth) {
        return images[next];
      }
    }
    return null;
  }, [totalFrames]);

  // Update canvas size and DPR only on resize (eliminates layout thrashing)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.round(rect.width);
    const displayHeight = Math.round(rect.height);

    if (displayWidth === 0 || displayHeight === 0) return;

    sizeRef.current = {
      width: displayWidth,
      height: displayHeight,
      dpr,
    };

    const targetW = displayWidth * dpr;
    const targetH = displayHeight * dpr;

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
  }, []);

  // Lightweight draw frame: ZERO software blur filters, ZERO redundant layout reads
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getNearestLoadedImage(frameIdx);
    if (!img) return;

    const { width: displayWidth, height: displayHeight, dpr } = sizeRef.current;
    if (displayWidth === 0 || displayHeight === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Solid dark background
    ctx.fillStyle = '#07080a';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const imgWidth = img.naturalWidth || 1080;
    const imgHeight = img.naturalHeight || 1920;
    const imgRatio = imgWidth / imgHeight;
    const screenRatio = displayWidth / displayHeight;

    if (screenRatio > imgRatio) {
      // Widescreen / Desktop:
      // Fit full height cleanly without cropping the car or logo vertically
      const scale = displayHeight / imgHeight;
      const w = imgWidth * scale;
      const h = displayHeight;
      const x = (displayWidth - w) / 2;
      const y = 0;

      ctx.drawImage(img, x, y, w, h);
    } else {
      // Mobile / Portrait:
      // Fill full screen cleanly (cover)
      const scale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight);
      const w = imgWidth * scale;
      const h = imgHeight * scale;
      const x = (displayWidth - w) / 2;
      const y = (displayHeight - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    }

    ctx.restore();
  }, [getNearestLoadedImage]);

  // Request Animation Frame loop (only active while interpolating towards target)
  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.02) {
        // Smooth responsive interpolation
        const next = current + diff * 0.35;
        currentRenderedFrameRef.current = next;
        const roundedFrame = Math.min(totalFrames - 1, Math.max(0, Math.round(next)));
        drawFrame(roundedFrame);
        animFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        // Snapped to target frame, stop RAF loop to save CPU
        currentRenderedFrameRef.current = target;
        drawFrame(target);
        isAnimatingRef.current = false;
        animFrameIdRef.current = null;
      }
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
  }, [drawFrame, totalFrames]);

  // Smart preloading & background decoding strategy
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    // 1. Immediately load & decode first frame
    const firstImg = new Image();
    firstImg.src = framePathPattern(0);
    firstImg.onload = async () => {
      if (isCancelled) return;
      try {
        if (firstImg.decode) await firstImg.decode();
      } catch {
        // ignore decode errors
      }
      imagesRef.current[0] = firstImg;
      count++;
      setLoadedCount(count);
      setFirstFrameReady(true);
      updateCanvasDimensions();
      drawFrame(0);
    };

    // 2. Build prioritized queue:
    // Priority A: frames 1..25
    // Priority B: keyframes across the sequence (every 10 frames)
    // Priority C: all remaining frames
    const priorityQueue: number[] = [];
    const keyframesQueue: number[] = [];
    const remainingQueue: number[] = [];
    const enqueued = new Set<number>([0]);

    // Priority A
    for (let i = 1; i <= Math.min(25, totalFrames - 1); i++) {
      priorityQueue.push(i);
      enqueued.add(i);
    }

    // Priority B (Keyframes)
    for (let i = 26; i < totalFrames; i += 10) {
      if (!enqueued.has(i)) {
        keyframesQueue.push(i);
        enqueued.add(i);
      }
    }
    // Make sure frame 181 (Scene 3 start) and 191 (Scene 3 end) are prioritized keyframes
    if (!enqueued.has(181)) { keyframesQueue.push(181); enqueued.add(181); }
    if (!enqueued.has(191)) { keyframesQueue.push(191); enqueued.add(191); }

    // Priority C (All remaining)
    for (let i = 1; i < totalFrames; i++) {
      if (!enqueued.has(i)) {
        remainingQueue.push(i);
      }
    }

    const fullQueue = [...priorityQueue, ...keyframesQueue, ...remainingQueue];
    const CONCURRENCY = 6;
    let inFlight = 0;

    const loadNext = () => {
      if (isCancelled || fullQueue.length === 0) {
        if (inFlight === 0 && count >= totalFrames * 0.95) {
          setAllReady(true);
        }
        return;
      }

      while (inFlight < CONCURRENCY && fullQueue.length > 0) {
        const index = fullQueue.shift()!;
        inFlight++;
        const img = new Image();
        img.src = framePathPattern(index);

        const onComplete = async () => {
          inFlight--;
          if (!isCancelled) {
            try {
              if (img.decode) await img.decode();
            } catch {
              // ignore decode errors
            }
            imagesRef.current[index] = img;
            count++;
            setLoadedCount(count);
            if (count === totalFrames) {
              setAllReady(true);
            }
          }
          loadNext();
        };

        img.onload = onComplete;
        img.onerror = () => {
          console.warn(`Frame ${index} failed to load, falling back to neighbor.`);
          onComplete();
        };
      }
    };

    loadNext();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, framePathPattern, updateCanvasDimensions, drawFrame]);

  // Passive Scroll listener: updates target frame without causing React re-renders
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const targetIndex = progressToFrameIndex(progress, totalFrames);
      targetFrameRef.current = targetIndex;

      // Notify HUD with zero React re-render overhead
      if (onFrameUpdateRef.current) {
        const virtualSpeed = Math.round(progress * 280);
        onFrameUpdateRef.current(targetIndex, progress, virtualSpeed);
      }

      // Start RAF loop if not already running
      startAnimationLoop();
    };

    const handleResize = () => {
      updateCanvasDimensions();
      drawFrame(Math.round(currentRenderedFrameRef.current));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Initial sizing & scroll check
    updateCanvasDimensions();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [containerRef, totalFrames, updateCanvasDimensions, drawFrame, startAnimationLoop]);

  return {
    canvasRef,
    loadedCount,
    totalFrames,
    firstFrameReady,
    allReady,
  };
}
