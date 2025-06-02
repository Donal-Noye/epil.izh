"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

const servicesLength = 5;

const services = [
  { title: "Лазерная эпиляция ног", price: "2 000 ₽" },
  { title: "Лазерная эпиляция подмышек", price: "800 ₽" },
  { title: "Лазерная эпиляция зоны бикини", price: "1 500 ₽" },
  { title: "Лазерная эпиляция рук", price: "1 200 ₽" },
  { title: "Лазерная эпиляция лица", price: "1 000 ₽" },
  { title: "Комплекс ноги + бикини", price: "3 200 ₽" },
  { title: "Комплекс руки + подмышки", price: "1 800 ₽" },
  { title: "Полный комплекс", price: "4 900 ₽" },
  { title: "Консультация", price: "Бесплатно" },
  { title: "Консультация", price: "Бесплатно" },
  { title: "Консультация", price: "Бесплатно" },
  { title: "Консультация", price: "Бесплатно" },
];

export function Services() {
  const [visible, setVisible] = useState(servicesLength);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return services;
    return services.filter((s) =>
      s.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const showMore = () => setVisible((prev) => prev + servicesLength);

  return (
    <section className="container bg-[#977a6c]/30 py-10">
      <h2 className="scroll-m-20 text-5xl font-semibold tracking-tight first:mt-0 text-center">
        Услуги
      </h2>

      <div className="mt-6 flex justify-center">
        <Input
          placeholder="Поиск услуги..."
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
            setVisible(servicesLength);
          }}
          className="max-w-md w-full bg-white h-12"
        />
      </div>

      <div className="mt-6 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.slice(0, visible).map((service, i) => (
          <Card
            key={i}
            className="flex flex-col justify-between rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
          >
            <CardHeader className="pb-0">
              <p className="text-lg font-medium">{service.title}</p>
            </CardHeader>
            <CardContent className="pt-2 text-muted-foreground text-base">
              {service.price}
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
              <Button className="w-full" variant="outline">
                Подробнее
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filtered.length > servicesLength && (
        <div className="flex justify-center mt-8">
          {visible < filtered.length ? (
            <Button onClick={showMore} size="lg" variant="secondary">
              Показать ещё
            </Button>
          ) : (
            <Button onClick={() => setVisible(servicesLength)} size="lg" variant="secondary">
              Скрыть
            </Button>
          )}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="h-[300px] mt-8 text-center text-muted-foreground">
          По запросу «{query}» ничего не найдено.
        </p>
      )}
    </section>
  );
}
