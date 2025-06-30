import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/ui/utils";

export function SpecialistCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "border border-border/50 h-full flex flex-col pt-0 overflow-hidden",
        className,
      )}
    >
      <CardHeader className="p-0 relative h-72 md:h-64 overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <CardFooter className="mt-auto px-4 pb-4">
        <Skeleton className="h-10 lg:h-8 w-full" />
      </CardFooter>
    </Card>
  );
}
