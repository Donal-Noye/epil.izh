"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/shared/ui/calendar";
import { isBefore, startOfDay } from "date-fns";
import { Card, CardContent } from "@/shared/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer";
import { Button } from "@/shared/ui/button";

function generateTimeSlots(start = 9, end = 18, step = 30): string[] {
  const times: string[] = [];
  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      const h = hour.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      times.push(`${h}:${m}`);
    }
  }
  return times;
}

export function ChooseDateStep({
  selectedDate,
  action,
}: {
  selectedDate: Date | undefined;
  action: (date: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleDayClick = (day: Date) => {
    const isSameDay =
      date && startOfDay(date).getTime() === startOfDay(day).getTime();

    setDate(day);

    if (!isSameDay) {
      setSelectedTime("");
    }

    setDrawerOpen(true);
  };

  const handleTimeSelect = (time: string) => {
    if (!date) return;
    const [h, m] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(h, m, 0, 0);
    action(newDate);
    setDrawerOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-full overflow-y-auto">
      <h1 className="text-base md:text-xl font-medium text-left md:text-center mb-4 md:mb-6 tracking-tight text-muted-foreground">
        Выберите дату
      </h1>
      <Card className="w-fit py-4">
        <CardContent className="px-4">
          <Calendar
            mode="single"
            selected={date}
            onDayClick={handleDayClick}
            className="bg-transparent p-0 [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
            disabled={(d) => isBefore(startOfDay(d), startOfDay(new Date()))}
          />
        </CardContent>
      </Card>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="h-[80vh] overflow-y-auto">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Выберите время</DrawerTitle>
            </DrawerHeader>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 py-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => {
                    setSelectedTime(time);
                    handleTimeSelect(time);
                  }}
                >
                  {time}
                </Button>
              ))}
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Отмена</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
