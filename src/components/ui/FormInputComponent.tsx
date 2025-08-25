interface FormInputProps {
  type: 'text' | 'email' | 'password' | 'date' | 'number';
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FormInputComponent({
  type,
  value,
  onChange,
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className = '',
}: FormInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}
