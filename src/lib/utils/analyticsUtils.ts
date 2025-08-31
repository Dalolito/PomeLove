// Google Analytics and Google Ads utility functions

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize gtag function
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Track page views
export const trackPageView = (url: string) => {
  gtag('config', 'AW-17521038351', {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track conversions (Google Ads)
export const trackConversion = (conversionId: string, value?: number) => {
  gtag('event', 'conversion', {
    send_to: `AW-${conversionId}/CONVERSION_ID`,
    value: value,
  });
};

// Track specific business events
export const trackPuppyView = (puppyName: string, puppyId: string) => {
  trackEvent('view_item', 'puppy', `${puppyName} (${puppyId})`);
};

export const trackWhatsAppContact = (puppyName?: string) => {
  trackEvent('contact', 'whatsapp', puppyName || 'general');
};

export const trackCatalogView = () => {
  trackEvent('view_item_list', 'catalog');
};

export const trackSearch = (searchTerm: string) => {
  trackEvent('search', 'catalog', searchTerm);
};

export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('filter', 'catalog', `${filterType}: ${filterValue}`);
};

// Enhanced ecommerce tracking
export const trackAddToWishlist = (puppyName: string, puppyId: string) => {
  gtag('event', 'add_to_wishlist', {
    items: [
      {
        item_id: puppyId,
        item_name: puppyName,
        item_category: 'puppy',
      },
    ],
  });
};

export const trackViewItem = (
  puppyName: string,
  puppyId: string,
  category?: string
) => {
  gtag('event', 'view_item', {
    items: [
      {
        item_id: puppyId,
        item_name: puppyName,
        item_category: category || 'puppy',
      },
    ],
  });
};

// Form tracking
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', 'contact', formName);
};

export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', 'contact', formName);
};

// Phone call tracking
export const trackPhoneCall = () => {
  trackEvent('phone_call', 'contact');
};

// Social media tracking
export const trackSocialClick = (platform: string) => {
  trackEvent('social_click', 'social', platform);
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll', 'engagement', `depth_${depth}%`);
};

// Time on page tracking
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('timing_complete', 'engagement', 'page_load', seconds);
};
