'use client';

import { useRouter } from 'next/navigation';
import { useState, use } from 'react';
import AdminFormComponent from '@/components/admin/forms/AdminFormComponent';

async function getDictionary(locale: string) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch {
    const dict = await import('@/dictionaries/es.json');
    return dict.default;
  }
}

interface CreatePuppyPageProps {
  params: Promise<{ locale: string }>;
}

export default function CreatePuppyPage({ params }: CreatePuppyPageProps) {
  const { locale } = use(params);
  const router = useRouter();
  const [dict, setDict] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useState(() => {
    getDictionary(locale).then(setDict);
  });

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      console.log('Creating puppy with data:', formData);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push(`/${locale}/admin/puppys`);
    } catch (error) {
      console.error('Error creating puppy:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/${locale}/admin/puppys`);
  };

  if (!dict) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {dict.admin.forms?.create || 'Create'} {dict.admin.puppys || 'Puppy'}
        </h1>
        <p className="text-gray-600">
          {dict.admin.forms?.description}
        </p>
      </div>

      <AdminFormComponent
        dict={dict}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}