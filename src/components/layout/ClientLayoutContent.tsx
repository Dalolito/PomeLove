'use client';

import React from 'react';
import { Dictionary } from '@/lib/types/dictionary';
import HeaderComponent from '@/components/layout/HeaderComponent';
import FooterComponent from '@/components/layout/FooterComponent';

interface ClientLayoutContentProps {
  children: React.ReactNode;
  title: string;
  currentLocale: string;
  dict: Dictionary;
}

export default function ClientLayoutContent({
  children,
  title,
  currentLocale,
  dict,
}: ClientLayoutContentProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with navigation and hamburger menu */}
      <HeaderComponent
        title={title}
        currentLocale={currentLocale}
        dict={dict}
      />

      {/* Main content for each page */}
      <main className="flex-1">{children}</main>

      {/* Footer with contact info and social media */}
      <FooterComponent
        title={title}
        currentLocale={currentLocale}
        dict={dict}
      />
    </div>
  );
}
