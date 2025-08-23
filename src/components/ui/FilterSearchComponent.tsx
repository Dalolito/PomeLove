'use client';

import { useState, useEffect } from 'react';

interface FilterSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function FilterSearchComponent({
  value,
  onChange,
  placeholder = 'Search...',
  label = 'Search',
  className = '',
}: FilterSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-1 text-xs font-medium text-gray-600">{label}</label>
      <input
        type="text"
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
      />
    </div>
  );
}
