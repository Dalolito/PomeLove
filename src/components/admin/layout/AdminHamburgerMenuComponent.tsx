'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface MenuItem {
  key: string;
  href: string;
  icon: string;
}

import { Dictionary } from '@/lib/types/dictionary';

interface AdminHamburgerMenuProps {
  currentLocale: string;
  dict: Dictionary;
}

export default function AdminHamburgerMenu({
  currentLocale,
  dict,
}: AdminHamburgerMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const getAdminText = (key: string): string => {
    if (key === 'categories') {
      return 'Categorías';
    }
    if (key === 'puppys') {
      return 'Mascotas';
    }
    return key;
  };

  const menuItems: MenuItem[] = [
    {
      key: 'puppys',
      href: `/${currentLocale}/admin/puppys`,
      icon: '🐕',
    },
    {
      key: 'categories',
      href: `/${currentLocale}/admin/categories`,
      icon: '📂',
    },
  ];

  const handleMenuItemClick = (href: string, close: () => void) => {
    router.push(href);
    close();
  };

  const handleClickOutside = (event: MouseEvent, close: () => void) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      close();
    }
  };

  return (
    <Disclosure as="div" ref={menuRef}>
      {({ open, close }) => {
        useEffect(() => {
          if (open) {
            const handleClick = (event: MouseEvent) =>
              handleClickOutside(event, close);
            document.addEventListener('mousedown', handleClick);
            return () => document.removeEventListener('mousedown', handleClick);
          }
        }, [open, close]);

        return (
          <>
            {/* Hamburger button */}
            <Disclosure.Button className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-gray-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              <span className="sr-only">
                {open ? 'Close admin menu' : 'Open admin menu'}
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
                    {dict.admin?.menu || 'Admin Menu'}
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
                          {getAdminText(item.key)}
                        </span>
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Menu footer */}
                <div className="rounded-b-lg border-t border-gray-100 bg-gray-50 px-6 py-4">
                  <p className="text-center text-sm text-slate-500">
                    {dict.header?.title || 'PuppyShop'} Admin
                  </p>
                  <p className="mt-1 text-center text-xs text-slate-400">
                    {dict.admin?.subtitle || 'Administration panel'}
                  </p>
                </div>
              </Disclosure.Panel>
            </div>
          </>
        );
      }}
    </Disclosure>
  );
}
