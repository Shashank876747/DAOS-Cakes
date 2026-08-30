import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, Cake, HelpCircle, FileSpreadsheet, Calculator } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-lg">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-sm">
          <Cake className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Error 404
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Page Not Found
          </h1>
          <p className="text-stone-600 text-sm leading-relaxed">
            The page you are looking for might have been moved, renamed, or is currently unavailable.
          </p>
        </div>

        <div className="space-y-2 pt-2 text-left">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block px-1">
            Quick Links
          </span>
          <div className="grid grid-cols-1 gap-2">
            <Link
              to="/"
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-900 border border-stone-200 transition-colors text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-800" />
                <span>Home Page</span>
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              to="/pricing-estimator"
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-900 border border-stone-200 transition-colors text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-800" />
                <span>Pricing &amp; Size Estimator</span>
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              to="/order"
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-900 border border-stone-200 transition-colors text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-800" />
                <span>Order Form</span>
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              to="/how-it-works"
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-900 border border-stone-200 transition-colors text-sm font-medium"
            >
              <span>How Ordering Works</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              to="/faq"
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50 hover:bg-amber-50 text-stone-800 hover:text-amber-900 border border-stone-200 transition-colors text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-800" />
                <span>Frequently Asked Questions</span>
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-3 px-6 rounded-full font-bold text-sm shadow-md transition-all inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
