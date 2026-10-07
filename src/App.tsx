import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import RouteSeoUpdater from './components/RouteSeoUpdater';
import CookieConsentBanner from './components/CookieConsentBanner';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { initGA } from './utils/analytics';

// Page Views
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import OrderPage from './pages/OrderPage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import EstimatorPage from './pages/EstimatorPage';
import FlavorGuidePage from './pages/FlavorGuidePage';
import CakeCareGuidePage from './pages/CakeCareGuidePage';
import WeddingGuidePage from './pages/WeddingGuidePage';
import BakingCraftPage from './pages/BakingCraftPage';
import BakingJournalPage from './pages/BakingJournalPage';
import BakingArticlePage from './pages/BakingArticlePage';
import BakingCalculatorsPage from './pages/BakingCalculatorsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    initGA();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteSeoUpdater />
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900 flex flex-col">
        
        {/* Persistent Global Header */}
        <Header siteName="DAOS Cakes" />

        {/* Dynamic Route Pages */}
        <main className="grow">
          <Routes>
            {/* Primary Multi-Page Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/baking-journal" element={<BakingJournalPage />} />
            <Route path="/baking-journal/:slug" element={<BakingArticlePage />} />
            <Route path="/journal" element={<Navigate to="/baking-journal" replace />} />
            <Route path="/blog" element={<Navigate to="/baking-journal" replace />} />

            <Route path="/baking-calculators" element={<BakingCalculatorsPage />} />
            <Route path="/calculators" element={<Navigate to="/baking-calculators" replace />} />

            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/process" element={<Navigate to="/how-it-works" replace />} />
            
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-form" element={<Navigate to="/order" replace />} />
            
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* In-Depth Masterclass & Content Guides */}
            <Route path="/flavor-guide" element={<FlavorGuidePage />} />
            <Route path="/flavors" element={<Navigate to="/flavor-guide" replace />} />
            
            <Route path="/cake-care-guide" element={<CakeCareGuidePage />} />
            <Route path="/cake-care" element={<Navigate to="/cake-care-guide" replace />} />
            <Route path="/transport-guide" element={<Navigate to="/cake-care-guide" replace />} />

            <Route path="/wedding-guide" element={<WeddingGuidePage />} />
            <Route path="/weddings" element={<Navigate to="/wedding-guide" replace />} />

            <Route path="/baking-craft" element={<BakingCraftPage />} />
            <Route path="/craft" element={<Navigate to="/baking-craft" replace />} />

            {/* Additional Distinct Feature Routes */}
            <Route path="/pricing-estimator" element={<EstimatorPage />} />
            <Route path="/estimator" element={<Navigate to="/pricing-estimator" replace />} />
            <Route path="/pricing" element={<Navigate to="/pricing-estimator" replace />} />

            {/* Legal & AdSense Compliance Dynamic Routes */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/privacy-policy.html" element={<PrivacyPolicyPage />} />

            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
            <Route path="/terms.html" element={<TermsPage />} />

            {/* 404 Catch-All Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Persistent Global Footer */}
        <Footer
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        {/* Global Compliance & Cookie Banner */}
        <CookieConsentBanner
          onOpenPrivacy={() => setPrivacyModalOpen(true)}
        />

        {/* Privacy Policy Interactive Modal */}
        <PrivacyPolicyModal
          isOpen={privacyModalOpen}
          onClose={() => setPrivacyModalOpen(false)}
        />

      </div>
    </BrowserRouter>
  );
}
