'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { Puppy } from '@/domain/entities/Puppy';
import AdminFormBasicInfoComponent from '@/components/admin/forms/AdminFormBasicInfoComponent';
import AdminFormParentsComponent from '@/components/admin/forms/AdminFormParentsComponent';
import AdminFormUploadMediaComponent from '@/components/admin/forms/AdminFormUploadMediaComponent';
import AdminFormActionButtonsComponent from '@/components/admin/forms/AdminFormActionButtonsComponent';
import { updatePuppyAction } from '@/actions/puppyActions';

interface AdminEditFormComponentProps {
  puppy: Puppy;
  dict: any;
  categories: { id: string; name: string }[];
  locale: string;
  className?: string;
}

export default function AdminEditFormComponent({
  puppy,
  dict,
  categories,
  locale,
  className = '',
}: AdminEditFormComponentProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    birthDate: string;
    gender: 'male' | 'female';
    categoryId: string;
    media: MediaFile[];
    fatherImage: MediaFile | null;
    motherImage: MediaFile | null;
    available: boolean;
  }>({
    name: '',
    description: '',
    birthDate: '',
    gender: 'male',
    categoryId: '',
    media: [],
    fatherImage: null,
    motherImage: null,
    available: true,
  });

  useEffect(() => {
    if (puppy) {
      const birthDateString = new Date(puppy.birthDate)
        .toISOString()
        .split('T')[0];

      const fatherImageFile: MediaFile | null = puppy.fatherImage
        ? {
            id: 'father-' + Math.random().toString(36).substr(2, 9),
            url: puppy.fatherImage,
            type: 'image',
            name: 'Father Image',
            size: 0,
            isUploaded: true,
          }
        : null;

      const motherImageFile: MediaFile | null = puppy.motherImage
        ? {
            id: 'mother-' + Math.random().toString(36).substr(2, 9),
            url: puppy.motherImage,
            type: 'image',
            name: 'Mother Image',
            size: 0,
            isUploaded: true,
          }
        : null;

      setFormData({
        name: puppy.name,
        description: puppy.description,
        birthDate: birthDateString,
        gender: puppy.gender,
        categoryId: puppy.category.id,
        media: puppy.media || [],
        fatherImage: fatherImageFile,
        motherImage: motherImageFile,
        available: puppy.available,
      });
    }
  }, [puppy]);

  const handleBasicInfoChange = (
    field: 'name' | 'description' | 'birthDate' | 'gender' | 'categoryId',
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
      const result = await updatePuppyAction(puppy.id!, {
        name: formData.name,
        description: formData.description,
        birthDate: formData.birthDate,
        gender: formData.gender,
        categoryId: formData.categoryId,
        media: formData.media,
        fatherImage: formData.fatherImage?.url || null,
        motherImage: formData.motherImage?.url || null,
        available: formData.available,
      });

      if (result.success) {
        router.push(`/${locale}/admin/puppys`);
      } else {
        const errorKey = result.error as keyof typeof dict.admin.forms.errors;
        setError(
          dict.admin.forms.errors?.[errorKey] ||
            dict.admin.forms.errors?.updateFailed ||
            dict.admin.forms.errors?.updateFailed ||
            'Error updating pet'
        );
      }
    } catch {
      setError(dict.admin.forms.errors?.updateFailed || 'Error updating pet');
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
            description: formData.description,
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
            initialFiles={formData.media}
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
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            {dict.admin.forms.fields?.availability || 'Availability'}
          </h3>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.available}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {dict.admin.table.status.available}
            </span>
          </label>
        </div>

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
