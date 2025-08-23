import AdminFormSingleImageUploadComponent from '@/components/admin/forms/AdminFormSingleImageUploadComponent';
import { Dictionary } from '@/lib/types/dictionary';
import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';

interface ParentsData {
  fatherImage: MediaFile | null;
  motherImage: MediaFile | null;
}

interface AdminFormParentsComponentProps {
  data: ParentsData;
  dict: Dictionary;
  onChange: (field: keyof ParentsData, value: MediaFile | null) => void;
  className?: string;
}

export default function AdminFormParentsComponent({
  data,
  dict,
  onChange,
  className = '',
}: AdminFormParentsComponentProps) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      {/* Header Section */}
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          {dict.admin.forms.sections.parents}
        </h3>
        <p className="mx-auto max-w-2xl text-sm text-gray-600">
          {dict.admin.forms.sections.parentsDescription}
        </p>
      </div>

      {/* Upload Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Father Section */}
        <div className="flex flex-col items-center p-4">
          <div className="w-full max-w-sm">
            <AdminFormSingleImageUploadComponent
              label={dict.admin.forms.fields.fatherImage}
              description={dict.admin.forms.fields.fatherImage}
              value={data.fatherImage}
              onChange={file => onChange('fatherImage', file)}
              dict={dict}
              maxFileSize={5}
              uploadType="parents"
              className="text-center"
            />
          </div>
        </div>

        {/* Mother Section */}
        <div className="flex flex-col items-center p-4">
          <div className="w-full max-w-sm">
            <AdminFormSingleImageUploadComponent
              label={dict.admin.forms.fields.motherImage}
              description={dict.admin.forms.fields.motherImage}
              value={data.motherImage}
              onChange={file => onChange('motherImage', file)}
              dict={dict}
              maxFileSize={5}
              uploadType="parents"
              className="text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
