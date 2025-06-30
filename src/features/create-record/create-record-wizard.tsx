"use client";

import { useState, useTransition } from "react";
import { ChooseServiceStep } from "@/features/create-record/ui/choose-service-step";
import { Button } from "@/shared/ui/button";
import { ChooseSpecialistStep } from "@/features/create-record/ui/choose-specialist-step";
import { ChooseDateStep } from "@/features/create-record/ui/choose-date-step";
import { useRouter } from "next/navigation";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { createRecordAction } from "@/entities/record/record";

export function CreateRecordWizard() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [specialistId, setSpecialistId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  const canNext = () => {
    if (step === 1) return Boolean(serviceId);
    if (step === 2) return Boolean(specialistId);
    return Boolean(date);
  };

  const handleNext = () => {
    if (!canNext()) return;
    setStep((s) => Math.min(s + 1, 3) as 1 | 2 | 3);
  };

  const handleBack = () => {
    if (step === 1) {
      router.push("/records");
    } else {
      setStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = () => {
    if (!serviceId || !specialistId || !date) return;
    startTransition(async () => {
      await createRecordAction({
        id: crypto.randomUUID(),
        serviceId,
        specialistId,
        date: new Date(date),
        notes: null,
      });
      router.push("/records");
    });
  };

  if (isPending) return <FullPageSpinner isLoading />;

  return (
    <div className="min-h-[calc(100*var(--vh)-64px)] flex flex-col -m-4">
      <div className="flex-1 p-4">
        {step === 1 && (
          <ChooseServiceStep
            selectedServiceId={serviceId}
            action={setServiceId}
          />
        )}
        {step === 2 && serviceId && (
          <ChooseSpecialistStep
            selectedSpecialistId={specialistId}
            action={setSpecialistId}
          />
        )}
        {step === 3 && specialistId && (
          <ChooseDateStep
            selectedDate={date ? new Date(date) : undefined}
            action={(d) => setDate(d?.toISOString() ?? null)}
          />
        )}
      </div>

      <div className="flex items-center justify-between border-t px-4 py-3">
        <Button
          className="h-10 md:h-8 text-base md:text-sm"
          variant="ghost"
          onClick={handleBack}
        >
          ← Назад
        </Button>
        {step < 3 ? (
          <Button
            className="h-10 md:h-8 text-base md:text-sm px-6"
            size="lg"
            onClick={handleNext}
            disabled={!canNext()}
          >
            Продолжить
          </Button>
        ) : (
          <Button
            className="h-10 md:h-8 text-base md:text-sm px-6"
            size="lg"
            onClick={handleSubmit}
            disabled={!date}
          >
            Подтвердить
          </Button>
        )}
      </div>
    </div>
  );
}
