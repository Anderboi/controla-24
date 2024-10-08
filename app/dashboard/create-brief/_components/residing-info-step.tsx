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
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import AdditionalInfoButton from '@/components/ui/additional-info-button';

const ResidingInfoStep = () => {

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
      <AdditionalInfoButton title="+ Дополнительная информация">
        <>
          {/* //? If you wish, you can add adults heights */}
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
                          min={70}
                          max={240}
                          step={1}
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
          {/* //? If there are children, you can add their ages */}
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
                            min={0}
                            max={18}
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
      </AdditionalInfoButton>
      <div className="space-y-4 rounded-lg border  p-4 dark:border-neutral-600 sm:col-span-2">
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
