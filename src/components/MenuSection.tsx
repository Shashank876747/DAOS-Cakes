import React, { useState } from 'react';
import { Cake, Sparkles, Heart, CheckCircle2, ChevronRight, Utensils, Star, Info } from 'lucide-react';
import { SIGNATURE_CAKES, DAILY_TREATS, FLAVOR_GUIDE } from '../data';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onSelectForOrder?: (itemTitle: string) => void;
}

export default function MenuSection({ onSelectForOrder }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<'cakes' | 'treats' | 'flavors'>('cakes');
  const [selectedSponge, setSelectedSponge] = useState<string>('Madagascar Vanilla Bean');
  const [selectedFilling, setSelectedFilling] = useState<string>('Housemade Fresh Strawberry Compote');
  const [selectedFrosting, setSelectedFrosting] = useState<string>('Silky Swiss Meringue Buttercream');

  const guide = FLAVOR_GUIDE[0];

  return (
    <section id="menu" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <Cake className="w-3.5 h-3.5 text-amber-800" />
            <span>Artisanal Offerings</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Signature Menu & Flavor Guide
          </h2>

          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            Handcrafted with 100% natural ingredients, farm-fresh eggs, pure butter, and Madagascar vanilla. Every creation is tailored to your taste.
          </p>

          {/* Navigation Pill Tabs */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-full bg-stone-200/80 border border-stone-300/70 shadow-2xs">
              <button
                onClick={() => setActiveTab('cakes')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'cakes'
                    ? 'bg-amber-800 text-amber-50 shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
                id="menu-tab-cakes"
              >
                Signature Cakes ({SIGNATURE_CAKES.length})
              </button>

              <button
                onClick={() => setActiveTab('treats')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'treats'
                    ? 'bg-amber-800 text-amber-50 shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
                id="menu-tab-treats"
              >
                Daily Treats & Pastries ({DAILY_TREATS.length})
              </button>

              <button
                onClick={() => setActiveTab('flavors')}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'flavors'
                    ? 'bg-amber-800 text-amber-50 shadow-xs'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50'
                }`}
                id="menu-tab-flavors"
              >
                Flavor & Filling Explorer
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Signature Cakes Grid */}
        {activeTab === 'cakes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {SIGNATURE_CAKES.map((cake) => (
              <div
                key={cake.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    {cake.image && (
                      <img
                        src={cake.image}
                        alt={cake.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {cake.popular && (
                        <span className="bg-amber-800 text-amber-50 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-stone-900/85 backdrop-blur-xs text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-stone-700">
                      {cake.startingPrice}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {cake.name}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {cake.description}
                    </p>

                    {/* Tags */}
                    {cake.tags && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {cake.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200/70 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectForOrder?.(cake.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-amber-800 hover:text-white text-stone-800 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-stone-200 hover:border-amber-800"
                  >
                    <span>Request This Style</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Daily Treats */}
        {activeTab === 'treats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {DAILY_TREATS.map((treat) => (
              <div
                key={treat.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                      {treat.startingPrice}
                    </span>
                    {treat.popular && (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Top Rated
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    {treat.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {treat.description}
                  </p>

                  {treat.tags && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {treat.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-4 border-t border-stone-100">
                  <button
                    onClick={() => onSelectForOrder?.(treat.name)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-800 hover:text-white text-amber-900 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-amber-200 hover:border-amber-800"
                  >
                    <span>Add to Order Inquiry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Interactive Flavor & Filling Guide */}
        {activeTab === 'flavors' && (
          <div className="bg-white rounded-3xl border border-amber-200/80 shadow-md p-6 sm:p-10 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Flavor Selector Matrix */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. Sponges */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">1</span>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">Choose Your Scratch-Baked Sponge</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {guide.flavors.map((fl) => (
                      <button
                        key={fl}
                        onClick={() => setSelectedSponge(fl)}
                        className={`text-left p-3 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                          selectedSponge === fl
                            ? 'bg-amber-800 text-amber-50 border-amber-800 shadow-xs'
                            : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        {fl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Fillings */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">2</span>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">Select Gourmet Fruit Compote or Cream Filling</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {guide.fillings.map((fil) => (
                      <button
                        key={fil}
                        onClick={() => setSelectedFilling(fil)}
                        className={`text-left p-3 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                          selectedFilling === fil
                            ? 'bg-amber-800 text-amber-50 border-amber-800 shadow-xs'
                            : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        {fil}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Frostings */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">3</span>
                    <h4 className="font-serif font-bold text-stone-900 text-sm">Select Silky Buttercream Frosting</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {guide.frostings.map((fr) => (
                      <button
                        key={fr}
                        onClick={() => setSelectedFrosting(fr)}
                        className={`text-left p-3 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                          selectedFrosting === fr
                            ? 'bg-amber-800 text-amber-50 border-amber-800 shadow-xs'
                            : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        {fr}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Selected Pairing Summary Card */}
              <div className="lg:col-span-4 bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/50 rounded-2xl border border-amber-200 p-6 space-y-5">
                <div className="flex items-center gap-2 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <h4 className="font-serif font-bold text-base">Your Custom Flavor Profile</h4>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                    <span className="text-[10px] uppercase font-bold text-amber-800 block mb-0.5">Sponge Layer</span>
                    <p className="font-serif font-bold text-stone-900 text-sm">{selectedSponge}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                    <span className="text-[10px] uppercase font-bold text-amber-800 block mb-0.5">Middle Filling</span>
                    <p className="font-serif font-bold text-stone-900 text-sm">{selectedFilling}</p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200/60">
                    <span className="text-[10px] uppercase font-bold text-amber-800 block mb-0.5">Outer Buttercream</span>
                    <p className="font-serif font-bold text-stone-900 text-sm">{selectedFrosting}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onSelectForOrder?.(`${selectedSponge} with ${selectedFilling} and ${selectedFrosting}`)}
                    className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Use This Flavor in Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-stone-500 text-center mt-2">
                    Transfers directly to the order inquiry form
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
