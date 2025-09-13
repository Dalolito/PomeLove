import React from 'react';
import Image from 'next/image';
import { Dictionary } from '@/lib/types/dictionary';
import WhatsAppContactButton from '@/components/layout/WhatsAppContactButton';

interface FooterProps {
  title: string;
  currentLocale: string;
  dict: Dictionary;
}

export default function Footer({ title, currentLocale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const staticContactLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/pomelove_korea?igsh=dTA4Njl5aXY5bnRk&utm_source=qr',
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-xs font-bold text-white">
          IG
        </div>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/catalina.londonoagudelo',
      icon: (
        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
          f
        </div>
      ),
    },
  ];

  const footerLinks = [
    {
      title: dict.footer?.sections?.company || 'Company',
      links: [
        {
          name: dict.navigation?.about || 'About Us',
          href: `/${currentLocale}/about`,
        },
      ],
    },
    {
      title: dict.footer?.sections?.services || 'Services',
      links: [
        {
          name: dict.navigation?.catalog || 'Find a Puppy',
          href: `/${currentLocale}/catalog`,
        },
      ],
    },
  ];

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>

            <p className="mb-6 max-w-md text-slate-300">
              {dict.header?.experience ||
                'Specialized breeders with 15+ years of experience'}
            </p>

            {/* Social links */}
            <div className="mb-6 flex gap-4">
              {staticContactLinks.map(contact => (
                <a
                  key={contact.name}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 transition-colors hover:bg-red-500"
                  title={contact.name}
                >
                  {contact.name === 'Instagram' ? (
                    <Image
                      src="/icons/icon-instagram.png"
                      alt="Instagram"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  ) : contact.name === 'Facebook' ? (
                    <Image
                      src="/icons/icon-facebook.png"
                      alt="Facebook"
                      width={20}
                      height={20}
                      className="h-5 w-5"
                    />
                  ) : (
                    <span className="text-slate-300 transition-colors group-hover:text-white">
                      {contact.icon}
                    </span>
                  )}
                </a>
              ))}

              {/* WhatsApp button - client component */}
              <WhatsAppContactButton dict={dict}>
                <Image
                  src="/icons/icon-whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
              </WhatsAppContactButton>
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <Image
                  src="/icons/icon-whatsapp.png"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                <button
                  onClick={() => {
                    // Google Ads - Track conversion
                    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                      (window as any).gtag_report_conversion();
                    }
                    window.open('https://wa.me/573004439574', '_blank', 'noopener,noreferrer');
                  }}
                  className="transition-colors hover:text-white text-left"
                >
                  +57 300 443 9574
                </button>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{dict.footer?.location || 'Medellín, Colombia'}</span>
              </p>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map(section => (
            <div key={section.title}>
              <h4 className="mb-4 font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 md:flex-row">
          <p className="text-sm text-slate-400">
            © {currentYear} {title}.{' '}
            {dict.footer?.copyright || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
