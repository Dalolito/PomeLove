'use client';

import { useState } from 'react';
import AdminFormUploadMediaComponent from './adminFormUploadMediaComponent';
import AdminFormActionButtonsComponent from './AdminFormActionButtonsComponent';
import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';

interface AdminFormComponentProps {
  dict: any;
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

interface FormData {
  media: MediaFile[];
}

export default function AdminFormComponent({
  dict,
  onSubmit,
  onCancel,
  isSubmitting = false,
  className = ''
}: AdminFormComponentProps) {
  const [formData, setFormData] = useState<FormData>({
    media: []
  });

  const handleMediaChange = (files: MediaFile[]) => {
    setFormData(prev => ({
      ...prev,
      media: files
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
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Media Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <AdminFormUploadMediaComponent
            dict={dict}
            maxFiles={10}
            maxFileSize={50}
            onMediaChange={handleMediaChange}
          />
        </div>

        {/* Form Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <AdminFormActionButtonsComponent
            primaryText={dict.admin.forms?.save || 'Save'}
            secondaryText={dict.admin.forms?.cancel || 'Cancel'}
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