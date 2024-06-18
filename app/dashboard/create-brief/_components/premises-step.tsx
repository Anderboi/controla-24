"use client";

import React from "react";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { Button } from "@/components/ui/button";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Skeleton } from "@/components/ui/skeleton";
import { roomList } from "@/utils/formSchema";
import { GripVertical, TrashIcon } from "lucide-react";

const PremisesStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    fields: roomFields,
    append,
    move,
    remove,
    update,
  } = useFieldArray({
    control: control,
    name: "rooms",
  });

  return (
    <div className="space-y-4 sm:col-span-2">
      {/* <FormField
                  control={form.control}
                  name="floorsNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Количество этажей на объекте</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {Array.from(Array(Number(form.watch("floorsNumber")))).map(
                  (_, floorindex ) => ( */}
      <Sortable
        value={roomFields}
        onMove={({ activeIndex, overIndex }) => {
          console.log(activeIndex, overIndex);

          move(activeIndex, overIndex);
        }}
        overlay={
          <div className="grid grid-cols-[0.3fr,2fr,0.5fr,auto,auto] items-center gap-2">
            <Skeleton className="h-8 w-full rounded-sm" />
            <Skeleton className="h-8 w-full rounded-sm" />
            <Skeleton className="size-8 shrink-0 rounded-sm" />
            <Skeleton className="size-8 shrink-0 rounded-sm" />
          </div>
        }
      >
        {/* <FormItem className="sm:col-span-2">
                        {Number(form.watch("floorsNumber")) > 1 && (
                          <FormLabel>Помещения {floorindex+1} этажа</FormLabel>
                        )}
                      </FormItem> */}
        <div className="w-full space-y-2">
          <div className="grid grid-cols-[0.3fr,2fr,0.5fr,40px,40px] items-center gap-2 text-xs text-neutral-500">
            <span>№</span>
            <span>Наименование</span>
            <span>м2</span>
          </div>
          {roomFields.map((fieldItem, index) => (
            <SortableItem key={fieldItem.id} value={fieldItem.id} asChild>
              <div className="grid grid-cols-[0.3fr,2fr,0.5fr,auto,auto] items-center gap-2">
                <FormField
                  control={control}
                  name={`rooms.${index}.number`}
                  render={({ field }) => (
                    <span className="text-xs text-neutral-500">
                      {(index + 1).toLocaleString("ru-RU", {
                        minimumIntegerDigits: 2,
                      })}
                    </span>
                    // <Input
                    //   className="h-8"
                    //   disabled
                    //   ref={field.ref}
                    //   value={(index + 1).toLocaleString("ru-RU", {
                    //     minimumIntegerDigits: 2,
                    //   })}
                    //   onChange={field.onChange}
                    // />
                  )}
                />

                <FormField
                  control={control}
                  name={`rooms.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <CreatableSelect
                            formatCreateLabel={(value) => `Создать '${value}'`}
                            placeholder="Помещение..."
                            
                            options={roomList}
                            onChange={(val) => field.onChange(val?.value)}
                            className="h-8 !rounded-lg"
                            classNames={{
                              control: (
                                state,
                              ) => `h-8 !rounded-md border-red-300 !border-neutral-200 !focused:border-teal-500
                                                  !focused:ring-teal-500 
                                                  dark:bg-neutral-900 
                                                  dark:!text-neutral-50 dark:!border-neutral-800`,

                              input: (state) => "text-sm dark:text-neutral-50",
                              valueContainer: (state) => "",
                              singleValue: (state) =>
                                "text-sm dark:text-neutral-50",
                              placeholder: (state) =>
                                "text-sm dark:text-neutral-500",
                              menu: (state) =>
                                "text-sm dark:text-neutral-50 dark:!bg-neutral-800",
                              option: (state) =>
                                state.isFocused
                                  ? "text-sm dark:text-neutral-50 !bg-teal-200 dark:!bg-neutral-600 //dark:text-red-400 !text-black"
                                  : state.isSelected
                                    ? "!bg-teal-500 hover:!bg-teal-600"
                                    : "dark:!bg-neutral-800",

                              menuPortal: (state) =>
                                "text-sm dark:text-neutral-50 dark:!bg-neutral-800",
                            }}
                          />
                        </>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  // control={form.control}
                  name={`rooms.${index}.area`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="h-8" type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <SortableDragHandle
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                >
                  <GripVertical className="size-4" aria-hidden="true" />
                </SortableDragHandle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={() => remove(index)}
                >
                  <TrashIcon
                    className="text-destructive size-4"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </SortableItem>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit dark:bg-transparent"
          onClick={() =>
            append({
              name: "",
              area: 0,
              number: "",
            })
          }
        >
          Добавить помещение
        </Button>
      </Sortable>
      {/* ),
                )} */}
    </div>
  );
};

export default PremisesStep;
