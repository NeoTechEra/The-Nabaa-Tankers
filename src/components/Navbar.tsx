import React, { useState } from 'react';
import { Droplets, Truck, Menu, X, ArrowRight, ChevronRight, Calendar, Phone, MessageCircle, Mail } from 'lucide-react';
import { GmailIntegrationBadge } from './GmailIntegrationBadge';

interface NavbarProps {
  onOpenOrderModal: () => void;
  onOpenDemoModal?: () => void;
  onExploreClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, onOpenDemoModal, onExploreClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20and%20services.';

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Customer', href: '#customer-app' },
    { name: 'Driver', href: '#driver-app' },
    { name: 'Admin', href: '#admin-dashboard' },
    { name: 'Tankers', href: '#tankers' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060c18]/90 border-b border-cyan-500/15 transition-all">
      {/* Top Direct Contact Strip */}
      <div className="bg-[#030814] border-b border-slate-800/80 text-[11px] text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-cyan-400 font-semibold">24/7 Operations & Dispatch:</span>
            <span className="text-slate-400 hidden md:inline">Instant Water Tanker Logistics</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono ml-auto">
            <GmailIntegrationBadge compact />
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/20" />
              <span className="text-slate-400 hidden sm:inline">WhatsApp:</span>
              <span>{whatsappDisplay}</span>
            </a>

            <span className="text-slate-700">|</span>

            <a 
              href={`tel:${phoneTel}`}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
              title="Direct Call Hotline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-slate-400 hidden sm:inline">Call:</span>
              <span>{phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-3 group" 
            id="navbar-brand-link"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#081224] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/10 animate-pulse-subtle"></div>
                <Droplets className="w-5 h-5 text-cyan-400 relative z-10 group-hover:scale-110 transition-transform" />
                <Truck className="w-3.5 h-3.5 text-white/80 absolute bottom-1 right-1 z-10" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-display">The Nabaa</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono font-medium border border-cyan-500/20">Tankers</span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">Digital Water Logistics</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50 rounded-lg transition-colors font-medium cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={handleExplore}
              className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
              id="nav-explore-btn"
            >
              Explore Platform
            </button>
            <button
              onClick={onOpenDemoModal}
              className="px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-500/10"
              id="nav-book-demo-btn"
              title="Schedule a live platform demo or consultation meeting"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Book Demo</span>
            </button>
            <button
              onClick={onOpenOrderModal}
              className="relative group px-4 py-2 rounded-lg text-xs font-bold text-white overflow-hidden shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all cursor-pointer"
              id="nav-order-btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 transition-all group-hover:brightness-110"></div>
              <span className="relative z-10 flex items-center gap-1.5">
                Order Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onOpenDemoModal}
              className="px-2.5 py-1.5 rounded-md text-xs font-semibold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center gap-1 cursor-pointer"
              title="Book Demo"
            >
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>Demo</span>
            </button>
            <button
              onClick={onOpenOrderModal}
              className="px-2.5 py-1.5 rounded-md text-xs font-bold bg-cyan-500 text-slate-950 font-medium cursor-pointer"
            >
              Order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-[#071122]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 rounded-md font-medium flex items-center justify-between cursor-pointer"
              >
                {link.name}
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenDemoModal) onOpenDemoModal();
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Book Demo / Schedule Meeting</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3 text-center text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              Order Water Now (SAR)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleExplore();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-300 bg-slate-800/80 rounded-lg border border-slate-700 cursor-pointer"
            >
              Explore Connected Platform
            </button>

            {/* Direct Mobile Contact Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${phoneTel}`}
                className="py-2.5 px-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
