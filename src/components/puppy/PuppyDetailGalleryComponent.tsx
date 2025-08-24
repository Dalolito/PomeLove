'use client';

import { MediaFile } from '@/application/useCases/utils/MediaUploadUseCase';
import { Dictionary } from '@/lib/types/dictionary';
import SimpleCarouselComponent from '@/components/puppy/SimpleCarouselComponent';

interface PuppyDetailGalleryComponentProps {
  media: MediaFile[];
  puppyName: string;
  dict: Dictionary;
  className?: string;
}

export default function PuppyDetailGalleryComponent({
  media,
  puppyName,
  dict,
  className = '',
}: PuppyDetailGalleryComponentProps) {
  return (
    <SimpleCarouselComponent
      media={media}
      puppyName={puppyName}
      className={className}
    />
  );
}
