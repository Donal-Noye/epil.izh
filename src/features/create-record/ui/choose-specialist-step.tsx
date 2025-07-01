"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpecialistListQuery } from "@/entities/specialist/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { cn } from "@/shared/ui/utils";
import { Layout } from "@/features/create-record/ui/layout";
import { SpecialistCardSkeleton } from "@/features/create-record/ui/specialist-card-skeleton";

const skeletonList = (
  <>
    <SpecialistCardSkeleton />
    <SpecialistCardSkeleton className="hidden md:flex" />
    <SpecialistCardSkeleton className="hidden lg:flex" />
  </>
);

export function ChooseSpecialistStep({
  selectedSpecialistId,
  action,
}: {
  selectedSpecialistId: string | null;
  action: (specialistId: string) => void;
}) {
  const specialistsQuery = useQuery({
    ...getSpecialistListQuery(),
  });

  const specialists = specialistsQuery.data?.specialistList || [];

  return (
    <Layout
      title="Выберите специалиста"
      items={specialists}
      selectedId={selectedSpecialistId}
      isPending={specialistsQuery.isPending}
      skeletonList={skeletonList}
      renderCard={(specialist) => (
        <Card
          onClick={() => action(specialist.id)}
          className={cn(
            "transition-colors border border-border/50 h-full flex flex-col pt-0 overflow-hidden hover:bg-muted cursor-pointer", selectedSpecialistId === specialist.id && "bg-muted")
          }
        >
          <CardHeader className="p-0 relative h-64 overflow-hidden">
            <Image
              fill
              className="object-cover"
              src={specialist.image as string}
              alt={specialist.name as string}
              unoptimized
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="text-4xl md:text-3xl -tracking-wider">
              {specialist.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              {specialist.bio}
            </CardDescription>
          </CardContent>

          <CardFooter className="mt-auto">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full",
                selectedSpecialistId === specialist.id && "ring-2 ring-primary",
              )}
              onClick={() => action(specialist.id)}
            >
              Выбрать
            </Button>
          </CardFooter>
        </Card>
      )}
    />
    // <div className="flex flex-col h-full">
    //   <h1 className="text-base md:text-xl font-medium text-left md:text-center mb-4 md:mb-6 tracking-tight text-balance text-muted-foreground">
    //     Выберите специалиста
    //   </h1>
    //   <Carousel className="w-full max-w-screen-lg mx-auto h-auto lg:h-full">
    //     <CarouselContent className="h-full">
    //       {specialistsQuery.data.specialistList.map((specialist) => (
    //         <CarouselItem
    //           key={specialist.id}
    //           className="md:basis-1/2 lg:basis-1/3"
    //         >
    //           <Card
    //             onClick={() => action(specialist.id)}
    //             className="transition-colors border border-border/50 h-full flex flex-col justify-between pt-0 overflow-hidden hover:bg-muted cursor-pointer"
    //           >
    //             <CardHeader className="p-0 relative h-64 overflow-hidden">
    //               <Image
    //                 fill
    //                 className="object-cover"
    //                 src={specialist.image as string}
    //                 alt={specialist.name as string}
    //                 unoptimized
    //               />
    //             </CardHeader>
    //             <CardContent className="flex flex-col gap-2">
    //               <CardTitle className="text-xl md:text-2xl lg:text-3xl -tracking-wider">
    //                 {specialist.name}
    //               </CardTitle>
    //               <CardDescription className="text-muted-foreground text-sm md:text-base">
    //                 {specialist.bio}
    //               </CardDescription>
    //             </CardContent>
    //
    //             <CardFooter>
    //               <Button
    //                 variant="outline"
    //                 size="lg"
    //                 className={cn(
    //                   "w-full",
    //                   selectedSpecialistId === specialist.id &&
    //                     "ring-2 ring-primary",
    //                 )}
    //                 onClick={() => action(specialist.id)}
    //               >
    //                 Выбрать
    //               </Button>
    //             </CardFooter>
    //           </Card>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //     <CarouselPrevious className="-left-4 z-10 md:-left-12" />
    //     <CarouselNext className="-right-4 z-10 md:-right-12" />
    //   </Carousel>
    // </div>
  );
}
