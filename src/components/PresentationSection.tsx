import React from 'react';
import { Zap, ShieldCheck, Flame, Compass } from 'lucide-react';

export const PresentationSection: React.FC = () => {
  return (
    <section id="apresentacao" className="relative py-28 px-6 md:px-12 bg-[#07080a] border-t border-white/5 overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-widest text-slate-400 font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Apresentação Conceitual // Demonstração Interativa
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white max-w-3xl leading-tight">
            A Fusão Definitiva Entre Pista e Asfalto
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
            Desenvolvido pela divisão BMW M GmbH, o BMW M3 Competition combina a fúria das pistas de corrida com a sofisticação e conforto de um sedã esportivo de elite.
          </p>
        </div>

        {/* 4 Highlight Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <p className="text-3xl font-display font-bold text-white mb-1">510 <span className="text-lg font-normal text-slate-400">cv</span></p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Potência Máxima</p>
            <p className="mt-3 text-xs text-slate-500 font-light leading-relaxed">
              Motor biturbo de 6 cilindros em linha com resposta imediata e curva de potência contínua.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-red-500/30 transition-all duration-300 group hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <p className="text-3xl font-display font-bold text-white mb-1">3.5 <span className="text-lg font-normal text-slate-400">s</span></p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">0 a 100 km/h</p>
            <p className="mt-3 text-xs text-slate-500 font-light leading-relaxed">
              Aceleração avassaladora com tração integral inteligente e controle de largada M Launch Control.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-300 group hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <p className="text-3xl font-display font-bold text-white mb-1">650 <span className="text-lg font-normal text-slate-400">Nm</span></p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Torque Brutal</p>
            <p className="mt-3 text-xs text-slate-500 font-light leading-relaxed">
              Força disponível desde 2.750 até 5.500 rpm para retomadas vigorosas em qualquer marcha.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-3xl font-display font-bold text-white mb-1">M xDrive</p>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Tração Inteligente</p>
            <p className="mt-3 text-xs text-slate-500 font-light leading-relaxed">
              3 modos selecionáveis incluindo 4WD, 4WD Sport e tração traseira 2WD pura para puristas.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
