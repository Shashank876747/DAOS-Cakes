import React, { useState, useEffect, useMemo } from 'react';
import {
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  PhoneCall,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  GOOGLE_FORM_VIEW_URL,
  buildPrefilledGoogleFormUrl,
  GoogleFormOrderPayload
} from '../lib/googleFormService';

export default function OrderPage() {
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [copiedSpecs, setCopiedSpecs] = useState<boolean>(false);
  const [syncedOrder, setSyncedOrder] = useState<any>(null);

  // Load estimator specifications from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('daos_estimated_order');
      if (saved) {
        setSyncedOrder(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }

    const handleEstimatorSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setSyncedOrder(customEvent.detail);
      }
    };

    window.addEventListener('daos_estimator_sync', handleEstimatorSync);
    window.addEventListener('daos_form_sync', handleEstimatorSync);

    return () => {
      window.removeEventListener('daos_estimator_sync', handleEstimatorSync);
      window.removeEventListener('daos_form_sync', handleEstimatorSync);
    };
  }, []);

  // Build the live pre-filled Google Form embed & direct URL
  const { embeddedGoogleFormUrl, directPrefilledUrl } = useMemo(() => {
    const payload: GoogleFormOrderPayload = {};

    if (syncedOrder) {
      if (syncedOrder.cakeSize) payload.cakeSize = syncedOrder.cakeSize;
      if (syncedOrder.cakeType) {
        payload.cakeType = syncedOrder.cakeType === 'Other' && syncedOrder.cakeTypeOther
          ? syncedOrder.cakeTypeOther
          : syncedOrder.cakeType;
      }
      if (syncedOrder.icingType) {
        payload.icingType = syncedOrder.icingType === 'Other' && syncedOrder.icingTypeOther
          ? syncedOrder.icingTypeOther
          : syncedOrder.icingType;
      }
      if (syncedOrder.occasion) {
        payload.occasion = syncedOrder.occasion === 'Other' && syncedOrder.occasionOther
          ? syncedOrder.occasionOther
          : syncedOrder.occasion;
      }
      if (syncedOrder.colors) payload.colors = syncedOrder.colors;
      if (syncedOrder.wordsOnCake) payload.wordsOnCake = syncedOrder.wordsOnCake;
    }

    const embedded = buildPrefilledGoogleFormUrl(payload, { embedded: true });
    const direct = buildPrefilledGoogleFormUrl(payload, { embedded: false });

    return {
      embeddedGoogleFormUrl: embedded,
      directPrefilledUrl: direct
    };
  }, [syncedOrder]);

  const handleRefreshForm = () => {
    setIsRefreshing(true);
    setRefreshKey(Date.now());
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleCopySpecs = () => {
    if (!syncedOrder) return;
    const text = `--- DAOS CAKES ORDER SPECIFICATIONS (ESTIMATOR SYNC) ---
Cake Size: ${syncedOrder.cakeSize || '8 INCH'}
Sponge Flavor: ${syncedOrder.cakeType || 'Vanilla Sponge'}${syncedOrder.cakeTypeOther ? ` (${syncedOrder.cakeTypeOther})` : ''}
Frosting / Icing: ${syncedOrder.icingType || 'American Buttercream'}${syncedOrder.icingTypeOther ? ` (${syncedOrder.icingTypeOther})` : ''}
Occasion: ${syncedOrder.occasion || 'Birthday'}${syncedOrder.occasionOther ? ` (${syncedOrder.occasionOther})` : ''}
Color Palette / Theme: ${syncedOrder.colors || 'Custom Palette'}
Words on Cake / Inscription: ${syncedOrder.wordsOnCake || 'None specified'}
${syncedOrder.filling ? `Gourmet Filling: ${syncedOrder.filling}\n` : ''}${syncedOrder.addCupcakes ? `Add-On: 1 Dozen Matching Cupcakes\n` : ''}${syncedOrder.addMacarons ? `Add-On: 1 Dozen French Macarons\n` : ''}Estimated Total: $${syncedOrder.estimatedTotal || '85'}
Estimated 50% Deposit: $${syncedOrder.depositAmount || '43'}
Pickup: Smyrna, GA`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSpecs(true);
      setTimeout(() => setCopiedSpecs(false), 2500);
    });
  };

  return (
    <div className="py-8 md:py-12 bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
            <Zap className="w-3.5 h-3.5 text-amber-800" />
            <span>Live Pre-Filled Google Form Sync</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Order Your Custom Cake
          </h1>

          <p className="text-stone-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Your customized choices from the Pricing Estimator are automatically pre-filled in the official Google Form below.
          </p>

          {/* Planning Tools Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              to="/pricing-estimator"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-stone-800 hover:text-amber-900 border border-amber-200 text-xs font-bold shadow-2xs hover:bg-amber-50 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-800" />
              <span>Modify in Price Estimator</span>
              <ArrowRight className="w-3 h-3 text-stone-400" />
            </Link>

            <a
              href={directPrefilledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>Open Pre-Filled Google Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Estimator Sync Banner */}
        {syncedOrder && (
          <div className="bg-stone-900 text-white p-5 sm:p-6 rounded-3xl border border-stone-800 shadow-lg text-left animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <h4 className="font-serif text-lg font-bold text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Price Estimator Choices Pre-Filled into Google Form</span>
                  </h4>
                  <p className="text-xs text-stone-400">
                    Sponge, size, frosting, occasion, colors & inscription are loaded into the fields below:
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={directPrefilledUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-xs"
                >
                  <span>Open Pre-Filled Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopySpecs}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
                    copiedSpecs
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700'
                  }`}
                >
                  {copiedSpecs ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSpecs ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
              <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                <span className="text-[10px] text-stone-400 block uppercase font-bold">Size (Pre-filled)</span>
                <span className="font-semibold text-stone-100">{syncedOrder.cakeSize || '8 INCH'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                <span className="text-[10px] text-stone-400 block uppercase font-bold">Flavor (Pre-filled)</span>
                <span className="font-semibold text-stone-100">{syncedOrder.cakeType || 'Vanilla Sponge'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                <span className="text-[10px] text-stone-400 block uppercase font-bold">Frosting (Pre-filled)</span>
                <span className="font-semibold text-stone-100">{syncedOrder.icingType || 'Buttercream'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-800/80 border border-stone-700/60">
                <span className="text-[10px] text-stone-400 block uppercase font-bold">Est. Quote</span>
                <span className="font-bold text-amber-300">${syncedOrder.estimatedTotal || '85'}</span>
              </div>
            </div>

            {(syncedOrder.colors || syncedOrder.wordsOnCake) && (
              <div className="mt-3 pt-3 border-t border-stone-800/80 flex flex-wrap items-center gap-4 text-xs text-stone-300">
                {syncedOrder.colors && (
                  <span>Palette: <strong className="text-white">"{syncedOrder.colors}"</strong></span>
                )}
                {syncedOrder.wordsOnCake && (
                  <span>Writing: <strong className="text-white">"{syncedOrder.wordsOnCake}"</strong></span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Embedded Google Form Card */}
        <div className="bg-white rounded-3xl border border-amber-200 shadow-xl overflow-hidden text-left" id="direct-embedded-google-form-card">
          
          {/* Card Header Bar */}
          <div className="bg-stone-900 text-amber-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-stone-200">
                Google Form: <strong className="text-emerald-300">Pre-Filled with Price Estimator Data</strong>
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
                href={directPrefilledUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Open pre-filled form in full Google tab"
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
              key={`${refreshKey}-${embeddedGoogleFormUrl}`}
              src={embeddedGoogleFormUrl}
              title="DAOS Cakes Official Google Form"
              className="w-full h-[900px] sm:h-[1000px] border-0 rounded-2xl shadow-xs bg-white"
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
                <span>Call or text us at <strong className="text-amber-300">(470) 676-1631</strong> or <strong className="text-amber-300">(678) 235-0482</strong></span>
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



