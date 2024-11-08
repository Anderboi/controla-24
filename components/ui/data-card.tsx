import React from "react";
import { cn } from "@/utils/utils";
import { DataCardLayoutProps, DataCardProps } from '@/types';



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
        "peer flex cursor-pointer items-center gap-2 overflow-clip rounded-xl border px-4 py-2",
        isChecked
          ? "bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200"
          : "border-neutral-500 dark:border-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800",
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
