import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronLeft, ChevronRight, Bell, Sparkles } from 'lucide-react';

export const ScheduledDelivery: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM – 11:30 AM');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  const days = [
    { label: 'Today', date: 'Sept 10', sub: 'Urgent' },
    { label: 'Tomorrow', date: 'Sept 11', sub: 'Recommended' },
    { label: 'Friday', date: 'Sept 12', sub: 'Weekend' },
    { label: 'Saturday', date: 'Sept 13', sub: 'Weekend' },
    { label: 'Sunday', date: 'Sept 14', sub: 'Weekday' }
  ];

  const timeSlots = [
    '07:00 AM – 08:30 AM',
    '10:00 AM – 11:30 AM',
    '01:30 PM – 03:00 PM',
    '05:00 PM – 06:30 PM',
    '08:00 PM – 09:30 PM'
  ];

  return (
    <section id="scheduled-flow" className="py-20 lg:py-28 relative bg-[#060d19] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Planned Water Logistics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
            Schedule Water for Later
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Eliminate unexpected tank depletion. Schedule recurring or one-off tanker deliveries days in advance for compounds, villas, farms, and facilities.
          </p>
        </div>

        {/* Interactive Calendar Scheduling Mockup */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#0a162a] to-[#070f1e] border border-cyan-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Date & Slot Selector */}
            <div className="md:col-span-7 space-y-6">
              
              {/* Date Pills */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                  Select Delivery Day
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {days.map((item) => {
                    const isSelected = selectedDay === item.label;
                    return (
                      <button
                        key={item.label}
                        onClick={() => setSelectedDay(item.label)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs">{item.label}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>{item.date}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                  Select Arrival Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2.5 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-cyan-950/70 border-cyan-400 text-cyan-200 shadow-sm'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recurring Option */}
              <div 
                onClick={() => setIsRecurring(!isRecurring)}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isRecurring ? 'bg-cyan-400 border-cyan-400 text-slate-950' : 'border-slate-600'}`}>
                    {isRecurring && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Make this a recurring delivery</div>
                    <div className="text-[11px] text-slate-400">Repeats every week at selected window</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  AUTO-DISPATCH
                </span>
              </div>
            </div>

            {/* Right Column: Scheduled Order Summary Confirmation */}
            <div className="md:col-span-5 bg-[#071224] border border-cyan-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase text-slate-400">Scheduled Booking</span>
                <span className="text-xs font-bold text-cyan-400">Confirmed Slot</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Date & Slot</div>
                    <div className="text-sm font-bold text-white font-display">{selectedDay} • {selectedSlot.split('–')[0]}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Volume Selected</div>
                    <div className="text-sm font-bold text-white font-display">19 Tons (19,000 L)</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Tanker Baseline (19T)</span>
                  <span className="font-mono text-white">200 SAR</span>
                </div>
                <div className="flex justify-between text-cyan-400">
                  <span>Advance Scheduling Fee</span>
                  <span className="font-mono">FREE (0 SAR)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Due on Delivery</span>
                  <span className="text-cyan-400 font-mono">200 SAR</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-center gap-2 text-xs text-cyan-300">
                <Bell className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>You will receive an automated SMS & notification 30 mins before dispatch.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
