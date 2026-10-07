import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BAKING_JOURNAL_ARTICLES } from '../data/bakingJournalData';

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'DAOS Cakes - Handcrafted Celebration Cakes & Artisanal Baking Journal in Smyrna, GA',
    description: 'DAOS Cakes creates custom celebration cakes, wedding tiers, and scratch-baked desserts in Smyrna, Georgia, alongside our technical Baking Journal and interactive pastry calculators.'
  },
  '/baking-journal': {
    title: 'The Artisanal Baking Journal - Pastry Chemistry & Cake Engineering | DAOS Cakes',
    description: 'In-depth technical guides on Swiss meringue buttercream emulsions, multi-tier cake structural engineering, chocolate ganache ratios, and scratch baking science.'
  },
  '/baking-calculators': {
    title: 'Interactive Baker’s Calculators - Pan Converter, Baker’s % & Ganache Ratios | DAOS Cakes',
    description: 'Free interactive pastry calculators for cake pan surface area scaling, scratch recipe Baker’s Percentages in grams, and couverture chocolate ganache ratios.'
  },
  '/flavor-guide': {
    title: 'Artisanal Cake Flavor & Filling Pairing Guide | DAOS Cakes Smyrna, GA',
    description: 'Explore our scratch-baked sponge flavors, Swiss meringue buttercreams, Belgian chocolate ganaches, and housemade fresh fruit compotes.'
  },
  '/cake-care-guide': {
    title: 'Cake Care, Storage & Hot-Weather Vehicle Transport Guide | DAOS Cakes',
    description: 'Essential guidelines for transporting delicate buttercream celebration cakes on a flat vehicle floorboard, refrigeration, and room-temperature tempering before slicing.'
  },
  '/wedding-guide': {
    title: 'Multi-Tier Wedding & Milestone Celebration Cake Guide | DAOS Cakes',
    description: 'Comprehensive guide to wedding cake tier sizing, guest serving calculations, internal structural doweling, and flavor consultations in Smyrna & Greater Atlanta.'
  },
  '/baking-craft': {
    title: 'Our Scratch-Baking Craft, Ingredients & Culinary Standards | DAOS Cakes',
    description: 'Discover how DAOS Cakes formulates every sponge from scratch using sweet cream butter, cage-free eggs, Madagascar vanilla, and Georgia Cottage Food safety protocols.'
  },
  '/pricing-estimator': {
    title: 'Interactive Custom Cake Price & Serving Size Estimator | DAOS Cakes',
    description: 'Calculate estimated pricing, tier dimensions, and serving counts for custom celebration and wedding cakes in Smyrna, Georgia.'
  },
  '/how-it-works': {
    title: 'How Custom Cake Ordering & Local Smyrna Pickup Works | DAOS Cakes',
    description: 'Learn our 4-step custom cake ordering process, advance booking timelines, design consultation, and in-person cash pickup in Smyrna, GA.'
  },
  '/order': {
    title: 'Request a Custom Celebration Cake Order | DAOS Cakes Smyrna, GA',
    description: 'Submit your custom cake design, flavor pairing, guest count, and pickup date request for in-person pickup in Smyrna, Georgia.'
  },
  '/about': {
    title: 'About the Baker & Our Smyrna Artisanal Pastry Studio | DAOS Cakes',
    description: 'Meet the artisan baker behind DAOS Cakes in Smyrna, Georgia. Learn about our scratch-baking heritage, quality commitments, and local community roots.'
  },
  '/faq': {
    title: 'Frequently Asked Questions (FAQ) - Ordering, Transport & Policies | DAOS Cakes',
    description: 'Answers to common questions about ordering custom cakes, lead times, allergen disclosures, safe car transport, and in-person cash payment at pickup.'
  },
  '/contact': {
    title: 'Contact DAOS Cakes - Smyrna, Georgia Custom Bakery Inquiries',
    description: 'Get in touch with DAOS Cakes in Smyrna, GA by phone at (470) 476-1631 / (678) 235-8462 or email at daoscakes2@gmail.com.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Google AdSense Cookie Disclosures | DAOS Cakes',
    description: 'Official Privacy Policy for DAOS Cakes detailing Google AdSense advertising cookies, DoubleClick DART cookies, opt-out controls, GDPR/CCPA rights, and contact info.'
  },
  '/terms': {
    title: 'Terms of Service & Custom Order Policies | DAOS Cakes',
    description: 'Terms of Service governing custom cake inquiries, lead times, allergen advisories, vehicle transport responsibility, and in-person pickup in Smyrna, GA.'
  }
};

export default function RouteSeoUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    let meta = ROUTE_META[cleanPath];

    if (!meta && cleanPath.startsWith('/baking-journal/')) {
      const slug = cleanPath.replace('/baking-journal/', '');
      const article = BAKING_JOURNAL_ARTICLES.find((a) => a.slug === slug);
      if (article) {
        meta = {
          title: `${article.title} | DAOS Cakes Baking Journal`,
          description: article.summary
        };
      }
    }

    if (meta) {
      document.title = meta.title;
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) descEl.setAttribute('content', meta.description);
      const ogTitleEl = document.querySelector('meta[property="og:title"]');
      if (ogTitleEl) ogTitleEl.setAttribute('content', meta.title);
      const ogDescEl = document.querySelector('meta[property="og:description"]');
      if (ogDescEl) ogDescEl.setAttribute('content', meta.description);
    }

    const canonicalUrl = `https://daoscakes.pages.dev${cleanPath === '/' ? '/' : cleanPath}`;
    const canonicalEl = document.getElementById('canonical-url') || document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    }
    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.setAttribute('content', canonicalUrl);
    }
  }, [pathname]);

  return null;
}
