"use client";

import React, { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import { Button } from "./button";
import { Input } from "./input";
import { Check, Pencil } from "lucide-react";
import { cn } from "@/utils/utils";

const InputEditBlock = ({
  errorMessage,
  title,
  formName,
  ...props
}: {
  errorMessage?: string;
  title: string;
  formName: string;
}) => {
  const [editing, setEditing] = useState("");

  const toggleIsEditable = (i: string) => {
    setEditing(i);
  };

  return (
    <FormItem className="w-full grid grid-cols-4 items-center border-b border-neutral-700">
      <FormLabel className="text-neutral-600 col-span-1">{title}</FormLabel>
      <FormControl>
        <div className="flex w-full col-span-3">
          <Input
            readOnly={!editing}
            {...props}
            className={cn(
              !editing
                ? "dark:bg-transparent dark:border-transparent focus:ring-0"
                : ""
            )}
          />
          <Button
            className="text-neutral-600"
            variant={"ghost"}
            onClick={
              editing === formName
                ? () => toggleIsEditable("")
                : () => toggleIsEditable(formName)
            }
          >
            {editing === formName ? <Check /> : <Pencil />}
          </Button>
        </div>
      </FormControl>
      {/* <FormDescription>Рабочее название проекта.</FormDescription> */}
      <FormMessage>{errorMessage}</FormMessage>
    </FormItem>
  );
};

export default InputEditBlock;
