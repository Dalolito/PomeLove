'use client';

import { logoutAction } from '@/actions/authActions';

interface LogoutButtonProps {
  dict: any;
  className?: string;
}

export default function LogoutButtonComponent({
  dict,
  className = '',
}: LogoutButtonProps) {
  const handleLogout = async () => {
    if (confirm(dict.admin.auth.logout.confirm)) {
      await logoutAction();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 ${className}`}
      title={dict.admin.auth.logout.button}
    >
      {dict.admin.auth.logout.button}
    </button>
  );
}
