import React, { useState } from 'react';
import {
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdQ7d5odCaliDzgkufvsD_hfwdhbi1meCHUyO_zMdgoLJVMwA/viewform?usp=header';

export default function OrderPage() {
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getEmbeddableUrl = (url: string, key: number) => {
    if (!url) return '';
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?embedded=true&v=${key}`;
  };

  const embeddableUrl = getEmbeddableUrl(GOOGLE_FORM_URL, refreshKey);

  const handleRefreshForm = () => {
    setIsRefreshing(true);
    setRefreshKey(Date.now());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="py-8 md:py-12 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-800" />
            <span>Google Form • Direct Sheet Sync</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            DAOS Cakes Order Form
          </h1>

          <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Complete the 4 sections below. Submissions are instantly recorded to our bakery schedule and Google spreadsheet.
          </p>
        </div>

        {/* Instructions Card */}
        <div className="bg-amber-50/80 border border-amber-200 p-5 sm:p-6 rounded-3xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-800">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <span><strong>1. Event Info:</strong> Provide your name, contact, and event date.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <span><strong>2. Cake Design:</strong> Specify flavor, frosting, and design themes.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <span><strong>3. Confirmation:</strong> We reach out to confirm pickup in Smyrna, GA.</span>
          </div>
        </div>

        {/* Direct Google Form Container */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden text-left" id="direct-embedded-google-form-card">
          
          {/* Card Header Bar */}
          <div className="bg-stone-900 text-amber-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-stone-200">
                Form Sync: <strong className="text-emerald-300">Live Recording to Google Sheets</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handleRefreshForm}
                disabled={isRefreshing}
                title="Reload Google Form"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold transition-colors border border-stone-700 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Reloading...' : 'Reload Form'}</span>
              </button>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Open form in full Google tab"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-colors"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Embedded Google Form iFrame */}
          <div className="w-full bg-stone-50 p-2 sm:p-4">
            <iframe
              key={refreshKey}
              src={embeddableUrl}
              title="DAOS Cakes Cake Order Form"
              className="w-full h-[900px] sm:h-[980px] border-0 rounded-2xl shadow-xs bg-white"
              loading="lazy"
            >
              Loading DAOS Cakes Order Form...
            </iframe>
          </div>

          {/* Help & Contact Bar */}
          <div className="bg-stone-900 text-stone-300 p-5 sm:p-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white block">Questions before submitting?</span>
                <span>Call or text us at <strong className="text-amber-300">(470) 476-1631</strong> or <strong className="text-amber-300">(678) 235-8462</strong></span>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-stone-800 sm:pl-4">
              <span className="text-amber-300 font-semibold block">Pickup: Smyrna, GA</span>
              <span className="text-stone-400">Payment: Cash on Pickup</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
