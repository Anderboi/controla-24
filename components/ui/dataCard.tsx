import { cn } from "@/utils/utils";
import React from "react";

interface DataCardProps {
  name: string;
  isChecked: boolean;
  onChange: (value: string[]) => void;
  icon: React.ReactNode;
  value?: string[];
  description?: string;
}

const DataCard = ({
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
        "/p-4 peer flex h-[60px] cursor-pointer items-center gap-2 overflow-clip rounded-lg border sm:items-start",
        isChecked
          ? "border-teal-500 dark:border-teal-600"
          : "shadow-md shadow-neutral-800/10 dark:border-neutral-800",
      )}
    >
      {/* {icon} */}
      <div
        className={cn(
          !isChecked
            ? `bg-gradient-to-r from-violet-200 to-pink-200`
            : `bg-gradient-to-r from-teal-200 to-teal-500`,
          "h-full w-3",
        )}
      ></div>
      {/* <Image src={""} className="aspect-square" alt="info-image" /> */}
      <h3 className="line-clamp-2 h-fit py-2 pr-2 text-xs">{name}</h3>
      {/* <p className="text-xs text-neutral-500">{description}</p> */}
    </div>
  );
};

export default DataCard;
