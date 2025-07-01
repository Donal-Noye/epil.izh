"use client";

import { useQuery } from "@tanstack/react-query";
import { getServiceListQuery } from "@/entities/service/service";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Layout } from "@/features/create-record/ui/layout";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";
import { Search } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { ServiceCardSkeleton } from "@/features/create-record/ui/service-card-skeleton";

const skeletonList = (
  <>
    <ServiceCardSkeleton />
    <ServiceCardSkeleton className="hidden md:flex" />
    <ServiceCardSkeleton className="hidden lg:flex" />
  </>
);

export function ChooseServiceStep({
  selectedServiceId,
  action,
}: {
  selectedServiceId: string | null;
  action: (serviceId: string) => void;
}) {
  const serviceListQuery = useQuery({
    ...getServiceListQuery(),
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const filteredServices = useMemo(() => {
    if (!serviceListQuery.data?.serviceList) return [];
    return serviceListQuery.data.serviceList.filter((service) =>
      service.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [serviceListQuery.data?.serviceList, debouncedSearch]);

  const services = filteredServices ?? [];

  return (
    <Layout
      skeletonList={skeletonList}
      isPending={serviceListQuery.isPending}
      title="Выберите услугу"
      items={services}
      selectedId={selectedServiceId}
      search={
        <div className="relative w-full max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Поиск услуги..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-lg"
          />
        </div>
      }
      renderCard={(service) => (
        <Card
          className={cn(
            "transition-shadow hover:shadow-xl border border-border/50 h-full flex flex-col justify-between hover:bg-muted cursor-pointer",
            selectedServiceId === service.id && "bg-muted",
          )}
          onClick={() => action(service.id)}
        >
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-5xl md:text-[32px] -tracking-wider mb-1">
              {service.name}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg w-[70%] md:w-auto">
              {service.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 px-4 md:px-6">
            <div className="text-lg font-medium flex items-center gap-2">
              💰 Цена:
              <Badge className="text-base">{service.price} ₽</Badge>
            </div>
            <div className="text-lg font-medium flex items-center gap-2">
              ⏱️ Длительность:
              <Badge variant="secondary" className="text-base">
                {service.durationMin} мин.
              </Badge>
            </div>
          </CardContent>

          <CardFooter className="px-4 md:px-6">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full",
                selectedServiceId === service.id && "ring-2 ring-primary",
              )}
              onClick={() => action(service.id)}
            >
              Выбрать
            </Button>
          </CardFooter>
        </Card>
      )}
    />
  );
}
