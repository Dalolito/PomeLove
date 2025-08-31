import { Inter } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '@/lib/utils/metadataUtils';
import AnalyticsProvider from '@/components/providers/AnalyticsProvider';

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
        { url: '/logo.png', sizes: '16x16', type: 'image/png' },
        { url: '/logo.png', sizes: '32x32', type: 'image/png' },
        { url: '/logo.png', sizes: '48x48', type: 'image/png' },
        { url: '/logo.png', sizes: '64x64', type: 'image/png' },
        { url: '/logo.png', sizes: '96x96', type: 'image/png' },
        { url: '/logo.png', sizes: '128x128', type: 'image/png' },
        { url: '/logo.png', sizes: '256x256', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: [{ url: '/logo.png', sizes: '180x180', type: 'image/png' }],
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
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />

        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17521038351"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17521038351');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
