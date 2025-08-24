import { Dictionary } from '@/lib/types/dictionary';
import PuppyCarouselImageComponent from '@/components/ui/PuppyCarouselImageComponent';
import { validateImageUrl } from '@/lib/utils/imageUtils';

interface PuppyDetailParentsComponentProps {
  fatherImage: string | null;
  motherImage: string | null;
  dict: Dictionary;
  className?: string;
}

export default function PuppyDetailParentsComponent({
  fatherImage,
  motherImage,
  dict,
  className = '',
}: PuppyDetailParentsComponentProps) {
  const validatedFatherImage = validateImageUrl(fatherImage);
  const validatedMotherImage = validateImageUrl(motherImage);

  const hasValidParentImages =
    validatedFatherImage !== '/placeholder-puppy.svg' ||
    validatedMotherImage !== '/placeholder-puppy.svg';

  if (!hasValidParentImages) {
    return null;
  }

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        {dict.admin.forms.sections.parents}
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {validatedFatherImage !== '/placeholder-puppy.svg' && (
          <div className="text-center">
            <h3 className="mb-3 font-medium text-gray-700">
              {dict.admin.forms.fields.fatherImage}
            </h3>
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <PuppyCarouselImageComponent
                src={validatedFatherImage}
                alt="Padre"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {validatedMotherImage !== '/placeholder-puppy.svg' && (
          <div className="text-center">
            <h3 className="mb-3 font-medium text-gray-700">
              {dict.admin.forms.fields.motherImage}
            </h3>
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <PuppyCarouselImageComponent
                src={validatedMotherImage}
                alt="Madre"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
