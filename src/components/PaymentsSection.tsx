import React from 'react';
import { CreditCard, Banknote, ShieldCheck, CheckCircle2, Lock, Smartphone } from 'lucide-react';

export const PaymentsSection: React.FC = () => {
  const paymentMethods = [
    {
      name: 'Mada',
      category: 'Saudi National Debit',
      icon: 'mada',
      desc: 'Instant local debit card processing across the Kingdom.',
      status: 'Configurable'
    },
    {
      name: 'Apple Pay',
      category: 'Mobile Wallet',
      icon: 'apple',
      desc: 'One-touch biometric checkout for iOS customers.',
      status: 'Configurable'
    },
    {
      name: 'Visa',
      category: 'Global Credit & Debit',
      icon: 'visa',
      desc: 'Secure international and local card processing.',
      status: 'Configurable'
    },
    {
      name: 'Mastercard',
      category: 'Global Credit & Debit',
      icon: 'mastercard',
      desc: 'Multi-currency and verified bank card authorization.',
      status: 'Configurable'
    },
    {
      name: 'Google Pay',
      category: 'Mobile Wallet',
      icon: 'google',
      desc: 'Seamless contactless authorization on Android devices.',
      status: 'Configurable'
    },
    {
      name: 'Cash on Delivery',
      category: 'Physical Settlement',
      icon: 'cash',
      desc: 'Pay the driver directly upon verified tanker offloading.',
      status: 'Configurable'
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-[#060c19] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Fintech Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Simple, Flexible Payments
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Support for Saudi and GCC payment preferences. Configure digital rails, instant mobile wallets, and physical cash-on-delivery settlements.
          </p>
        </div>

        {/* Payment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="p-6 rounded-3xl bg-gradient-to-b from-[#0a172e] to-[#070e1c] border border-slate-800 hover:border-cyan-500/40 transition-all group shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  {method.name === 'Cash on Delivery' ? (
                    <Banknote className="w-6 h-6 text-emerald-400" />
                  ) : method.name === 'Apple Pay' || method.name === 'Google Pay' ? (
                    <Smartphone className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <CreditCard className="w-6 h-6 text-blue-400" />
                  )}
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {method.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-display">{method.name}</h3>
              <div className="text-xs text-cyan-400 font-mono mb-2">{method.category}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{method.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer / Compliance callout */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Payment gateways and digital methods represent platform capabilities that can be enabled according to merchant account setup and regional banking compliance.
          </span>
        </div>

      </div>
    </section>
  );
};
