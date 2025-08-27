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
    // Fallback to English if Spanish is not available
    const dict = await import('@/dictionaries/en.json');
    return dict.default;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDefaultDictionary();

  return generatePageMetadata({
    dict,
    page: 'home',
    locale: 'es',
  });
}

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
