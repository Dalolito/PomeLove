import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'POMELOVE KOREA - Pomerania Medellín | Criadores de Pomerania en Medellín',
    template: '%s | POMELOVE KOREA',
  },
  description: 'Criadores especializados de Pomerania en Medellín con 15+ años de experiencia. Importamos líneas exclusivas de Pomerania Coreano de la más alta calidad. Pomerania Medellín, Pomerania Colombia. Encuentra tu compañero perfecto.',
  keywords: 'pomerania medellin, pomerania, pomeranian, cachorros pomerania medellin, pomerania coreano, criadores pomerania medellin, venta pomerania medellin, pomerania colombia, pomerania antioquia',
  authors: [{ name: 'POMELOVE KOREA' }],
  creator: 'POMELOVE KOREA',
  publisher: 'POMELOVE KOREA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pomeloves.com'),
  alternates: {
    canonical: '/',
    languages: {
      es: '/es',
      en: '/en',
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://pomeloves.com',
    title: 'POMELOVE KOREA - Pomerania Medellín | Criadores de Pomerania en Medellín',
    description: 'Criadores especializados de Pomerania en Medellín con 15+ años de experiencia. Importamos líneas exclusivas de Pomerania Coreano.',
    siteName: 'POMELOVE KOREA',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'POMELOVE KOREA - Pomerania de Alta Calidad',
      },
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'POMELOVE KOREA Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'POMELOVE KOREA - Pomerania Medellín | Criadores de Pomerania en Medellín',
    description: 'Criadores especializados de Pomerania en Medellín con 15+ años de experiencia.',
    images: ['/og-image.jpg', '/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
