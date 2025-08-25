import React from 'react';
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
                  <span className="text-slate-300 transition-colors group-hover:text-white">
                    {contact.icon}
                  </span>
                </a>
              ))}

              {/* WhatsApp button - client component */}
              <WhatsAppContactButton dict={dict}>
                <span className="text-slate-300 transition-colors group-hover:text-white">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
                    WA
                  </div>
                </span>
              </WhatsAppContactButton>
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <span>📱</span>
                <a
                  href="https://wa.me/573004439574"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  +57 300 443 9574
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span>
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
