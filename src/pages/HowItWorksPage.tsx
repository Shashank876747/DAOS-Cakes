import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  CheckCircle2,
  MapPin,
  FileText,
  PhoneCall,
  CalendarCheck,
  ShieldCheck
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Share Details',
      description: 'Fill out our online form with your event details, size requirements, and style inspiration.'
    },
    {
      number: '02',
      icon: PhoneCall,
      title: 'Talk Design',
      description: 'We will connect for a brief call to align on your cake concept and provide a clear quote.'
    },
    {
      number: '03',
      icon: CalendarCheck,
      title: 'Lock In Your Date',
      description: 'We confirm our availability and officially add your custom creation to our weekly baking schedule.'
    },
    {
      number: '04',
      icon: MapPin,
      title: 'Local Pickup',
      description: 'Collect your scratch-baked, custom cake from our Smyrna, GA pickup location.'
    }
  ];

  return (
    <div className="py-8 md:py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-800" />
          <span>Simple 4-Step Process</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          How Ordering Works
        </h1>
        
        <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
          From your initial idea to the final slice, here is our step-by-step custom cake ordering and pickup process.
        </p>
      </div>

      {/* 4-Step Process Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-300 relative group flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-3xl font-bold text-amber-800/40 group-hover:text-amber-800 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-800 group-hover:bg-amber-800 group-hover:text-white transition-all shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 text-[11px] font-semibold text-amber-800 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Step {step.number}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-stone-900 text-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-sm sm:text-base">
                Ready to reserve your celebration date?
              </p>
              <p className="text-xs text-stone-400">
                Dates fill up quickly on weekends. We suggest inquiring 1–2 weeks in advance.
              </p>
            </div>
          </div>

          <Link
            to="/order"
            className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all whitespace-nowrap shadow-sm"
          >
            Start Order Form
          </Link>
        </div>
      </div>

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
