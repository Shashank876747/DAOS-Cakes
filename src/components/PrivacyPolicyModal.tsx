import React from 'react';
import { X, ShieldCheck, Cookie, ExternalLink, Lock } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-stone-100 p-6 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">Privacy Policy</h3>
              <p className="text-xs text-stone-400">DAOS Cakes • Last updated August 2026</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close Privacy Policy"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-stone-700 text-sm leading-relaxed">
          
          <div>
            <h4 className="font-bold text-stone-900 text-base mb-2">1. Overview & Commitment</h4>
            <p>
              DAOS Cakes operates in Smyrna, Georgia. We value your trust and are committed to safeguarding your personal privacy. We never sell your personal contact info to third parties.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Cookie className="w-4 h-4 text-amber-800" />
              <span>Google AdSense & Third-Party Cookies</span>
            </div>
            <p className="text-xs text-stone-800">
              We use <strong>Google AdSense</strong> to display advertisements. Google and third-party advertising partners use cookies (such as the Google DART cookie) to serve ads based on your visits to this and other websites across the Internet.
            </p>
            <div className="text-xs pt-1">
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-amber-800 font-bold underline hover:text-amber-900"
              >
                <span>Manage Google Ads Settings</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-base mb-2">2. Information We Collect</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
              <li><strong>Contact & Cake Inquiries:</strong> Your name, phone number, email address, and event details submitted via our Google Form.</li>
              <li><strong>No Online Payment Storage:</strong> We do not take or store credit card details online. All payments are strictly in person upon pickup (Cash Only).</li>
              <li><strong>Traffic Logs:</strong> Anonymous browser telemetry, referral data, and analytics for website performance.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-base mb-2">3. Your Data Rights (GDPR & CCPA)</h4>
            <p className="text-xs text-stone-600">
              You have the right to request access to or deletion of any contact information you have submitted to DAOS Cakes. To exercise your rights, email us at <strong className="text-stone-900">daoscakes2@gmail.com</strong>.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-900 text-base mb-2">4. Contact Information</h4>
            <p className="text-xs text-stone-600">
              DAOS Cakes • Smyrna, Georgia • Phone: (470) 476-1631 or (678) 235-8462 • Email: daoscakes2@gmail.com
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between shrink-0">
          <a
            href="/privacy-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline flex items-center gap-1"
          >
            <span>Open Standalone Full Page</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
