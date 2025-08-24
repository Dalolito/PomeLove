import { Puppy } from '@/domain/entities/Puppy';
import { Dictionary } from '@/lib/types/dictionary';
import PuppyDetailHeaderComponent from '@/components/puppy/PuppyDetailHeaderComponent';
import PuppyDetailGalleryComponent from '@/components/puppy/PuppyDetailGalleryComponent';
import PuppyDetailInfoComponent from '@/components/puppy/PuppyDetailInfoComponent';
import PuppyDetailParentsComponent from '@/components/puppy/PuppyDetailParentsComponent';
import PuppyDetailContactComponent from '@/components/puppy/PuppyDetailContactComponent';

interface PuppyDetailComponentProps {
  puppy: Puppy;
  dict: Dictionary;
  locale: string;
  className?: string;
}

export default function PuppyDetailComponent({
  puppy,
  dict,
  locale,
  className = '',
}: PuppyDetailComponentProps) {
  return (
    <div className={`container mx-auto px-4 py-6 ${className}`}>
      <PuppyDetailHeaderComponent
        puppy={puppy}
        dict={dict}
        locale={locale}
        className="mb-6"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <PuppyDetailGalleryComponent
            media={puppy.media}
            puppyName={puppy.name}
            dict={dict}
          />

          <div className="lg:hidden">
            <PuppyDetailContactComponent
              puppy={puppy}
              dict={dict}
              locale={locale}
            />
          </div>
        </div>

        <div className="space-y-6">
          <PuppyDetailInfoComponent puppy={puppy} dict={dict} locale={locale} />

          <PuppyDetailParentsComponent
            fatherImage={puppy.fatherImage}
            motherImage={puppy.motherImage}
            dict={dict}
          />

          <div className="hidden lg:block">
            <PuppyDetailContactComponent
              puppy={puppy}
              dict={dict}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
