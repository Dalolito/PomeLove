'use client';

import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import { openWhatsAppContact } from '@/lib/utils/whatsappUtils';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';

interface PuppyDetailContactComponentProps {
  puppy: Puppy;
  dict: Dictionary;
  locale?: string;
  className?: string;
}

export default function PuppyDetailContactComponent({
  puppy,
  dict,
  locale = 'es',
  className = '',
}: PuppyDetailContactComponentProps) {
  const handleWhatsAppContact = () => {
    openWhatsAppContact(puppy, dict, locale);
  };

  const handleInstagramContact = () => {
    window.open(dict.footer.instagramUrl, '_blank');
  };

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        {dict.home.contactTitle}
      </h2>

      <p className="mb-6 text-gray-600">{dict.home.contactDescription}</p>

      <div className="space-y-3">
        <PrimaryButtonComponent
          onClick={handleWhatsAppContact}
          fullWidth
          size="lg"
          className="!hover:bg-green-600 !flex !items-center !justify-center !whitespace-nowrap !bg-green-500 !text-base"
        >
          <img
            src="/icons/icon-whatsapp.png"
            alt="WhatsApp"
            className="mr-2 h-7 w-7"
          />
          <span className="whitespace-nowrap">
            {puppy.available
              ? dict.buttons.ask_about_puppy
              : dict.buttons.ask_about_similar}
          </span>
        </PrimaryButtonComponent>

        <PrimaryButtonComponent
          onClick={handleInstagramContact}
          fullWidth
          size="lg"
          className="!flex !items-center !justify-center !border-0 !bg-gradient-to-r !from-purple-500 !to-pink-500 !text-base !text-white hover:!from-purple-600 hover:!to-pink-600"
        >
          <img
            src="/icons/icon-instagram.png"
            alt="Instagram"
            className="mr-2 h-7 w-7"
          />
          {dict.home.instagramText}
        </PrimaryButtonComponent>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 text-center">
        <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {dict.footer.phone}
        </p>
        <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {dict.footer.location}
        </p>
      </div>
    </div>
  );
}
