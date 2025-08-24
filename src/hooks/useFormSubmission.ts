'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/types/dictionary';

interface UseFormSubmissionProps<T> {
  dict: Dictionary;
  initialData: T;
  submitAction: (
    data: T
  ) => Promise<{ success: boolean; error?: string; data?: unknown }>;
  onSuccess?: (result: unknown) => void;
  onError?: (error: string) => void;
  redirectOnSuccess?: string;
  locale?: string;
}

export function useFormSubmission<T>({
  dict,
  initialData,
  submitAction,
  onSuccess,
  onError,
  redirectOnSuccess,
  locale,
}: UseFormSubmissionProps<T>) {
  const router = useRouter();
  const [formData, setFormData] = useState<T>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(
    async (event?: React.FormEvent) => {
      if (event) {
        event.preventDefault();
      }

      setIsSubmitting(true);
      setError('');

      try {
        const result = await submitAction(formData);

        if (result.success) {
          onSuccess?.(result.data);

          if (redirectOnSuccess) {
            const redirectPath = locale
              ? `/${locale}${redirectOnSuccess}`
              : redirectOnSuccess;
            router.push(redirectPath);
          }
        } else {
          const errorMessage = result.error || dict.utils.errors.unexpected;
          setError(errorMessage);
          onError?.(errorMessage);
        }
      } catch {
        const errorMessage = dict.utils.errors.unexpected;
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      submitAction,
      onSuccess,
      onError,
      redirectOnSuccess,
      locale,
      router,
    ]
  );

  const handleFieldChange = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleMultipleFieldsChange = useCallback((updates: Partial<T>) => {
    setFormData(prev => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setError('');
  }, [initialData]);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const handleCancel = useCallback(() => {
    if (locale) {
      router.push(`/${locale}`);
    }
  }, [locale, router]);

  return {
    formData,
    isSubmitting,
    error,
    handleSubmit,
    handleFieldChange,
    handleMultipleFieldsChange,
    resetForm,
    clearError,
    handleCancel,
  };
}
