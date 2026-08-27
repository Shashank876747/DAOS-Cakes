import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import FaqSection from '../components/FaqSection';

export default function FaqPage() {
  return (
    <div className="py-8 md:py-12 space-y-12">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <HelpCircle className="w-3.5 h-3.5 text-amber-800" />
          <span>Got Questions?</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Frequently Asked Questions
        </h1>

        <p className="text-lg text-stone-700 max-w-2xl mx-auto leading-relaxed">
          Clear answers about ordering lead times, custom decorations, pickup details, and cake preservation.
        </p>
      </div>

      {/* Main FAQ Component */}
      <FaqSection />

      {/* Still Have Questions Box */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Have a question not answered here?
          </h3>
          <p className="text-stone-600 text-sm max-w-lg mx-auto leading-relaxed">
            We are always happy to answer questions regarding custom tier structures, dietary options, or pickup times.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-3 rounded-full font-bold text-sm shadow-xs transition-all inline-flex items-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/order"
              className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-full font-semibold text-sm border border-stone-300 transition-all"
            >
              <span>Open Order Form</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
