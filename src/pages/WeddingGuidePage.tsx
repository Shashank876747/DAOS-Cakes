import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Heart, Layers, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function WeddingGuidePage() {
  const timelineSteps = [
    {
      timeframe: '6–9 Months Out',
      title: 'Initial Concept & Date Reservation',
      description: 'Review portfolio styles, estimate guest counts, and secure your event date on our baking calendar with an initial retainer.'
    },
    {
      timeframe: '3–4 Months Out',
      title: 'Flavor Selection & Design Finalization',
      description: 'Select tier combinations, texture finishes (textured buttercream, semi-naked, gold leaf), and coordinate floral or topper elements.'
    },
    {
      timeframe: '4–6 Weeks Out',
      title: 'Final Guest Count & Logistics',
      description: 'Lock in final serving portions, coordinate pickup or venue delivery time window, and finalize table setup requirements.'
    },
    {
      timeframe: 'Event Day',
      title: 'Flawless Presentation & Enjoyment',
      description: 'Your fresh, scratch-baked tiered creation takes center stage for cake cutting photos and unforgettable celebration slices.'
    }
  ];

  const tierCalculations = [
    {
      tiers: '2-Tier (6" + 8")',
      servings: '35–45 Servings',
      ideal: 'Intimate Weddings, Micro-Receptions, Engagement Parties',
      dimensions: 'Approx. 9–10 inches tall'
    },
    {
      tiers: '3-Tier (6" + 8" + 10")',
      servings: '70–85 Servings',
      ideal: 'Standard Receptions, Milestone Anniversaries',
      dimensions: 'Approx. 14–16 inches tall'
    },
    {
      tiers: 'Tiered Cake + Sheet Cake Backup',
      servings: '100–175+ Servings',
      ideal: 'Large Weddings: Showstopper 2-tier display paired with kitchen sheet cakes for cost efficiency',
      dimensions: 'Custom configuration'
    }
  ];

  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Heart className="w-3.5 h-3.5 text-amber-800" />
          <span>Wedding &amp; Special Events</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          Wedding Cake Planning Guide
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Everything you need to know about planning your dream wedding or milestone celebration cake in Smyrna and Greater Atlanta. From portion calculations to design timelines.
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            The Wedding Cake Planning Timeline
          </h2>
          <p className="text-stone-600 text-sm">
            Follow this timeline to ensure a relaxed, seamless wedding cake experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-stone-200 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block">
                  {step.timeframe}
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="text-[11px] font-semibold text-stone-400">
                Phase 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Sizing & Portion Sizing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 rounded-3xl p-8 sm:p-12 border border-amber-200 space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Tier Sizing &amp; Serving Calculations
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              How big of a cake do you actually need? Here is our standard tier configuration and portion guide for wedding catering:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tierCalculations.map((tier, tIdx) => (
              <div key={tIdx} className="bg-white rounded-2xl p-6 border border-amber-100 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-amber-800">
                  <Layers className="w-5 h-5" />
                  <h4 className="font-serif text-lg font-bold text-stone-900">{tier.tiers}</h4>
                </div>
                <div className="text-sm font-bold text-amber-900 bg-amber-100/60 px-3 py-1 rounded-lg inline-block">
                  {tier.servings}
                </div>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {tier.ideal}
                </p>
                <div className="text-xs text-stone-400 pt-2 border-t border-stone-100">
                  {tier.dimensions}
                </div>
              </div>
            ))}
          </div>

          {/* Money Saving Tip */}
          <div className="bg-white p-6 rounded-2xl border border-amber-200/80 flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-stone-700">
              <h4 className="font-serif font-bold text-stone-900">Budget-Smart Pro Tip for Large Weddings</h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                If you have 150+ guests, opt for a striking 2-tier display cake for cutting photos and cake table elegance, supplemented with behind-the-scenes cutting sheet cakes. Your guests get the exact same gourmet flavor while reducing structural assembly costs!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fresh Flowers & Safety Protocols */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">Floral Food Safety &amp; Dowel Engineering</h3>
              <p className="text-xs text-stone-500">How we protect your cake and guests</p>
            </div>
          </div>

          <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
            <p>
              <strong>Food-Safe Floral Stems:</strong> Fresh flowers must never be stuck directly into cake sponge because flower shop stems contain pesticides and plant saps. We individually seal every floral stem with food-grade floral tape and posy picks before placement.
            </p>
            <p>
              <strong>Internal Structural Doweling:</strong> Every multi-tier cake is engineered with food-grade central dowels and individual tier boards. This guarantees your cake remains perfectly level and stable during display.
            </p>
            <p>
              <strong>Summer Heat Protocols:</strong> Outdoor receptions require special consideration in Georgia. We provide specific recommendations regarding tent temperature, setup timing, and shaded placement.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600 font-medium">
              Ready to discuss your wedding or event vision?
            </span>
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Submit Event Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
