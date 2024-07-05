import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/utils/utils";
import { FormBottomNavProps } from '@/types';

const FormBottomNav = ({
  currentStep,
  next,
  previous,
  skipAll,
  submitting,
  steps,
  className,
}: FormBottomNavProps): JSX.Element => {
  return (
    <div className={cn("flex w-full justify-between gap-4", className)}>
      <Button
        variant="link"
        onClick={skipAll}
        className="!px-0 text-base text-neutral-500 dark:text-neutral-400 sm:text-sm"
      >
        Пропустить всё
      </Button>
      <div className="flex gap-4">
        <Button variant="ghost" onClick={previous}>
          <ChevronLeft className="text-neutral-500 dark:text-neutral-400 sm:hidden" />
          <span className="hidden sm:block">Назад</span>
        </Button>
        <Button className="bg-teal-600 text-base sm:text-sm" onClick={next}>
          {currentStep === steps.length - 1
            ? submitting
              ? "Создание..."
              : "Создать"
            : "Далее"}
        </Button>
      </div>
    </div>
  );
};

export default FormBottomNav;
