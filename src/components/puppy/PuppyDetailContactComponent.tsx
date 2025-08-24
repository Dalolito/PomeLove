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
          className="!hover:bg-green-600 !bg-green-500"
        >
          <span className="mr-2 text-xl">💬</span>
          {dict.buttons.ask_about_puppy}
        </PrimaryButtonComponent>

        <PrimaryButtonComponent
          onClick={handleInstagramContact}
          fullWidth
          size="lg"
          variant="outline"
        >
          <span className="mr-2 text-xl">📱</span>
          {dict.home.instagramText}
        </PrimaryButtonComponent>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 text-center">
        <p className="text-sm text-gray-500">📞 {dict.footer.phone}</p>
        <p className="text-sm text-gray-500">📍 {dict.footer.location}</p>
      </div>
    </div>
  );
}
