import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Car, ThermometerSnowflake, Scissors, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function CakeCareGuidePage() {
  const cuttingSteps = [
    {
      title: '1. Event / Grid Method (Maximum Servings)',
      description: 'Ideal for tiered and celebration cakes. Cut a horizontal slice 2 inches in from the outer edge. Cut that log into 1-inch x 2-inch individual finger portions. Repeat across the cake until finished.',
      yield: 'Yields 24–36 portions per 8-inch cake'
    },
    {
      title: '2. Traditional Wedge Method (Casual Gatherings)',
      description: 'Ideal for intimate birthdays and family dinners. Cut from the center outward in triangular wedges. Best for single-tier cakes serving 8–12 guests.',
      yield: 'Yields 10–14 generous portions per 8-inch cake'
    },
    {
      title: '3. Tiered Cake Disassembly',
      description: 'Before cutting multi-tier cakes, remove the top tier on its cake board first. Each tier has food-safe internal support dowels; simply remove and slice each tier level independently.',
      yield: 'Prevents tier collapse during service'
    }
  ];

  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Shield className="w-3.5 h-3.5 text-amber-800" />
          <span>Professional Masterclass</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          Cake Care, Cutting &amp; Transport Guide
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Learn how to safely transport your custom cake, manage serving temperatures in Georgia climates, cut clean event portions, and properly preserve leftover slices.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Transport Card */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              1. Vehicle Transport
            </h2>
            <div className="space-y-3 text-stone-600 text-sm leading-relaxed">
              <p>
                <strong>Always place on the flat floorboard:</strong> Never transport your cake on a slanted car seat or in someone's lap. The passenger floorboard or completely flat trunk floor is the safest location.
              </p>
              <p>
                <strong>Crank the A/C:</strong> Buttercream begins softening above 72°F. Turn your car air conditioning on cold 5 minutes before loading your cake, especially during hot Georgia summers.
              </p>
              <p>
                <strong>Drive smoothly:</strong> Avoid sudden braking, sharp turns, and highway speed bumps.
              </p>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              2. Temperature Science
            </h2>
            <div className="space-y-3 text-stone-600 text-sm leading-relaxed">
              <p>
                <strong>Refrigerate until event:</strong> Keep your cake in its sturdy box inside a refrigerator until 1.5 to 2 hours before you plan to serve.
              </p>
              <p>
                <strong>Serve at room temperature:</strong> Real butter in Swiss Meringue Buttercream hardens when chilled. Allowing the cake to come to room temperature (approx. 68°F–70°F) ensures the sponge is moist and the frosting melts like silk on the tongue.
              </p>
              <p>
                <strong>Keep out of direct sunlight:</strong> Never place your cake table in direct sun or next to heating vents.
              </p>
            </div>
          </div>

          {/* Cutting Card */}
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Scissors className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              3. Clean Cutting Method
            </h2>
            <div className="space-y-3 text-stone-600 text-sm leading-relaxed">
              <p>
                <strong>Use a hot knife:</strong> Dip a long chef's knife or slicing knife into hot water and wipe dry with a clean kitchen towel between each cut.
              </p>
              <p>
                <strong>Use the Caterer's Grid Method:</strong> For tall cakes (4+ inches high), cutting horizontal slabs and slicing into neat rectangular bars doubles your portion count.
              </p>
              <p>
                <strong>Remove decorative toppers:</strong> Safely remove acrylic charms, non-edible wire stems, and support dowels before cutting.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Step-by-Step Cutting Breakdown */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="space-y-3 text-center sm:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-semibold">
              Serving Optimization
            </div>
            <h2 className="font-serif text-3xl font-bold">
              How to Cut Round &amp; Tiered Cakes for Maximum Servings
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Traditional pie-slice wedges can result in uneven portions and falling slices on tall tiered cakes. Follow our bakery-recommended method:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cuttingSteps.map((step, idx) => (
              <div key={idx} className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700 space-y-3">
                <h4 className="font-serif font-bold text-lg text-amber-300">{step.title}</h4>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">{step.description}</p>
                <div className="text-[11px] font-semibold text-amber-400 bg-stone-900/80 px-2.5 py-1 rounded-md inline-block">
                  {step.yield}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leftover Preservation & Freezing Guide */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 rounded-3xl p-8 sm:p-10 border border-amber-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            How to Preserve &amp; Freeze Leftovers
          </h3>
          <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
            <p>
              <strong>Refrigerator Storage (Up to 5 Days):</strong> Cover exposed cut surfaces of the cake with parchment paper or plastic cling wrap to lock in moisture, then place in an airtight container or cake dome.
            </p>
            <p>
              <strong>Freezer Storage (Up to 3 Months):</strong> Slice remaining cake into individual portions. Place the slices on a baking sheet in the freezer for 1 hour until the buttercream is solid. Wrap each slice tightly in plastic cling wrap, then in heavy-duty aluminum foil.
            </p>
            <p>
              <strong>Thawing Slices:</strong> Thaw frozen slices in the refrigerator overnight, then bring to room temperature on your countertop for 30 minutes before enjoying. The flavor and crumb will taste freshly baked!
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-600 font-medium">
              Have questions about your upcoming event logistics?
            </span>
            <Link
              to="/contact"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
