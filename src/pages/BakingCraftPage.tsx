import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Sparkles, CheckCircle2, ShieldCheck, Heart, ChefHat, ArrowRight, Leaf, Scale } from 'lucide-react';

export default function BakingCraftPage() {
  const commitments = [
    {
      icon: Scale,
      title: 'Real Whole Ingredients',
      description: 'We bake exclusively with grade-AA sweet cream butter, unbleached flours, cage-free eggs, pure Madagascar vanilla extracts, and real fruit compotes. No artificial shortening or bulk industrial syrups.'
    },
    {
      icon: ChefHat,
      title: 'Small-Batch Artisan Method',
      description: 'Every sponge is weighed, whipped, and baked fresh for your event. We never freeze sponges in bulk or keep premade cakes sitting in freezers for weeks.'
    },
    {
      icon: ShieldCheck,
      title: 'Georgia Cottage Food Compliance',
      description: 'Operating in accordance with the Georgia Department of Agriculture Cottage Food regulations. We maintain rigorous kitchen sanitization, strict ingredient labeling, and certified food handling protocols.'
    },
    {
      icon: Leaf,
      title: 'Custom Color & Design Artistry',
      description: 'From delicate textured buttercream palette knife techniques to gold leaf application and hand-sculpted macarons, we treat every single cake as an edible work of art.'
    }
  ];

  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Award className="w-3.5 h-3.5 text-amber-800" />
          <span>Our Standards &amp; Philosophy</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          The DAOS Scratch Baking Craft
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Discover why small-batch, scratch-baked artisan cakes taste superior to commercial grocery store cakes. Our ingredients, methods, and quality pledge.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs hover:border-amber-300 transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison: Scratch vs Commercial */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center sm:text-left space-y-2">
            <h2 className="font-serif text-3xl font-bold">
              Scratch Artisan Baking vs. Commercial Supermarket Cakes
            </h2>
            <p className="text-stone-300 text-sm">
              Why our clients taste the remarkable difference from the very first bite:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 space-y-4">
              <h4 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span>DAOS Cakes Artisan Method</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>100% Real Sweet Cream Butter:</strong> Silky mouthfeel that melts at body temperature.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Cooked Swiss Meringue:</strong> Light, velvety, with 50% less sugar than powdered frostings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Fresh Real Fruit Compotes:</strong> Simmered fresh berries and pure citrus curds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Baked Fresh for Your Date:</strong> Moist sponge assembled 24–48 hours prior to pickup.</span>
                </li>
              </ul>
            </div>

            <div className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700/60 space-y-4 opacity-80">
              <h4 className="font-serif text-lg font-bold text-stone-400 flex items-center gap-2">
                <span>Typical Commercial Grocery Cakes</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Hydrogenated Vegetable Shortening:</strong> Greasy residue that coats the palate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>High Fructose Corn Syrups:</strong> Overpowering, artificial sugar burn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Preserved Bucket Fillings:</strong> Chemically stabilized with artificial colorings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Mass Frozen Sponges:</strong> Baked in bulk factories and stored for months.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cottage Food Compliance & Kitchen Care */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 p-8 sm:p-10 rounded-3xl border border-amber-200 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Georgia Cottage Food Safety &amp; Integrity
              </h3>
              <p className="text-xs text-stone-600">Local compliance you can trust</p>
            </div>
          </div>

          <p className="text-stone-700 text-sm leading-relaxed">
            DAOS Cakes operates under the Georgia Department of Agriculture Cottage Food regulations. Our dedicated kitchen follows stringent health, sanitization, and batch safety protocols. Each order is packaged in clean, food-safe bakery boxes with clear labeling and storage recommendations.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 font-medium">
              Experience the difference of scratch artisan baking
            </span>
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2"
            >
              <span>Order From Our Smyrna Bakery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
