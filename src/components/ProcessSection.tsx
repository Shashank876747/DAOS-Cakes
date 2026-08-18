import React from 'react';
import { FileText, PhoneCall, CalendarCheck, MapPin, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

interface ProcessSectionProps {
  onStartOrder?: () => void;
}

export default function ProcessSection({ onStartOrder }: ProcessSectionProps) {
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
      description: 'Collect your scratch-baked, custom cake from one of our designated community pickup points.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-800" />
            <span>Simple 4-Step Process</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            How Ordering Works
          </h2>

          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            From initial concept to your first delicious slice, we make ordering custom celebration cakes completely seamless.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-stone-50/80 rounded-3xl p-6 sm:p-7 border border-stone-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
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
        <div className="mt-12 p-6 rounded-2xl bg-stone-900 text-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-sm sm:text-base">
                Ready to reserve your celebration date?
              </p>
              <p className="text-xs text-stone-400">
                Dates fill up quickly on weekends. We suggest inquiring 2-3 weeks in advance.
              </p>
            </div>
          </div>

          <button
            onClick={onStartOrder}
            className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all whitespace-nowrap shadow-sm cursor-pointer"
          >
            Start Order Form
          </button>
        </div>

      </div>
    </section>
  );
}
