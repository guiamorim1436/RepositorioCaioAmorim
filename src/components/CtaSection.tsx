import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const CtaSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cidade: '',
    versao: 'M3 Competition xDrive',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="agendar" className="py-28 px-6 md:px-12 bg-gradient-to-b from-[#07080a] to-[#0c0e13] relative border-t border-white/5 overflow-hidden">
      {/* Decorative M Glow */}
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-red-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="p-8 sm:p-14 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* M decorative accent corner */}
          <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-r from-blue-500 via-[#002664] to-red-500" />

          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-2">
              Experiência Exclusiva
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight">
              Sinta o Poder do M3
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-lg mx-auto font-light">
              Cadastre-se para uma experiência personalizada com os consultores especializados BMW M.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Solicitação Registrada com Sucesso</h3>
              <p className="text-sm text-slate-400 max-w-md">
                Agradecemos o seu contato. Um consultor executivo da rede BMW M entrará em contato em breve para apresentar todas as opções de configuração e agendamento.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs uppercase tracking-wider text-white transition-colors"
              >
                Nova solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Cidade / Região
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: São Paulo, SP"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Configuração de Interesse
                  </label>
                  <select
                    value={formData.versao}
                    onChange={(e) => setFormData({ ...formData, versao: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  >
                    <option value="M3 Competition xDrive" className="bg-[#0b0d11]">M3 Competition xDrive</option>
                    <option value="M3 Sedan Traseira (RWD)" className="bg-[#0b0d11]">M3 Sedan Traseira (RWD)</option>
                    <option value="M3 CS Especial Limitada" className="bg-[#0b0d11]">M3 CS Edição Especial</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 group flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs uppercase tracking-widest shadow-lg shadow-blue-600/25 transition-all duration-300"
              >
                <span>Solicitar Atendimento VIP</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
