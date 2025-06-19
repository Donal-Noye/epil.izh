"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpecialistListQuery } from "@/entities/specialist/specialist";
import { SpecialistCard } from "@/features/specialist/ui/specialist-card";
import { SpecialistCardSkeleton } from "./ui/specialist-card-skeleton";

export function SpecialistPage() {
  const specialistListQuery = useQuery({
    ...getSpecialistListQuery(),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {specialistListQuery.isPending
        ? Array.from({ length: 4 }).map((_, i) => (
            <SpecialistCardSkeleton key={i} />
          ))
        : specialistListQuery.data?.specialistList.map((item) => (
            <SpecialistCard {...item} key={item.id} />
          ))}
    </div>
  );
}
