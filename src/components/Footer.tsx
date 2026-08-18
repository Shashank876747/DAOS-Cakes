import React from 'react';
import { Mail, Instagram, Cake, ArrowUp, Phone } from 'lucide-react';
import { trackUserClick } from '../utils/analytics';

interface FooterProps {
  activeSectionId?: string;
  onNavigate?: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-stone-800">
          
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
              Freshly baked artisanal cakes, gourmet cupcakes, and handcrafted desserts for birthdays, showers, and memorable gatherings.
            </p>
          </div>

          {/* Contact & Socials Column */}
          <div className="space-y-4 md:pl-6">
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
                  <Instagram className="w-4 h-4" />
                </div>
                <span>Instagram: <strong className="font-medium text-white">@daoscakes</strong></span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            © {new Date().getFullYear()} DAOS Cakes. All rights reserved. Handcrafted with love.
          </p>
          
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
