import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/utils/metadataUtils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

async function getDefaultDictionary() {
  try {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/en.json');
    return dict.default;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDefaultDictionary();

  return {
    ...generatePageMetadata({
      dict,
      page: 'home',
      locale: 'es',
    }),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/logo-2.png?v=1', sizes: '16x16', type: 'image/png' },
        { url: '/logo-2.png?v=1', sizes: '32x32', type: 'image/png' },
        { url: '/logo-2.png?v=1', sizes: '48x48', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [{ url: '/logo-2.png?v=1', sizes: '180x180', type: 'image/png' }],
      other: [
        {
          rel: 'icon',
          url: '/favicon.ico',
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/logo-2.png?v=1" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-2.png?v=1" />

        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/logo-2.png?v=1" />
        <meta name="msapplication-TileColor" content="#ffffff" />

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
