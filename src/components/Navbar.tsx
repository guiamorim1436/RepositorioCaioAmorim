import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07080a]/90 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo with BMW M Stripes */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-5 items-stretch space-x-1">
            <span className="w-1.5 bg-[#0099ff] transform -skew-x-12"></span>
            <span className="w-1.5 bg-[#002664] transform -skew-x-12"></span>
            <span className="w-1.5 bg-[#e7222e] transform -skew-x-12"></span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-xl tracking-wider text-white">BMW</span>
            <span className="font-display font-light text-xl tracking-widest text-slate-400">M3</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0099ff] border border-[#0099ff]/30 px-1.5 py-0.5 rounded ml-1">
              DEMO
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-slate-300 font-medium">
          <a href="#experiencia" className="hover:text-white transition-colors">Experiência</a>
          <a href="#apresentacao" className="hover:text-white transition-colors">Visão Geral</a>
          <a href="#performance" className="hover:text-white transition-colors">Performance</a>
          <a href="#detalhes" className="hover:text-white transition-colors">Detalhes M</a>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#agendar"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-full backdrop-blur-sm transition-all duration-300 hover:border-white/30"
          >
            <span>Solicitar Contato</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0c10] border-b border-white/10 px-6 py-6 space-y-4">
          <a
            href="#experiencia"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-slate-200"
          >
            Experiência Scroll
          </a>
          <a
            href="#apresentacao"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-slate-200"
          >
            Visão Geral
          </a>
          <a
            href="#performance"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-slate-200"
          >
            Performance
          </a>
          <a
            href="#detalhes"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-slate-200"
          >
            Detalhes M
          </a>
          <a
            href="#agendar"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-3 text-xs font-semibold uppercase tracking-wider text-white bg-blue-600 rounded-lg"
          >
            Solicitar Contato
          </a>
        </div>
      )}
    </nav>
  );
};
