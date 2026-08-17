import React, { useState } from 'react';
import { Cake, Menu as MenuIcon, X } from 'lucide-react';

interface HeaderProps {
  siteName?: string;
  tagline?: string;
  announcementText?: string;
}

export default function Header({
  siteName = 'DAOS Cakes',
  tagline = 'Handcrafted Artisanal Bakery',
  announcementText = '🎂 Now Accepting Orders for Upcoming Celebrations!'
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-amber-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
            id="header-logo"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 group-hover:bg-amber-200 transition-colors">
              <Cake className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
                {siteName}
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-stone-700">
            <button 
              onClick={() => scrollToSection('order-form')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-order-form"
            >
              Order Form
            </button>

            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-about"
            >
              About Us
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-amber-800 transition-colors cursor-pointer text-sm"
              id="nav-contact"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('order-form')}
              className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-5 py-2.5 rounded-full font-semibold text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer flex items-center gap-1.5"
              id="header-order-btn"
            >
              Order Now
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-amber-800 hover:bg-stone-100 focus:outline-hidden"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-50 border-b border-amber-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <button
              onClick={() => scrollToSection('order-form')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-order-form"
            >
              Order Form
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-about"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:bg-amber-50 hover:text-amber-800"
              id="mobile-nav-contact"
            >
              Contact
            </button>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('order-form')}
                className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-3 rounded-xl font-medium text-center shadow-xs text-sm"
                id="mobile-header-order-btn"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </header>
  );
}

