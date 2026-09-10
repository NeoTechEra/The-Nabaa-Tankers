import React from 'react';
import { Droplets, Shield, Compass, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative bg-[#060c18] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Narrative & Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span>Our Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Water Delivery, Reimagined for the Digital Era.
            </h2>

            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p>
                The Nabaa is built around a simple idea: <strong>make water delivery as easy to order and manage as any modern digital service</strong>.
              </p>
              <p>
                In many markets, commercial and residential water delivery still relies heavily on informal phone calls, uncertain arrival times, manual dispatch notebooks, and paper receipts.
              </p>
              <p>
                Instead of relying entirely on phone calls, manual dispatching, and disconnected records, The Nabaa creates a connected digital workflow between customers, drivers, fleet operators, and administrators.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Logistical Integrity</h4>
                  <p className="text-xs text-slate-400">Strict tanker compliance checks and verifiable offloading meters.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Intelligent Routing</h4>
                  <p className="text-xs text-slate-400">Algorithms adapted for heavy vehicle weight restrictions and urban access gates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Architectural Ecosystem Graphic */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#091730] to-[#070e1c] border border-cyan-500/30 shadow-2xl backdrop-blur-xl relative">
              <div className="text-xs font-mono uppercase text-cyan-400 tracking-wider mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>The Connected Triad</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold flex items-center justify-center text-sm font-mono">
                    01
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-display">Customer Mobile Interface</div>
                    <div className="text-xs text-slate-400">Frictionless OTP login, live radar tracking, transparent SAR pricing.</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center text-sm font-mono">
                    02
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-display">Driver & Fleet Mobile System</div>
                    <div className="text-xs text-slate-400">Audio dispatch alerts, heavy tanker navigation, live earnings wallet.</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center text-sm font-mono">
                    03
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-display">Central Admin Operations Hub</div>
                    <div className="text-xs text-slate-400">Order dispatch control, tanker certificate audits, and promotion rules.</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center font-mono">
                Engineered for Saudi Arabia & the Arabian Gulf
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
