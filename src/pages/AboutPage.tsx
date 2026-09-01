import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Heart, CheckCircle2, ChefHat, ShieldCheck, Star, UtensilsCrossed } from 'lucide-react';
import AboutSection from '../components/AboutSection';

export default function AboutPage() {
  const milestones = [
    {
      title: 'Scratch-Baked Passion',
      description: 'Every recipe was developed through hundreds of trial bakes, perfecting the balance of moisture, crumb structure, and delicate sweetness without artificial stabilizers.'
    },
    {
      title: 'Local Smyrna Heritage',
      description: 'Proudly serving Cobb County, Vinings, Marietta, and Greater Atlanta families. We take immense pride in being part of birthdays, weddings, baby showers, and milestones.'
    },
    {
      title: 'Artisan Precision',
      description: 'From velvet Swiss meringue buttercream smoothing to palette knife floral textures, gold leaf leafing, and handcrafted macarons, art meets flavor in every single piece.'
    }
  ];

  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Award className="w-3.5 h-3.5 text-amber-800" />
          <span>Our Story, Passion &amp; Craft</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          About the Baker &amp; DAOS Cakes
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Rooted in Smyrna, Georgia, DAOS Cakes is an artisanal home bakery dedicated to elevating celebrations through handcrafted scratch-baked cakes, custom decorations, and honest whole ingredients.
        </p>
      </div>

      {/* Main About Component */}
      <AboutSection />

      {/* Detailed Editorial Story Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ChefHat className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              The Baking Philosophy Behind Every Slice
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <p>
              At DAOS Cakes, baking is not an automated assembly line; it is a labor of love. What began as a dedicated pursuit of creating the perfect birthday and holiday cakes for family and friends blossomed into an artisanal home bakery trusted across Cobb County and Greater Atlanta.
            </p>
            <p>
              Many commercial bakeries cut corners by using pre-made cake mixes packed with chemical leaveners, powdered frosting full of hydrogenated vegetable shortening, and artificial fruit gels from industrial buckets. We rejected that model completely. We believe you and your guests deserve genuine gourmet quality made with fresh eggs, real European-style butter, unbleached flour, pure Madagascar vanilla beans, and scratch-cooked fruit compotes.
            </p>
            <p>
              When you order from DAOS Cakes, your cake is baked specifically for your celebration. It is never pulled from a frozen warehouse or sitting on a shelf. We take the time to whip our Swiss meringue buttercream to cloud-like perfection, carefully balance our moisture levels, and hand-craft decorative elements that turn your vision into an edible centerpiece.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Our Bakery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-800 text-amber-100 flex items-center justify-center font-bold text-xs">
                0{idx + 1}
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base">{m.title}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Georgia Cottage Standards & Sourcing Guarantee */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/80 p-8 sm:p-12 rounded-3xl border border-amber-200 shadow-xs space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-800 text-amber-100 mb-2">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Dedicated to Unforgettable Celebrations
          </h3>
          <p className="text-stone-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every layer of cake is baked from scratch right before pickup. We maintain strict sanitization, food safety practices under Georgia Cottage Food regulations, and personalized customer care for every event.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Order Your Custom Cake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/flavor-guide"
              className="bg-white hover:bg-amber-100/50 text-stone-800 border border-stone-300 px-6 py-3.5 rounded-full font-semibold text-sm transition-all"
            >
              <span>Explore Flavor Compendium</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

