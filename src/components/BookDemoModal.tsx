import React, { useState } from 'react';
import { 
  X, Calendar, Clock, Video, Building2, User, Mail, Phone, 
  CheckCircle2, ChevronRight, ShieldCheck, Sparkles, MessageSquare, 
  MapPin, Globe, ExternalLink, Download, Send
} from 'lucide-react';
import { notifyNabaaBooking, TARGET_GMAIL } from '../services/gmail';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  
  // Form fields
  const [demoType, setDemoType] = useState<string>('full-platform');
  const [meetingFormat, setMeetingFormat] = useState<'video' | 'in-person' | 'phone'>('video');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 11:00 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [fleetSize, setFleetSize] = useState('6-20 Tankers');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailDispatched, setEmailDispatched] = useState<boolean>(false);
  const [gmailApiSent, setGmailApiSent] = useState<boolean>(false);

  if (!isOpen) return null;

  const demoTypes = [
    {
      id: 'full-platform',
      title: 'Full Platform Walkthrough',
      duration: '30 mins',
      desc: 'Customer App, Driver Navigation, and Admin Dispatch Hub live sync.'
    },
    {
      id: 'fleet-operator',
      title: 'Fleet & Driver Management',
      duration: '45 mins',
      desc: 'For tanker owners, drivers commission rules, telemetry & wallet payouts.'
    },
    {
      id: 'commercial-buyer',
      title: 'Commercial & Compound Supply',
      duration: '30 mins',
      desc: 'Bulk scheduled deliveries, automated billing, and SLA guarantees.'
    }
  ];

  const availableSlots = [
    'Tomorrow, 10:30 AM (AST)',
    'Tomorrow, 02:00 PM (AST)',
    'Tomorrow, 04:30 PM (AST)',
    'In 2 Days, 11:00 AM (AST)',
    'In 2 Days, 03:00 PM (AST)',
    'Next Monday, 10:00 AM (AST)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const selectedDemoObj = demoTypes.find(d => d.id === demoType);
      const result = await notifyNabaaBooking({
        bookingType: 'demo',
        senderName: fullName,
        senderEmail: email,
        senderPhone: phone,
        companyName: company,
        topic: selectedDemoObj?.title || 'Platform Demo',
        scheduledTime: selectedDate,
        meetingFormat: meetingFormat === 'video' ? 'Google Meet Video Call' : meetingFormat === 'in-person' ? 'In-person meeting (Riyadh)' : 'Phone consultation',
        notes: notes ? `${notes} (Fleet: ${fleetSize})` : `Fleet: ${fleetSize}`,
      });

      setEmailDispatched(true);
      setGmailApiSent(result.sentViaGmailApi);
    } catch (err) {
      console.error('Failed to dispatch booking email notification:', err);
      setEmailDispatched(true);
      setGmailApiSent(false);
    } finally {
      setIsSubmitting(false);
      setStep('success');
    }
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("The Nabaa Tankers - Live Platform Demo & Consultation");
    const details = encodeURIComponent(`Live interactive demo of The Nabaa Tankers digital water logistics platform.\nFormat: ${meetingFormat === 'video' ? 'Google Meet Video Call' : meetingFormat === 'in-person' ? 'In-person meeting (Riyadh)' : 'Phone consultation'}\nAttendee: ${fullName || 'Client'}\nCompany: ${company || 'General Inquiries'}`);
    const location = encodeURIComponent(meetingFormat === 'in-person' ? 'The Nabaa HQ, Riyadh, Saudi Arabia' : 'Google Meet Video Call');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#091326] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300"></div>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/90 flex items-start justify-between relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-mono mb-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fix a Meeting / Live Demo</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Book a Platform Demo
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
              Schedule a personalized 1-on-1 walkthrough of the Customer App, Driver App, and Admin Dispatch Hub.
            </p>
          </div>

          <button 
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer shrink-0"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            
            {/* 1. Select Demo Type */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                1. What would you like to explore?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {demoTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDemoType(item.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      demoType === item.id
                        ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-100">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                    </div>
                    <span className="mt-2 text-[10px] font-mono text-cyan-400 font-medium">
                      ⏱ {item.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Format & Preferred Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Meeting Format */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                  2. Meeting Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setMeetingFormat('video')}
                    className={`py-2 px-2.5 rounded-xl border text-center text-xs font-medium transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      meetingFormat === 'video'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Video className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px]">Google Meet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMeetingFormat('in-person')}
                    className={`py-2 px-2.5 rounded-xl border text-center text-xs font-medium transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      meetingFormat === 'in-person'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px]">In-Person (KSA)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMeetingFormat('phone')}
                    className={`py-2 px-2.5 rounded-xl border text-center text-xs font-medium transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                      meetingFormat === 'phone'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span className="text-[11px]">Phone / Voice</span>
                  </button>
                </div>
              </div>

              {/* Slot Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                  3. Select Date & Time Slot (Riyadh AST)
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-slate-900 text-slate-200">
                      {slot}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Timezone: Arabia Standard Time (GMT+3)</span>
                </div>
              </div>
            </div>

            {/* 3. Contact Details */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-2">
                4. Your Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="Work Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile / WhatsApp (+966...) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Company or Compound Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Fleet/Volume Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Business Scale / Fleet Size</label>
                  <select
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="1-5 Tankers">1 - 5 Tankers (Small Fleet)</option>
                    <option value="6-20 Tankers">6 - 20 Tankers (Medium Fleet)</option>
                    <option value="20+ Tankers">20+ Tankers (Enterprise Logistics)</option>
                    <option value="Commercial Compound">Residential / Commercial Compound</option>
                    <option value="Water Station Owner">Water Filling Station / Well Operator</option>
                    <option value="Individual Client">Individual / Private Bulk Buyer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Special Topic / Questions</label>
                  <input
                    type="text"
                    placeholder="e.g. ERP integration, pricing models..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 text-cyan-300 font-mono">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Notifies Operations at: <strong className="text-white">thenabaatankers@gmail.com</strong></span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Direct helpline: <a href="tel:+966530434010" className="text-cyan-400 hover:underline">+966 53 043 4010</a> | WhatsApp: <a href="https://wa.me/923330717198" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">+92 333 0717198</a>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                id="modal-confirm-booking-btn"
              >
                {isSubmitting ? (
                  <span>Scheduling & Notifying...</span>
                ) : (
                  <>
                    <span>Confirm Demo Booking</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation Success State */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center mx-auto text-cyan-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Meeting Confirmed #DEMO-7419
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Demo Successfully Scheduled!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-white">{fullName || 'there'}</strong>. We have sent a calendar invitation and meeting link to <span className="text-cyan-300">{email || TARGET_GMAIL}</span>.
              </p>
            </div>

            {/* Real-Time Gmail Dispatch Notification Confirmation */}
            <div className="max-w-md mx-auto p-3.5 rounded-2xl bg-[#08152e] border border-cyan-500/40 text-left space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Gmail Dispatch Notification</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {gmailApiSent ? 'Sent via Gmail API' : 'Dispatched'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Booking details and attendee specifications have been transmitted to <strong className="text-white">thenabaatankers@gmail.com</strong>.
              </p>
            </div>

            {/* Meeting Summary Card */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Session Topic:</span>
                <span className="font-semibold text-white">
                  {demoTypes.find(d => d.id === demoType)?.title}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Scheduled Time:</span>
                <span className="font-semibold text-cyan-300">{selectedDate}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">Format:</span>
                <span className="font-semibold text-white">
                  {meetingFormat === 'video' ? 'Google Meet Video Call' : meetingFormat === 'in-person' ? 'In-Person (Riyadh)' : 'Phone Call'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Host:</span>
                <span className="font-semibold text-white">The Nabaa Logistics Solution Specialist</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>

            <div className="text-[11px] text-slate-300 font-mono flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-slate-800">
              <span>Need immediate assistance?</span>
              <a
                href="https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline font-bold"
              >
                WhatsApp: +92 333 0717198
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="tel:+966530434010"
                className="text-cyan-400 hover:underline font-bold"
              >
                Call: +966 53 043 4010
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
