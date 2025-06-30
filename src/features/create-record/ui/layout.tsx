import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { useSelectableCarousel } from "@/features/create-record/vm/use-selectable-carousel";

type Props<T> = {
  title: string;
  items: T[];
  selectedId: string | null;
  isPending: boolean;
  skeletonList: React.ReactNode;
  renderCard: (item: T) => React.ReactNode;
  search?: React.ReactNode;
};

export function Layout<T extends { id: string }>({
  title,
  items,
  selectedId,
  renderCard,
  isPending,
  skeletonList,
  search,
}: Props<T>) {
  const { setApi } = useSelectableCarousel(items, selectedId);

  return (
    <div className="flex flex-col h-full space-y-4">
      <h1 className="text-lg font-medium text-left md:text-center md:mb-6 tracking-tight text-balance text-muted-foreground">
        {title}
      </h1>

      {search}

      <div className="flex-1">
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-lg mx-auto h-full">
            {skeletonList}
          </div>
        ) : items.length > 0 ? (
          <Carousel
            className="w-full max-w-screen-lg mx-auto h-full"
            setApi={setApi}
          >
            <CarouselContent className="h-full">
              {items.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="md:basis-1/2 lg:basis-1/3 h-full"
                >
                  {renderCard(item)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant="secondary" className="-left-4 z-10 md:-left-12" />
            <CarouselNext variant="secondary" className="-right-4 z-10 md:-right-12" />
          </Carousel>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
