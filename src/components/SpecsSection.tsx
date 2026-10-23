import React from 'react';
import { Info } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const specs = [
    { label: 'Motorização', value: '3.0L M TwinPower Turbo 6 cilindros em linha' },
    { label: 'Potência Máxima', value: '510 cv (375 kW) @ 6.250 rpm' },
    { label: 'Torque Máximo', value: '650 Nm entre 2.750 e 5.500 rpm' },
    { label: 'Aceleração 0–100 km/h', value: '3,5 segundos (com M xDrive)' },
    { label: 'Velocidade Máxima', value: '290 km/h (com M Driver Package opcional)' },
    { label: 'Transmissão', value: 'M Steptronic de 8 velocidades com Drivelogic' },
    { label: 'Sistema de Tração', value: 'M xDrive integral inteligente com modo 2WD traseiro' },
    { label: 'Distribuição de Peso', value: 'Aproximadamente 50:50 entre eixos' },
    { label: 'Rodas / Pneus', value: 'Dianteiras 19" e Traseiras 20" forjadas M' },
    { label: 'Capacidade do Porta-Malas', value: '480 litros' },
  ];

  return (
    <section id="detalhes" className="py-28 px-6 md:px-12 bg-[#07080a] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-2">
            Ficha Técnica
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
            Especificações de Referência
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto font-light">
            Dados técnicos característicos da série BMW M3 Competition para fins de demonstração conceitual da aplicação.
          </p>
        </div>

        {/* Specs Table */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden divide-y divide-white/5 shadow-2xl">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 sm:mb-0">
                {spec.label}
              </span>
              <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer Callout Box */}
        <div className="mt-8 p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex items-start gap-3 text-xs text-slate-400">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-300">Nota de Demonstração:</strong> Os valores de especificações acima são baseados na ficha técnica internacional oficial do modelo BMW M3 Competition (G80) para fins demonstrativos da interface e experiência de scroll desenvolvida.
          </p>
        </div>

      </div>
    </section>
  );
};
