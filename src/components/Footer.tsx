import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Cake, ArrowUp, Phone, Camera, Shield, FileText, MapPin } from 'lucide-react';
import { trackUserClick } from '../utils/analytics';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenTerms }: FooterProps) {
  const handleScrollToTop = () => {
    trackUserClick('back_to_top', 'navigation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-3 group inline-flex"
            >
              <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-bold group-hover:bg-amber-700 transition-colors">
                <Cake className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                DAOS Cakes
              </span>
            </Link>

            <p className="text-stone-400 text-sm font-serif italic">
              "Baking life a little sweeter, one custom cake at a time."
            </p>

            <p className="text-xs text-stone-400 leading-relaxed">
              Scratch-baked celebration cakes, cupcakes, and desserts in Smyrna, Georgia (serving Greater Atlanta and Cobb County).
            </p>
          </div>

          {/* Site Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
              Pages &amp; Guides
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-stone-400 hover:text-amber-300 transition-colors">
                  Home (/)
                </Link>
              </li>
              <li>
                <Link to="/pricing-estimator" className="text-stone-400 hover:text-amber-300 transition-colors">
                  Price Estimator (/pricing-estimator)
                </Link>
              </li>
              <li>
                <Link to="/flavor-guide" className="text-stone-400 hover:text-amber-300 transition-colors">
                  Flavor Guide (/flavor-guide)
                </Link>
              </li>
              <li>
                <Link to="/cake-care-guide" className="text-stone-400 hover:text-amber-300 transition-colors">
                  Cake Care &amp; Transport (/cake-care-guide)
                </Link>
              </li>
              <li>
                <Link to="/wedding-guide" className="text-stone-400 hover:text-amber-300 transition-colors">
                  Wedding Guide (/wedding-guide)
                </Link>
              </li>
              <li>
                <Link to="/baking-craft" className="text-stone-400 hover:text-amber-300 transition-colors">
                  Baking Craft (/baking-craft)
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-stone-400 hover:text-amber-300 transition-colors">
                  How Ordering Works (/how-it-works)
                </Link>
              </li>
              <li>
                <Link to="/order" className="text-amber-400 hover:text-amber-300 transition-colors font-semibold">
                  Order Form (/order)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-amber-300 transition-colors">
                  About Us (/about)
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-stone-400 hover:text-amber-300 transition-colors">
                  FAQs (/faq)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-400 hover:text-amber-300 transition-colors">
                  Contact (/contact)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
              Contact &amp; Inquiries
            </h4>
            
            <div className="space-y-3 text-sm">
              {/* Phone Numbers */}
              <div className="flex items-start gap-3 text-stone-300">
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs text-stone-400 block font-medium">Direct Phone:</span>
                  <div className="flex flex-wrap items-center gap-x-2 text-white font-medium text-xs sm:text-sm">
                    <a
                      href="tel:4704761631"
                      onClick={() => trackUserClick('footer_phone_1', 'contact')}
                      className="hover:text-amber-400 transition-colors underline decoration-stone-700"
                    >
                      (470) 476-1631
                    </a>
                    <span className="text-stone-500">•</span>
                    <a
                      href="tel:6782358462"
                      onClick={() => trackUserClick('footer_phone_2', 'contact')}
                      className="hover:text-amber-400 transition-colors underline decoration-stone-700"
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
                className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group text-xs sm:text-sm"
                id="footer-email-link"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span><strong className="font-medium text-white">daoscakes2@gmail.com</strong></span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/daoscakes/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackUserClick('footer_instagram_link', 'social')}
                className="flex items-center gap-3 text-stone-300 hover:text-amber-400 transition-colors group text-xs sm:text-sm"
                id="footer-instagram-link"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 group-hover:bg-amber-800 group-hover:text-white transition-colors shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <span>Instagram: <strong className="font-medium text-white">@daoscakes</strong></span>
              </a>
            </div>
          </div>

          {/* Legal & Policy Column */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider text-xs">
              Legal &amp; Policies
            </h4>
            
            <p className="text-xs text-stone-400 leading-relaxed">
              We adhere strictly to Google AdSense publishing guidelines, CCPA, and GDPR disclosures.
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
                className="flex items-center gap-2.5 text-stone-300 hover:text-amber-400 transition-colors text-xs sm:text-sm font-medium group"
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
                className="flex items-center gap-2.5 text-stone-300 hover:text-amber-400 transition-colors text-xs sm:text-sm font-medium group"
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
            <span>© {new Date().getFullYear()} DAOS Cakes. All rights reserved. Smyrna, GA.</span>
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
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
