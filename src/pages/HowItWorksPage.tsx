import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import ProcessSection from '../components/ProcessSection';

export default function HowItWorksPage() {
  return (
    <div className="py-8 md:py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-800" />
          <span>Smooth &amp; Simple Process</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          How Ordering Works
        </h1>
        
        <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
          From your initial idea to the final slice, here is our step-by-step custom cake ordering and pickup process.
        </p>
      </div>

      {/* Main Process Section Component */}
      <ProcessSection onStartOrder={() => {}} />

      {/* Pickup Information & Policy Callout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">Pickup Details in Smyrna, Georgia</h3>
              <p className="text-xs text-stone-500">Convenient local pickup serving Greater Atlanta &amp; Cobb County</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-stone-700">
            <div className="space-y-2 bg-stone-50 p-5 rounded-2xl border border-stone-200/70">
              <h4 className="font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800" />
                <span>Advance Lead Time</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We recommend ordering at least <strong>1 to 2 weeks in advance</strong>. For multi-tiered or elaborate celebration designs, 3–4 weeks is strongly recommended.
              </p>
            </div>

            <div className="space-y-2 bg-stone-50 p-5 rounded-2xl border border-stone-200/70">
              <h4 className="font-bold text-stone-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800" />
                <span>Cash on Pickup</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Payment is completed in person when you inspect and collect your cake (Cash Only). We do not collect credit cards on this website.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              to="/order"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Proceed to Order Form</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
