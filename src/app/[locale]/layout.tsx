import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PomeLove Korea - Pomerania de Alta Calidad",
  description: "Criadores especializados con 15+ años de experiencia",
};

async function getDictionary() {
  const dict = await import('@/dictionaries/es.json')
  return dict.default
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dict = await getDictionary()

  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen`}>
        
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-slate-700 tracking-tight">
                  {dict.header.title}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600">ES</span>
                
                <button className="flex flex-col gap-1 p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="w-6 h-0.5 bg-slate-600 rounded-full"></div>
                  <div className="w-6 h-0.5 bg-slate-600 rounded-full"></div>
                  <div className="w-6 h-0.5 bg-slate-600 rounded-full"></div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}