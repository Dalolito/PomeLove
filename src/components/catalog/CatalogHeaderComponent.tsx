import { Category } from '@/domain/entities/Category';
import { Dictionary } from '@/lib/types/dictionary';
import { replaceText } from '@/lib/utils/textUtils';

interface CatalogHeaderComponentProps {
  selectedCategory: Category | null;
  totalPuppies: number;
  hasActiveFilters: boolean;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function CatalogHeaderComponent({
  selectedCategory,
  totalPuppies,
  hasActiveFilters,
  dict,
  locale,
  className = '',
}: CatalogHeaderComponentProps) {
  const formatPrice = (price: number, currency: 'COP' | 'USD'): string => {
    if (currency === 'COP') {
      return (
        new Intl.NumberFormat('es-CO', {
          minimumFractionDigits: 0,
        }).format(price) + ' COP'
      );
    } else {
      return (
        'US$' +
        new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
        }).format(price)
      );
    }
  };

  return (
    <div className={`text-center ${className}`}>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
        {dict.catalog.title}
      </h1>

      {selectedCategory ? (
        <div className="mb-4">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 shadow-lg">
            <span className="text-lg font-semibold text-white">
              {selectedCategory.name} {dict.catalog.fromPrice}{' '}
              {formatPrice(
                locale === 'es'
                  ? selectedCategory.minPriceCOP
                  : selectedCategory.minPriceUSD,
                locale === 'es' ? 'COP' : 'USD'
              )}
            </span>
          </div>
        </div>
      ) : (
        <p className="mb-6 text-lg text-gray-600 lg:text-xl">
          {dict.catalog.subtitle}
        </p>
      )}

      <div className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">
          {replaceText(dict.catalog.resultsCount, {
            count: totalPuppies,
          })}
        </span>
      </div>
    </div>
  );
}
