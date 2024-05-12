"use client";

import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";


import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Room = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const roomList: Room[] = [
  {
    value: "hall",
    label: "Прихожая",
    icon: HelpCircle,
  },
  {
    value: "livingroom",
    label: "Гостиная",
    icon: Circle,
  },
  {
    value: "kitchen",
    label: "Кухня",
    icon: ArrowUpCircle,
  },
  {
    value: "diningroom",
    label: "Столовая",
    icon: CheckCircle2,
  },
  {
    value: "bedroom",
    label: "Спальня",
    icon: XCircle,
  },
  {
    value: "kidsroom",
    label: "Детская",
    icon: XCircle,
  },
  {
    value: "bathroom",
    label: "Ванная комната",
    icon: XCircle,
  },
  {
    value: "wc",
    label: "Санузел",
    icon: XCircle,
  },
];

export function ComboboxPopover() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Room | null>(
    null
  );

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Status</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-[150px] justify-start"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <>+ Set status</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {roomList.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        roomList.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
