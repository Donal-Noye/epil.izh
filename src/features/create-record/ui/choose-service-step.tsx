import { useQuery } from "@tanstack/react-query";
import { getServiceListQuery } from "@/entities/service/service";
import { Spinner } from "@/shared/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/ui/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";

export function ChooseServiceStep({
  selectedServiceId,
  onSelect,
}: {
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
}) {
  const serviceListQuery = useQuery({
    ...getServiceListQuery(),
  });

  if (serviceListQuery.isPending) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!serviceListQuery.data?.serviceList.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Нет доступных услуг
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-base md:text-xl font-medium text-left md:text-center mb-4 md:mb-6 tracking-tight text-balance text-muted-foreground">
        Выберите услугу
      </h1>
      <Carousel className="w-full max-w-screen-lg mx-auto h-auto lg:h-full">
        <CarouselContent className="h-full">
          {serviceListQuery.data.serviceList.map((service) => (
            <CarouselItem
              key={service.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card
                className="transition-shadow hover:shadow-xl border border-border/50 h-full flex flex-col justify-between hover:bg-muted cursor-pointer"
                onClick={() => onSelect(service.id)}
              >
                <CardHeader>
                  <CardTitle className="text-2xl lg:text-3xl -tracking-wider">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="text-base lg:text-lg font-medium flex items-center gap-2">
                    💰 Цена:
                    <Badge className="text-base">{service.price} ₽</Badge>
                  </div>
                  <div className="text-base lg:text-lg font-medium flex items-center gap-2">
                    ⏱️ Длительность:
                    <Badge variant="secondary" className="text-base">
                      {service.durationMin} мин.
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                      "w-full",
                      selectedServiceId === service.id && "ring-2 ring-primary",
                    )}
                    onClick={() => onSelect(service.id)}
                  >
                    Выбрать
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 z-10 md:-left-12" />
        <CarouselNext className="-right-4 z-10 md:-right-12" />
      </Carousel>
    </div>
  );
}
