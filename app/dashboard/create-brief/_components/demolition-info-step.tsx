"use client";

import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const DemolitionInfoStep = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="space-y-4 rounded-lg border p-4 dark:border-neutral-600 sm:col-span-2">
        <FormField
          control={control}
          name="planChange"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Демонтаж перегородок</FormLabel>
              <FormControl>
                <Switch
                  className="!m-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4 rounded-lg border p-4 dark:border-neutral-600 sm:col-span-2">
        <FormField
          control={control}
          name="entranceDoorChange"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Замена входной двери</FormLabel>
              <FormControl>
                <Switch
                  className="!m-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {watch("entranceDoorChange") && (
          <FormField
            control={control}
            // TODO Change pets
            name="enteranceDoorType"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Предпочтительный тип входной двери. Более подробное описание.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
      <div className="space-y-4 rounded-lg border p-4 dark:border-neutral-600 sm:col-span-2">
        <FormField
          control={control}
          name="windowsChange"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Замена окон</FormLabel>
              <FormControl>
                <Switch
                  className="!m-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {watch("windowsChange") && (
          <FormField
            control={control}
            name="windowsType"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Предпочтительный тип окон. Более подробное описание.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
      <div className="space-y-4 rounded-lg border p-4 dark:border-neutral-600 sm:col-span-2">
        <FormField
          control={control}
          name="furnitureDemolition"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Демонтаж встроенной мебели</FormLabel>
              <FormControl>
                <Switch
                  className="!m-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {watch("furnitureDemolition") && (
          <FormField
            control={control}
            // TODO Change pets
            name="furnitureToDemolish"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  Описание демонтируемой мебели.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </>
  );
};

export default DemolitionInfoStep;
