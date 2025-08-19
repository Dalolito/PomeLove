import Header from '@/components/layout/HeaderComponent';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  currentLocale: string;
}

export default function Layout({ 
  children, 
  title, 
  currentLocale 
}: LayoutProps) {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header 
        title={title}
        currentLocale={currentLocale}
      />
      
      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>
      
    </div>
  );
}