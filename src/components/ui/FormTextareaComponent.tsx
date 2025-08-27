interface FormTextareaProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
  maxLength?: number;
  showCharCount?: boolean;
}

export default function FormTextareaComponent({
  value,
  onChange,
  label,
  placeholder,
  required = false,
  rows = 4,
  className = '',
  maxLength,
  showCharCount = false,
}: FormTextareaProps) {
  const charCount = value.length;
  const isOverLimit = maxLength && charCount > maxLength;

  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && '*'}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full resize-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
          isOverLimit ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {showCharCount && maxLength && (
        <div className="mt-1 flex justify-between text-xs">
          <span className={isOverLimit ? 'text-red-600' : 'text-gray-500'}>
            {charCount} / {maxLength} caracteres
          </span>
          {isOverLimit && (
            <span className="font-medium text-red-600">
              ¡Excediste el límite de caracteres!
            </span>
          )}
        </div>
      )}
    </div>
  );
}
