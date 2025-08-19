interface FooterProps {
  title: string;
  currentLocale: string;
  dict: any;
}

export default function Footer({ title, currentLocale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const contactLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/pomelove_korea?igsh=dTA4Njl5aXY5bnRk&utm_source=qr',
      icon: (
        <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
          IG
        </div>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/catalina.londonoagudelo',
      icon: (
        <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
          f
        </div>
      )
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/573004439574',
      icon: (
        <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center text-white text-xs font-bold">
          WA
        </div>
      )
    }
  ];

  const footerLinks = [
    {
      title: dict.footer?.sections?.company || 'Company',
      links: [
        { name: dict.navigation?.about || 'About Us', href: `/${currentLocale}/about` }
      ]
    },
    {
      title: dict.footer?.sections?.services || 'Services', 
      links: [
        { name: dict.navigation?.catalog || 'Find a Puppy', href: `/${currentLocale}/catalog` }
      ]
    }
  ];

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
            
            <p className="text-slate-300 mb-6 max-w-md">
              {dict.header?.experience || 'Specialized breeders with 15+ years of experience'}
            </p>
            
            {/* Social links */}
            <div className="flex gap-4 mb-6">
              {contactLinks.map((contact) => (
                <a
                  key={contact.name}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-slate-700 hover:bg-red-500 rounded-lg transition-colors group"
                  title={contact.name}
                >
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    {contact.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <span>📱</span>
                <a href="https://wa.me/573004439574" className="hover:text-white transition-colors">
                  +57 300 443 9574
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>Medellín, Colombia</span>
              </p>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors text-sm"
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
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} {title}. {dict.footer?.copyright || 'All rights reserved.'}
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <a href={`/${currentLocale}/contact`} className="text-slate-400 hover:text-white transition-colors">
              {dict.footer?.links?.contact || 'Contact'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}