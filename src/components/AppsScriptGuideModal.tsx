import React, { useState } from 'react';
import { X, Copy, Check, Code, FileSpreadsheet, Key } from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_CODE, SETUP_INSTRUCTIONS } from '../data/appsScriptCode';

interface AppsScriptGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppsScriptGuideModal({ isOpen, onClose }: AppsScriptGuideModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      
      <div className="bg-white rounded-3xl border border-amber-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-stone-900 text-amber-50 p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center font-mono font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Google Apps Script & GitHub Integration
              </h3>
              <p className="text-xs text-amber-200 font-sans">
                Automated Google Form to GitHub data.json synchronization script
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8 text-stone-800 text-sm">
          
          {/* Privacy Guarantee Note */}
          <div className="bg-amber-50 border-l-4 border-amber-800 p-4 rounded-r-2xl space-y-1.5">
            <div className="flex items-center gap-2 font-serif font-bold text-amber-900 text-base">
              <Key className="w-5 h-5 text-amber-800 shrink-0" />
              <span>100% Privacy Protection Guaranteed</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              This Google Apps Script runs exclusively inside your private Google Sheet environment. On every form submission, it reads only <strong>Flavor</strong>, <strong>Design</strong>, <strong>Pickup Date</strong>, and <strong>Size</strong>, excluding all customer phone numbers, emails, and names before pushing to GitHub.
            </p>
          </div>

          {/* Setup Instructions */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-2 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-amber-800" />
              <span>Step-by-Step Setup Guide</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SETUP_INSTRUCTIONS.map((item) => (
                <div key={item.step} className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs">{item.title}</h5>
                    <p className="text-xs text-stone-600 leading-relaxed">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick-Copy Options for Google Form Dropdowns */}
          <div className="space-y-3 bg-amber-50/70 border border-amber-200 p-5 rounded-2xl">
            <h4 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-amber-800" />
              <span>Google Form Option Quick-Copy Palettes</span>
            </h4>
            <p className="text-xs text-stone-600">
              When editing your Google Form questions, click copy on each block below and paste into Option 1:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-stone-900">1. Sponge Flavors</strong>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`Vanilla Sponge\nRich Chocolate\nRed Velvet\nCarrot Cake\nMarble Sponge\nStrawberry Infusion\nLemon Poppyseed\nOther`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-100 px-2 py-1 rounded-md cursor-pointer"
                  >
                    Copy List
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 font-mono">Vanilla Sponge, Rich Chocolate, Red Velvet, Carrot Cake...</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-stone-900">2. Cake Sizes</strong>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`4 INCH\n6 INCH\n8 INCH\n10 INCH\n12 INCH\n2-Tier (6" + 8")\n3-Tier (6" + 8" + 10")`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-100 px-2 py-1 rounded-md cursor-pointer"
                  >
                    Copy List
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 font-mono">4 INCH, 6 INCH, 8 INCH, 10 INCH, 12 INCH, 2-Tier, 3-Tier</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-stone-900">3. Icing / Frosting Types</strong>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`American Buttercream\nSwiss Meringue Buttercream\nCream Cheese Frosting\nChocolate Ganache\nFondant Finish\nWhipped Cream Frosting\nNaked / Semi-Naked\nOther`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-100 px-2 py-1 rounded-md cursor-pointer"
                  >
                    Copy List
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 font-mono">American Buttercream, Swiss Meringue, Cream Cheese...</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-stone-900">4. Occasions</strong>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`Birthday\nWedding\nAnniversary\nBaby Shower\nBreakfast Event\nMother's Day Special\nParty\nStaff Party\nOther`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-900 bg-amber-100 px-2 py-1 rounded-md cursor-pointer"
                  >
                    Copy List
                  </button>
                </div>
                <p className="text-[11px] text-stone-500 font-mono">Birthday, Wedding, Anniversary, Baby Shower, Staff Party...</p>
              </div>
            </div>
          </div>

          {/* Apps Script Code Box */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-800" />
                <span>Google Apps Script Code (Code.gs)</span>
              </h4>

              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Code Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 shadow-inner">
              <div className="bg-stone-950 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
                <span>Code.gs — Copy & paste into Apps Script</span>
                <span className="text-amber-400">JavaScript / Google Apps Script</span>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-96 leading-relaxed select-all">
                <code>{GOOGLE_APPS_SCRIPT_CODE}</code>
              </pre>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            DAOS Cakes — Public & Private Order Pipeline
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>

    </div>
  );
}
