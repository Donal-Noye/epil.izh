import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/ui/card";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

const items = [
  {
    name: "Дерендеева Лейсан",
    role: "Специалист по лазерной эпиляции/электролог"
  },
  {
    name: "Юлия Шадманова",
    role: "Мастер Лазерной Эпиляции"
  },
  {
    name: "Сакерина Софья",
    role: "Мастер Лазерной Эпиляции"
  },
  {
    name: "Петрова Диана",
    role: "Мастер Лазерной Эпиляции"
  },
]

export function Specialists() {
  return (
    <section className="min-h-screen container pt-20 pb-10">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Специалисты
      </h2>
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between rounded-2xl overflow-hidden shadow-md transition hover:shadow-xl bg-white pt-0 gap-3"
          >
            <CardHeader className="p-0 overflow-hidden">
              <Image
                src="https://placehold.co/600x400"
                alt={item.name}
                width={600}
                height={400}
                className="w-full h-[240px] object-cover"
                unoptimized
              />
            </CardHeader>

            <CardContent className="flex-1">
              <p className="text-lg font-semibold mb-1">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.role}</p>
            </CardContent>

            <CardFooter className="pt-0 mt-auto">
              <Button className="w-full">Записаться</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
