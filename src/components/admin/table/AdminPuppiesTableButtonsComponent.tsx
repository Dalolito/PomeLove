import { Dictionary } from '@/lib/types/dictionary';

interface AdminPuppiesTableButtonsProps {
  puppyId: string;
  puppyName: string;
  dict: Dictionary;
  locale: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  className?: string;
}

export default function AdminPuppiesTableButtonsComponent({
  puppyId,
  puppyName,
  dict,
  locale,
  onView,
  onEdit,
  onDelete,
  isDeleting = false,
  className = '',
}: AdminPuppiesTableButtonsProps) {
  const handleView = () => {
    onView?.(puppyId);
  };

  const handleEdit = () => {
    onEdit?.(puppyId);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${puppyName}?`)) {
      onDelete?.(puppyId);
    }
  };

  return (
    <div className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 ${className}`}>
      {/* Ver Button */}
      <button
        onClick={handleView}
        className="flex h-12 w-full items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:h-8 sm:w-8"
        title={`Ver ${puppyName}`}
        type="button"
      >
        <span className="text-base sm:text-sm">👁️</span>
      </button>

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
        onClick={handleDelete}
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
    </div>
  );
}