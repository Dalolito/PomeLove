import { Dictionary } from '@/lib/types/dictionary';

interface BasicInfoData {
  name: string;
  description: string;
  birthDate: string;
  categoryId: string;
}

interface AdminFormBasicInfoComponentProps {
  data: BasicInfoData;
  categories: { id: string; name: string }[];
  dict: Dictionary;
  onChange: (field: keyof BasicInfoData, value: string) => void;
  className?: string;
}

export default function AdminFormBasicInfoComponent({
  data,
  categories,
  dict,
  onChange,
  className = '',
}: AdminFormBasicInfoComponentProps) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        {dict.admin.forms.basicInfo}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {dict.admin.forms.fields.name} *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={e => onChange('name', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder={dict.admin.forms.placeholders.name}
          />
        </div>

        {/* Birth Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {dict.admin.forms.fields.birthDate} *
          </label>
          <input
            type="date"
            value={data.birthDate}
            onChange={e => onChange('birthDate', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {dict.admin.forms.fields.category} *
          </label>
          <select
            value={data.categoryId}
            onChange={e => onChange('categoryId', e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">{dict.admin.forms.placeholders.category}</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {dict.admin.forms.fields.description} *
        </label>
        <textarea
          value={data.description}
          onChange={e => onChange('description', e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={dict.admin.forms.placeholders.description}
        />
      </div>
    </div>
  );
}
