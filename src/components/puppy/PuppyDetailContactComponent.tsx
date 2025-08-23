'use client';

import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';

interface PuppyDetailContactComponentProps {
  puppy: Puppy;
  dict: Dictionary;
  className?: string;
}

export default function PuppyDetailContactComponent({
  puppy,
  dict,
  className = '',
}: PuppyDetailContactComponentProps) {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `${dict.buttons.ask_about_puppy}: ${puppy.name} - ${puppy.category.name}`
    );
    window.open(`https://wa.me/573004439574?text=${message}`, '_blank');
  };

  const handleInstagramContact = () => {
    window.open(
      'https://www.instagram.com/pomelove_korea?igsh=dTA4Njl5aXY5bnRk&utm_source=qr',
      '_blank'
    );
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
        <p className="text-sm text-gray-500">📞 +57 300 443 9574</p>
        <p className="text-sm text-gray-500">
          📍 {dict.footer?.location || 'Medellín, Colombia'}
        </p>
      </div>
    </div>
  );
}
