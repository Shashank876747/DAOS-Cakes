import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Heart,
  Calendar,
  ChefHat,
  MessageSquareQuote,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import heroImage from '../assets/images/daos_hero_cake_1785892806355.jpg';
import ProcessSection from '../components/ProcessSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FaqSection from '../components/FaqSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-stone-50 py-12 md:py-20 lg:py-24 border-b border-amber-100/60">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy & CTA */}
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
                <Link
                  to="/order"
                  className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-4 rounded-full font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
                  id="hero-order-now-link"
                >
                  <span>Open Order Form</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/how-it-works"
                  className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-4 rounded-full font-semibold text-base border border-stone-300 transition-all flex items-center justify-center"
                  id="hero-how-it-works-link"
                >
                  <span>How Ordering Works</span>
                </Link>
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
                      <p className="text-xs text-stone-300">Custom orders tailored to your unique event palette.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Quick Navigation Bento Cards */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Link
              to="/how-it-works"
              className="p-6 rounded-3xl bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-800 text-amber-100 flex items-center justify-center shadow-xs">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  How Ordering Works
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Understand our 4-step ordering process, required advance lead time, and Smyrna pickup steps.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <span>View Process</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/about"
              className="p-6 rounded-3xl bg-stone-50 hover:bg-stone-100/80 border border-stone-200 transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-800 text-amber-300 flex items-center justify-center shadow-xs">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                  About the Baker
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Learn about our scratch-baking philosophy, Georgia Cottage food compliance, and local roots.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/order"
              className="p-6 rounded-3xl bg-amber-800 text-amber-50 hover:bg-amber-900 transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-700 text-amber-100 flex items-center justify-center shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Place an Order
                </h3>
                <p className="text-sm text-amber-100/90 leading-relaxed">
                  Submit your custom cake specifications directly through our live synchronized order form.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-200 uppercase tracking-wider">
                <span>Open Order Form</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. Ordering Process Section */}
      <ProcessSection />

      {/* 4. Client Testimonials */}
      <TestimonialsSection />

      {/* 5. FAQs */}
      <FaqSection />

      {/* 6. Ready to Order Banner */}
      <section className="py-16 bg-stone-900 text-stone-100 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-800">
            Let's Bake Something Special
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Ready to Design Your Custom Celebration Cake?
          </h2>
          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto">
            Spots fill quickly each week. Submit your event date and details through our order form to reserve your date on our baking schedule.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/order"
              className="bg-amber-600 hover:bg-amber-500 text-stone-950 px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all inline-flex items-center gap-2"
            >
              <span>Go to Order Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-6 py-4 rounded-full font-semibold text-base border border-stone-700 transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
