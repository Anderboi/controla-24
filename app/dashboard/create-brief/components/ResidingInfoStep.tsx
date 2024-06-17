"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const ResidingInfoStep = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="adults"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Взрослые</FormLabel>
            <FormControl>
              <Input
                onFocus={(e) => e.target.select()}
                step={1}
                min={1}
                type="number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="children"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Дети</FormLabel>
            <FormControl>
              <Input
                onFocus={(e) => e.target.select()}
                step={1}
                min={0}
                type="number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="sm:col-span-2"
      >
        <CollapsibleTrigger asChild className="text-sm text-teal-500">
          <Button
            variant={"link"}
            size={"sm"}
            className="p-0 text-xs text-teal-500"
          >
            + Дополнительная информация
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="grid gap-x-6 md:grid-cols-2">
          <>
            <div className="space-y-4">
              <FormLabel>Рост проживающих, см</FormLabel>
              {Array.from({ length: Number(watch("adults")) }).map(
                (_, adultIndex) => (
                  <FormField
                    defaultValue={0}
                    key={adultIndex}
                    control={control}
                    name={`adultHeight.${adultIndex}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            onFocus={(e) => e.target.select()}
                            placeholder="175 см"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ),
              )}
              <FormDescription>
                Позволит определить высоту поверхностей.
              </FormDescription>
            </div>
            {watch("children") > 0 && (
              <div className="space-y-4">
                <FormLabel>Возраст детей</FormLabel>
                {Array.from({ length: Number(watch("children")) }).map(
                  (_, adultIndex) => (
                    <FormField
                      defaultValue={0}
                      key={adultIndex}
                      control={control}
                      name={`childrenAge.${adultIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              onFocus={(e) => e.target.select()}
                              placeholder="3"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ),
                )}
                <FormDescription>
                  Поможет при планировании детских комнат.
                </FormDescription>
              </div>
            )}
          </>
        </CollapsibleContent>
      </Collapsible>

      <div className="space-y-4 rounded-lg border border-neutral-600 p-4 dark:border-neutral-800 sm:col-span-2">
        <FormField
          control={control}
          name="hasPets"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Домашние животные</FormLabel>
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
        {watch("hasPets") && (
          <FormField
            control={control}
            name="pets"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormControl>
                  <Textarea
                    placeholder="Морская свинка. Клетка 800/400/400 мм."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Вид домашнего животного, особенности размещения.
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

export default ResidingInfoStep;
