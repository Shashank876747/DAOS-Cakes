import { trackPageView, trackUserClick } from './analytics';

export interface SectionConfig {
  id: string; // DOM element ID
  path: string; // Primary URL pathname
  aliases: string[]; // Path or Hash aliases
  title: string; // Document Page Title
  navLabel: string;
}

export const SECTIONS: SectionConfig[] = [
  {
    id: 'home',
    path: '/',
    aliases: ['/home', '#home'],
    title: 'DAOS Cakes',
    navLabel: 'Home'
  },
  {
    id: 'how-it-works',
    path: '/how-it-works',
    aliases: ['#how-it-works', '/process', '#process'],
    title: 'How Ordering Works | DAOS Cakes',
    navLabel: 'How It Works'
  },
  {
    id: 'order-form',
    path: '/order',
    aliases: ['/order-form', '#order-form', '#order', '/order'],
    title: 'Order Form | DAOS Cakes',
    navLabel: 'Order Form'
  },
  {
    id: 'contact',
    path: '/contact',
    aliases: ['#contact', '/contact', '#footer'],
    title: 'Contact & Info | DAOS Cakes',
    navLabel: 'Contact'
  }
];

/**
 * Resolve which section corresponds to the current URL pathname and hash.
 */
export function getSectionFromUrl(pathname: string, hash: string = ''): SectionConfig {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
  const cleanHash = hash.toLowerCase();

  // 1. Match by hash first if present
  if (cleanHash) {
    const matchedByHash = SECTIONS.find(
      (s) => s.aliases.includes(cleanHash) || cleanHash === `#${s.id}`
    );
    if (matchedByHash) return matchedByHash;
  }

  // 2. Match by exact path
  const matchedByPath = SECTIONS.find(
    (s) => s.path === cleanPath || s.aliases.includes(cleanPath)
  );
  if (matchedByPath) return matchedByPath;

  // 3. Fallback to Home
  return SECTIONS[0];
}

/**
 * Find a section configuration by its DOM ID
 */
export function getSectionById(id: string): SectionConfig {
  const found = SECTIONS.find((s) => s.id === id);
  return found || SECTIONS[0];
}

/**
 * Smoothly scroll to a section taking into account fixed header height
 */
export function scrollToSectionElement(id: string, behavior: ScrollBehavior = 'smooth'): void {
  if (typeof window === 'undefined') return;

  if (id === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80; // height of sticky header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior
    });
  }
}
