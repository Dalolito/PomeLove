interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  className?: string;
}

export default function FormSelectComponent({
  value,
  onChange,
  label,
  placeholder,
  options,
  required = false,
  className = '',
}: FormSelectProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <select
        value={value}
        onChange={e => {
          const val = e.target.value;
          // Convert to number if the option value is a number
          const option = options.find(opt => opt.value.toString() === val);
          onChange(option?.value || val);
        }}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value.toString()}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
