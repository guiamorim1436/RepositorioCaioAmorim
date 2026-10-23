import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollAnimationOptions {
  totalFrames: number;
  framePathPattern: (index: number) => string;
  containerRef: React.RefObject<HTMLElement>;
}

export function useScrollAnimation({
  totalFrames,
  framePathPattern,
  containerRef,
}: UseScrollAnimationOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [allReady, setAllReady] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const targetFrameRef = useRef(0);
  const currentRenderedFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

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

  // Draw frame on canvas with responsive framing (cover on mobile, ambient extended on desktop)
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getNearestLoadedImage(frameIdx);
    if (!img) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Background fill to blend smoothly
    ctx.fillStyle = '#07080a';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    const imgWidth = img.naturalWidth || 1080;
    const imgHeight = img.naturalHeight || 1920;
    const imgRatio = imgWidth / imgHeight; // 0.5625
    const screenRatio = displayWidth / displayHeight;

    if (screenRatio > imgRatio) {
      // Widescreen / Desktop:
      // Draw subtle ambient background layer (scaled up and blurred with low opacity)
      const bgScale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight) * 1.05;
      const bgW = imgWidth * bgScale;
      const bgH = imgHeight * bgScale;
      const bgX = (displayWidth - bgW) / 2;
      const bgY = (displayHeight - bgH) / 2;

      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.filter = 'blur(40px)';
      ctx.drawImage(img, bgX, bgY, bgW, bgH);
      ctx.restore();

      // Foreground crisp image: preserve height while letting width fit gracefully
      // On desktop, car is centered and scaled proportionally to look cinematic
      const fgScale = Math.min(displayHeight / imgHeight * 1.05, displayWidth / (imgWidth * 0.95));
      const fgW = imgWidth * fgScale;
      const fgH = imgHeight * fgScale;
      const fgX = (displayWidth - fgW) / 2;
      const fgY = (displayHeight - fgH) / 2;

      ctx.drawImage(img, fgX, fgY, fgW, fgH);

      // Vignette effect on desktop edges
      const gradientL = ctx.createLinearGradient(0, 0, fgX + 40, 0);
      gradientL.addColorStop(0, '#07080a');
      gradientL.addColorStop(1, 'rgba(7, 8, 10, 0)');
      ctx.fillStyle = gradientL;
      ctx.fillRect(0, 0, fgX + 40, displayHeight);

      const gradientR = ctx.createLinearGradient(displayWidth - (fgX + 40), 0, displayWidth, 0);
      gradientR.addColorStop(0, 'rgba(7, 8, 10, 0)');
      gradientR.addColorStop(1, '#07080a');
      ctx.fillStyle = gradientR;
      ctx.fillRect(displayWidth - (fgX + 40), 0, fgX + 40, displayHeight);

    } else {
      // Mobile / Portrait:
      // Cover the entire viewport cleanly
      const scale = Math.max(displayWidth / imgWidth, displayHeight / imgHeight);
      const w = imgWidth * scale;
      const h = imgHeight * scale;
      const x = (displayWidth - w) / 2;
      const y = (displayHeight - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    }

    // Subtle bottom vignette for smooth transition to content sections
    const bottomGrad = ctx.createLinearGradient(0, displayHeight - 160, 0, displayHeight);
    bottomGrad.addColorStop(0, 'rgba(7, 8, 10, 0)');
    bottomGrad.addColorStop(1, '#07080a');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, displayHeight - 160, displayWidth, 160);

    ctx.restore();
  }, [getNearestLoadedImage]);

  // Preloading strategy:
  // 1. Immediately load frame 0 (first frame) for zero-delay LCP
  // 2. Load keyframes (every 10th frame) for rapid scrubbing feedback
  // 3. Concurrently stream all remaining frames in chunks
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = framePathPattern(0);
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      count++;
      setLoadedCount(count);
      setFirstFrameReady(true);
      drawFrame(0);
    };

    // Queue for loading remaining images
    const queue: number[] = [];
    for (let i = 1; i < totalFrames; i++) {
      queue.push(i);
    }

    const CONCURRENCY = 6;
    let inFlight = 0;

    const loadNext = () => {
      if (isCancelled || queue.length === 0) {
        if (inFlight === 0 && count >= totalFrames * 0.95) {
          setAllReady(true);
        }
        return;
      }

      while (inFlight < CONCURRENCY && queue.length > 0) {
        const index = queue.shift()!;
        inFlight++;
        const img = new Image();
        img.src = framePathPattern(index);

        const onComplete = () => {
          inFlight--;
          if (!isCancelled) {
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
          // If a frame fails, log and continue smoothly
          console.warn(`Frame ${index} failed to load, falling back to neighbor.`);
          onComplete();
        };
      }
    };

    loadNext();

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, framePathPattern, drawFrame]);

  // Scroll listener: calculate target frame from container scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Current distance scrolled inside the container
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      setScrollProgress(progress);
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(progress * (totalFrames - 1)))
      );
      targetFrameRef.current = targetIndex;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => drawFrame(currentRenderedFrameRef.current), { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, totalFrames, drawFrame]);

  // Animation Loop with requestAnimationFrame and gentle LERP for buttery feel
  useEffect(() => {
    let isActive = true;

    const loop = () => {
      if (!isActive) return;

      const target = targetFrameRef.current;
      const current = currentRenderedFrameRef.current;

      // LERP towards target frame
      const diff = target - current;
      if (Math.abs(diff) > 0.05) {
        // Fast yet smooth interpolation
        const next = current + diff * 0.28;
        currentRenderedFrameRef.current = next;
        const roundedFrame = Math.min(totalFrames - 1, Math.max(0, Math.round(next)));
        setCurrentFrameIndex(roundedFrame);
        drawFrame(roundedFrame);
      } else if (current !== target) {
        currentRenderedFrameRef.current = target;
        setCurrentFrameIndex(target);
        drawFrame(target);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      isActive = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, drawFrame]);

  return {
    canvasRef,
    loadedCount,
    totalFrames,
    firstFrameReady,
    allReady,
    currentFrameIndex,
    scrollProgress,
  };
}
