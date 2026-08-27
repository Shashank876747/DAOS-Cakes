import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Heart, CheckCircle2 } from 'lucide-react';
import AboutSection from '../components/AboutSection';

export default function AboutPage() {
  return (
    <div className="py-8 md:py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Award className="w-3.5 h-3.5 text-amber-800" />
          <span>Our Story &amp; Craft</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          About the Baker &amp; DAOS Cakes
        </h1>

        <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
          Rooted in Smyrna, Georgia, we craft boutique artisanal celebration cakes with authentic technique and scratch-baked recipes.
        </p>
      </div>

      {/* Main About Component */}
      <AboutSection />

      {/* Additional Values / Quality Assurance Box */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 p-8 sm:p-10 rounded-3xl border border-amber-200 shadow-sm space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-800 text-amber-100 mb-2">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Dedicated to Unforgettable Celebrations
          </h3>
          <p className="text-stone-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every layer of cake is baked from scratch right before pickup. We never use frozen sponges, artificial shortening, or mass-produced fillings.
          </p>
          <div className="pt-2">
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Order Your Custom Cake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
