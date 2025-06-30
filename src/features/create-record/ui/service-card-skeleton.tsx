import { Skeleton } from "@/shared/ui/skeleton";
import { Card } from "@/shared/ui/card";
import { cn } from "@/shared/ui/utils";

export function ServiceCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("p-6 space-y-3 h-full flex flex-col", className)}>
      <div className="space-y-2 lg:w-[75%]">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full block lg:hidden" />
      </div>
      <div className="space-y-2 lg:w-[50%]">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full mt-auto" />
    </Card>
  );
}
