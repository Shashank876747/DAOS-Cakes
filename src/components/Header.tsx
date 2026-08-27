import React, { useState } from 'react';
import { Cake, Menu as MenuIcon, X, ArrowDown } from 'lucide-react';

interface HeaderProps {
  siteName?: string;
  activeSectionId?: string;
  onNavigate?: (sectionId: string) => void;
}

export default function Header({
  siteName = 'DAOS Cakes',
  activeSectionId = 'home',
  onNavigate
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'menu', label: 'Menu & Flavors', path: '/menu' },
    { id: 'estimator', label: 'Price Estimator', path: '/estimator' },
    { id: 'how-it-works', label: 'How It Works', path: '/how-it-works' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'faq', label: 'FAQs', path: '/faq' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-amber-100 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo with link to / */}
        <a 
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-3 cursor-pointer group select-none text-stone-900 shrink-0"
          id="header-logo"
          title="DAOS Cakes - Home"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 group-hover:bg-amber-200 transition-colors shadow-2xs">
            <Cake className="w-6 h-6" />
          </div>
          <div className="flex items-center">
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors leading-tight">
              {siteName}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1 font-medium text-stone-700 bg-stone-100/90 p-1.5 rounded-full border border-stone-200/70 shadow-2xs">
          {navItems.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-800 text-amber-50 shadow-xs'
                    : 'text-stone-700 hover:text-amber-900 hover:bg-stone-200/70'
                }`}
                id={`nav-${item.id}`}
                title={`Navigate to ${item.label}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Header Right CTA */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="/order"
            onClick={(e) => handleLinkClick(e, 'order-form')}
            className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
            id="header-order-btn"
          >
            <span>Order Form</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="xl:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:text-amber-800 hover:bg-stone-100 focus:outline-hidden cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-50 border-b border-amber-100 px-4 pt-2 pb-6 space-y-1.5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-amber-50 hover:text-amber-800'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                <span>{item.label}</span>
                <span className="text-xs font-mono text-stone-400">{item.path}</span>
              </a>
            );
          })}

          <div className="pt-3">
            <a
              href="/order"
              onClick={(e) => handleLinkClick(e, 'order-form')}
              className="block w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-3 rounded-xl font-bold text-center shadow-xs text-sm cursor-pointer"
              id="mobile-header-order-btn"
            >
              Open Order Form (/order)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
