'use client';

import { useState } from 'react';
import AdminFormUploadMediaComponent from './AdminFormUploadMediaComponent';
import AdminFormBasicInfoComponent from './AdminFormBasicInfoComponent';
import AdminFormParentsComponent from './AdminFormParentsComponent';
import AdminFormActionButtonsComponent from './AdminFormActionButtonsComponent';
import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';

interface AdminFormComponentProps {
  dict: any;
  categories?: { id: string; name: string }[];
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
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
  categories = [],
  onSubmit,
  onCancel,
  isSubmitting = false,
  className = ''
}: AdminFormComponentProps) {
  if (!dict || !dict.admin || !dict.admin.forms) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    birthDate: '',
    categoryId: '',
    media: [],
    fatherImage: null,
    motherImage: null
  });

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.(formData);
  };

  const handleCancel = () => {
    onCancel?.();
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