'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminFormUploadMediaComponent from './AdminFormUploadMediaComponent';
import AdminFormBasicInfoComponent from './AdminFormBasicInfoComponent';
import AdminFormParentsComponent from './AdminFormParentsComponent';
import AdminFormActionButtonsComponent from './AdminFormActionButtonsComponent';
import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';

interface AdminFormComponentProps {
  dict: any;
  locale: string;
  categories?: { id: string; name: string }[];
  className?: string;
}

interface FormData {
  name: string;
  description: string;
  birthDate: string;
  categoryId: string;
  media: MediaFile[];
  fatherImage: MediaFile | null;
  motherImage: MediaFile | null;
}

export default function AdminFormComponent({
  dict,
  locale,
  categories = [],
  className = ''
}: AdminFormComponentProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    birthDate: '',
    categoryId: '1', // for tests
    media: [],
    fatherImage: null,
    motherImage: null
  });

  if (!dict || !dict.admin || !dict.admin.forms) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const handleBasicInfoChange = (field: keyof Pick<FormData, 'name' | 'description' | 'birthDate' | 'categoryId'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMediaChange = (files: MediaFile[]) => {
    setFormData(prev => ({
      ...prev,
      media: files
    }));
  };

  const handleParentsChange = (field: keyof Pick<FormData, 'fatherImage' | 'motherImage'>, value: MediaFile | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const createPuppyData = {
        name: formData.name,
        description: formData.description,
        birthDate: formData.birthDate,
        categoryId: formData.categoryId,
        media: formData.media,
        fatherImage: formData.fatherImage?.url || null,
        motherImage: formData.motherImage?.url || null,
      };

      const response = await fetch('/api/puppies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createPuppyData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to create puppy');
      }

      console.log('Puppy created successfully:', result.data);
      router.push(`/${locale}/admin/puppys`);
    } catch (error) {
      console.error('Error creating puppy:', error);
      alert('Error creating puppy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/${locale}/admin/puppys`);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Information Section */}
        <AdminFormBasicInfoComponent
          data={{
            name: formData.name,
            description: formData.description,
            birthDate: formData.birthDate,
            categoryId: formData.categoryId
          }}
          categories={categories}
          dict={dict}
          onChange={handleBasicInfoChange}
        />

        {/* Media Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <AdminFormUploadMediaComponent
            dict={dict}
            maxFiles={10}
            maxFileSize={50}
            onMediaChange={handleMediaChange}
          />
        </div>

        {/* Parent Images Section */}
        <AdminFormParentsComponent
          data={{
            fatherImage: formData.fatherImage,
            motherImage: formData.motherImage
          }}
          dict={dict}
          onChange={handleParentsChange}
        />

        {/* Form Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <AdminFormActionButtonsComponent
            primaryText={dict.admin.forms.save}
            secondaryText={dict.admin.forms.cancel}
            primaryType="submit"
            onSecondaryClick={handleCancel}
            primaryLoading={isSubmitting}
            secondaryDisabled={isSubmitting}
          />
        </div>

      </form>
    </div>
  );
}