'use client';

import Image from 'next/image';
import { Dictionary } from '@/lib/types/dictionary';
import { openBasicWhatsAppContact } from '@/lib/utils/whatsappUtils';

interface HomeWhatsAppButtonProps {
  dict: Dictionary;
}

export default function HomeWhatsAppButton({ dict }: HomeWhatsAppButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion();
    }
    openBasicWhatsAppContact(dict);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-red-500 shadow-lg transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl active:scale-95"
    >
      <Image
        src="/icons/icon-whatsapp.png"
        alt="WhatsApp"
        width={40}
        height={40}
        className="h-10 w-10"
      />
      {dict.home.whatsappText}
    </button>
  );
}
