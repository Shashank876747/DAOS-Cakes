import React, { useState } from 'react';
import { Cake, Menu as MenuIcon, X } from 'lucide-react';

interface HeaderProps {
  siteName?: string;
  tagline?: string;
  announcementText?: string;
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
    { id: 'order-form', label: 'Order Form', path: '/order' },
    { id: 'about', label: 'About Us', path: '/about' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-amber-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo with link to / */}
        <a 
          href="/"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center gap-3 cursor-pointer group select-none text-stone-900"
          id="header-logo"
          title="DAOS Cakes - Home (/)"
        >
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 group-hover:bg-amber-200 transition-colors">
            <Cake className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
              {siteName}
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 font-medium text-stone-700 bg-stone-100/80 p-1.5 rounded-full border border-stone-200/60 shadow-2xs">
          {navItems.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer font-medium relative ${
                  isActive
                    ? 'bg-amber-800 text-amber-50 shadow-xs'
                    : 'text-stone-700 hover:text-amber-900 hover:bg-stone-200/60'
                }`}
                id={`nav-${item.id}`}
                title={`Navigate to ${item.label} (${item.path})`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-stone-50 border-b border-amber-100 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = activeSectionId === item.id;
            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
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
              className="block w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-3 rounded-xl font-medium text-center shadow-xs text-sm cursor-pointer"
              id="mobile-header-order-btn"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

