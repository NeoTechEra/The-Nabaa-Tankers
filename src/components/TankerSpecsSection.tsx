import React from 'react';
import { Truck, Check, Droplets, Gauge, Shield, ArrowRight } from 'lucide-react';
import { TANKER_MODELS } from '../data/mockData';

interface TankerSpecsSectionProps {
  onOrderTanker: (tankerId: string) => void;
}

export const TankerSpecsSection: React.FC<TankerSpecsSectionProps> = ({ onOrderTanker }) => {
  return (
    <section id="tankers" className="py-24 relative bg-[#070f20] border-t border-slate-800/80 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Fleet Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Choose the Right Tanker for the Job
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Standardized potable water tankers certified for residential, agricultural, and industrial offloading with certified high-flow pumps.
          </p>
        </div>

        {/* 3 Tanker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {TANKER_MODELS.map((tanker) => {
            const isPopular = tanker.badge === 'MOST POPULAR';
            return (
              <div
                key={tanker.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all border ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#0f2347] via-[#091730] to-[#070e1c] border-cyan-400 shadow-2xl shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                    : 'bg-gradient-to-b from-[#0a172e] to-[#060c18] border-slate-800 hover:border-slate-700'
                }`}
              >
                {tanker.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[11px] font-extrabold tracking-wider uppercase shadow-md shadow-cyan-500/30">
                    {tanker.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                      {tanker.capacityTons} Tons Class
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {tanker.capacityLiters.toLocaleString()} L
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2">{tanker.name}</h3>
                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">{tanker.description}</p>

                  {/* Pricing Box */}
                  <div className="mb-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                    <div className="text-xs text-slate-400">Configured Standard Price</div>
                    <div className="text-3xl font-black text-white font-display flex items-baseline gap-1.5 mt-1">
                      <span>{tanker.priceSAR}</span>
                      <span className="text-sm font-semibold text-cyan-400 font-sans">SAR / trip</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Subject to delivery radius</div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-3 mb-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 text-xs">
                    <div className="flex items-center gap-2.5 text-slate-200">
                      <Gauge className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{tanker.hoseReach}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-200">
                      <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{tanker.pumpSpeed}</span>
                    </div>
                  </div>

                  {/* Ideal For List */}
                  <div className="border-t border-slate-800/80 pt-4 mb-6">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                      Best for:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {tanker.idealFor.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onOrderTanker(tanker.id)}
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPopular
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>Dispatch {tanker.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Operational Disclaimer Note */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400 leading-relaxed">
          <strong>Notice:</strong> Pricing and operational specifications shown on this website are configurable and may vary by service area, business configuration, and actual fleet capability.
        </div>

      </div>
    </section>
  );
};
