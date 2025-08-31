'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackTimeOnPage } from '@/lib/utils/analyticsUtils';

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname changes
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    // Track time on page
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 0) {
        trackTimeOnPage(timeSpent);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);
}

// Hook for scroll depth tracking
export function useScrollTracking() {
  useEffect(() => {
    let scrollDepth25 = false;
    let scrollDepth50 = false;
    let scrollDepth75 = false;
    let scrollDepth100 = false;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 25 && !scrollDepth25) {
        scrollDepth25 = true;
        // trackScrollDepth(25);
      }
      if (scrollPercent >= 50 && !scrollDepth50) {
        scrollDepth50 = true;
        // trackScrollDepth(50);
      }
      if (scrollPercent >= 75 && !scrollDepth75) {
        scrollDepth75 = true;
        // trackScrollDepth(75);
      }
      if (scrollPercent >= 100 && !scrollDepth100) {
        scrollDepth100 = true;
        // trackScrollDepth(100);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
