import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Heart,
  ArrowDown,
  RefreshCw,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import heroImage from './assets/images/daos_hero_cake_1785892806355.jpg';
import Header from './components/Header';
import Footer from './components/Footer';
import MenuSection from './components/MenuSection';
import CakeEstimatorSection from './components/CakeEstimatorSection';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import CookieConsentBanner from './components/CookieConsentBanner';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import { initGA } from './utils/analytics';
import { useSectionRouter } from './hooks/useSectionRouter';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdQ7d5odCaliDzgkufvsD_hfwdhbi1meCHUyO_zMdgoLJVMwA/viewform?usp=header';

export default function App() {
  const [googleFormUrl] = useState<string>(GOOGLE_FORM_URL);
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);

  const {
    activeSectionId,
    navigateTo
  } = useSectionRouter();

  useEffect(() => {
    initGA();
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('privacy') || hash.includes('privacy')) {
        setPrivacyModalOpen(true);
      }
    }
  }, []);

  const getEmbeddableUrl = (url: string, key: number) => {
    if (!url) return '';
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?embedded=true&v=${key}`;
  };

  const embeddableUrl = getEmbeddableUrl(googleFormUrl, refreshKey);

  const handleRefreshForm = () => {
    setIsRefreshing(true);
    setRefreshKey(Date.now());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handleSelectMenuItem = (itemTitle: string) => {
    navigateTo('order-form');
  };

  const handleApplyEstimate = (estimateDetails: string) => {
    navigateTo('order-form');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900 flex flex-col">
      
      {/* Header Navigation with Active URL Support */}
      <Header
        siteName="DAOS Cakes"
        activeSectionId={activeSectionId}
        onNavigate={navigateTo}
      />

      <main className="grow">
        
        {/* 1. Hero Section -> URL: / or /#home */}
        <section id="home" className="relative overflow-hidden bg-stone-50 py-12 md:py-20 lg:py-24 border-b border-amber-100/60 scroll-mt-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Copy & CTA */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Artisanal Bakery • Smyrna &amp; Greater Atlanta, GA</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.12]">
                  Handcrafted Celebration Cakes Baked Fresh to Order.
                </h1>

                <p className="text-lg sm:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed">
                  From elegant floral palette tiers to decadent chocolate drips, every cake is baked from scratch with pure butter, farm-fresh eggs, and heartfelt artistry.
                </p>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-stone-800 text-xs sm:text-sm font-semibold bg-amber-50/70 border border-amber-200/80 p-3 rounded-2xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>100% Scratch-Baked</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-stone-800 text-xs sm:text-sm font-semibold bg-amber-50/70 border border-amber-200/80 p-3 rounded-2xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>Custom Floral Art</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-stone-800 text-xs sm:text-sm font-semibold bg-amber-50/70 border border-amber-200/80 p-3 rounded-2xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>Cottage Permitted</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => navigateTo('order-form')}
                    className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-4 rounded-full font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
                    id="hero-order-now-btn"
                    title="Go to Order Form (/order)"
                  >
                    <span>Order Form</span>
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => navigateTo('menu')}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-4 rounded-full font-semibold text-base border border-stone-300 transition-all flex items-center justify-center cursor-pointer"
                    id="hero-explore-menu-btn"
                  >
                    <span>Explore Menu &amp; Flavors</span>
                  </button>
                </div>
              </div>

              {/* Hero Image Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-300 rounded-3xl blur-md opacity-70 -z-10" />
                  
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                    <img
                      src={heroImage}
                      alt="DAOS Cakes - Artisanal Custom Celebration Cake"
                      className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-4 rounded-2xl border border-stone-700/80 shadow-lg flex items-center gap-3 text-stone-100">
                      <div className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center text-amber-300 shrink-0">
                        <Heart className="w-5 h-5 fill-amber-300 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-sm">Bespoke Celebration Art</h4>
                        <p className="text-xs text-stone-300">Custom orders tailored to your unique flavor and event palette.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. Signature Menu & Flavor Explorer */}
        <section id="menu">
          <MenuSection onSelectForOrder={handleSelectMenuItem} />
        </section>

        {/* 3. Interactive Cake Price & Size Estimator */}
        <section id="estimator">
          <CakeEstimatorSection onApplyToOrder={handleApplyEstimate} />
        </section>

        {/* 4. How Ordering Works (4 Steps) */}
        <section id="how-it-works">
          <ProcessSection onStartOrder={() => navigateTo('order-form')} />
        </section>

        {/* 5. Direct Embedded Google Form Section -> URL: /order or /order-form */}
        <section id="order-form" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-100 border-b border-stone-200 scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center space-y-4 mb-8 relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-800" />
                <span>Google Form • Direct Sheet Sync</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                DAOS Cakes Order Form
              </h2>

              <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
                Complete Sections 1 through 4 below. Your submission is recorded directly in our Google Form and connected baking schedule spreadsheet.
              </p>
            </div>

            {/* Direct Google Form Card Container */}
            <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden text-left" id="direct-embedded-google-form-card">
              
              {/* Card Header Bar */}
              <div className="bg-stone-900 text-amber-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-stone-200">
                    Form Sync: <strong className="text-emerald-300">Live Recording to Google Sheets</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleRefreshForm}
                    disabled={isRefreshing}
                    title="Reload Google Form"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition-colors border border-stone-700 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Reloading...' : 'Reload'}</span>
                  </button>

                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open form in full Google tab"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-colors"
                  >
                    <span>Open in New Tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct Embedded Google Form iFrame */}
              <div className="w-full bg-stone-50 p-2 sm:p-4">
                <iframe
                  key={refreshKey}
                  src={embeddableUrl}
                  title="DAOS Cakes Cake Order Form"
                  className="w-full h-[880px] sm:h-[960px] border-0 rounded-2xl shadow-xs bg-white"
                  loading="lazy"
                >
                  Loading DAOS Cakes Order Form...
                </iframe>
              </div>

              {/* Quick Help & Pickup Info Footer Bar */}
              <div className="bg-stone-900 text-stone-300 p-5 sm:p-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">Questions or custom requests?</span>
                    <span>Call or text us at <strong className="text-amber-300">(470) 476-1631</strong> or <strong className="text-amber-300">(678) 235-8462</strong></span>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-stone-800 sm:pl-4">
                  <span className="text-amber-300 font-semibold block">Pickup: Smyrna, GA</span>
                  <span className="text-stone-400">Payment: Cash on Pickup</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 6. About the Baker */}
        <section id="about">
          <AboutSection />
        </section>

        {/* 7. Client Testimonials */}
        <TestimonialsSection />

        {/* 8. Frequently Asked Questions */}
        <section id="faq">
          <FaqSection />
        </section>

      </main>

      {/* Footer -> URL: /contact */}
      <Footer
        activeSectionId={activeSectionId}
        onNavigate={navigateTo}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/terms.html';
          }
        }}
      />

      {/* Cookie & Advertising Consent Banner for Google AdSense Policy Compliance */}
      <CookieConsentBanner
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* Privacy Policy Interactive Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

    </div>
  );
}
