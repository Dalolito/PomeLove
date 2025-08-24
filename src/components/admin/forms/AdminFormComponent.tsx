'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import AdminFormBasicInfoComponent from '@/components/admin/forms/AdminFormBasicInfoComponent';
import AdminFormParentsComponent from '@/components/admin/forms/AdminFormParentsComponent';
import AdminFormUploadMediaComponent from '@/components/admin/forms/AdminFormUploadMediaComponent';
import AdminFormActionButtonsComponent from '@/components/admin/forms/AdminFormActionButtonsComponent';
import { createPuppyAction } from '@/actions/puppyActions';

interface AdminFormComponentProps {
  dict: any;
  categories: { id: string; name: string }[];
  locale: string;
  className?: string;
}

export default function AdminFormComponent({
  dict,
  categories,
  locale,
  className = '',
}: AdminFormComponentProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<{
    name: string;
    description_es: string;
    description_en: string;
    birthDate: string;
    gender: 'male' | 'female';
    categoryId: string;
    media: MediaFile[];
    fatherImage: MediaFile | null;
    motherImage: MediaFile | null;
  }>({
    name: '',
    description_es: '',
    description_en: '',
    birthDate: '',
    gender: 'male',
    categoryId: '',
    media: [],
    fatherImage: null,
    motherImage: null,
  });

  const handleBasicInfoChange = (
    field:
      | 'name'
      | 'description_es'
      | 'description_en'
      | 'birthDate'
      | 'gender'
      | 'categoryId',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMediaChange = useCallback((files: MediaFile[]) => {
    setFormData(prev => ({
      ...prev,
      media: files,
    }));
  }, []);

  const handleParentsChange = useCallback(
    (field: 'fatherImage' | 'motherImage', value: MediaFile | null) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await createPuppyAction({
        name: formData.name,
        description_es: formData.description_es,
        description_en: formData.description_en,
        birthDate: formData.birthDate,
        gender: formData.gender,
        categoryId: formData.categoryId,
        media: formData.media,
        fatherImage: formData.fatherImage?.url || null,
        motherImage: formData.motherImage?.url || null,
      });

      if (result.success) {
        router.push(`/${locale}/admin/puppys`);
      } else {
        const errorKey = result.error as keyof typeof dict.admin.forms.errors;
        setError(
          dict.admin.forms.errors?.[errorKey] ||
            dict.admin.forms.errors?.createFailed ||
            'Error creating pet'
        );
      }
    } catch {
      setError(dict.admin.forms.errors?.createFailed || 'Error creating pet');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/${locale}/admin/puppys`);
  };

  return (
    <div className={`mx-auto max-w-4xl ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <AdminFormBasicInfoComponent
          data={{
            name: formData.name,
            description_es: formData.description_es,
            description_en: formData.description_en,
            birthDate: formData.birthDate,
            gender: formData.gender,
            categoryId: formData.categoryId,
          }}
          categories={categories}
          dict={dict}
          onChange={handleBasicInfoChange}
        />

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <AdminFormUploadMediaComponent
            dict={dict}
            maxFiles={10}
            maxFileSize={50}
            onMediaChange={handleMediaChange}
          />
        </div>

        <AdminFormParentsComponent
          data={{
            fatherImage: formData.fatherImage,
            motherImage: formData.motherImage,
          }}
          dict={dict}
          onChange={handleParentsChange}
        />

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
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
