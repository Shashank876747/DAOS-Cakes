import React from 'react';
import { Mail, Cake, ArrowUp, Phone, Camera, Shield, FileText } from 'lucide-react';
import { trackUserClick } from '../utils/analytics';

interface FooterProps {
  activeSectionId?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export default function Footer({ onNavigate, onOpenPrivacy, onOpenTerms }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    trackUserClick('back_to_top', 'navigation');
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-stone-800">
          
          {/* Brand & Tagline Column */}
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="flex items-center gap-3 group inline-flex"
            >
              <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-bold group-hover:bg-amber-700 transition-colors">
                <Cake className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                DAOS Cakes
              </span>
            </a>

            {/* Warm closing tagline */}
            <p className="text-stone-400 text-base font-serif italic max-w-md">
              "Baking life a little sweeter, one custom cake at a time."
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              Freshly baked artisanal cakes, gourmet cupcakes, and handcrafted desserts in Smyrna, Georgia (serving Greater Atlanta and Cobb County).
            </p>
          </div>

          {/* Contact & Socials Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
              Contact & Socials
            </h4>
            
            <div className="space-y-3 text-sm">
              {/* Phone Numbers */}
              <div className="flex items-start gap-3 text-stone-300">
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-stone-400 block font-medium">Phone Numbers:</span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white font-medium">
                    <a
                      href="tel:4704761631"
                      onClick={() => trackUserClick('footer_phone_1', 'contact')}
                      className="hover:text-amber-400 transition-colors underline decoration-stone-700 hover:decoration-amber-400"
                    >
                      (470) 476-1631
                    </a>
                    <span className="text-stone-500 font-normal">and</span>
                    <a
                      href="tel:6782358462"
                      onClick={() => trackUserClick('footer_phone_2', 'contact')}
                      className="hover:text-amber-400 transition-colors underline decoration-stone-700 hover:decoration-amber-400"
                    >
                      (678) 235-8462
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:daoscakes2@gmail.com"
                onClick={() => trackUserClick('footer_email_link', 'contact')}
                className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group"
                id="footer-email-link"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Email: <strong className="font-medium text-white">daoscakes2@gmail.com</strong></span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/daoscakes/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackUserClick('footer_instagram_link', 'social')}
                className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group"
                id="footer-instagram-link"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <span>Instagram: <strong className="font-medium text-white">@daoscakes</strong></span>
              </a>
            </div>
          </div>

          {/* Legal & Policy Column (Required by Google AdSense & Search Console) */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
              Legal & Privacy
            </h4>
            
            <p className="text-xs text-stone-400 leading-relaxed">
              We respect your privacy and adhere strictly to Google AdSense publishing guidelines, CCPA, and GDPR disclosures.
            </p>

            <div className="space-y-2 pt-1">
              <a
                href="/privacy-policy.html"
                onClick={(e) => {
                  if (onOpenPrivacy) {
                    e.preventDefault();
                    onOpenPrivacy();
                  }
                }}
                className="flex items-center gap-2.5 text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium group"
                id="footer-privacy-policy-link"
                title="View Privacy Policy"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="underline decoration-stone-700 group-hover:decoration-amber-400">Privacy Policy</span>
              </a>

              <a
                href="/terms.html"
                onClick={(e) => {
                  if (onOpenTerms) {
                    e.preventDefault();
                    onOpenTerms();
                  }
                }}
                className="flex items-center gap-2.5 text-stone-300 hover:text-amber-400 transition-colors text-sm font-medium group"
                id="footer-terms-link"
                title="View Terms of Service"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="underline decoration-stone-700 group-hover:decoration-amber-400">Terms of Service</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} DAOS Cakes. All rights reserved.</span>
            <span className="hidden sm:inline text-stone-700">•</span>
            <a
              href="/privacy-policy.html"
              onClick={(e) => {
                if (onOpenPrivacy) {
                  e.preventDefault();
                  onOpenPrivacy();
                }
              }}
              className="hover:text-amber-400 transition-colors underline decoration-stone-700"
            >
              Privacy Policy
            </a>
            <span className="hidden sm:inline text-stone-700">•</span>
            <a
              href="/terms.html"
              onClick={(e) => {
                if (onOpenTerms) {
                  e.preventDefault();
                  onOpenTerms();
                }
              }}
              className="hover:text-amber-400 transition-colors underline decoration-stone-700"
            >
              Terms of Service
            </a>
          </div>
          
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium"
            id="back-to-top-btn"
          >
            <span>Back to Top (/)</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
