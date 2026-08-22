import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowDown, Info, ShieldCheck, Cake, Users } from 'lucide-react';

interface CakeEstimatorProps {
  onApplyToOrder?: (estimateDetails: string) => void;
}

interface TierOption {
  id: string;
  name: string;
  servings: string;
  guestCount: number;
  basePrice: number;
  recommended: string;
}

const TIER_OPTIONS: TierOption[] = [
  {
    id: 'single-6',
    name: '6" Round Single Tier (3 tall layers)',
    servings: '10 - 12 Servings',
    guestCount: 12,
    basePrice: 65,
    recommended: 'Intimate birthdays, dinner parties'
  },
  {
    id: 'single-8',
    name: '8" Round Single Tier (3 tall layers)',
    servings: '20 - 24 Servings',
    guestCount: 24,
    basePrice: 85,
    recommended: 'Family celebrations, milestone birthdays'
  },
  {
    id: 'two-tier',
    name: '2-Tier Celebration Cake (6" + 8")',
    servings: '35 - 40 Servings',
    guestCount: 40,
    basePrice: 145,
    recommended: 'Baby showers, bridal showers, engagements'
  },
  {
    id: 'three-tier',
    name: '3-Tier Luxury Cake (6" + 8" + 10")',
    servings: '65 - 75 Servings',
    guestCount: 75,
    basePrice: 245,
    recommended: 'Weddings, large banquets, grand milestones'
  }
];

const ART_STYLES = [
  { id: 'classic', name: 'Classic Smooth / Textured Knife Finish', price: 0, desc: 'Clean elegant finish with matching bead borders' },
  { id: 'floral', name: 'Hand-Piped Buttercream Florals', price: 20, desc: 'Dimensional hand-piped blossom petals in event palette' },
  { id: 'drip-macarons', name: 'Belgian Chocolate Drip & Macaron Crown', price: 25, desc: 'Rich drip topped with fresh berries & macarons' },
  { id: 'luxury-gold', name: 'Luxury 24K Gold Leaf & Organic Blooms', price: 35, desc: 'Opulent metallic leafing with edible botanical styling' }
];

const FILLING_UPGRADES = [
  { id: 'standard', name: 'Classic Silky Swiss Buttercream Layer', price: 0 },
  { id: 'strawberry', name: 'Housemade Fresh Strawberry Compote', price: 10 },
  { id: 'lemon-curd', name: 'Florida Lemon Curd & Cream', price: 12 },
  { id: 'caramel-ganache', name: 'Flaked Sea Salt Caramel & Belgian Ganache', price: 12 },
  { id: 'raspberry', name: 'Wild Raspberry Fruit Reduction', price: 10 }
];

export default function CakeEstimatorSection({ onApplyToOrder }: CakeEstimatorProps) {
  const [selectedTier, setSelectedTier] = useState<string>('single-8');
  const [selectedArt, setSelectedArt] = useState<string>('classic');
  const [selectedFilling, setSelectedFilling] = useState<string>('strawberry');
  const [addCupcakes, setAddCupcakes] = useState<boolean>(false);
  const [addMacarons, setAddMacarons] = useState<boolean>(false);

  const currentTier = TIER_OPTIONS.find((t) => t.id === selectedTier) || TIER_OPTIONS[1];
  const currentArt = ART_STYLES.find((a) => a.id === selectedArt) || ART_STYLES[0];
  const currentFilling = FILLING_UPGRADES.find((f) => f.id === selectedFilling) || FILLING_UPGRADES[0];

  const cupcakesCost = addCupcakes ? 36 : 0;
  const macaronsCost = addMacarons ? 28 : 0;

  const estimatedTotal = currentTier.basePrice + currentArt.price + currentFilling.price + cupcakesCost + macaronsCost;
  const pricePerServing = (estimatedTotal / currentTier.guestCount).toFixed(2);

  const handleTransfer = () => {
    const summary = `Cake Estimate: ${currentTier.name} (${currentTier.servings}), Style: ${currentArt.name}, Filling: ${currentFilling.name}${addCupcakes ? ' + 1 Dozen Cupcakes' : ''}${addMacarons ? ' + Box of Macarons' : ''}. Est Total: ~$${estimatedTotal}`;
    if (onApplyToOrder) {
      onApplyToOrder(summary);
    }
  };

  return (
    <section id="estimator" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <Calculator className="w-3.5 h-3.5 text-amber-800" />
            <span>Interactive Tool</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Custom Cake Price & Size Estimator
          </h2>

          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            Configure your celebration size, tier dimensions, and artisanal decor finishes for an instant estimated quote before submitting your inquiry.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-xs">
            
            {/* Step 1: Cake Size & Servings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans">1</span>
                  Select Cake Size & Servings
                </label>
                <span className="text-xs text-stone-500 font-medium">Standard 3-Layer Tiers</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIER_OPTIONS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedTier === tier.id
                        ? 'border-amber-800 bg-amber-50/70 shadow-2xs ring-2 ring-amber-800/20'
                        : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-serif font-bold text-sm text-stone-900">
                          {tier.name}
                        </span>
                        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
                          ${tier.basePrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                        <Users className="w-3.5 h-3.5 text-amber-800" />
                        <span>{tier.servings}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-2 font-normal">
                      {tier.recommended}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Decorative Art Style */}
            <div className="space-y-3 pt-2">
              <label className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans">2</span>
                Choose Design & Decorative Art Style
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ART_STYLES.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArt(art.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedArt === art.id
                        ? 'border-amber-800 bg-amber-50/70 shadow-2xs ring-2 ring-amber-800/20'
                        : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-serif font-bold text-sm text-stone-900">{art.name}</span>
                      <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full shrink-0">
                        {art.price === 0 ? 'Included' : `+$${art.price}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-normal">{art.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Gourmet Filling Upgrade */}
            <div className="space-y-3 pt-2">
              <label className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans">3</span>
                Select Gourmet Inner Layer Filling
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FILLING_UPGRADES.map((filling) => (
                  <button
                    key={filling.id}
                    onClick={() => setSelectedFilling(filling.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                      selectedFilling === filling.id
                        ? 'border-amber-800 bg-amber-50/70 text-amber-950 font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-amber-300'
                    }`}
                  >
                    <span>{filling.name}</span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {filling.price === 0 ? 'Included' : `+$${filling.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Optional Dessert Table Add-ons */}
            <div className="space-y-3 pt-2">
              <label className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-800 text-white text-xs flex items-center justify-center font-sans">4</span>
                Optional Dessert Table Add-Ons
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    addCupcakes ? 'border-amber-800 bg-amber-50/60' : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addCupcakes}
                      onChange={(e) => setAddCupcakes(e.target.checked)}
                      className="w-4 h-4 text-amber-800 rounded-sm focus:ring-amber-800"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900">1 Dozen Matching Cupcakes</p>
                      <p className="text-[11px] text-stone-500">Decorated to complement your cake</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-900">+$36</span>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    addMacarons ? 'border-amber-800 bg-amber-50/60' : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={addMacarons}
                      onChange={(e) => setAddMacarons(e.target.checked)}
                      className="w-4 h-4 text-amber-800 rounded-sm focus:ring-amber-800"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900">French Macaron Box (12 pcs)</p>
                      <p className="text-[11px] text-stone-500">Naturally gluten-free almond shells</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-900">+$28</span>
                </label>
              </div>
            </div>

          </div>

          {/* Estimate Summary Sticky Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800 space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Live Calculation</span>
                <h3 className="font-serif text-xl font-bold text-white">Estimated Quote</h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-800/60 text-amber-300 flex items-center justify-center">
                <Cake className="w-5 h-5" />
              </div>
            </div>

            {/* Selected Configuration Summary */}
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex justify-between items-start pb-2 border-b border-stone-800/60">
                <div>
                  <p className="font-semibold text-white">{currentTier.name}</p>
                  <p className="text-[11px] text-stone-400">{currentTier.servings}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Design Finish</span>
                <span className="font-semibold text-white">{currentArt.name}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                <span className="text-stone-400">Filling Option</span>
                <span className="font-semibold text-white">{currentFilling.name}</span>
              </div>

              {addCupcakes && (
                <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                  <span className="text-stone-400">Add-on</span>
                  <span className="font-semibold text-white">1 Dozen Custom Cupcakes</span>
                </div>
              )}

              {addMacarons && (
                <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                  <span className="text-stone-400">Add-on</span>
                  <span className="font-semibold text-white">French Macaron Box (12)</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="pt-2">
              <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/80 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-stone-300">Estimated Total:</span>
                  <span className="font-serif text-3xl font-bold text-amber-400">
                    ${estimatedTotal}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-stone-400">
                  <span>Approx. ~${pricePerServing} per guest</span>
                  <span className="text-emerald-400 font-medium">50% Deposit: ${Math.round(estimatedTotal / 2)}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleTransfer}
                className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Transfer Estimate to Order Form</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-stone-400 text-center leading-relaxed">
                *Final invoice confirmed upon design consultation and pickup scheduling.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
