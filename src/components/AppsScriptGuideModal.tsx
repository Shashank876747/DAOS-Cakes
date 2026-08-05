import React, { useState } from 'react';
import { X, Copy, Check, Code, FileSpreadsheet, Key, AlertTriangle, ExternalLink } from 'lucide-react';
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
