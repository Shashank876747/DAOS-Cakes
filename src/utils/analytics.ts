/**
 * Google Analytics Data Collection Utility
 * Handles tracking of page views, user actions, custom events, and conversion interactions.
 */

export const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || 'G-8GY7DCQ6BC';

/**
 * Initializes Google Analytics gtag script dynamically if not already loaded in the DOM.
 */
export function initGA(): void {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  // Check if GA script is already present in DOM
  const scriptId = 'ga-gtag-script';
  const existingScript = document.getElementById(scriptId) || document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: true,
      page_path: window.location.pathname,
    });
  }
}

/**
 * Tracks custom events to Google Analytics
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...eventParams });
  }
}

/**
 * Tracks Virtual Page Views
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window === 'undefined') return;

  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    send_to: GA_MEASUREMENT_ID,
  });
}

/**
 * Helper to track user clicks on key interactive elements (e.g. Instagram, Email, Order buttons)
 */
export function trackUserClick(label: string, category: string = 'engagement'): void {
  trackEvent('click', {
    event_category: category,
    event_label: label,
  });
}
