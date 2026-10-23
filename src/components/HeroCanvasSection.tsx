import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronDown, Gauge, Cpu, Radio, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 192;

export const HeroCanvasSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getFramePath = (index: number) => {
    const frameNum = String(index + 1).padStart(6, '0');
    return `/frames/frame_${frameNum}.webp`;
  };

  const {
    canvasRef,
    loadedCount,
    totalFrames,
    firstFrameReady,
    allReady,
    currentFrameIndex,
    scrollProgress,
  } = useScrollAnimation({
    totalFrames: TOTAL_FRAMES,
    framePathPattern: getFramePath,
    containerRef,
  });

  const loadPercent = Math.round((loadedCount / totalFrames) * 100);
  const virtualSpeed = Math.round(scrollProgress * 280);

  // Overlay opacities based on scroll progress
  const introOpacity = Math.max(0, 1 - scrollProgress * 3.5);
  const midOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.35) * 4)) * Math.max(0, Math.min(1, (0.70 - scrollProgress) * 4));
  const outroOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.75) * 4));

  return (
    <section
      id="experiencia"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#07080a]"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#07080a]">
        
        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full block transition-opacity duration-700 ${
            firstFrameReady ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Ambient Top and Bottom Dark Vignette Blends */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#07080a] via-[#07080a]/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-transparent" />

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

        {/* HUD Overlay 2: Center Cinematic Narrative Callouts */}
        {/* 1. Intro Callout */}
        <div
          className="absolute inset-x-6 top-1/4 pointer-events-none text-center transition-opacity duration-300 z-20 flex flex-col items-center"
          style={{ opacity: introOpacity }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[10px] uppercase font-semibold tracking-widest text-blue-400 mb-4">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Scroll Interativo // Controle em Tempo Real</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-2xl">
            M3 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-red-500">COMPETITION</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-300 font-light tracking-wide drop-shadow">
            Role a página para acelerar a sequência quadro a quadro.
          </p>
        </div>

        {/* 2. Midpoint Narrative */}
        <div
          className="absolute inset-x-6 top-1/3 pointer-events-none text-center transition-opacity duration-300 z-20 flex flex-col items-center"
          style={{ opacity: midOpacity }}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400 mb-2">
            Dinâmica Pura &bull; Quadro {currentFrameIndex + 1}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white max-w-3xl drop-shadow-2xl">
            PRECISÃO CIRÚRGICA NO ASFALTO
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-lg">
            O equilíbrio impecável entre agressividade estética e aerodinâmica de alta velocidade.
          </p>
        </div>

        {/* 3. Outro Narrative */}
        <div
          className="absolute inset-x-6 top-1/3 pointer-events-none text-center transition-opacity duration-300 z-20 flex flex-col items-center"
          style={{ opacity: outroOpacity }}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 mb-2">
            Velocidade Máxima Alcançada
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white max-w-3xl drop-shadow-2xl">
            A LENDA CONTINUA
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-md">
            Continue rolando para explorar as especificações e detalhes técnicos deste ícone.
          </p>
        </div>

        {/* HUD Telemetry Panel (Bottom Left) */}
        <div className="absolute bottom-8 left-6 md:left-12 z-20 pointer-events-none flex flex-col gap-2">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center gap-5 text-white shadow-xl">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Velocidade Demo</p>
                <p className="text-sm font-mono font-bold text-white">{virtualSpeed} <span className="text-[10px] text-slate-400 font-normal">KM/H</span></p>
              </div>
            </div>

            <div className="w-px h-7 bg-white/10" />

            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Frame</p>
                <p className="text-sm font-mono font-bold text-white">
                  {String(currentFrameIndex + 1).padStart(3, '0')} <span className="text-[10px] text-slate-400 font-normal">/ {totalFrames}</span>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: scrollProgress < 0.08 ? 1 : Math.max(0, 1 - (scrollProgress - 0.08) * 10) }}
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
            <span className="text-xs font-mono font-bold text-white">{Math.round(scrollProgress * 100)}%</span>
          </div>
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-red-500 transition-all duration-75"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
