'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface MenuItem {
  key: string;
  href: string;
  icon: string;
}

import { Dictionary } from '@/lib/types/dictionary';

interface HamburgerMenuProps {
  currentLocale: string;
  dict: Dictionary;
}

export default function HamburgerMenu({
  currentLocale,
  dict,
}: HamburgerMenuProps) {
  const router = useRouter();

  const getNavigationText = (key: string): string => {
    const navKey = key as keyof typeof dict.navigation;
    const value = dict.navigation[navKey];
    return typeof value === 'string' ? value : key;
  };

  const menuItems: MenuItem[] = [
    {
      key: 'home',
      href: `/${currentLocale}`,
      icon: '🏠',
    },
    {
      key: 'catalog',
      href: `/${currentLocale}/catalog`,
      icon: '🐕',
    },
    {
      key: 'about',
      href: `/${currentLocale}/about`,
      icon: 'ℹ️',
    },
  ];

  const handleMenuItemClick = (href: string, close: () => void) => {
    router.push(href);
    close();
  };

  return (
    <Disclosure as="div">
      {({ open, close }) => (
        <>
          {/* Hamburger button */}
          <Disclosure.Button className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-gray-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
            <span className="sr-only">
              {open ? 'Close main menu' : 'Open main menu'}
            </span>
            {open ? (
              <XMarkIcon className="block h-5 w-5" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-5 w-5" aria-hidden="true" />
            )}
          </Disclosure.Button>

          {/* Mobile menu panel */}
          <div className="relative">
            <Disclosure.Panel
              as="div"
              className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-gray-100 bg-white shadow-xl"
            >
              {/* Menu header */}
              <div className="border-b border-gray-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  {dict.navigation?.menu || 'Menu'}
                </h3>
              </div>

              {/* Menu items */}
              <nav className="p-4">
                <div className="space-y-2">
                  {menuItems.map(item => (
                    <button
                      key={item.key}
                      onClick={() => handleMenuItemClick(item.href, close)}
                      className="group flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-gray-50"
                    >
                      <span className="text-xl transition-transform group-hover:scale-110">
                        {item.icon}
                      </span>
                      <span className="font-medium text-slate-700 group-hover:text-slate-900">
                        {getNavigationText(item.key)}
                      </span>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Menu footer */}
              <div className="rounded-b-lg border-t border-gray-100 bg-gray-50 px-6 py-4">
                <p className="text-center text-sm text-slate-500">
                  {dict.header?.title || 'PuppyShop'}
                </p>
                <p className="mt-1 text-center text-xs text-slate-400">
                  {dict.header?.experience || 'Premium quality'}
                </p>
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
}
