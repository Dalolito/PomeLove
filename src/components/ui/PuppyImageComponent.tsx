'use client';

interface PuppyImageComponentProps {
  src: string;
  alt: string;
  className?: string;
}

export default function PuppyImageComponent({
  src,
  alt,
  className = '',
}: PuppyImageComponentProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={e => {
        const target = e.target as HTMLImageElement;
        if (target.src !== '/placeholder-puppy.svg') {
          target.src = '/placeholder-puppy.svg';
        }
      }}
      loading="lazy"
    />
  );
}
