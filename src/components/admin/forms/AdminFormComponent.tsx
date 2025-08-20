'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminFormUploadMediaComponent from './AdminFormUploadMediaComponent';
import AdminFormBasicInfoComponent from './AdminFormBasicInfoComponent';
import AdminFormParentsComponent from './AdminFormParentsComponent';
import AdminFormActionButtonsComponent from './AdminFormActionButtonsComponent';
import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';
import { createPuppyAction } from '@/actions/puppyActions';

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
  const [error, setError] = useState<string>('');
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
    setError('');
    
    try {
      const result = await createPuppyAction({
        name: formData.name,
        description: formData.description,
        birthDate: formData.birthDate,
        categoryId: formData.categoryId,
        media: formData.media,
        fatherImage: formData.fatherImage?.url || null,
        motherImage: formData.motherImage?.url || null,
      });

      if (result.success) {
        router.push(`/${locale}`);
      } else {
        const errorKey = result.error as keyof typeof dict.admin.forms.errors;
        setError(dict.admin.forms.errors[errorKey] || dict.admin.forms.errors.createFailed);
      }
    } catch (error) {
      setError(dict.admin.forms.errors.createFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/${locale}`);
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
        
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