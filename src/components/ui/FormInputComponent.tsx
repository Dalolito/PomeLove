interface FormInputProps {
  type: 'text' | 'email' | 'password' | 'date' | 'number';
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export default function FormInputComponent({
  type,
  value,
  onChange,
  label,
  placeholder,
  required = false,
  className = '',
}: FormInputProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}
