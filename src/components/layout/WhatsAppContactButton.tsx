'use client';

import React from 'react';
import Image from 'next/image';
import { Dictionary } from '@/lib/types/dictionary';
import { openBasicWhatsAppContact } from '@/lib/utils/whatsappUtils';

interface WhatsAppContactButtonProps {
  dict: Dictionary;
  className?: string;
}

export default function WhatsAppContactButton({
  dict,
  className = '',
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
      <Image
        src="/icons/icon-whatsapp.png"
        alt="WhatsApp"
        width={20}
        height={20}
        className="h-5 w-5"
      />
    </button>
  );
}
