import React from 'react';
import { Calendar, Sparkles, ExternalLink, Clock, Cake } from 'lucide-react';

export default function OrderFormSection() {
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
            Order Form & Date Reservation
          </h2>

          <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            We are preparing our official Google Form link to make ordering your custom cake quick and easy!
          </p>
        </div>

        {/* Placeholder Container for Google Form Link */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden text-center">
          
          {/* Header Bar */}
          <div className="bg-stone-900 text-amber-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-xs font-mono text-stone-300">
                Order Link: <strong className="text-amber-300">Link Pending</strong>
              </span>
            </div>
            <span className="text-xs text-stone-400 font-sans">
              DAOS Cakes
            </span>
          </div>

          {/* Card Body */}
          <div className="p-8 sm:p-14 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto shadow-2xs">
              <Calendar className="w-8 h-8 text-amber-800" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Custom Google Order Form Coming Soon
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Our official Google Form link will be embedded right here. You'll be able to select your event date, custom cake sizes, flavors, and design notes in just a few clicks.
              </p>
            </div>

            {/* Visual Badge Card */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 max-w-md mx-auto flex items-center justify-center gap-3 text-xs text-amber-900 font-medium">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Have your flavors and event date ready!</span>
            </div>

            <div className="pt-2">
              <button
                disabled
                className="inline-flex items-center gap-2 bg-stone-200 text-stone-500 px-8 py-3.5 rounded-full font-medium text-sm cursor-not-allowed border border-stone-300"
              >
                <span>Google Form Link Placeholder</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
