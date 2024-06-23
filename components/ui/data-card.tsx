import React from "react";
import { cn } from "@/utils/utils";

interface DataCardLayoutProps {
  children: React.ReactNode;
  className?: string;
}
interface DataCardProps {
  name: string;
  isChecked: boolean;
  onChange: (value: string[]) => void;
  icon: React.ReactNode;
  value?: string[];
  description?: string;
}

export const DataCardLayout = ({
  children,
  className,
}: DataCardLayoutProps) => {
  return (
    <div className={cn("flex flex-wrap gap-3 sm:gap-2", className)}>
      {children}
    </div>
  );
};

DataCardLayout.displayName = "DataCardLayout";

export const DataCard = ({
  name,
  isChecked = false,
  onChange,
  icon,
  value,
  description,
  // ...props
}: DataCardProps) => {
  return (
    <div
      onClick={() => {
        onChange(
          value?.includes(name)
            ? value?.filter((v) => v !== name)
            : [...(value || []), name],
        );
      }}
      className={cn(
        "peer flex cursor-pointer items-center gap-2 overflow-clip rounded-lg border px-2 py-1",
        isChecked
          ? "bg-neutral-900 dark:bg-neutral-100"
          : "border-neutral-500 dark:border-neutral-500",
      )}
    >
      <span
        className={cn(
          "line-clamp-2 h-fit sm:text-sm",
          isChecked
            ? "text-white dark:text-black"
            : "text-neutral-800 dark:text-neutral-400",
        )}
      >
        {name}
      </span>
    </div>
  );
};
DataCard.displayName = "DataCard";
