'use client';

import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface MenuItem {
  key: string;
  href: string;
  icon: string;
}

interface AdminHamburgerMenuProps {
  currentLocale: string;
  dict: any;
}

export default function AdminHamburgerMenu({ currentLocale, dict }: AdminHamburgerMenuProps) {
  const router = useRouter();

  const menuItems: MenuItem[] = [
    {
      key: 'puppys',
      href: `/${currentLocale}/admin/puppys`,
      icon: '🐕'
    },
    {
      key: 'categories',
      href: `/${currentLocale}/admin/categories`,
      icon: '📂'
    }
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
              className="absolute top-full right-0 z-50 w-80 bg-white shadow-xl border border-gray-100 rounded-lg mt-2"
            >
              
              {/* Menu header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-slate-800">
                  {dict.admin?.menu || 'Admin Menu'}
                </h3>
              </div>

              {/* Menu items */}
              <nav className="p-4">
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => handleMenuItemClick(item.href, close)}
                      className="w-full flex items-center gap-4 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-slate-700 font-medium group-hover:text-slate-900">
                        {dict.admin?.[item.key] || item.key}
                      </span>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Menu footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                <p className="text-sm text-slate-500 text-center">
                  {dict.header?.title || 'PuppyShop'} Admin
                </p>
                <p className="text-xs text-slate-400 text-center mt-1">
                  {dict.admin?.subtitle || 'Administration panel'}
                </p>
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
}