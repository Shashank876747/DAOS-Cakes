import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenPrivacy: () => void;
}

export default function CookieConsentBanner({ onOpenPrivacy }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consentGiven = localStorage.getItem('daos_cookie_consent');
      if (!consentGiven) {
        // Show banner with brief delay for smooth appearance
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // localStorage may fail in restricted environments
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('daos_cookie_consent', 'accepted');
    } catch (e) {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('daos_cookie_consent', 'declined');
    } catch (e) {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-consent-banner"
      role="region"
      aria-label="Cookie and Privacy Consent Notice"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-stone-900/95 text-stone-100 p-5 rounded-3xl shadow-2xl border border-stone-700/80 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-2xl bg-amber-800 text-amber-200 flex items-center justify-center shrink-0 shadow-xs">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="space-y-2 grow">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
              <span>Cookie &amp; Privacy Notice</span>
            </h4>
            <button
              onClick={handleDecline}
              className="text-stone-400 hover:text-white p-1 -mr-1 rounded-lg transition-colors cursor-pointer"
              aria-label="Close Notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed font-normal">
            We and our partners (including Google AdSense) use cookies to analyze site traffic, personalize content, and display relevant advertisements. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleAccept}
              id="cookie-accept-all-btn"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Accept All
            </button>

            <button
              onClick={handleDecline}
              id="cookie-essential-only-btn"
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-full text-xs font-semibold transition-colors cursor-pointer border border-stone-700"
            >
              Essential Only
            </button>

            <button
              onClick={onOpenPrivacy}
              className="text-xs text-amber-300 hover:text-amber-200 underline font-medium cursor-pointer ml-auto"
            >
              Read Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
