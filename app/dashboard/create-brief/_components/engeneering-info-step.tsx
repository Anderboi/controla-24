"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import {
  conditioningSystems,
  heatingSystems,
  plumbingSystems,
} from "@/utils/formSchema";
import { Heater } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataCard, DataCardLayout } from "@/components/ui/data-card";

const EngeneeringInfoStep = () => {
  const {
    control,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="heatingSystem"
        render={({ field: { onChange, value } }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Система отопления</FormLabel>
            <FormControl>
              <DataCardLayout>
                {heatingSystems.map((system, index) => (
                  <DataCard
                    key={index}
                    value={value}
                    name={system}
                    isChecked={value?.includes(system) || false}
                    onChange={onChange}
                    icon={<Heater size={44} strokeWidth={1} />}
                  />
                ))}
              </DataCardLayout>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <>
        {watch("heatingSystem")?.includes("Теплый пол") ? (
          <div className="space-y-3 rounded-lg border p-4 dark:border-neutral-800 sm:col-span-2">
            <FormField
              control={control}
              name="warmFloorRooms"
              render={({ field }) => (
                <>
                  <FormItem className="col-span-2">
                    <FormLabel>Помещения с теплым полом</FormLabel>
                    <br />
                    <FormControl className="flex flex-wrap gap-2">
                      <>
                        {getValues("rooms")?.map(
                          (
                            { name }: { name: string; label: string },
                            index: number,
                          ) => (
                            <Badge
                              id={name}
                              key={index}
                              variant={
                                field.value?.includes(name)
                                  ? "default"
                                  : "outline"
                              }
                              className="mr-2 cursor-pointer"
                              onClick={() => {
                                field.onChange(
                                  field.value?.includes(name)
                                    ? field.value?.filter(
                                        (v: string) => v !== name,
                                      )
                                    : [...(field.value || []), name],
                                );
                              }}
                            >
                              {name}
                            </Badge>
                          ),
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                </>
              )}
            />
          </div>
        ) : (
          <></>
        )}
      </>
      <FormField
        control={control}
        name="conditioningSystem"
        render={({ field: { onChange, value } }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Система кондиционирования</FormLabel>
            <FormControl>
              <DataCardLayout>
                {conditioningSystems.map((system, index) => (
                  <DataCard
                    key={index}
                    value={value}
                    name={system}
                    isChecked={value?.includes(system) || false}
                    onChange={onChange}
                    icon={<Heater size={44} strokeWidth={1} />}
                  />
                ))}
              </DataCardLayout>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="plumbingSystem"
        render={({ field: { onChange, value } }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Система водоснабжения</FormLabel>
            <FormControl>
              <DataCardLayout>
                {plumbingSystems.map((system, index) => (
                  <DataCard
                    key={index}
                    value={value}
                    name={system}
                    isChecked={value?.includes(system) || false}
                    onChange={onChange}
                    icon={<Heater size={44} strokeWidth={1} />}
                  />
                ))}
              </DataCardLayout>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default EngeneeringInfoStep;
