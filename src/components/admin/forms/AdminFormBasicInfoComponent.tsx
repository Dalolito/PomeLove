'use client';

import { Dictionary } from '@/lib/types/dictionary';
import FormInputComponent from '@/components/ui/FormInputComponent';
import FormSelectComponent from '@/components/ui/FormSelectComponent';
import FormTextareaComponent from '@/components/ui/FormTextareaComponent';

interface FormData {
  name: string;
  description_es: string;
  description_en: string;
  ageYears: number;
  ageMonths: number;
  gender: 'male' | 'female';
  categoryId: number | '';
}

interface AdminFormBasicInfoComponentProps {
  data: FormData;
  categories: { id: number; name: string }[];
  dict: Dictionary;
  onChange: (field: keyof FormData, value: string | number) => void;
  className?: string;
}

export default function AdminFormBasicInfoComponent({
  data,
  categories,
  dict,
  onChange,
  className = '',
}: AdminFormBasicInfoComponentProps) {
  const genderOptions = [
    { value: 'male', label: dict.admin.forms.gender.male },
    { value: 'female', label: dict.admin.forms.gender.female },
  ];

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        {dict.admin.forms.basicInfo}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInputComponent
          type="text"
          value={data.name}
          onChange={value => onChange('name', value)}
          label={dict.admin.forms.fields.name}
          placeholder={dict.admin.forms.placeholders.name}
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <FormInputComponent
            type="number"
            value={data.ageYears.toString()}
            onChange={value => onChange('ageYears', parseInt(value) || 0)}
            label={dict.admin.forms.fields.ageYears}
            placeholder="0"
            min="0"
            max="20"
            required
          />
          <FormInputComponent
            type="number"
            value={data.ageMonths.toString()}
            onChange={value => onChange('ageMonths', parseInt(value) || 0)}
            label={dict.admin.forms.fields.ageMonths}
            placeholder="0"
            min="0"
            max="11"
            required
          />
        </div>

        <FormSelectComponent
          value={data.gender}
          onChange={value => onChange('gender', value)}
          label={dict.admin.forms.fields.gender}
          placeholder={dict.admin.forms.placeholders.gender}
          options={genderOptions}
          required
        />

        <FormSelectComponent
          value={data.categoryId}
          onChange={value => onChange('categoryId', value)}
          label={dict.admin.forms.fields.category}
          placeholder={dict.admin.forms.placeholders.category}
          options={categoryOptions}
          required
        />
      </div>

      <div className="mt-4 space-y-4">
        <FormTextareaComponent
          value={data.description_es}
          onChange={value => onChange('description_es', value)}
          label={`${dict.admin.forms.fields.description} (Español)`}
          placeholder={dict.admin.forms.placeholders.description}
          required
          maxLength={1000}
          showCharCount={true}
        />

        <FormTextareaComponent
          value={data.description_en}
          onChange={value => onChange('description_en', value)}
          label={`${dict.admin.forms.fields.description} (English)`}
          placeholder={dict.admin.forms.placeholders.description}
          required
          maxLength={1000}
          showCharCount={true}
        />
      </div>
    </div>
  );
}
