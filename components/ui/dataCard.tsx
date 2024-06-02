import { cn } from "@/utils/utils";
import React from "react";
import { Checkbox } from "./checkbox";

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
            : [...(value || []), name]
        );
      }}
      className={cn(
        "peer border-2 rounded-lg p-4 flex sm:flex-col gap-4 sm:items-start items-center cursor-pointer",
        isChecked
          ? "border-green-700 shadow-lg shadow-green-900/30"
          : "border-neutral-600"
      )}
    >
      {/* <Checkbox {...props}/> */}
      {/* {icon} */}
      <h3 className='text-sm'>{name}</h3>
      <p className="text-xs text-neutral-500">{description}</p>
    </div>
  );
};

export default DataCard;
