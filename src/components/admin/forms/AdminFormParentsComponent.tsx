import AdminFormSingleImageUploadComponent from './AdminFormSingleImageUploadComponent';
import { MediaFile } from '@/application/useCases/admin/MediaUploadUseCase';

interface ParentsData {
  fatherImage: MediaFile | null;
  motherImage: MediaFile | null;
}

interface AdminFormParentsComponentProps {
  data: ParentsData;
  dict: any;
  onChange: (field: keyof ParentsData, value: MediaFile | null) => void;
  className?: string;
}

export default function AdminFormParentsComponent({
  data,
  dict,
  onChange,
  className = ''
}: AdminFormParentsComponentProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {dict.admin.forms.sections.parents}
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        {dict.admin.forms.sections.parentsDescription}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminFormSingleImageUploadComponent
          label={dict.admin.forms.fields.fatherImage}
          description={dict.admin.forms.fields.fatherImage}
          value={data.fatherImage}
          onChange={(file) => onChange('fatherImage', file)}
          dict={dict}
          maxFileSize={5}
        />
        
        <AdminFormSingleImageUploadComponent
          label={dict.admin.forms.fields.motherImage}
          description={dict.admin.forms.fields.motherImage}
          value={data.motherImage}
          onChange={(file) => onChange('motherImage', file)}
          dict={dict}
          maxFileSize={5}
        />
      </div>
    </div>
  );
}
