import React from 'react';
import { Sparkles, ExternalLink, Cake } from 'lucide-react';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdQ7d5odCaliDzgkufvsD_hfwdhbi1meCHUyO_zMdgoLJVMwA/viewform?usp=header';

export default function OrderFormSection() {
  const embedUrl = `${GOOGLE_FORM_URL.split('?')[0]}?embedded=true`;

  return (
    <section id="order-form" className="py-16 md:py-24 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-100 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            <Cake className="w-3.5 h-3.5 text-amber-800" />
            <span>Order Form</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Cake Order Form & Date Reservation
          </h2>

          <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Fill out the order details below to reserve your date and customize your celebration cake.
          </p>
        </div>

        {/* Embedded Google Form Container */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-stone-900 text-amber-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-stone-300">
                Order System: <strong className="text-emerald-300">Google Form Live</strong>
              </span>
            </div>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* iframe */}
          <div className="p-2 sm:p-4 bg-stone-50">
            <iframe
              src={embedUrl}
              title="DAOS Cakes Google Form"
              className="w-full h-[700px] border-0 rounded-2xl shadow-xs bg-white"
              loading="lazy"
            >
              Loading Google Form...
            </iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
