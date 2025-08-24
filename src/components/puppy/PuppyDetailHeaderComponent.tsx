import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import PrimaryButtonComponent from '@/components/ui/PrimaryButtonComponent';

interface PuppyDetailHeaderComponentProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function PuppyDetailHeaderComponent({
  puppy,
  dict,
  locale,
  className = '',
}: PuppyDetailHeaderComponentProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`border-b border-gray-200 pb-6 ${className}`}>
      <nav className="mb-4 flex items-center text-sm text-gray-500">
        <a href={`/${locale}`} className="hover:text-gray-700">
          {dict.navigation.home}
        </a>
        <span className="mx-2">›</span>
        <a href={`/${locale}/catalog`} className="hover:text-gray-700">
          {dict.navigation.catalog}
        </a>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{puppy.name}</span>
      </nav>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 shadow-sm">
            <span className="text-sm font-medium text-white">
              {puppy.category.name} - {dict.catalog.fromPrice}{' '}
              {formatPrice(puppy.category.minPrice)}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {puppy.name}
          </h1>
        </div>

        <div className="flex gap-3">
          <PrimaryButtonComponent
            href={`/${locale}/catalog`}
            size="md"
            variant="outline"
            className="whitespace-nowrap"
          >
            ← {dict.buttons.back_to_catalog}
          </PrimaryButtonComponent>
        </div>
      </div>
    </div>
  );
}
