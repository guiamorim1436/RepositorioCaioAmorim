import React from 'react';
import { ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 md:px-12 bg-[#050608] border-t border-white/5 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Note */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex h-4 items-stretch space-x-1">
            <span className="w-1 bg-[#0099ff] transform -skew-x-12"></span>
            <span className="w-1 bg-[#002664] transform -skew-x-12"></span>
            <span className="w-1 bg-[#e7222e] transform -skew-x-12"></span>
          </div>
          <div>
            <p className="text-slate-300 font-medium">BMW M3 Competition — Scroll-Driven Canvas Experience</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Projeto conceitual de demonstração técnica e validação de animação por rolagem.
            </p>
          </div>
        </div>

        {/* Action back to top */}
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono text-slate-500">192 Frames renderizados via Canvas</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Voltar ao início"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
