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
  CheckCircle2
} from 'lucide-react';
import heroImage from './assets/images/daos_hero_cake_1785892806355.jpg';
import treatsImage from './assets/images/daos_baker_treats_1785892816667.jpg';

// Types
interface MenuItem {
  id: string;
  name: string;
  startingPrice: string;
  description: string;
  popular?: boolean;
  tags?: string[];
}

// Menu Data
const SIGNATURE_CAKES: MenuItem[] = [
  {
    id: 'sig-1',
    name: 'Classic Celebration Layer Cake',
    startingPrice: 'Starts at $45',
    description: 'Three tall layers of moist sponge paired with silky Swiss meringue buttercream. Perfect for birthdays and milestones.',
    popular: true,
    tags: ['Best Seller', 'Custom Sizes']
  },
  {
    id: 'sig-2',
    name: 'Floral Palette Art Cake',
    startingPrice: 'Starts at $55',
    description: 'Hand-piped buttercream florals and textured palette knife artwork tailored to your event color scheme.',
    popular: true,
    tags: ['Custom Art', 'Weddings & Showers']
  },
  {
    id: 'sig-3',
    name: 'Decadent Chocolate Fudge Cake',
    startingPrice: 'Starts at $50',
    description: 'Rich dark chocolate cake layers drizzled with dark chocolate ganache and whipped chocolate cream.',
    tags: ['Rich Chocolate']
  },
  {
    id: 'sig-4',
    name: 'Rustic Naked Berry Cake',
    startingPrice: 'Starts at $45',
    description: 'Light vanilla bean sponge with semi-exposed edges, filled with fresh seasonal berries and vanilla cream.',
    tags: ['Fresh Fruit', 'Rustic Finish']
  }
];

const DAILY_TREATS: MenuItem[] = [
  {
    id: 'treat-1',
    name: 'Gourmet Cupcakes',
    startingPrice: 'Starts at $15 / dozen',
    description: 'Freshly baked cupcakes topped with signature swirl buttercream and elegant handcrafted sprinkles.',
    popular: true,
    tags: ['Assorted Flavors']
  },
  {
    id: 'treat-2',
    name: 'French Macaron Box',
    startingPrice: 'Starts at $18 / dozen',
    description: 'Delicate almond meringue shells filled with chocolate ganache, fruit curds, or buttercream.',
    tags: ['Gluten-Friendly']
  },
  {
    id: 'treat-3',
    name: 'Mini Dessert Shooters',
    startingPrice: 'Starts at $20 / dozen',
    description: 'Individual layered dessert cups featuring cheesecake, mousse, or shortcake flavors.',
    tags: ['Party Favorite']
  },
  {
    id: 'treat-4',
    name: 'Artisan Cake Pops',
    startingPrice: 'Starts at $16 / dozen',
    description: 'Moist cake bites dipped in premium chocolate and customized to match your event theme.',
    tags: ['Custom Themes']
  }
];

const FLAVOR_BASES = [
  'Classic Vanilla Bean',
  'Rich Chocolate Fudge',
  'Red Velvet',
  'Lemon Zest',
  'Spiced Carrot',
  'Confetti Celebration'
];

const FLAVOR_BUTTERCREAMS = [
  'Swiss Meringue Buttercream',
  'Cream Cheese Frosting',
  'Chocolate Ganache',
  'Tangy Raspberry Curd',
  'Fresh Strawberry Compote',
  'Salted Caramel Drizzle'
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-900 flex flex-col">
      
      {/* 1. Header & Navigation */}
      <header className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
            id="header-logo"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 group-hover:bg-amber-200 transition-colors">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                DAOS Cakes
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-amber-700 font-sans font-semibold">
                Handcrafted Bakery
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-stone-700">
            <button 
              onClick={() => scrollToSection('menu')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-menu"
            >
              Menu
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-how-it-works"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('order-form')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-order-form"
            >
              Order Form
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-contact"
            >
              Contact
            </button>
          </nav>

          {/* Order Now CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('order-form')}
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              id="header-order-btn"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-amber-800 hover:bg-stone-100"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-50 border-b border-amber-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <button
              onClick={() => scrollToSection('menu')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-menu"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-how-it-works"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('order-form')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-order-form"
            >
              Order Form
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-about"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-contact"
            >
              Contact
            </button>
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('order-form')}
                className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-3 rounded-xl font-medium text-center shadow-xs"
                id="mobile-header-order-btn"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="grow">
        
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden bg-stone-50 py-12 md:py-20 lg:py-24 border-b border-amber-100/60">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Copy & CTA */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Handcrafted Home Bakery</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
                  Fresh Custom Cakes Made for Your Special Celebrations.
                </h1>

                <p className="text-lg sm:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed">
                  Baked fresh to order with premium ingredients and heartfelt care. Every layer is crafted to make your sweetest moments unforgettable.
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
                    <span>Order Now</span>
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('menu')}
                    className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-stone-300 text-stone-800 font-medium text-base hover:bg-stone-100 transition-colors cursor-pointer"
                    id="hero-browse-menu-btn"
                  >
                    Browse Menu & Prices
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

        {/* 3. Menu Section */}
        <section id="menu" className="py-16 md:py-24 bg-white border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                <Cake className="w-3.5 h-3.5" />
                <span>Baked Fresh To Order</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Menu & Price Guide
              </h2>
              <p className="text-stone-600 text-base sm:text-lg font-normal">
                Explore our signature custom cake offerings, daily baked treats, and handcrafted flavor combinations.
              </p>
            </div>

            {/* Signature Cakes */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8 border-b border-amber-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Cake className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900">Signature Cakes</h3>
                    <p className="text-xs text-stone-500">Handcrafted multi-layer celebration cakes</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                  Starts at $45
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="signature-cakes-grid">
                {SIGNATURE_CAKES.map((cake) => (
                  <div
                    key={cake.id}
                    className="bg-stone-50/80 border border-stone-200 rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
                          {cake.startingPrice}
                        </span>
                        {cake.popular && (
                          <span className="text-xs font-medium text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            ★ Popular
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                        {cake.name}
                      </h4>
                      <p className="text-stone-600 text-sm font-normal leading-relaxed mb-4">
                        {cake.description}
                      </p>
                    </div>

                    <div>
                      {cake.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {cake.tags.map((tag, idx) => (
                            <span key={idx} className="text-[11px] text-stone-500 bg-white border border-stone-200 px-2 py-0.5 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => scrollToSection('order-form')}
                        className="w-full text-center py-2.5 rounded-xl border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Treats */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8 border-b border-amber-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                    <Cookie className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900">Daily Treats</h3>
                    <p className="text-xs text-stone-500">Cupcakes, macarons, shooters, and cake pops</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                  Starts at $15/dozen
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="daily-treats-grid">
                {DAILY_TREATS.map((treat) => (
                  <div
                    key={treat.id}
                    className="bg-stone-50/80 border border-stone-200 rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
                          {treat.startingPrice}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900 mb-2 group-hover:text-amber-800 transition-colors">
                        {treat.name}
                      </h4>
                      <p className="text-stone-600 text-sm font-normal leading-relaxed mb-4">
                        {treat.description}
                      </p>
                    </div>

                    <div>
                      {treat.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {treat.tags.map((tag, idx) => (
                            <span key={idx} className="text-[11px] text-stone-500 bg-white border border-stone-200 px-2 py-0.5 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => scrollToSection('order-form')}
                        className="w-full text-center py-2.5 rounded-xl border border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white transition-all text-xs font-semibold cursor-pointer"
                      >
                        Order Treats
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flavor Guide */}
            <div className="bg-gradient-to-br from-amber-50/80 via-amber-50/40 to-stone-50 border border-amber-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs" id="flavor-guide">
              <div className="max-w-3xl mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Custom Combinations</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Flavor Guide
                </h3>
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  Mix and match standard cake bases with silky frostings and gourmet fillings to create your dream cake profile.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Standard Bases */}
                <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-2xs">
                  <div className="flex items-center gap-2 mb-4 text-amber-900 font-serif font-bold text-lg border-b border-amber-100 pb-2">
                    <Layers className="w-5 h-5 text-amber-800" />
                    <span>Standard Cake Bases</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                    {FLAVOR_BASES.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buttercreams & Fillings */}
                <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-2xs">
                  <div className="flex items-center gap-2 mb-4 text-amber-900 font-serif font-bold text-lg border-b border-amber-100 pb-2">
                    <Sparkles className="w-5 h-5 text-amber-800" />
                    <span>Buttercreams & Gourmet Fillings</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700">
                    {FLAVOR_BUTTERCREAMS.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 4. How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-stone-100/70 border-b border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Simple 3-Step Process
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                How It Works
              </h2>
              <p className="text-stone-600 text-base sm:text-lg font-normal">
                Ordering your custom cake is seamless and stress-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="how-it-works-cards">
              
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xl flex items-center justify-center mb-6 shadow-2xs group-hover:bg-amber-800 group-hover:text-amber-50 transition-colors">
                    1
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Step One</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                    Browse the Menu
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Explore our signature cakes, daily treats, and flavor guide to pick the ideal style and size for your celebration.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-stone-100 mt-6 flex items-center text-xs font-medium text-stone-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span>Explore options & pricing</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xl flex items-center justify-center mb-6 shadow-2xs group-hover:bg-amber-800 group-hover:text-amber-50 transition-colors">
                    2
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Step Two</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                    Complete Built-in Google Form
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Fill out the built-in Google Form below with your event details (which instantly saves data to our Google Sheets backend).
                  </p>
                </div>
                
                <div className="pt-6 border-t border-stone-100 mt-6 flex items-center text-xs font-medium text-stone-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span>Saves instantly to baking schedule</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 font-bold text-xl flex items-center justify-center mb-6 shadow-2xs group-hover:bg-amber-800 group-hover:text-amber-50 transition-colors">
                    3
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
                    <Send className="w-4 h-4" />
                    <span>Step Three</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">
                    Receive Message to Confirm Deposit
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Receive a personal text or email message from us to confirm design choices, finalize pricing, and pay your deposit.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-stone-100 mt-6 flex items-center text-xs font-medium text-stone-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span>Quick response within 24 hours</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 5. Embedded Form Section */}
        <section id="order-form" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-100 border-b border-stone-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Friendly Instruction Header */}
            <div className="text-center space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-800" />
                <span>Google Form Order Portal</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Custom Cake Order Form
              </h2>

              <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
                Ready to order your custom cake? Fill out the Google Form below to submit your event date, size, and flavor preferences. Once submitted, your request saves directly to our Google Sheets backend and we will reach out to confirm your deposit!
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
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-xs text-amber-300 hover:text-white underline cursor-pointer font-mono"
                >
                  {showUrlInput ? 'Hide Form Link Input' : 'Add / Change Google Form Link'}
                </button>
              </div>

              {/* Optional URL Config Bar */}
              {showUrlInput && (
                <div className="bg-stone-800 p-4 border-b border-stone-700 flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="url"
                    placeholder="Paste your Google Form embed URL here (e.g. https://docs.google.com/forms/d/e/.../viewform?embedded=true)"
                    value={googleFormUrl}
                    onChange={(e) => setGoogleFormUrl(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg bg-stone-900 border border-stone-600 text-white placeholder-stone-400 focus:outline-hidden"
                  />
                </div>
              )}

              {/* iframe Display Container */}
              <div className="w-full relative min-h-[520px] bg-stone-50 flex flex-col items-center justify-center p-4">
                {googleFormUrl ? (
                  <iframe
                    src={googleFormUrl}
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
                        This clean responsive iframe section is configured to seamlessly display your Google Form as soon as your URL is added. Responses will log automatically to your connected Google Sheet.
                      </p>
                    </div>

                    <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Ready to receive custom cake orders!</span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => setShowUrlInput(true)}
                        className="inline-flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-3 rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Paste Google Form Link</span>
                        <ExternalLink className="w-4 h-4" />
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
                  Meet the Baker Behind DAOS Cakes
                </h2>

                <p className="text-stone-700 text-base sm:text-lg font-normal leading-relaxed">
                  Welcome to DAOS Cakes! What started as a lifelong passion for baking and art has grown into a cherished home bakery. I am dedicated to bringing warmth and flavor to your sweetest celebrations. Every custom cake, cupcake, and delicacy is handcrafted from scratch using real butter, pure vanilla, and time-tested recipes. Whether you are celebrating a birthday, baby shower, or intimate milestone, my goal is to create a centerpiece that looks stunning and tastes unforgettable.
                </p>

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
                  DAOS Cakes
                </span>
              </div>

              <p className="text-stone-400 text-base font-serif italic max-w-sm">
                "Baking life a little sweeter, one custom cake at a time."
              </p>

              <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
                Freshly baked artisanal cakes, gourmet cupcakes, and handcrafted desserts for birthdays, showers, and memorable gatherings.
              </p>
            </div>

            {/* Social & Email Placeholders */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
                Contact & Socials
              </h4>
              
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:hello@daoscakes.com"
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Email: <strong className="font-medium text-white">hello@daoscakes.com</strong></span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span>Instagram: <strong className="font-medium text-white">@daoscakes</strong></span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <span>Facebook: <strong className="font-medium text-white">DAOS Cakes</strong></span>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
                Quick Navigation
              </h4>
              
              <ul className="space-y-2 text-sm text-stone-400">
                <li>
                  <button onClick={() => scrollToSection('menu')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Menu & Prices
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="hover:text-amber-400 transition-colors cursor-pointer">
                    How It Works
                  </button>
                </li>
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
              </ul>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <p>
              © {new Date().getFullYear()} DAOS Cakes. All rights reserved. Handcrafted with love.
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

    </div>
  );
}
