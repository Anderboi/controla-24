"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { removeProject } from "@/utils/requests";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuProjectButton = ({
  projectId,
  token,
}: {
  projectId: number;
  token: any;
}) => {
  const router = useRouter();
  const handleRemove = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const isConfirmed = confirm(`Вы действительно хотите удалить проект?`);

    if (isConfirmed) {
      await removeProject(projectId, token);
    }
    toast.success("Проект удален");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="size-6 dark:bg-transparent dark:text-neutral-500"
        >
          <EllipsisVertical size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {}}>
          <Pencil className="mr-2 size-3" strokeWidth={2} />
          Редактировать проект
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleRemove} className="text-red-500">
          <Trash className="mr-2 size-3" strokeWidth={2} />
          <span>Удалить проект</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuProjectButton;
