export function BranchSkeleton() {
  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl border border-gray-200 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gray-200 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
      <div className="mt-3 sm:mt-4 h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export function LockerSkeleton() {
  return (
    <div className="p-3 sm:p-4 md:p-5 bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 bg-gray-200 rounded w-2/3" />
        <div className="h-2 w-2 rounded-full bg-gray-200 flex-shrink-0" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export function BranchesGridSkeleton({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <BranchSkeleton key={i} />
      ))}
    </div>
  );
}

export function LockersGridSkeleton({ count = 20 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LockerSkeleton key={i} />
      ))}
    </div>
  );
}
