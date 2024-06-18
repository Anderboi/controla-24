"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  equipment,
} from "@/utils/formSchema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MultipleSelector from '@/components/ui/multi-selector';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

const EquipmentInfoStep = () => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const {
    fields: equipmentFields,
    append: equipmentAppend,
    move: equipmentMove,
    remove: equipmentRemove,
    update: equipmentUpdate,
  } = useFieldArray({
    control: control,
    name: "equipment",
  });

  return (
    <>
      {equipmentFields.map((fieldItem, index) => (
        <div
          key={index}
          className="items-srart grid grid-cols-[1fr,2fr,auto] gap-2 sm:col-span-2"
        >
          <FormField
            control={control}
            name={`equipment.${index}.room_id`}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="h-8 w-full">
                  <SelectValue placeholder="Выберите помещение" />
                </SelectTrigger>
                <SelectContent>
                  {getValues("rooms")?.map(({ name }:{name:string, label:string}, index:number) => (
                    <SelectItem
                      key={index}
                      value={(index + 1).toLocaleString("ru-Ru", {
                        minimumIntegerDigits: 2,
                      })}
                    >
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FormField
            control={control}
            name={`equipment.${index}.name`}
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    onChange={(val: { value: string; label: string }[]) =>
                      onChange(
                        val.map(
                          (item: { value: string; label: string }) =>
                            item.value,
                        ),
                      )
                    }
                    defaultOptions={equipment}
                    groupBy="group"
                    placeholder="Выберите оборудование"
                    creatable
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        Не найдено.
                      </p>
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0"
            onClick={() => equipmentRemove(index)}
          >
            <TrashIcon className="text-destructive size-4" aria-hidden="true" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() =>
          equipmentAppend({
            name: [],
            room_id: "",
          })
        }
      >
        Добавить помещение
      </Button>
    </>
  );
};

export default EquipmentInfoStep;
