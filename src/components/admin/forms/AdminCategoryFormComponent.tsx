'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminFormActionButtonsComponent from './AdminFormActionButtonsComponent';
import FormInputComponent from '@/components/ui/FormInputComponent';
import { createCategoryAction } from '@/actions/categoryActions';

interface AdminCategoryFormComponentProps {
  dict: any;
  locale: string;
  className?: string;
}

export default function AdminCategoryFormComponent({
  dict,
  locale,
  className = '',
}: AdminCategoryFormComponentProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    minPrice: '',
  });

  const handleFieldChange = (field: 'name' | 'minPrice', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await createCategoryAction({
        name: formData.name,
        minPrice: parseFloat(formData.minPrice),
      });

      if (result.success) {
        router.push(`/${locale}/admin/categories`);
      } else {
        const errorKey = result.error as keyof typeof dict.admin.forms.errors;
        setError(
          dict.admin.forms.errors?.[errorKey] ||
            dict.admin.forms.errors?.createFailed ||
            'Error al crear la categoría'
        );
      }
    } catch {
      setError(
        dict.admin.forms.errors?.createFailed || 'Error al crear la categoría'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(`/${locale}/admin/categories`);
  };

  return (
    <div className={`mx-auto max-w-2xl ${className}`}>
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

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">
            {dict.admin.categories?.basicInfo || 'Category Information'}
          </h3>

          <div className="space-y-4">
            <FormInputComponent
              type="text"
              value={formData.name}
              onChange={value => handleFieldChange('name', value)}
              label={dict.admin.categories?.fields?.name || 'Name'}
              placeholder={dict.admin.categories?.placeholders?.name || 'Enter category name'}
              required
            />

            <FormInputComponent
              type="number"
              value={formData.minPrice}
              onChange={value => handleFieldChange('minPrice', value)}
              label={dict.admin.categories?.fields?.minPrice || 'Minimum Price'}
              placeholder={dict.admin.categories?.placeholders?.minPrice || 'Enter minimum price'}
              required
            />
          </div>
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
