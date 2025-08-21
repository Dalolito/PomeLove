'use client';

interface ErrorMessagesProps {
  errors: string[];
  className?: string;
}

export default function ErrorMessagesComponent({
  errors,
  className = '',
}: ErrorMessagesProps) {
  if (errors.length === 0) return null;

  return (
    <div
      className={`rounded-lg border border-red-200 bg-red-50 p-3 ${className}`}
    >
      {errors.map((error, index) => (
        <p key={index} className="text-sm text-red-700">
          {error}
        </p>
      ))}
    </div>
  );
}
