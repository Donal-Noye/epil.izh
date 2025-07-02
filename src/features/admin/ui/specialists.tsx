"use client";

import { useQuery } from "@tanstack/react-query";
import { getSpecialistListQuery } from "@/entities/specialist/queries";
import { Spinner } from "@/shared/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Pen, Trash } from "lucide-react";
import { ScrollArea } from "@/shared/ui/scroll-area";

export function Specialists() {
  const specialistListQuery = useQuery({
    ...getSpecialistListQuery(),
  });

  return (
    <Card className="relative pb-0 border-none ring ring-muted overflow-hidden gap-4">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <CardTitle>Специалисты</CardTitle>
          <Button variant="secondary" size="sm">
            Создать
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-36">
          <div>
            {specialistListQuery.isPending ? (
              <Spinner />
            ) : (
              specialistListQuery.data?.specialistList.map((specialist) => (
                <div
                  className="flex items-center justify-between border-b last:border-none py-2 px-6"
                  key={specialist.id}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={specialist.image ?? ""} alt="" />
                      <AvatarFallback>СП</AvatarFallback>
                    </Avatar>
                    {specialist.name}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="secondary" size="icon">
                      <Pen />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
