"use client";

import { useEffect, useState, useTransition } from "react";
import { ChooseServiceStep } from "@/features/create-record/ui/choose-service-step";
import { Button } from "@/shared/ui/button";
import { ChooseSpecialistStep } from "@/features/create-record/ui/choose-specialist-step";
import { ChooseDateStep } from "@/features/create-record/ui/choose-date-step";
import { useRouter } from "next/navigation";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { createRecordAction } from "@/entities/record/record";

const STORAGE_KEY = "createRecordWizard";

type WizardState = {
  step: 1 | 2 | 3;
  serviceId: string | null;
  specialistId: string | null;
  date: string | null;
};

export function CreateRecordWizard() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<WizardState>(() => {
    if (typeof window === "undefined") {
      return { step: 1, serviceId: null, specialistId: null, date: null };
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as WizardState;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    return { step: 1, serviceId: null, specialistId: null, date: null };
  });

  // сохраняем каждый раз, когда state меняется
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const canNext = () => {
    if (state.step === 1) return Boolean(state.serviceId);
    if (state.step === 2) return Boolean(state.specialistId);
    return Boolean(state.date);
  };

  const handleNext = () => {
    if (!canNext()) return;
    setState((s) => ({ ...s, step: Math.min(s.step + 1, 3) as 1 | 2 | 3 }));
  };

  const handleBack = () => {
    setState((s) => ({ ...s, step: Math.max(s.step - 1, 1) as 1 | 2 | 3 }));
  };

  const handleSubmit = () => {
    if (!state.serviceId || !state.specialistId || !state.date) return;
    startTransition(async () => {
      await createRecordAction({
        id: crypto.randomUUID(),
        serviceId: state.serviceId!,
        specialistId: state.specialistId!,
        date: new Date(state.date!),
        notes: null,
      });
      localStorage.removeItem(STORAGE_KEY);
      router.push("/records");
    });
  };

  if (isPending) {
    return <FullPageSpinner isLoading />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col -m-4">
      <div className="flex-1 p-4">
        {state.step === 1 && (
          <ChooseServiceStep
            selectedServiceId={state.serviceId}
            onSelect={(id) => setState((s) => ({ ...s, serviceId: id }))}
          />
        )}
        {state.step === 2 && state.serviceId && (
          <ChooseSpecialistStep
            selectedSpecialistId={state.specialistId}
            action={(id) => setState((s) => ({ ...s, specialistId: id }))}
          />
        )}
        {state.step === 3 && state.specialistId && (
          <ChooseDateStep
            selectedDate={state.date ? new Date(state.date) : undefined}
            action={(d) =>
              setState((s) => ({ ...s, date: d?.toISOString() ?? null }))
            }
          />
        )}
      </div>

      <div className="flex items-center justify-between border-t px-4 py-3">
        {state.step > 1 ? (
          <Button variant="ghost" onClick={handleBack}>
            ← Назад
          </Button>
        ) : (
          <div />
        )}
        {state.step < 3 ? (
          <Button size="lg" onClick={handleNext} disabled={!canNext()}>
            Продолжить
          </Button>
        ) : (
          <Button size="lg" onClick={handleSubmit} disabled={!state.date}>
            Подтвердить
          </Button>
        )}
      </div>
    </div>
  );
}
