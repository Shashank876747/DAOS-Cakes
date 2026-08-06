import React, { useState } from 'react';
import {
  Cake,
  Sparkles,
  BookOpen,
  FileSpreadsheet,
  Send,
  Heart,
  ShieldCheck,
  ArrowDown,
  Instagram,
  Facebook,
  Mail,
  ExternalLink,
  Layers,
  Cookie,
  Menu as MenuIcon,
  X,
  ArrowUp,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import heroImage from './assets/images/daos_hero_cake_1785892806355.jpg';
import treatsImage from './assets/images/daos_baker_treats_1785892816667.jpg';
import PublicOrderSchedule from './components/PublicOrderSchedule';
import AppsScriptGuideModal from './components/AppsScriptGuideModal';
import AuthModal from './components/AuthModal';
import Header from './components/Header';
import AdminEditorModal from './components/AdminEditorModal';
import AdminToolbar from './components/AdminToolbar';
import { useSite } from './context/SiteContext';

export default function App() {
  const { content, isAdminMode, openAdminEditor } = useSite();
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isAppsScriptModalOpen, setIsAppsScriptModalOpen] = useState(false);

  // Helper to format Google Form links for embedded iframe rendering
  const getEmbeddableFormUrl = (rawUrl: string) => {
    if (!rawUrl) return '';
    let formatted = rawUrl.trim();
    if (formatted.includes('docs.google.com/forms') && !formatted.includes('embedded=true')) {
      if (formatted.includes('?')) {
        formatted = formatted.split('?')[0] + '?embedded=true';
      } else {
        formatted = formatted + '?embedded=true';
      }
    }
    return formatted;
  };

  const embeddableUrl = getEmbeddableFormUrl(content.googleFormUrl);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900 flex flex-col">
      
      {/* Header Navigation */}
      <Header />

      <main className="grow">
        
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden bg-stone-50 py-12 md:py-20 lg:py-24 border-b border-amber-100/60">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            
            {/* In-context Admin Edit Badge */}
            {isAdminMode && (
              <div className="mb-4 flex items-center justify-start">
                <button
                  onClick={openAdminEditor}
                  className="px-3 py-1 rounded-full bg-amber-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Edit Hero Section</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Copy & CTA */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{content.hero.badge}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
                  {content.hero.title}
                </h1>

                <p className="text-lg sm:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed">
                  {content.hero.subtitle}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="flex items-center gap-2.5 text-stone-700 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      ✓
                    </div>
                    <span>Made Fresh Daily</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-stone-700 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      ✓
                    </div>
                    <span>Custom Designs</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-stone-700 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                      ✓
                    </div>
                    <span>Cottage Permitted</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => scrollToSection('order-form')}
                    className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-4 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
                    id="hero-order-now-btn"
                  >
                    <span>{content.hero.ctaText}</span>
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Hero Image Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-300 rounded-3xl blur-md opacity-70 -z-10" />
                  
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                    <img
                      src={heroImage}
                      alt="DAOS Cakes - Artisanal Custom Celebration Cake"
                      className="w-full h-[380px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-amber-100 shadow-lg flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                        <Heart className="w-5 h-5 fill-amber-700 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-sm">Crafted with Heart</h4>
                        <p className="text-xs text-stone-600">Custom cake orders tailored to your unique taste and theme.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Embedded Form Section */}
        <section id="order-form" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-100 border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Friendly Instruction Header */}
            <div className="text-center space-y-4 mb-10 relative">
              {isAdminMode && (
                <div className="mb-2 flex items-center justify-center">
                  <button
                    onClick={openAdminEditor}
                    className="px-3 py-1 rounded-full bg-amber-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-amber-900 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit Order Form Section & URL</span>
                  </button>
                </div>
              )}

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-800" />
                <span>{content.orderNotice.badge}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                {content.orderNotice.title}
              </h2>

              <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
                {content.orderNotice.subtitle}
              </p>
            </div>

            {/* Seamless Responsive iframe Card */}
            <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden">
              
              {/* Header Bar */}
              <div className="bg-stone-900 text-amber-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-stone-300">
                    Backend Connection: <strong className="text-emerald-300">Google Sheets Sync Ready</strong>
                  </span>
                </div>
                <button
                  onClick={openAdminEditor}
                  className="text-xs text-amber-300 hover:text-white underline cursor-pointer font-mono flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Admin: Edit Google Form Link</span>
                </button>
              </div>

              {/* iframe Display Container */}
              <div className="w-full relative min-h-[520px] bg-stone-50 flex flex-col items-center justify-center p-4">
                {embeddableUrl ? (
                  <iframe
                    src={embeddableUrl}
                    title="DAOS Cakes Google Form"
                    className="w-full h-[650px] border-0 rounded-2xl shadow-xs"
                    loading="lazy"
                  >
                    Loading Google Form...
                  </iframe>
                ) : (
                  <div className="w-full max-w-xl p-8 sm:p-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto shadow-2xs">
                      <FileSpreadsheet className="w-8 h-8 text-amber-800" />
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-semibold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                        Google Form Embed Container
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-stone-900">
                        Google Form Ready for Link
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
                        This clean responsive iframe section is configured to seamlessly display your Google Form as soon as your URL is added in the Admin Editor.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={openAdminEditor}
                        className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-3 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <Sliders className="w-4 h-4" />
                        <span>Configure Form URL in Admin Editor</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* 6. About Section */}
        <section id="about" className="py-16 md:py-24 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {isAdminMode && (
              <div className="mb-6 flex items-center justify-start">
                <button
                  onClick={openAdminEditor}
                  className="px-3 py-1 rounded-full bg-amber-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Edit About Section</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Image */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200 to-amber-100 rounded-3xl blur-md opacity-60 -z-10" />

                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-100">
                    <img
                      src={treatsImage}
                      alt="DAOS Cakes - Artisan Home Baker Treats"
                      className="w-full h-[380px] sm:h-[440px] object-cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-4 rounded-xl text-amber-50 border border-stone-700 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center shrink-0 font-serif font-bold">
                        ★
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-white">Handcrafted with Pride</h4>
                        <p className="text-xs text-stone-300">Small-batch artisanal home baking.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Narrative & Cottage Food Compliance Note */}
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 text-amber-800 fill-amber-800" />
                  <span>Passionate Home Baker</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-snug">
                  {content.about.title}
                </h2>

                <p className="text-stone-700 text-base sm:text-lg font-normal leading-relaxed">
                  {content.about.paragraph1}
                </p>

                <p className="text-stone-600 text-sm sm:text-base font-normal leading-relaxed">
                  {content.about.paragraph2}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{content.about.highlight1}</span>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{content.about.highlight2}</span>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{content.about.highlight3}</span>
                  </div>
                </div>

                {/* Compliant Cottage Food Text Note */}
                <div className="bg-amber-50/90 border-l-4 border-amber-800 p-5 rounded-r-2xl space-y-2 shadow-2xs" id="compliance-note">
                  <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-sm sm:text-base">
                    <ShieldCheck className="w-5 h-5 text-amber-800 shrink-0" />
                    <span>Cottage Food & Health Safety Compliance Note</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 font-normal leading-relaxed">
                    DAOS Cakes operates safely and legally under local cottage food and home kitchen regulations. All baked goods are prepared in a clean, sanitized, permitted home kitchen facility adhering strictly to food safety guidelines.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer id="contact" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
            
            {/* Brand */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-bold">
                  <Cake className="w-6 h-6" />
                </div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  {content.siteName}
                </span>
              </div>

              <p className="text-stone-400 text-base font-serif italic max-w-sm">
                "Baking life a little sweeter, one custom cake at a time."
              </p>

              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                {content.contact.location}
              </p>
            </div>

            {/* Social & Email */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
                  Contact & Details
                </h4>
                {isAdminMode && (
                  <button
                    onClick={openAdminEditor}
                    className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Edit Contact</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-3 text-sm">
                <a
                  href={`mailto:${content.contact.email}`}
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Email: <strong className="font-medium text-white">{content.contact.email}</strong></span>
                </a>

                <div className="flex items-center gap-3 text-stone-300">
                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span>Instagram: <strong className="font-medium text-white">{content.contact.instagram}</strong></span>
                </div>

                <div className="text-xs text-stone-400 pt-1">
                  <span>Hours: <strong className="text-stone-300">{content.contact.hours}</strong></span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
                Quick Navigation
              </h4>
              
              <ul className="space-y-2 text-sm text-stone-400">
                <li>
                  <button onClick={() => scrollToSection('order-form')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Order Form
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Contact Info
                  </button>
                </li>
                <li>
                  <button
                    onClick={openAdminEditor}
                    className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium text-xs flex items-center gap-1 pt-1"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Admin Site Editor</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>
              © {new Date().getFullYear()} {content.siteName}. All rights reserved. Handcrafted with love.
            </p>
            
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium"
              id="back-to-top-btn"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </footer>

      {/* Google Apps Script Integration Guide Modal */}
      <AppsScriptGuideModal
        isOpen={isAppsScriptModalOpen}
        onClose={() => setIsAppsScriptModalOpen(false)}
      />

      {/* User Authentication Modal */}
      <AuthModal />

      {/* Admin Site Editor Modal */}
      <AdminEditorModal onOpenAppsScriptGuide={() => setIsAppsScriptModalOpen(true)} />

      {/* Floating Admin Toolbar */}
      <AdminToolbar />

    </div>
  );
}
