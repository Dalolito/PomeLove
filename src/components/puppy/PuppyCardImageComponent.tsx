'use client';

interface PuppyCardImageComponentProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
}

export default function PuppyCardImageComponent({
  src,
  alt,
  priority = false,
  className = '',
  onLoad,
}: PuppyCardImageComponentProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={e => {
          const target = e.target as HTMLImageElement;
          if (target.src !== '/placeholder-puppy.svg') {
            target.src = '/placeholder-puppy.svg';
          }
        }}
        onLoad={onLoad}
        loading={priority ? 'eager' : 'lazy'}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
