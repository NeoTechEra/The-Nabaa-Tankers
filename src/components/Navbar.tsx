import React, { useState, useRef, useEffect } from 'react';
import { 
  Droplets, 
  Truck, 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  MessageCircle, 
  Smartphone, 
  Layers 
} from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { Link } from './Link';
import { useRouter } from '../context/RouterContext';

interface NavbarProps {
  onOpenOrderModal: (tankerId?: string) => void;
  onOpenDemoModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenOrderModal, 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [mobileHowItWorksOpen, setMobileHowItWorksOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isRTL, language } = useLanguage();
  const { basePath } = useRouter();

  const phoneDisplay = '+966 53 043 4010';
  const phoneTel = '+966530434010';
  const whatsappDisplay = '+92 333 0717198';
  const whatsappLink = 'https://wa.me/923330717198?text=Hello%20The%20Nabaa%20Tankers,%20I%20would%20like%20to%20inquire%20about%20water%20delivery%20and%20services.';

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHowItWorksOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setHowItWorksOpen(false);
    setMobileMenuOpen(false);
  }, [basePath]);

  // Submenu items under How It Works
  const howItWorksSubmenu = [
    {
      name: language === 'ar' ? 'كيف تعمل المنصة (نظرة عامة)' : 'Overview: How It Works',
      desc: language === 'ar' ? 'فهم آلية توريد المياه خطوة بخطوة' : 'Step-by-step water delivery process',
      href: '/how-it-works',
      icon: Layers,
    },
    {
      name: language === 'ar' ? 'تطبيق العميل' : 'Customer App',
      desc: language === 'ar' ? 'طلب وتتبع صهاريج المياه من هاتفك' : 'Order & track water tankers easily',
      href: '/how-it-works/customer',
      icon: Smartphone,
    },
    {
      name: language === 'ar' ? 'تطبيق السائق' : 'Driver App',
      desc: language === 'ar' ? 'استقبال الطلبات وإدارة الرحلات والعمولات' : 'Receive orders, trip history & wallet',
      href: '/how-it-works/driver',
      icon: Truck,
    },
    {
      name: language === 'ar' ? 'الصهاريج والأسطول' : 'Tankers',
      desc: language === 'ar' ? 'سعات ومواصفات أسطول صهاريج المياه' : 'Tanker capacities & delivery specs',
      href: '/how-it-works/tanker',
      icon: Droplets,
    },
  ];

  const standardNavLinks = [
    { name: language === 'ar' ? 'الرئيسية' : 'Home', href: '/' },
    { name: language === 'ar' ? 'المناطق' : 'Service Areas', href: '/service-areas' },
    { name: language === 'ar' ? 'من نحن' : 'About Us', href: '/about-us' },
    { name: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQs', href: '/faqs' },
    { name: language === 'ar' ? 'اتصل بنا' : 'Contact', href: '/contact' },
  ];

  const isHowItWorksActive = basePath === '/how-it-works' || basePath.startsWith('/how-it-works/');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060c18]/95 border-b border-cyan-500/15 transition-all">
      {/* Top Direct Contact Strip */}
      <div className="bg-[#030814] border-b border-slate-800/80 text-[11px] text-slate-300 py-1.5 px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-cyan-400 font-semibold">
              {language === 'ar' ? 'عمليات توصيل المياه الميدانية' : 'Active Water Delivery Network'}
            </span>
            <span className="text-slate-400 hidden md:inline">
              {language === 'ar' ? 'توريد مياه الشرب المحلاة في الرياض' : 'Riyadh Potable Water Supply'}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono ml-auto">
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/20" />
              <span className="text-slate-400 hidden sm:inline">WhatsApp</span>
              <span dir="ltr">{whatsappDisplay}</span>
            </a>

            <span className="text-slate-700">|</span>

            <a 
              href={`tel:${phoneTel}`}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
              title="Direct Call Hotline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-slate-400 hidden sm:inline">{language === 'ar' ? 'هاتف:' : 'Tel:'}</span>
              <span dir="ltr">{phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group shrink-0" 
            id="navbar-brand-link"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#081224] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/10 animate-pulse-subtle" />
                <Droplets className="w-5 h-5 text-cyan-400 relative z-10 group-hover:scale-110 transition-transform" />
                <Truck className="w-3.5 h-3.5 text-white/80 absolute bottom-1 right-1 z-10" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  {language === 'ar' ? 'نبع' : 'The Nabaa'}
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono font-medium border border-cyan-500/20">
                  {language === 'ar' ? 'صهاريج مياه' : 'Tankers'}
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-400 font-medium">
                {language === 'ar' ? 'The Nabaa Tankers | توريد مياه الشرب' : 'Digital Water Tanker Delivery'}
              </span>
            </div>
          </Link>

          {/* Desktop Multi-Page Navigation with Submenu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Home link */}
            <Link
              to="/"
              className={`px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors font-medium ${
                basePath === '/'
                  ? 'text-cyan-300 bg-cyan-950/40 font-bold border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>

            {/* How It Works Dropdown with Submenu */}
            <div 
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setHowItWorksOpen(true)}
              onMouseLeave={() => setHowItWorksOpen(false)}
            >
              <button
                type="button"
                onClick={() => setHowItWorksOpen((prev) => !prev)}
                className={`px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer ${
                  isHowItWorksActive
                    ? 'text-cyan-300 bg-cyan-950/40 font-bold border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
                aria-expanded={howItWorksOpen}
                aria-haspopup="true"
              >
                <span>{language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${howItWorksOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {/* Submenu Dropdown Panel */}
              {howItWorksOpen && (
                <div 
                  className={`absolute top-full mt-1.5 w-80 rounded-2xl bg-[#081224]/98 border border-cyan-500/25 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                    isRTL ? 'right-0' : 'left-0'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

                  <div className="px-3 py-2 border-b border-slate-800/70 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                      {language === 'ar' ? 'أقسام المنصة والخدمة' : 'Platform & Delivery Operation'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {howItWorksSubmenu.map((item) => {
                      const isItemActive = basePath === item.href;
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setHowItWorksOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group ${
                            isItemActive 
                              ? 'bg-cyan-500/15 border border-cyan-500/30 text-white' 
                              : 'hover:bg-slate-800/60 text-slate-300 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 mt-0.5 transition-colors ${
                            isItemActive 
                              ? 'bg-cyan-500/25 text-cyan-300' 
                              : 'bg-slate-800/80 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-300'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-semibold ${isItemActive ? 'text-cyan-300' : 'text-slate-200 group-hover:text-cyan-300'}`}>
                                {item.name}
                              </span>
                              <ChevronRight className={`w-3 h-3 transition-transform text-slate-500 group-hover:text-cyan-400 ${
                                isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
                              }`} />
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Other standard links */}
            {standardNavLinks.slice(1).map((link) => {
              const isCurrent = basePath.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-1.5 text-xs xl:text-sm rounded-lg transition-colors font-medium ${
                    isCurrent
                      ? 'text-cyan-300 bg-cyan-950/40 font-bold border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs + Language Switcher */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <LanguageSwitcher />

            <Link
              to="/download-app"
              className="px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-500/10"
              title={language === 'ar' ? 'تحميل التطبيق' : 'Download App'}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'تحميل التطبيق' : 'Download App'}</span>
            </Link>

            <button
              onClick={() => onOpenOrderModal('tanker-19t')}
              className="relative group px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
              id="nav-order-btn"
            >
              <Droplets className="w-3.5 h-3.5 fill-slate-950" />
              <span>{language === 'ar' ? 'اطلب صهريج ماء' : 'Order Water'}</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
            </button>
          </div>

          {/* Mobile Menu Toggle & Compact Controls */}
          <div className="flex sm:hidden items-center gap-1.5">
            <LanguageSwitcher compact />
            <button
              onClick={() => onOpenOrderModal('tanker-19t')}
              className="px-2.5 py-1.5 rounded-md text-xs font-bold bg-cyan-500 text-slate-950 cursor-pointer"
            >
              {language === 'ar' ? 'طلب ماء' : 'Order'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-[#071122]/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400">{isRTL ? 'اللغة:' : 'Language:'}</span>
            <LanguageSwitcher />
          </div>

          {/* Home Link */}
          <div>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 text-xs rounded-md font-medium flex items-center justify-between ${
                basePath === '/'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
              <ChevronRight className={`w-3.5 h-3.5 text-slate-500 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* How It Works Accordion with Sub-Menu */}
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900/40 p-2 space-y-1">
            <button
              type="button"
              onClick={() => setMobileHowItWorksOpen((prev) => !prev)}
              className="w-full px-2.5 py-2 text-xs font-semibold text-cyan-300 hover:text-white flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'كيف تعمل المنصة (القائمة الفرعية)' : 'How It Works (Menu)'}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${mobileHowItWorksOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileHowItWorksOpen && (
              <div className="pt-1.5 space-y-1 border-t border-slate-800/80">
                {howItWorksSubmenu.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = basePath === sub.href;
                  return (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-2.5 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                        isSubActive 
                          ? 'bg-cyan-500/25 text-white font-bold border border-cyan-500/40' 
                          : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <div>{sub.name}</div>
                      </div>
                      <ChevronRight className={`w-3 h-3 text-slate-500 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Other Links Grid */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {standardNavLinks.slice(1).map((link) => {
              const isCurrent = basePath.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-xs rounded-md font-medium flex items-center justify-between ${
                    isCurrent
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-3 h-3 text-slate-500 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              to="/download-app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-bold text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 rounded-lg flex items-center justify-center gap-2"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'ar' ? 'تحميل تطبيق نبع' : 'Download The App'}</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal('tanker-19t');
              }}
              className="w-full py-3 text-center text-sm font-extrabold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-md shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Droplets className="w-4 h-4 fill-slate-950" />
              <span>{language === 'ar' ? 'اطلب صهريج ماء الآن' : 'Order Water Now'}</span>
            </button>

            {/* Direct Mobile Contact Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={whatsappLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="py-2 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${phoneTel}`}
                className="py-2 px-3 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'اتصال مباشر' : 'Call'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
