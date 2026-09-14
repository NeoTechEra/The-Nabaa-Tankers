import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PlatformOverview } from './components/PlatformOverview';
import { CustomerExperience } from './components/CustomerExperience';
import { OrderNowFlow } from './components/OrderNowFlow';
import { ScheduledDelivery } from './components/ScheduledDelivery';
import { PromotionsSection } from './components/PromotionsSection';
import { PaymentsSection } from './components/PaymentsSection';
import { LiveTrackingSection } from './components/LiveTrackingSection';
import { CustomerAccountMockup } from './components/CustomerAccountMockup';
import { DriverAppSection } from './components/DriverAppSection';
import { AdminDashboardSection } from './components/AdminDashboardSection';
import { DeliveryWorkflow } from './components/DeliveryWorkflow';
import { TankerSpecsSection } from './components/TankerSpecsSection';
import { WhyNabaa } from './components/WhyNabaa';
import { BusinessAndCustomerCTA } from './components/BusinessAndCustomerCTA';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { BookDemoModal } from './components/BookDemoModal';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
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

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* 1. Global Navigation Bar */}
      <Navbar 
        onOpenOrderModal={() => handleOpenOrderModal()} 
        onOpenDemoModal={handleOpenDemoModal}
      />

      <main>
        {/* 2. Hero Section with Tanker & Telemetry Visual */}
        <Hero 
          onOpenOrderModal={() => handleOpenOrderModal()} 
          onOpenDemoModal={handleOpenDemoModal}
        />

        {/* 3. Platform Overview: 3-Column System Architecture */}
        <PlatformOverview />

        {/* 4. Customer Experience: 3-Step Journey */}
        <CustomerExperience onSelectTanker={(tankerId) => handleOpenOrderModal(tankerId)} />

        {/* 5. Order Now Immediate Dispatch Flow with Radar */}
        <OrderNowFlow onStartOrder={() => handleOpenOrderModal('tanker-19t')} />

        {/* 6. Scheduled Delivery Calendar & Auto-Refill Booking */}
        <ScheduledDelivery onScheduleOrder={() => handleOpenOrderModal('tanker-19t')} />

        {/* 7. Promotions & Promo Code Engine */}
        <PromotionsSection />

        {/* 8. Payments Section (Mada, Apple Pay, Cards, Cash) */}
        <PaymentsSection />

        {/* 9. Live Driver Telemetry, Route Map, and Milestones */}
        <LiveTrackingSection />

        {/* 10. Complete Customer Account Management Mockup */}
        <CustomerAccountMockup />

        {/* 11, 12, 13. Driver & Fleet Mobile App, Wallet & Trip History */}
        <DriverAppSection />

        {/* 14 through 23. Central Admin Dashboard & Command Center */}
        <AdminDashboardSection />

        {/* 24. End-to-End Delivery Workflow */}
        <DeliveryWorkflow />

        {/* 25. Tanker Specifications (10T, 19T, 32T) */}
        <TankerSpecsSection onOrderTanker={(id) => handleOpenOrderModal(id)} />

        {/* 26. Why The Nabaa */}
        <WhyNabaa />

        {/* 27 & 28. CTAs for Customers and Fleet Operators */}
        <BusinessAndCustomerCTA 
          onOpenOrderModal={() => handleOpenOrderModal()} 
          onOpenDemoModal={handleOpenDemoModal}
        />

        {/* 29. About The Nabaa Story & Vision */}
        <AboutSection />

        {/* 30. Comprehensive FAQ */}
        <FAQSection />
      </main>

      {/* 31. Footer */}
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

      {/* Interactive Platform Demo & Meeting Booking Modal */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemoModal}
      />

      {/* Persistent Floating Quick WhatsApp & Call Hotline Widget */}
      <FloatingContactWidget />

      {/* Restricted Corporate Admin Portal (Protected Live Demo Requests 16) */}
      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

    </div>
  );
}
