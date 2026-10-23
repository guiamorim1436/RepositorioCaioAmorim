import React, { useState } from 'react';
import { Activity, Wind, Sliders, Disc } from 'lucide-react';

export const VehicleOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'aerodinamica' | 'chassi' | 'cockpit'>('aerodinamica');

  return (
    <section id="performance" className="py-28 px-6 md:px-12 bg-[#090b0e] relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-2">
              Arquitetura e Dinâmica
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-white tracking-tight">
              Engenharia Sem Concessões
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400 font-light">
            Cada elemento estrutural foi lapidado no circuito de Nürburgring Nordschleife para oferecer aderência lateral e estabilidade cirúrgica.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Motor & Transmissão (Larger card - span 2) */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
            
            <div className="flex items-center gap-2 mb-6">
              <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase tracking-wider">
                Propulsão M
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                S58 B30A // 6 CILINDROS
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mb-4">
              M TwinPower Turbo 3.0 Litros
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
              Equipado com virabrequim forjado de baixo peso, cárter de óleo otimizado para pistas e dois turbocompressores mono-scroll, o propulsor entrega aceleração linear e resposta instantânea do acelerador em qualquer faixa de rotação.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-500">Configuração</p>
                <p className="text-sm font-semibold text-white mt-1">6 cilindros em linha</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-500">Transmissão</p>
                <p className="text-sm font-semibold text-white mt-1">M Steptronic 8v</p>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-500">Drivelogic</p>
                <p className="text-sm font-semibold text-white mt-1">3 Níveis de Troca</p>
              </div>
            </div>
          </div>

          {/* Card 2: Chassi e Freios M Carbon Ceramic */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 group-hover:scale-105 transition-transform">
                <Disc className="w-6 h-6" />
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-white mb-3">
                Freios M Cerâmica
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                Discos de freio carbono-cerâmicos de alto rendimento proporcionam desaceleração implacável, resistência extrema à fadiga térmica e redução substancial das massas não suspensas.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Pinças Douradas M</span>
              <span className="text-white font-bold">6 Pistões</span>
            </div>
          </div>

          {/* Card 3: Aerodinâmica & Downforce */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                <Wind className="w-6 h-6" />
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-white mb-3">
                Teto em Carbono
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                Teto fabricado em plástico reforçado com fibra de carbono (CFRP), rebaixando o centro de gravidade do veículo para agilidade sem precedentes em curvas fechadas.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Material</span>
              <span className="text-white font-bold">CFRP Puro</span>
            </div>
          </div>

          {/* Card 4: Cockpit & Interface Digital (span 2) */}
          <div className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-bl from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">
                    Cockpit M Inteligente
                  </h3>
                  <p className="text-xs text-slate-400">BMW Curved Display com M-Specific Views</p>
                </div>
              </div>

              {/* Interactive pill selector */}
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('aerodinamica')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'aerodinamica'
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ROAD
                </button>
                <button
                  onClick={() => setActiveTab('chassi')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'chassi'
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SPORT
                </button>
                <button
                  onClick={() => setActiveTab('cockpit')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeTab === 'cockpit'
                      ? 'bg-red-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  TRACK
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {activeTab === 'aerodinamica' && (
                'Modo ROAD: display com todas as informações de conforto, navegação inteligente, assistentes de condução ativos e visualização minimalista dos parâmetros mecânicos.'
              )}
              {activeTab === 'chassi' && (
                'Modo SPORT: grafismo M dinâmico em vermelho e azul, tacômetro central ampliado com luzes de troca de marcha (shift lights) e dados de aceleração instantânea.'
              )}
              {activeTab === 'cockpit' && (
                'Modo TRACK: projetado exclusivamente para pistas fechadas, desativa todos os sistemas auxiliares e foca o display 100% em tempos de volta, temperatura de pneus e telemetria de freio.'
              )}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <Activity className="w-4 h-4" />
              <span>Configuração selecionada via botão M1/M2 no volante</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
