'use client';

import { useAnalytics, useScrollTracking } from '@/hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export default function AnalyticsProvider({
  children,
}: AnalyticsProviderProps) {
  useAnalytics();
  useScrollTracking();

  return <>{children}</>;
}
