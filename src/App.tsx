import React, { useState, useEffect } from 'react';
import { useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { BookDemoModal } from './components/BookDemoModal';
import { AdminPortal } from './components/AdminPortal';
import { FloatingContactWidget } from './components/FloatingContactWidget';

// Dedicated multi-page route components
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

export default function App() {
  const { basePath } = useRouter();
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);
  const [preselectedTanker, setPreselectedTanker] = useState<string>('tanker-19t');

  // Support direct deep link via hash (#admin, #admin-portal, #demo-requests)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#admin-portal' || hash === '#admin-demo-requests' || hash === '#demo-requests') {
        setIsAdminPortalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenOrderModal = (tankerId?: string) => {
    if (tankerId) {
      setPreselectedTanker(tankerId);
    }
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

  // Resolve current active page according to clean multi-page URL architecture
  const renderActivePage = () => {
    switch (basePath) {
      case '/':
        return <HomePage onOpenOrderModal={handleOpenOrderModal} />;
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
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms-and-conditions':
        return <TermsPage />;
      default:
        // Handle routes with trailing slash or fallback to HomePage
        return <HomePage onOpenOrderModal={handleOpenOrderModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      
      {/* 1. Global Navigation Bar (Public Customer & Driver Links Only) */}
      <Navbar 
        onOpenOrderModal={() => handleOpenOrderModal()} 
        onOpenDemoModal={handleOpenDemoModal}
      />

      {/* 2. Active Multi-Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* 3. Global Footer with Under-Footer Discrete Admin Access */}
      <Footer 
        onOpenOrderModal={handleOpenOrderModal} 
        onOpenDemoModal={handleOpenDemoModal}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
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

      {/* Encrypted Operations Admin Portal (Protected with password H78900123osA@) */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

      {/* Direct WhatsApp and Call Floating Quick Widget */}
      <FloatingContactWidget />

    </div>
  );
}
