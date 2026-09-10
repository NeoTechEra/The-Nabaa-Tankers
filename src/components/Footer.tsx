import React from 'react';
import { Droplets, Shield, MapPin, ArrowUp, ChevronRight, Phone, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenOrderModal?: (tankerId?: string) => void;
  onOpenDemoModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderModal, onOpenDemoModal }) => {
  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20and%20services.';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    } else {
      console.warn(`Target section #${targetId} not found`);
    }
  };

  return (
    <footer className="bg-[#040813] border-t border-slate-800 text-slate-400 relative overflow-hidden">
      
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white font-display">
                  THE NABAA <span className="text-cyan-400 font-sans font-semibold text-xs tracking-widest uppercase">TANKERS</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-mono">
                  Water Delivery, Reimagined
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              A connected digital platform for customers, tanker drivers, and water delivery operations across Saudi Arabia and the GCC.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Riyadh • Jeddah • Dammam • GCC Region</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Compliant with National Water Company (NWC) Potable Standards</span>
              </div>
            </div>

            {/* Direct Contact & WhatsApp Hotline */}
            <div className="pt-2 space-y-2">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Direct Contact & Inquiries
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all text-xs font-mono"
                  title="WhatsApp The Nabaa Tankers"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: <strong>{whatsappDisplay}</strong></span>
                </a>
                <a
                  href={`tel:${phoneTel}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all text-xs font-mono"
                  title="Call The Nabaa Tankers"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Call: <strong>{phoneDisplay}</strong></span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Customer App (Activated & Direct Interactive Links) */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>Customer App</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a
                  href="#order-flow"
                  onClick={(e) => handleScrollTo(e, 'order-flow')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Immediate Order Dispatch</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#scheduled-flow"
                  onClick={(e) => handleScrollTo(e, 'scheduled-flow')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Scheduled Water Refills</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#promotions"
                  onClick={(e) => handleScrollTo(e, 'promotions')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Promo Codes & Discounts</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#tankers"
                  onClick={(e) => handleScrollTo(e, 'tankers')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">10T, 19T, 32T Capacities</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#doorstep-tracking"
                  onClick={(e) => handleScrollTo(e, 'doorstep-tracking')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Doorstep Radar Tracking</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Driver & Fleet */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Driver & Fleet</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a
                  href="#driver-app"
                  onClick={(e) => handleScrollTo(e, 'driver-app')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Driver Mobile App</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#driver-app"
                  onClick={(e) => handleScrollTo(e, 'driver-app')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Driver Wallet & Payouts</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#driver-app"
                  onClick={(e) => handleScrollTo(e, 'driver-app')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Trip History & Ratings</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#tankers"
                  onClick={(e) => handleScrollTo(e, 'tankers')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Tanker Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Operations & Business */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">Operations Hub</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a
                  href="#admin-dashboard"
                  onClick={(e) => handleScrollTo(e, 'admin-dashboard')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Central Admin Command</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#admin-dashboard"
                  onClick={(e) => handleScrollTo(e, 'admin-dashboard')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Fleet Dispatch & Heatmap</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#admin-dashboard"
                  onClick={(e) => handleScrollTo(e, 'admin-dashboard')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Driver Commission Rules</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo(e, 'about')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">About The Nabaa</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollTo(e, 'faq')}
                  className="hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-0.5"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Platform FAQ</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </a>
              </li>
              {onOpenDemoModal && (
                <li className="pt-1">
                  <button
                    onClick={onOpenDemoModal}
                    className="w-full text-left font-semibold text-cyan-400 hover:text-cyan-300 transition-all flex items-center justify-between group cursor-pointer py-1"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">Book a Demo / Fix Meeting</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-100 text-cyan-400 transition-opacity" />
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 The Nabaa Tankers. All rights reserved.
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500 font-mono">
            * All data, driver names, vehicle IDs, and metrics shown on this website are for demonstration purposes.
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
