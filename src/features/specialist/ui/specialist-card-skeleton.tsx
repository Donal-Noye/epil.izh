import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function SpecialistCardSkeleton() {
  return (
    <Card className="grid animate-pulse">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
        <Skeleton className="rounded-full w-20 h-20 shrink-0" />
        <div className="grid gap-2 w-full">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}
