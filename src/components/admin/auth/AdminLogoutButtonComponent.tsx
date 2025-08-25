'use client';

import { logoutAction } from '@/actions/authActions';
import { Dictionary } from '@/lib/types/dictionary';

interface AdminLogoutButtonProps {
  dict: Dictionary;
  className?: string;
}

export default function AdminLogoutButtonComponent({
  dict,
  className = '',
}: AdminLogoutButtonProps) {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={`rounded-lg p-2 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 ${className}`}
        title="Cerrar Sesión"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </form>
  );
}
