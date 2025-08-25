'use client';

import AdminCategoriesTableButtonsComponent from '@/components/admin/table/AdminCategoriesTableButtonsComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Category } from '@/domain/entities/Category';

interface AdminCategoriesTableRowProps {
  category: Category;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function AdminCategoriesTableRowComponent({
  category,
  dict,
  locale,
  className = '',
}: AdminCategoriesTableRowProps) {
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
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`}>
      <td className="px-4 py-4 sm:px-6">
        <div className="font-medium text-gray-900">{category.name}</div>
      </td>

      <td className="px-4 py-4 sm:px-6">
        <div className="text-sm text-gray-900">
          {formatPrice(category.minPriceCOP, 'COP')}
        </div>
      </td>

      <td className="px-4 py-4 sm:px-6">
        <div className="text-sm text-gray-900">
          {formatPrice(category.minPriceUSD, 'USD')}
        </div>
      </td>

      <td className="px-4 py-4 text-center sm:px-6">
        <AdminCategoriesTableButtonsComponent
          categoryId={category.id}
          categoryName={category.name}
          dict={dict}
          locale={locale}
        />
      </td>
    </tr>
  );
}
