'use client'

import React, { useState } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { parseLocaleNumber } from '@/utils/utils';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProjectAdditionalInfoStep = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <FormField
        control={control}
        name="area"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Площадь</FormLabel>
            <FormControl>
              <Input
                type="number"
                onFocus={(e) => e.target.select()}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Площадь подлежащая проектированию.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="purpose"
        render={({ field: { onChange, value } }) => (
          <FormItem>
            <FormLabel>Назначение</FormLabel>
            <FormControl>
              <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Жилое">Жилое</SelectItem>
                  <SelectItem value="Коммерческое">Коммерческое</SelectItem>
                </SelectContent>
              </Select>
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
            + Добавить предусматриваемый бюджет
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="grid gap-x-6 md:grid-cols-2">
          <FormField
            control={control}
            name="approxBudget"
            render={({ field: { value, onChange } }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>Бюджет</FormLabel>
                <FormControl>
                  <>
                    <Slider
                      min={1000000}
                      max={100000000}
                      step={1000000}
                      defaultValue={[1000000, 10000000]}
                      value={value}
                      minStepsBetweenThumbs={1}
                      onValueChange={onChange}
                    />
                    <div className="flex justify-between gap-6 pt-4">
                      <div className="w-full rounded-lg border dark:border-neutral-800">
                        <label className="px-3 text-xs text-balance">
                          Мин. сумма
                        </label>
                        <Input
                          className="border-none"
                          min={2000000}
                          max={100000000}
                          step={1000000}
                          value={value?.[0].toLocaleString("ru-RU", {
                            currency: "RUB",
                            style: "currency",
                            maximumFractionDigits: 0,
                            useGrouping: true,
                            notation: "compact",
                          })}
                          onChange={(i) =>
                            onChange([
                              parseLocaleNumber(i.target.value, "ru-RU"),
                              value?.[1],
                            ])
                          }
                        />
                      </div>
                      <div className="w-full rounded-lg border dark:border-neutral-800">
                        <label className="px-3 text-xs">
                          Макс. сумма
                        </label>
                        <div className="flex items-center">
                          <Input
                            className="border-none"
                            min={2000000}
                            max={100000000}
                            step={1000000}
                            value={value?.[1].toLocaleString("ru-RU", {
                              currency: "RUB",
                              style: "currency",
                              maximumFractionDigits: 0,
                              useGrouping: true,
                              notation: "compact",
                            })}
                            onChange={(i) => {
                              onChange([
                                value?.[0],
                                parseLocaleNumber(i.target.value, "ru-RU"),
                              ]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                </FormControl>
                <FormDescription>
                  Позволит более точно составить смету по проекту.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default ProjectAdditionalInfoStep