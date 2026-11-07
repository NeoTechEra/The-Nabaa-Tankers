import React, { useState, useEffect } from 'react';
import { useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CustomerAppPage } from './pages/CustomerAppPage';
import { DriverAppPage } from './pages/DriverAppPage';
import { TankerPage } from './pages/TankerPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { DownloadAppPage } from './pages/DownloadAppPage';
import { JoinDriverPage } from './pages/JoinDriverPage';
import { FAQsPage } from './pages/FAQsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { OrderModal } from './components/OrderModal';
import { BookDemoModal } from './components/BookDemoModal';
import { AdminPortal, AdminPortalTab } from './components/AdminPortal';
import { FloatingContactWidget } from './components/FloatingContactWidget';

export function App() {
  const { basePath } = useRouter();

  // Order Simulator Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);
  const [adminPortalTab, setAdminPortalTab] = useState<AdminPortalTab>('operations');
  const [preselectedTanker, setPreselectedTanker] = useState<string | undefined>(undefined);

  // Deep link hash support for opening Admin directly
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash === '#admin-portal' || hash === '#admin') {
        setAdminPortalTab('operations');
        setIsAdminPortalOpen(true);
      } else if (hash === '#admin-demo') {
        setAdminPortalTab('demo_requests');
        setIsAdminPortalOpen(true);
      } else if (hash === '#admin-privacy') {
        setAdminPortalTab('privacy_policy');
        setIsAdminPortalOpen(true);
      } else if (hash === '#admin-terms') {
        setAdminPortalTab('terms_and_conditions');
        setIsAdminPortalOpen(true);
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  // Handlers for modal interactions
  const handleOpenOrderModal = (tankerId?: string) => {
    setPreselectedTanker(tankerId);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const handleOpenDemoModal = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemoModal = () => {
    setIsDemoModalOpen(false);
  };

  const handleOpenAdminPortal = (tab: AdminPortalTab = 'demo_requests') => {
    setAdminPortalTab(tab);
    setIsAdminPortalOpen(true);
  };

  // Resolve current active page according to clean multi-page URL architecture
  const renderActivePage = () => {
    switch (basePath) {
      case '/':
        return (
          <HomePage 
            onOpenOrderModal={handleOpenOrderModal} 
            onOpenAdminPortal={handleOpenAdminPortal} 
          />
        );
      case '/how-it-works':
        return <HowItWorksPage onOpenOrderModal={handleOpenOrderModal} />;
      case '/how-it-works/customer':
        return <CustomerAppPage onOpenOrderModal={handleOpenOrderModal} />;
      case '/how-it-works/driver':
        return <DriverAppPage />;
      case '/how-it-works/tanker':
        return <TankerPage onOpenOrderModal={handleOpenOrderModal} />;
      case '/about-us':
        return <AboutUsPage />;
      case '/service-areas':
        return <ServiceAreasPage onOpenOrderModal={handleOpenOrderModal} />;
      case '/download-app':
        return <DownloadAppPage />;
      case '/join-as-driver':
        return <JoinDriverPage />;
      case '/faqs':
        return <FAQsPage />;
      case '/contact':
        return <ContactPage />;
      
      // Privacy Policy Routes (Customer & Driver)
      case '/privacy-policy':
      case '/privacy-policy/customer':
        return (
          <PrivacyPolicyPage 
            target="customer" 
            onOpenAdminPortal={() => handleOpenAdminPortal('privacy_policy')} 
          />
        );
      case '/privacy-policy/driver':
        return (
          <PrivacyPolicyPage 
            target="driver" 
            onOpenAdminPortal={() => handleOpenAdminPortal('privacy_policy')} 
          />
        );

      // Terms and Conditions Routes (Customer & Driver)
      case '/terms-and-conditions':
      case '/terms-and-conditions/customer':
        return (
          <TermsPage 
            target="customer" 
            onOpenAdminPortal={() => handleOpenAdminPortal('terms_and_conditions')} 
          />
        );
      case '/terms-and-conditions/driver':
        return (
          <TermsPage 
            target="driver" 
            onOpenAdminPortal={() => handleOpenAdminPortal('terms_and_conditions')} 
          />
        );

      // Dedicated Full-Page Admin Dashboard Routes
      case '/admin':
      case '/admin-dashboard':
        return (
          <div className="w-full min-h-screen py-4 px-2 sm:px-4 max-w-[1700px] mx-auto">
            <AdminPortal 
              isOpen={true} 
              isStandalonePage={true} 
              onClose={() => {
                window.location.hash = '#/';
              }} 
            />
          </div>
        );

      default:
        // Handle routes with trailing slash or fallback to HomePage
        return (
          <HomePage 
            onOpenOrderModal={handleOpenOrderModal} 
            onOpenAdminPortal={handleOpenAdminPortal} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* 1. Global Navigation Bar with How It Works & Support Submenus */}
      <Navbar 
        onOpenOrderModal={() => handleOpenOrderModal()} 
        onOpenDemoModal={handleOpenDemoModal}
      />

      {/* 2. Active Multi-Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* 3. Global Footer with Support & Legal Links */}
      <Footer 
        onOpenOrderModal={handleOpenOrderModal} 
        onOpenDemoModal={handleOpenDemoModal}
        onOpenAdminPortal={handleOpenAdminPortal}
      />

      {/* Interactive Universal Tanker Order Simulator Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        preselectedTankerId={preselectedTanker}
      />

      {/* Live System Demonstration Booking Modal */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemoModal}
      />

      {/* Discrete Authenticated Admin Control Portal */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        initialTab={adminPortalTab}
      />

      {/* Floating 24/7 Contact Assistance Widget (WhatsApp & Call) */}
      <FloatingContactWidget />

    </div>
  );
}

export default App;
