import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/utils/utils";

interface FormBottomNavProps {
  skipAll: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
  previous: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  next: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
  submitting: boolean;
  currentStep: number;
  steps: { id: string; name: string; fields?: string[] }[];
  className?: string;
}

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
        className="!px-0 text-neutral-500 dark:text-neutral-500"
      >
        Пропустить всё
      </Button>
      <div className="flex gap-4">
        <Button variant="ghost" onClick={previous}>
          <ChevronLeft className="text-neutral-500 dark:text-neutral-500 sm:hidden" />
          <span className="hidden sm:block">Назад</span>
        </Button>
        <Button className="bg-teal-600" onClick={next}>
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
