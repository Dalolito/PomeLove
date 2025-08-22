'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/types/dictionary';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { deletePuppyAction } from '@/actions/puppyActions';

interface AdminPuppiesTableButtonsProps {
  puppyId: string;
  puppyName: string;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function AdminPuppiesTableButtonsComponent({
  puppyId,
  puppyName,
  dict,
  locale,
  className = '',
}: AdminPuppiesTableButtonsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    router.push(`/${locale}/admin/puppys/${puppyId}/edit`);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deletePuppyAction(puppyId);
      if (result.success) {
        setShowDeleteModal(false);
      } else {
        console.error('Error deleting puppy:', result.error);
      }
    } catch (error) {
      console.error('Error deleting puppy:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 ${className}`}>
      {/* Editar Button */}
      <button
        onClick={handleEdit}
        className="flex h-12 w-full items-center justify-center rounded-lg border border-blue-300 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-900 sm:h-8 sm:w-8"
        title={`Editar ${puppyName}`}
        type="button"
      >
        <span className="text-base sm:text-sm">✏️</span>
      </button>

      {/* Eliminar Button */}
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="flex h-12 w-full items-center justify-center rounded-lg border border-red-300 text-red-600 transition-colors hover:bg-red-50 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-50 sm:h-8 sm:w-8"
        title={`Eliminar ${puppyName}`}
        type="button"
      >
        {isDeleting ? (
          <div className="h-4 w-4 animate-spin rounded-full border border-red-600 border-t-transparent sm:h-3 sm:w-3" />
        ) : (
          <span className="text-base sm:text-sm">🗑️</span>
        )}
      </button>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        puppyName={puppyName}
        dict={dict}
        isLoading={isDeleting}
      />
    </div>
  );
}