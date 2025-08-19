'use client';

import { useRef } from 'react';
import HamburgerMenu, { HamburgerMenuRef } from './HamburgerMenuComponent';
import LanguageButtonComponent from './LanguageButtonComponent';

interface HeaderProps {
  title: string;
  currentLocale: string;
}

export default function Header({ title, currentLocale }: HeaderProps) {
  const hamburgerRef = useRef<HamburgerMenuRef>(null);

  const handleMenuToggle = () => {
    hamburgerRef.current?.toggle();
  };

  const switchLanguage = (locale: string) => {
    // TODO: Implement language switching logic
    console.log('Switching to:', locale);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo and title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              {title}
            </h1>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            
            {/* Language switcher */}
            <LanguageButtonComponent 
              currentLocale={currentLocale}
              onLanguageChange={switchLanguage}
            />
            
            {/* Hamburger menu */}
            <HamburgerMenu 
              ref={hamburgerRef}
              size="md"
              color="dark"
              animationSpeed="normal"
            />
          </div>
        </div>
      </div>
    </header>
  );
}