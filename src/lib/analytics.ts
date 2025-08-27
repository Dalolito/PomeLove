// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track puppy views
export const trackPuppyView = (puppyId: string, puppyName: string) => {
  event({
    action: 'view_puppy',
    category: 'engagement',
    label: `Puppy: ${puppyName} (${puppyId})`,
  });
};

// Track catalog interactions
export const trackCatalogFilter = (filterType: string, filterValue: string) => {
  event({
    action: 'filter_catalog',
    category: 'engagement',
    label: `${filterType}: ${filterValue}`,
  });
};

// Track contact interactions
export const trackContact = (method: string) => {
  event({
    action: 'contact',
    category: 'engagement',
    label: method,
  });
};
