import React, { useRef, useCallback } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronDown, Gauge, Cpu, Radio, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 192;

export const HeroCanvasSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Direct DOM references to eliminate React re-renders during scroll
  const speedDisplayRef = useRef<HTMLParagraphElement>(null);
  const frameDisplayRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressPercentRef = useRef<HTMLSpanElement>(null);
  const introCalloutRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const sceneBadgeRef = useRef<HTMLSpanElement>(null);

  const getFramePath = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(6, '0');
    return `/frames/frame_${frameNum}.webp`;
  }, []);

  // Direct DOM updates on frame changes without triggering React re-renders
  const handleFrameUpdate = useCallback((frameIndex: number, progress: number, virtualSpeed: number) => {
    if (speedDisplayRef.current) {
      speedDisplayRef.current.textContent = `${virtualSpeed} `;
    }

    if (frameDisplayRef.current) {
      frameDisplayRef.current.textContent = String(frameIndex + 1).padStart(3, '0');
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${Math.round(progress * 100)}%`;
    }

    if (progressPercentRef.current) {
      progressPercentRef.current.textContent = `${Math.round(progress * 100)}%`;
    }

    // Scroll prompt fades out promptly
    if (scrollPromptRef.current) {
      const promptOpacity = progress < 0.04 ? 1 : Math.max(0, 1 - (progress - 0.04) * 20);
      scrollPromptRef.current.style.opacity = promptOpacity.toString();
    }

    // Intro headline fades out smoothly so the car and acceleration are 100% visible
    if (introCalloutRef.current) {
      const introOpacity = Math.max(0, 1 - progress * 4.0);
      introCalloutRef.current.style.opacity = introOpacity.toString();
      introCalloutRef.current.style.transform = `translateY(${progress * -40}px)`;
      introCalloutRef.current.style.pointerEvents = introOpacity > 0.05 ? 'auto' : 'none';
    }

    // Telemetry scene indicator
    if (sceneBadgeRef.current) {
      if (frameIndex <= 85) {
        sceneBadgeRef.current.textContent = 'CENA 1 // SAÍDA DO ESTACIONAMENTO';
      } else if (frameIndex <= 180) {
        sceneBadgeRef.current.textContent = 'CENA 2 // ACELERAÇÃO NA AVENIDA';
      } else {
        sceneBadgeRef.current.textContent = 'CENA 3 // LOGO BMW & CORTE DE LUZ';
      }
    }
  }, []);

  const {
    canvasRef,
    loadedCount,
    totalFrames,
    firstFrameReady,
    allReady,
  } = useScrollAnimation({
    totalFrames: TOTAL_FRAMES,
    framePathPattern: getFramePath,
    containerRef,
    onFrameUpdate: handleFrameUpdate,
  });

  const loadPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <section
      id="experiencia"
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#07080a]"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#07080a]">
        
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full block transition-opacity duration-500 ${
            firstFrameReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Ambient Top and Bottom Dark Vignette Blends (pure CSS, 0 canvas overhead) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07080a] via-[#07080a]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#07080a] via-[#07080a]/70 to-transparent" />

        {/* Preloader / Initial Loading Screen */}
        {!firstFrameReady && (
          <div className="absolute inset-0 bg-[#07080a] flex flex-col items-center justify-center z-40 px-6">
            <div className="flex h-6 items-stretch space-x-1.5 mb-6">
              <span className="w-2 bg-[#0099ff] transform -skew-x-12 animate-pulse"></span>
              <span className="w-2 bg-[#002664] transform -skew-x-12 animate-pulse delay-75"></span>
              <span className="w-2 bg-[#e7222e] transform -skew-x-12 animate-pulse delay-150"></span>
            </div>
            <h2 className="font-display text-xl font-bold tracking-widest text-white uppercase text-center mb-2">
              BMW M3 COMPETITION
            </h2>
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-6">
              Iniciando Experiência Cinematográfica
            </p>
            <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-300"
                style={{ width: `${Math.max(10, loadPercent)}%` }}
              />
            </div>
            <span className="mt-3 text-[11px] font-mono text-slate-500">
              {loadPercent}% carregado
            </span>
          </div>
        )}

        {/* HUD Overlay 1: Top Status Pill (Non-intrusive stream telemetry) */}
        {firstFrameReady && !allReady && (
          <div className="absolute top-20 right-6 md:right-12 z-30 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-slate-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
              <span>Buffer M: {loadedCount}/{totalFrames} ({loadPercent}%)</span>
            </div>
          </div>
        )}

        {/* HUD Overlay 2: Center Cinematic Narrative (Intro only, fades cleanly on scroll) */}
        <div
          ref={introCalloutRef}
          className="absolute inset-x-6 top-1/4 pointer-events-none text-center transition-opacity duration-200 z-20 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] uppercase font-semibold tracking-widest text-blue-400 mb-4">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span ref={sceneBadgeRef}>CENA 1 // SAÍDA DO ESTACIONAMENTO</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
            M3 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-red-500">COMPETITION</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-300 font-light tracking-wide drop-shadow">
            Role a página para acelerar a sequência cinematográfica em tempo real.
          </p>
        </div>

        {/* HUD Telemetry Panel (Bottom Left) */}
        <div className="absolute bottom-8 left-6 md:left-12 z-20 pointer-events-none flex flex-col gap-2">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center gap-5 text-white shadow-xl">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Velocidade Demo</p>
                <p className="text-sm font-mono font-bold text-white">
                  <span ref={speedDisplayRef}>0 </span>
                  <span className="text-[10px] text-slate-400 font-normal">KM/H</span>
                </p>
              </div>
            </div>

            <div className="w-px h-7 bg-white/10" />

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Frame</p>
                <p className="text-sm font-mono font-bold text-white">
                  <span ref={frameDisplayRef}>001</span>{' '}
                  <span className="text-[10px] text-slate-400 font-normal">/ {totalFrames}</span>
                </p>
              </div>
            </div>

            <div className="hidden sm:block w-px h-7 bg-white/10" />

            <div className="hidden sm:flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Modo</p>
                <p className="text-sm font-mono font-bold text-emerald-400">SPORT PLUS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Scroll Prompt (Bottom Center) */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 transition-opacity duration-200"
        >
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-300 drop-shadow">
            ROLE PARA CONTROLAR
          </span>
          <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1 backdrop-blur-sm">
            <div className="w-1.5 h-2.5 bg-white rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
        </div>

        {/* Minimal Progress Bar (Bottom Right) */}
        <div className="absolute bottom-8 right-6 md:right-12 z-20 pointer-events-none hidden sm:flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Sequência</span>
            <span ref={progressPercentRef} className="text-xs font-mono font-bold text-white">0%</span>
          </div>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-75"
              style={{ width: '0%' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
