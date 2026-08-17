import { useState, useEffect, useCallback, useRef } from 'react';
import { SECTIONS, SectionConfig, getSectionFromUrl, getSectionById, scrollToSectionElement } from '../utils/navigation';
import { trackPageView, trackUserClick } from '../utils/analytics';

export function useSectionRouter() {
  const [activeSectionId, setActiveSectionId] = useState<string>('home');
  const [copiedUrlSection, setCopiedUrlSection] = useState<string | null>(null);
  const isNavigatingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Sync document title & analytics
  const updateMetaAndAnalytics = useCallback((section: SectionConfig) => {
    if (typeof document !== 'undefined') {
      document.title = section.title;
    }
    trackPageView(section.path, section.title);
  }, []);

  /**
   * Programmatic Navigation to a section
   */
  const navigateTo = useCallback(
    (targetIdOrConfig: string | SectionConfig, options: { replace?: boolean; smooth?: boolean } = {}) => {
      const { replace = false, smooth = true } = options;
      const targetId = typeof targetIdOrConfig === 'string' ? targetIdOrConfig : targetIdOrConfig.id;
      const section = getSectionById(targetId);

      setActiveSectionId(section.id);
      updateMetaAndAnalytics(section);
      trackUserClick(`nav_to_${section.id}`, 'navigation');

      // Update browser URL
      if (typeof window !== 'undefined') {
        const targetUrl = section.path;
        if (replace) {
          window.history.replaceState({ sectionId: section.id }, section.title, targetUrl);
        } else {
          // Avoid pushing duplicate state if already on this path
          if (window.location.pathname !== section.path) {
            window.history.pushState({ sectionId: section.id }, section.title, targetUrl);
          }
        }
      }

      // Mark that manual navigation is active to temporarily suppress scroll-spy overriding URL
      isNavigatingRef.current = true;
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollToSectionElement(section.id, smooth ? 'smooth' : 'auto');

      // Release navigation lock after smooth scroll completes
      scrollTimeoutRef.current = window.setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800);
    },
    [updateMetaAndAnalytics]
  );

  /**
   * Copy the shareable direct URL for a section
   */
  const copySectionUrl = useCallback(async (sectionId: string): Promise<boolean> => {
    const section = getSectionById(sectionId);
    if (typeof window === 'undefined') return false;

    const fullUrl = `${window.location.origin}${section.path}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedUrlSection(sectionId);
      setTimeout(() => {
        setCopiedUrlSection(null);
      }, 2500);
      return true;
    } catch (err) {
      console.error('Failed to copy section URL:', err);
      return false;
    }
  }, []);

  // Handle browser Back / Forward (popstate) & Hash changes
  useEffect(() => {
    const handlePopState = () => {
      const currentSection = getSectionFromUrl(window.location.pathname, window.location.hash);
      setActiveSectionId(currentSection.id);
      updateMetaAndAnalytics(currentSection);
      scrollToSectionElement(currentSection.id, 'smooth');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, [updateMetaAndAnalytics]);

  // Initial Deep-Link Load
  useEffect(() => {
    const initialSection = getSectionFromUrl(window.location.pathname, window.location.hash);
    setActiveSectionId(initialSection.id);
    updateMetaAndAnalytics(initialSection);

    // If visiting a sub-path or hash directly (e.g. /order, /about, /contact, #order-form), scroll to it
    if (initialSection.id !== 'home' || window.location.hash || window.location.pathname !== '/') {
      // Small timeout to ensure DOM layout has rendered
      const timer = setTimeout(() => {
        scrollToSectionElement(initialSection.id, 'smooth');
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [updateMetaAndAnalytics]);

  // ScrollSpy with IntersectionObserver / Scroll tracking to update URL as user scrolls
  useEffect(() => {
    const sectionElements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isNavigatingRef.current) return;

      // Find the visible entry with the highest intersection ratio
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length === 0) return;

      // Sort by intersection ratio or proximity to viewport top
      visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const topEntry = visibleEntries[0];

      if (topEntry && topEntry.target.id) {
        const matchedSection = getSectionById(topEntry.target.id);
        setActiveSectionId(matchedSection.id);

        // Update URL cleanly via replaceState without polluting history or interrupting scrolling
        if (window.location.pathname !== matchedSection.path) {
          window.history.replaceState(
            { sectionId: matchedSection.id },
            matchedSection.title,
            matchedSection.path
          );
          if (document.title !== matchedSection.title) {
            document.title = matchedSection.title;
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.1, 0.3, 0.6]
    });

    sectionElements.forEach((el) => observer.observe(el));

    // Fallback scroll listener for top of page (Home) and bottom of page (Contact)
    const handleScroll = () => {
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 80) {
        const homeSection = SECTIONS[0];
        setActiveSectionId('home');
        if (window.location.pathname !== homeSection.path && window.location.pathname !== '') {
          window.history.replaceState({ sectionId: 'home' }, homeSection.title, homeSection.path);
          document.title = homeSection.title;
        }
      } else if (scrollY + windowHeight >= documentHeight - 60) {
        const contactSection = getSectionById('contact');
        setActiveSectionId('contact');
        if (window.location.pathname !== contactSection.path) {
          window.history.replaceState({ sectionId: 'contact' }, contactSection.title, contactSection.path);
          document.title = contactSection.title;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeSectionId,
    activeSection: getSectionById(activeSectionId),
    navigateTo,
    copySectionUrl,
    copiedUrlSection,
    sections: SECTIONS
  };
}
