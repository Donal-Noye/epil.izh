"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getSpecialistListQuery } from "@/entities/specialist/queries";

export function Specialists() {
  const specialistListQuery = useQuery(getSpecialistListQuery());

  return (
    <section className="container pb-6 md:pb-28">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Специалисты
      </h2>
      <div className="mt-6 sm:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {specialistListQuery.isPending
          ? Array.from({ length: 4 }).map((_, i) => (
              <SpecialistSkeleton key={i} />
            ))
          : specialistListQuery.data?.specialistList.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <SpecialistCard
                  name={item.name as string}
                  image={item.image as string}
                  position={item.position as string}
                />
              </motion.div>
            ))}
      </div>
    </section>
  );
}

function SpecialistCard({
  name,
  image,
  position,
}: {
  name: string;
  image: string | null;
  position: string | null;
}) {
  return (
    <Card className="w-full max-w-md mx-auto sm:max-w-full gap-2 sm:gap-6">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
        <Avatar className="w-20 h-20">
          <AvatarImage src={image ?? ""} alt={name} />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{position}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button className="w-full">Записаться</Button>
      </CardContent>
    </Card>
  );
}

function SpecialistSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto sm:max-w-full gap-2 sm:gap-6">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
        <Skeleton className="w-20 h-20 rounded-full aspect-square" />
        <div className="grid gap-2 w-full">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="mt-auto">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
