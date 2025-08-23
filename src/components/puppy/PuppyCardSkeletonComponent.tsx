interface PuppyCardSkeletonComponentProps {
  className?: string;
}

export default function PuppyCardSkeletonComponent({
  className = '',
}: PuppyCardSkeletonComponentProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <div className="aspect-square animate-pulse bg-gray-200" />

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-12 animate-pulse rounded-full bg-gray-200" />
        </div>

        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />

        <div className="flex items-center justify-between">
          <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
