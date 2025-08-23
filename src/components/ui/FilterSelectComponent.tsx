interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
}

export default function FilterSelectComponent({
  value,
  onChange,
  label,
  placeholder,
  options,
  className = '',
}: FilterSelectProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-xs font-medium text-gray-600">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
