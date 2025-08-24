'use client';

import React from 'react';
import { Dictionary } from '@/lib/types/dictionary';
import { openBasicWhatsAppContact } from '@/lib/utils/whatsappUtils';

interface WhatsAppContactButtonProps {
  dict: Dictionary;
  className?: string;
  children?: React.ReactNode;
}

export default function WhatsAppContactButton({
  dict,
  className = '',
  children,
}: WhatsAppContactButtonProps) {
  const handleClick = () => {
    openBasicWhatsAppContact(dict);
  };

  return (
    <button
      onClick={handleClick}
      className={`group flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 transition-colors hover:bg-red-500 ${className}`}
      title="WhatsApp"
    >
      {children}
    </button>
  );
}
