"use client"

import { getUserRecordsQuery } from "@/entities/record/record";
import { useQuery } from "@tanstack/react-query";
import { useAppSession } from "@/kernel/lib/next-auth/client";
import { Button } from "@/shared/ui/button";
import { CalendarX } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/public";

export function Records() {
  const session = useAppSession()
  const recordsQuery = useQuery({
    ...getUserRecordsQuery(session.data?.user.id as string)
  })

  if (recordsQuery.isLoading) {
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

  return (
    <div>
      {recordsQuery.data?.userRecords.map((record) => (
        <div key={record.id}>{record.id}</div>
      ))}
    </div>
  )
}