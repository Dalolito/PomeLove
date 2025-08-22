'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dictionary } from '@/lib/types/dictionary';
import DeleteConfirmationModal from '@/components/ui/DeleteConfirmationModal';
import { deleteCategoryAction, getCategoryWithPuppiesAction } from '@/actions/categoryActions';

interface AdminCategoriesTableButtonsProps {
  categoryId: string;
  categoryName: string;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function AdminCategoriesTableButtonsComponent({
  categoryId,
  categoryName,
  dict,
  locale,
  className = '',
}: AdminCategoriesTableButtonsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [puppiesCount, setPuppiesCount] = useState(0);

  const handleEdit = () => {
    router.push(`/${locale}/admin/categories/${categoryId}/edit`);
  };

  const handleDeleteClick = async () => {
    try {
      const result = await getCategoryWithPuppiesAction(categoryId);
      if (result.success && result.puppiesCount !== undefined) {
        setPuppiesCount(result.puppiesCount);
        setShowDeleteModal(true);
      } else {
        console.error('Error getting category information:', result.error);
      }
    } catch (error) {
      console.error('Error getting category information:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteCategoryAction(categoryId);
      if (result.success) {
        setShowDeleteModal(false);
      } else {
        console.error('Error deleting category:', result.error);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={handleEdit}
        className="rounded-lg border border-blue-300 p-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-900"
        title={`Editar ${categoryName}`}
        type="button"
      >
        <span className="text-sm">✏️</span>
      </button>

      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="rounded-lg border border-red-300 p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-50"
        title={`Eliminar ${categoryName}`}
        type="button"
      >
        {isDeleting ? (
          <div className="h-4 w-4 animate-spin rounded-full border border-red-600 border-t-transparent" />
        ) : (
          <span className="text-sm">🗑️</span>
        )}
      </button>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={categoryName}
        dict={dict}
        isLoading={isDeleting}
        customTitle="Confirmar Eliminación de Categoría"
        customMessage="¿Estás seguro de que quieres eliminar la categoría"
        customWarning={
          puppiesCount > 0
            ? `Esta acción eliminará la categoría y TODAS las mascotas asociadas. Esta acción no se puede deshacer. ⚠️ ${puppiesCount} ${
                puppiesCount === 1 ? 'mascota' : 'mascotas'
              } será eliminada.`
            : "Esta acción eliminará la categoría y TODAS las mascotas asociadas. Esta acción no se puede deshacer."
        }
        customDeletingText="Eliminando categoría y mascotas..."
      />
    </div>
  );
}
