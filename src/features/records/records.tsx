"use client"

import { getUserRecordsQuery } from "@/entities/record/record";
import { useQuery } from "@tanstack/react-query";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { Button } from "@/shared/ui/button";
import { CalendarClock, CalendarX, Pen, Trash } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/public";
import {
  Card,
  CardContent,
  CardDescription, CardFooter,
  CardHeader,
  CardTitle
} from "@/shared/ui/card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getServiceListQuery } from "@/entities/service/queries";
import { getSpecialistListQuery } from "@/entities/specialist/queries";

export function Records() {
  const session = useAppSession()
  const recordsQuery = useQuery({
    ...getUserRecordsQuery(session.data?.user.id as string)
  })
  const servicesQuery = useQuery({
    ...getServiceListQuery(),
  });
  const specialistsQuery = useQuery({
    ...getSpecialistListQuery(),
  });

  if (recordsQuery.isLoading || servicesQuery.isLoading || specialistsQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (recordsQuery.data?.userRecords.length === 0) {
    return (
      <div className="container flex flex-col items-center justify-center gap-6 py-16 text-center">
        <CalendarX className="w-16 h-16 text-muted-foreground" />
        <h1 className="text-3xl font-semibold tracking-tight">
          У вас пока нет записей
        </h1>
        <p className="text-muted-foreground max-w-md">
          Вы ещё не создали ни одной записи. Выберите специалиста и услугу, чтобы начать.
        </p>
        <Button size="lg" variant="default" asChild>
          <Link href={ROUTES.createRecord.path}>
            Создать запись
          </Link>
        </Button>
      </div>
    )
  }

  const serviceMap = new Map(
    servicesQuery.data?.serviceList.map((s) => [s.id, s]) ?? []
  );

  const specialistMap = new Map(
    specialistsQuery.data?.specialistList.map((s) => [s.id, s]) ?? []
  );

  return (
    <div className="space-y-6">
      <Button asChild>
        <Link href={ROUTES.createRecord.path}>
          <Pen />
          Создать запись
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recordsQuery.data?.userRecords.map((record) => {
          const date = new Date(record.date);
          const service = serviceMap.get(record.serviceId);
          const specialist = specialistMap.get(record.specialistId);

          if (!service || !specialist) return null;

          return (
            <Card key={record.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-3">
                  <CalendarClock className="w-5 h-5 text-muted-foreground" />
                  {format(date, "d MMMM yyyy, HH:mm", { locale: ru })}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.name} — {specialist.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {service.description}
              </CardContent>
              <CardFooter>
                <Button size="icon" variant="destructive">
                  <Trash />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  )
}