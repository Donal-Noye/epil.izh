import { Skeleton } from "@/shared/ui/skeleton";

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-4 w-1/3">
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/3">
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/3">
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="w-16 h-16 rounded-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
