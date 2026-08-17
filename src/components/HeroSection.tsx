import React from 'react';
import { ArrowDown, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import heroImage from '../assets/images/daos_hero_cake_1785892806355.jpg';

export default function HeroSection() {
  const scrollToOrderForm = () => {
    const orderFormElement = document.getElementById('order-form');
    if (orderFormElement) {
      orderFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-stone-50 py-12 md:py-20 lg:py-24 border-b border-amber-100/60">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Copy & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Handcrafted Home Bakery</span>
            </div>

            {/* Catchy Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
              Fresh Custom Cakes Made for Your Special Celebrations.
            </h1>

            {/* Short Subheadline */}
            <p className="text-lg sm:text-xl text-stone-700 max-w-2xl font-normal leading-relaxed">
              Baked fresh to order with premium ingredients and heartfelt care. Every layer is crafted to make your sweetest moments unforgettable.
            </p>

            {/* Feature Highlights */}
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

            {/* Main CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={scrollToOrderForm}
                className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-4 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
                id="hero-order-now-btn"
              >
                <span>Order Now</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            <p className="text-xs text-stone-500 font-sans">
              *Clicking 'Order Now' anchors directly down to our built-in order form below.
            </p>
          </div>

          {/* Right Image Display */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-300 rounded-3xl blur-md opacity-70 -z-10" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src={heroImage}
                  alt="DAOS Cakes - Artisanal Custom Cake"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-amber-100 shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                    <Heart className="w-5 h-5 fill-amber-700 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">Crafted with Love</h4>
                    <p className="text-xs text-stone-600">Custom cake orders tailored to your unique taste and theme.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
