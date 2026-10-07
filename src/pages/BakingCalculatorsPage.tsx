import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Scale, Layers, Droplets, ArrowRight, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface PanSpec {
  id: string;
  label: string;
  areaSqIn: number;
  recommendedBatterGrams: number;
  bakeTempF: number;
  bakeTimeMin: string;
}

const PAN_SPECS: PanSpec[] = [
  { id: 'round-6', label: '6-Inch Round Pan (2" deep)', areaSqIn: 28.27, recommendedBatterGrams: 380, bakeTempF: 335, bakeTimeMin: '26 – 30 mins' },
  { id: 'round-8', label: '8-Inch Round Pan (2" deep)', areaSqIn: 50.27, recommendedBatterGrams: 675, bakeTempF: 335, bakeTimeMin: '30 – 35 mins' },
  { id: 'round-9', label: '9-Inch Round Pan (2" deep)', areaSqIn: 63.62, recommendedBatterGrams: 850, bakeTempF: 335, bakeTimeMin: '32 – 37 mins' },
  { id: 'round-10', label: '10-Inch Round Pan (2" deep)', areaSqIn: 78.54, recommendedBatterGrams: 1050, bakeTempF: 325, bakeTimeMin: '36 – 42 mins' },
  { id: 'round-12', label: '12-Inch Round Pan (2" deep)', areaSqIn: 113.10, recommendedBatterGrams: 1510, bakeTempF: 325, bakeTimeMin: '40 – 48 mins' },
  { id: 'square-8', label: '8×8-Inch Square Pan', areaSqIn: 64.0, recommendedBatterGrams: 860, bakeTempF: 335, bakeTimeMin: '32 – 36 mins' },
  { id: 'rect-9x13', label: '9×13-Inch Quarter Sheet Pan', areaSqIn: 117.0, recommendedBatterGrams: 1560, bakeTempF: 335, bakeTimeMin: '34 – 40 mins' }
];

export default function BakingCalculatorsPage() {
  // Tool 1: Cake Pan Converter State
  const [sourcePanId, setSourcePanId] = useState<string>('round-8');
  const [sourcePanCount, setSourcePanCount] = useState<number>(3);
  const [targetPanId, setTargetPanId] = useState<string>('round-6');
  const [targetPanCount, setTargetPanCount] = useState<number>(3);

  // Tool 2: Baker's Percentage Formulator State
  const [flourGrams, setFlourGrams] = useState<number>(400);
  const [spongeStyle, setSpongeStyle] = useState<'vanilla' | 'chocolate' | 'redvelvet'>('vanilla');

  // Tool 3: Ganache & Buttercream Emulsion Calculator State
  const [chocolateType, setChocolateType] = useState<'dark' | 'milk' | 'white'>('dark');
  const [ganacheUse, setGanacheUse] = useState<'drip' | 'filling' | 'coat'>('drip');
  const [totalGanacheGrams, setTotalGanacheGrams] = useState<number>(600);

  // Calculations for Tool 1
  const sourcePan = PAN_SPECS.find((p) => p.id === sourcePanId) || PAN_SPECS[1];
  const targetPan = PAN_SPECS.find((p) => p.id === targetPanId) || PAN_SPECS[0];
  const totalSourceArea = sourcePan.areaSqIn * sourcePanCount;
  const totalTargetArea = targetPan.areaSqIn * targetPanCount;
  const scalingMultiplier = Number((totalTargetArea / totalSourceArea).toFixed(2));
  const totalTargetBatterGrams = Math.round(targetPan.recommendedBatterGrams * targetPanCount);

  // Calculations for Tool 2 (Baker's Percentages relative to Flour = 100%)
  const formulaRatios = {
    vanilla: {
      name: 'Madagascar Vanilla Bean Velvet Sponge',
      sugar: 0.95,
      butter: 0.72,
      eggs: 0.65,
      buttermilk: 0.78,
      bakingPowder: 0.04,
      salt: 0.015,
      vanillaExtract: 0.035,
      cocoa: 0
    },
    chocolate: {
      name: 'Belgian Dark Chocolate Fudge Sponge',
      sugar: 1.15,
      butter: 0.60,
      eggs: 0.70,
      buttermilk: 0.95,
      bakingPowder: 0.035,
      salt: 0.018,
      vanillaExtract: 0.03,
      cocoa: 0.28
    },
    redvelvet: {
      name: 'Authentic Southern Red Velvet Sponge',
      sugar: 1.0,
      butter: 0.68,
      eggs: 0.62,
      buttermilk: 0.85,
      bakingPowder: 0.03,
      salt: 0.015,
      vanillaExtract: 0.03,
      cocoa: 0.065
    }
  }[spongeStyle];

  // Calculations for Tool 3 (Ganache Ratios)
  const ganacheRatioMatrix = {
    dark: { drip: 1.25, filling: 1.0, coat: 2.0, label: 'Dark Couverture Chocolate (54%–64%)' },
    milk: { drip: 2.0, filling: 1.5, coat: 2.5, label: 'Milk Couverture Chocolate (33%–38%)' },
    white: { drip: 2.5, filling: 2.0, coat: 3.0, label: 'White Couverture Chocolate (28%–32%)' }
  }[chocolateType];

  const activeRatio = ganacheRatioMatrix[ganacheUse];
  const creamGrams = Math.round(totalGanacheGrams / (activeRatio + 1));
  const chocolateGrams = totalGanacheGrams - creamGrams;

  return (
    <div className="py-10 md:py-16 space-y-16 bg-stone-50 min-h-screen">
      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Calculator className="w-3.5 h-3.5 text-amber-800" />
          <span>Precision Pastry Formulation Tools</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          Interactive Baker&apos;s Calculators
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed">
          Professional pastry kitchen calculators for converting cake pan surface areas, scaling scratch recipes via Baker&apos;s Percentages, and formulating exact chocolate-to-cream ganache emulsions in grams.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* TOOL 1: CAKE PAN VOLUME & SURFACE AREA SCALING CALCULATOR */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-stone-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Calculator #1 • Geometric Surface Area ($A = \pi r^2$)
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 flex items-center gap-2.5">
                <Layers className="w-6 h-6 text-amber-800" />
                <span>Cake Pan Size &amp; Batter Scaling Converter</span>
              </h2>
            </div>
            <span className="text-xs bg-stone-100 text-stone-700 px-3.5 py-1.5 rounded-full font-semibold self-start">
              Constant 2-Inch Layer Depth
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Source Pan */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h3 className="font-serif font-bold text-stone-900 text-base">Original Recipe Pan Size</h3>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-stone-600">Pan Dimension</label>
                  <select
                    value={sourcePanId}
                    onChange={(e) => setSourcePanId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-stone-300 text-sm font-medium text-stone-900"
                  >
                    {PAN_SPECS.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-stone-600">Number of Layers</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={sourcePanCount}
                    onChange={(e) => setSourcePanCount(Math.max(1, Math.min(6, Number(e.target.value) || 1)))}
                    className="w-full p-3 rounded-xl bg-white border border-stone-300 text-sm font-bold text-stone-900"
                  />
                </div>
                <div className="text-xs text-stone-500 pt-1">
                  Total Original Surface Area: <strong>{totalSourceArea.toFixed(1)} sq. in.</strong>
                </div>
              </div>

              {/* Target Pan */}
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-4">
                <h3 className="font-serif font-bold text-stone-900 text-base">Target Baking Pan Size</h3>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-amber-900">Target Pan Dimension</label>
                  <select
                    value={targetPanId}
                    onChange={(e) => setTargetPanId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-amber-300 text-sm font-medium text-stone-900"
                  >
                    {PAN_SPECS.map((p) => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase text-amber-900">Number of Target Layers</label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={targetPanCount}
                    onChange={(e) => setTargetPanCount(Math.max(1, Math.min(6, Number(e.target.value) || 1)))}
                    className="w-full p-3 rounded-xl bg-white border border-amber-300 text-sm font-bold text-stone-900"
                  />
                </div>
                <div className="text-xs text-amber-900 pt-1">
                  Total Target Surface Area: <strong>{totalTargetArea.toFixed(1)} sq. in.</strong>
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="lg:col-span-5 bg-stone-900 text-stone-100 p-7 rounded-3xl border border-stone-800 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Recipe Scaling Output
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                  {scalingMultiplier}×
                </span>
                <span className="text-sm text-stone-300">Multiply all original recipe weights by {scalingMultiplier}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-800 text-xs">
                <div className="bg-stone-800/90 p-3.5 rounded-xl">
                  <span className="text-stone-400 block">Target Batter per Pan:</span>
                  <strong className="text-base text-amber-300">{targetPan.recommendedBatterGrams}g</strong>
                </div>
                <div className="bg-stone-800/90 p-3.5 rounded-xl">
                  <span className="text-stone-400 block">Total Batter ({targetPanCount} pans):</span>
                  <strong className="text-base text-amber-300">{totalTargetBatterGrams}g</strong>
                </div>
                <div className="bg-stone-800/90 p-3.5 rounded-xl">
                  <span className="text-stone-400 block">Recommended Oven Temp:</span>
                  <strong className="text-sm text-white">{targetPan.bakeTempF}°F ({Math.round((targetPan.bakeTempF - 32) * 5 / 9)}°C)</strong>
                </div>
                <div className="bg-stone-800/90 p-3.5 rounded-xl">
                  <span className="text-stone-400 block">Estimated Bake Window:</span>
                  <strong className="text-sm text-white">{targetPan.bakeTimeMin}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOOL 2: BAKER'S PERCENTAGE SCRATCH RECIPE FORMULATOR */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-stone-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Calculator #2 • Professional Baker&apos;s Percentage System (Flour = 100%)
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 flex items-center gap-2.5">
                <Scale className="w-6 h-6 text-amber-800" />
                <span>Scratch Sponge Weight Formulator</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-5 bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-stone-700">
                  1. Select Artisanal Sponge Architecture
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'vanilla', label: 'Madagascar Vanilla Bean Velvet' },
                    { id: 'chocolate', label: 'Belgian Dark Chocolate Fudge' },
                    { id: 'redvelvet', label: 'Southern Cultured Red Velvet' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSpongeStyle(opt.id as 'vanilla' | 'chocolate' | 'redvelvet')}
                      className={`p-3 rounded-xl text-left text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        spongeStyle === opt.id
                          ? 'bg-amber-800 text-white border-amber-800'
                          : 'bg-white text-stone-800 border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-stone-700">
                  2. Enter Base Cake Flour Weight (Grams = 100%)
                </label>
                <input
                  type="number"
                  min={100}
                  max={5000}
                  step={25}
                  value={flourGrams}
                  onChange={(e) => setFlourGrams(Math.max(100, Math.min(5000, Number(e.target.value) || 100)))}
                  className="w-full p-3.5 rounded-xl bg-white border border-stone-300 text-base font-bold text-stone-900"
                />
                <p className="text-xs text-stone-500">
                  Tip: 400g cake flour yields roughly three 8-inch layers (~1,850g total batter).
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-900 text-amber-50">
                    <th className="p-3.5 font-bold">Ingredient</th>
                    <th className="p-3.5 font-bold">Baker&apos;s %</th>
                    <th className="p-3.5 font-bold">Exact Weight (Grams)</th>
                    <th className="p-3.5 font-bold">Ounces (oz)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 bg-white">
                  <tr>
                    <td className="p-3.5 font-bold text-stone-900">Soft Winter Wheat Cake Flour</td>
                    <td className="p-3.5 text-amber-800 font-mono font-bold">100.0%</td>
                    <td className="p-3.5 font-bold text-stone-900">{flourGrams} g</td>
                    <td className="p-3.5 text-stone-600">{(flourGrams * 0.035274).toFixed(1)} oz</td>
                  </tr>
                  <tr className="bg-stone-50/70">
                    <td className="p-3.5 font-bold text-stone-900">Superfine Cane Sugar</td>
                    <td className="p-3.5 text-amber-800 font-mono font-bold">{(formulaRatios.sugar * 100).toFixed(1)}%</td>
                    <td className="p-3.5 font-bold text-stone-900">{Math.round(flourGrams * formulaRatios.sugar)} g</td>
                    <td className="p-3.5 text-stone-600">{(flourGrams * formulaRatios.sugar * 0.035274).toFixed(1)} oz</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-stone-900">Unsalted Sweet Cream Butter (68°F)</td>
                    <td className="p-3.5 text-amber-800 font-mono font-bold">{(formulaRatios.butter * 100).toFixed(1)}%</td>
                    <td className="p-3.5 font-bold text-stone-900">{Math.round(flourGrams * formulaRatios.butter)} g</td>
                    <td className="p-3.5 text-stone-600">{(flourGrams * formulaRatios.butter * 0.035274).toFixed(1)} oz</td>
                  </tr>
                  <tr className="bg-stone-50/70">
                    <td className="p-3.5 font-bold text-stone-900">Whole Cage-Free Eggs (Out of Shell)</td>
                    <td className="p-3.5 text-amber-800 font-mono font-bold">{(formulaRatios.eggs * 100).toFixed(1)}%</td>
                    <td className="p-3.5 font-bold text-stone-900">
                      {Math.round(flourGrams * formulaRatios.eggs)} g (~{Math.max(1, Math.round((flourGrams * formulaRatios.eggs) / 50))} large eggs)
                    </td>
                    <td className="p-3.5 text-stone-600">{(flourGrams * formulaRatios.eggs * 0.035274).toFixed(1)} oz</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-stone-900">Cultured Whole Buttermilk (Room Temp)</td>
                    <td className="p-3.5 text-amber-800 font-mono font-bold">{(formulaRatios.buttermilk * 100).toFixed(1)}%</td>
                    <td className="p-3.5 font-bold text-stone-900">{Math.round(flourGrams * formulaRatios.buttermilk)} g</td>
                    <td className="p-3.5 text-stone-600">{(flourGrams * formulaRatios.buttermilk * 0.035274).toFixed(1)} oz</td>
                  </tr>
                  {formulaRatios.cocoa > 0 && (
                    <tr className="bg-amber-50/50">
                      <td className="p-3.5 font-bold text-stone-900">Artisanal Unsweetened Cocoa Powder</td>
                      <td className="p-3.5 text-amber-800 font-mono font-bold">{(formulaRatios.cocoa * 100).toFixed(1)}%</td>
                      <td className="p-3.5 font-bold text-stone-900">{Math.round(flourGrams * formulaRatios.cocoa)} g</td>
                      <td className="p-3.5 text-stone-600">{(flourGrams * formulaRatios.cocoa * 0.035274).toFixed(1)} oz</td>
                    </tr>
                  )}
                  <tr className="bg-stone-50/70">
                    <td className="p-3.5 font-bold text-stone-900">Double-Acting Baking Powder</td>
                    <td className="p-3.5 text-amber-800 font-mono font-bold">{(formulaRatios.bakingPowder * 100).toFixed(1)}%</td>
                    <td className="p-3.5 font-bold text-stone-900">{(flourGrams * formulaRatios.bakingPowder).toFixed(1)} g</td>
                    <td className="p-3.5 text-stone-600">—</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-stone-900">Fine Sea Salt &amp; Pure Vanilla Extract</td>
                    <td className="p-3.5 text-amber-800 font-mono font-bold">5.0% combined</td>
                    <td className="p-3.5 font-bold text-stone-900">
                      {(flourGrams * formulaRatios.salt).toFixed(1)}g salt + {Math.round(flourGrams * formulaRatios.vanillaExtract)}g vanilla
                    </td>
                    <td className="p-3.5 text-stone-600">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* TOOL 3: CHOCOLATE GANACHE EMULSION RATIO CALCULATOR */}
        <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-stone-200 pb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Calculator #3 • Couverture Cacao-to-Cream Emulsion Math
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 flex items-center gap-2.5 mt-1">
              <Droplets className="w-6 h-6 text-amber-800" />
              <span>Chocolate Ganache Drip, Filling &amp; Coating Calculator</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-stone-700">Chocolate Type</label>
                <select
                  value={chocolateType}
                  onChange={(e) => setChocolateType(e.target.value as 'dark' | 'milk' | 'white')}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-sm font-bold text-stone-900"
                >
                  <option value="dark">Dark (54%–64% Cacao)</option>
                  <option value="milk">Milk (33%–38% Cacao)</option>
                  <option value="white">White Chocolate (30%)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-stone-700">Target Application</label>
                <select
                  value={ganacheUse}
                  onChange={(e) => setGanacheUse(e.target.value as 'drip' | 'filling' | 'coat')}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-sm font-bold text-stone-900"
                >
                  <option value="drip">Celebration Cake Drip</option>
                  <option value="filling">Whipped Layer Filling</option>
                  <option value="coat">Firm Structural Outer Coat</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase text-stone-700">Desired Batch (Grams)</label>
                <input
                  type="number"
                  min={150}
                  max={3000}
                  step={50}
                  value={totalGanacheGrams}
                  onChange={(e) => setTotalGanacheGrams(Math.max(150, Math.min(3000, Number(e.target.value) || 300)))}
                  className="w-full p-3 rounded-xl bg-stone-50 border border-stone-300 text-sm font-bold text-stone-900"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-amber-50 p-6 rounded-2xl border border-amber-200 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-xs font-bold uppercase text-amber-900 block">Weight Ratio</span>
                <strong className="font-serif text-2xl font-bold text-stone-900">{activeRatio} : 1</strong>
                <span className="text-[11px] text-stone-600 block">Choc : Cream</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-amber-900 block">Couverture Choc</span>
                <strong className="font-serif text-2xl font-bold text-amber-900">{chocolateGrams}g</strong>
                <span className="text-[11px] text-stone-600 block">{(chocolateGrams * 0.035274).toFixed(1)} oz</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-amber-900 block">36% Heavy Cream</span>
                <strong className="font-serif text-2xl font-bold text-amber-900">{creamGrams}g</strong>
                <span className="text-[11px] text-stone-600 block">{(creamGrams * 0.035274).toFixed(1)} oz</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
