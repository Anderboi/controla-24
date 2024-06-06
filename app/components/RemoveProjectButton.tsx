"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { removeProject } from "@/utils/requests";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

const RemoveProjectButton = ({
  projectId,
  token,
}: {
  projectId: number;
  token: any;
}) => {
  const router = useRouter()
  const handleRemove = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const isConfirmed = confirm(`Вы действительно хотите удалить проект?`);

    if (isConfirmed) {
      await removeProject(projectId, token);
    }
    toast.success("Проект удален");
    router.refresh()
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={handleRemove}
      className="size-8 dark:bg-transparent dark:text-neutral-500"
    >
      <Trash />
    </Button>
  );
};

export default RemoveProjectButton;
