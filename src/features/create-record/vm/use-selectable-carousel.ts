import { useEffect, useMemo, useState } from "react";
import { type CarouselApi } from "@/shared/ui/carousel";

export function useSelectableCarousel<T extends { id: string }>(items: T[], selectedId: string | null) {
  const [api, setApi] = useState<CarouselApi>();
  const selectedIndex = useMemo(
    () => items.findIndex((item) => item.id === selectedId),
    [items, selectedId]
  );

  useEffect(() => {
    if (api && selectedIndex >= 0) {
      api.scrollTo(selectedIndex);
    }
  }, [api, selectedIndex]);

  return { api, setApi };
}
