import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calculator, ArrowRight, Sparkles, HelpCircle, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import CakeEstimatorSection from '../components/CakeEstimatorSection';

export default function EstimatorPage() {
  const navigate = useNavigate();

  const handleApplyEstimate = (_details: string) => {
    navigate('/order');
  };

  const pricingFactors = [
    {
      title: 'Structural Architecture & Doweling',
      description: 'Multi-tiered cakes require internal food-safe central doweling, tiered baseboards, and precise leveling to support upper weight securely during display.'
    },
    {
      title: 'Handcrafted Artistry & Time',
      description: 'Techniques like palette knife florals, gold leaf application, stencil work, and custom hand-sculpted macarons take multiple hours of skilled artisanal labor.'
    },
    {
      title: 'Scratch-Baked Gourmet Ingredients',
      description: 'Real Madagascar vanilla beans, Valrhona Dutch cocoa, European butter, fresh fruit reductions, and cage-free eggs cost more than commercial artificial premixes.'
    },
    {
      title: 'Custom Packaging & Protection',
      description: 'Every cake is delivered in reinforced, tall bakery packaging with non-slip base lining engineered specifically for vehicle stability.'
    }
  ];

  return (
    <div className="py-8 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Calculator className="w-3.5 h-3.5 text-amber-800" />
          <span>Interactive Planning Tool</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          Custom Cake Pricing &amp; Size Estimator
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Use our interactive calculator to estimate serving portions and starting price tiers based on cake size, tier heights, and custom decorative finishes.
        </p>
      </div>

      {/* Interactive Tool Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CakeEstimatorSection onApplyToOrder={handleApplyEstimate} />
      </div>

      {/* Editorial Guide: What Goes Into Cake Pricing */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Understanding Custom Cake Pricing
              </h2>
              <p className="text-xs text-stone-500">Transparent guidance on how we calculate our quotes</p>
            </div>
          </div>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Unlike grocery store sheet cakes made in automated commercial factories, every cake from DAOS Cakes is a bespoke, one-of-a-kind creation. Our pricing reflects four key investment factors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {pricingFactors.map((factor, fIdx) => (
              <div key={fIdx} className="bg-stone-50 p-6 rounded-2xl border border-stone-200/70 space-y-2">
                <h3 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-800" />
                  <span>{factor.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500">
              Need a personalized quote for your specific event concept?
            </span>
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Submit Design Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

