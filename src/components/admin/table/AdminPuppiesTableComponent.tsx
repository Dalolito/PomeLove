'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPuppiesTableElementComponent from './AdminPuppiesTableElementComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { Puppy } from '@/domain/entities/Puppy';
import { replaceText } from '@/lib/utils/textUtils';

interface AdminPuppiesTableComponentProps {
  puppies: Puppy[];
  dict: Dictionary;
  locale: string;
  loading?: boolean;
  className?: string;
}

export default function AdminPuppiesTableComponent({
  puppies,
  dict,
  locale,
  loading = false,
  className = '',
}: AdminPuppiesTableComponentProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const handleView = (id: string) => {
    router.push(`/${locale}/admin/puppys/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/${locale}/admin/puppys/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      // TODO: Implementar delete action
      console.log('Delete puppy:', id);
      // await deletePuppyAction(id);
    } catch (error) {
      console.error('Error deleting puppy:', error);
    } finally {
      setDeletingId('');
    }
  };

  if (loading) {
    return (
      <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
            <span className="text-gray-600">{dict.admin.table.loading}</span>
          </div>
        </div>
      </div>
    );
  }

  if (puppies.length === 0) {
    return (
      <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
        <div className="flex flex-col items-center justify-center p-12">
          <div className="mb-4 text-6xl">🐕</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {dict.admin.table.empty.title}
          </h3>
          <p className="mb-6 text-center text-gray-600">
            {dict.admin.table.empty.description}
          </p>
          <button
            onClick={() => router.push(`/${locale}/admin/puppys/create`)}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            {dict.admin.table.empty.button}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {dict.admin.table.title}
            </h2>
            <p className="text-sm text-gray-600">
              {replaceText(dict.admin.table.subtitle, { count: puppies.length })}
            </p>
          </div>
          <button
            onClick={() => router.push(`/${locale}/admin/puppys/create`)}
            className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 sm:w-auto"
          >
            + {dict.admin.table.actions.newPet}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dict.admin.table.headers.image}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dict.admin.table.headers.name}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dict.admin.table.headers.category}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dict.admin.table.headers.birthDate}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dict.admin.table.headers.description}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dict.admin.table.headers.available}
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dict.admin.table.headers.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {puppies.map((puppy) => (
                <AdminPuppiesTableElementComponent
                  key={puppy.id}
                  puppy={puppy}
                  dict={dict}
                  locale={locale}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={deletingId === puppy.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}