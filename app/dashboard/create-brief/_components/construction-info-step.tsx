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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ceilingMaterials,
  floorMaterials,
  wallMaterials,
} from "@/utils/formSchema";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DataCard, DataCardLayout } from "@/components/ui/data-card";

const DemolitionInfoStep = () => {
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
        name="wallsMaterial"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <FormLabel>Материал перегородок</FormLabel>
              <Sheet>
                <SheetTrigger asChild className="cursor-pointer">
                  <Info className="size-5 text-neutral-500" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Материал перегородок</SheetTitle>
                    <SheetDescription>
                      Выберите один или несколько материалов.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora vero voluptatem ratione magnam, incidunt odit
                      asperiores placeat eius. Numquam veritatis a earum
                      deleniti maiores commodi iusto nemo aliquam incidunt
                      quisquam!
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <FormControl>
              <DataCardLayout>
                {wallMaterials.map((system, index) => (
                  <DataCard
                    key={index}
                    value={field.value}
                    name={system}
                    isChecked={field.value?.includes(system) || false}
                    onChange={field.onChange}
                    icon={<Info size={44} strokeWidth={1} />}
                  />
                ))}
              </DataCardLayout>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="ceilingMaterial"
        render={({ field: { onChange, value } }) => (
          <FormItem className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <FormLabel>Потолок</FormLabel>
              <Sheet>
                <SheetTrigger asChild className="cursor-pointer">
                  <Info className="size-5 text-neutral-500" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Материал потолка</SheetTitle>
                    <SheetDescription>
                      Выберите один или несколько материалов.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora vero voluptatem ratione magnam, incidunt odit
                      asperiores placeat eius. Numquam veritatis a earum
                      deleniti maiores commodi iusto nemo aliquam incidunt
                      quisquam!
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <FormControl>
              <DataCardLayout>
                {ceilingMaterials.map((system, index) => (
                  <DataCard
                    key={index}
                    value={value}
                    name={system}
                    isChecked={value?.includes(system) || false}
                    onChange={onChange}
                    icon={<Info size={44} strokeWidth={1} />}
                  />
                ))}
              </DataCardLayout>
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="floorMaterial"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <FormLabel>Напольные покрытия</FormLabel>
              <Sheet>
                <SheetTrigger asChild className="cursor-pointer">
                  <Info className="size-5 text-neutral-500" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Материал перегородок</SheetTitle>
                    <SheetDescription>
                      Выберите один или несколько материалов.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora vero voluptatem ratione magnam, incidunt odit
                      asperiores placeat eius. Numquam veritatis a earum
                      deleniti maiores commodi iusto nemo aliquam incidunt
                      quisquam!
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <FormControl>
              <DataCardLayout>
                {floorMaterials.map((system, index) => (
                  <DataCard
                    key={index}
                    value={field.value}
                    name={system}
                    isChecked={field.value?.includes(system) || false}
                    onChange={field.onChange}
                    icon={<Info size={44} strokeWidth={1} />}
                  />
                ))}
              </DataCardLayout>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="space-y-4 rounded-lg border p-4 dark:border-neutral-800 sm:col-span-2">
        <FormField
          control={control}
          name="hasIsolationSurfaces"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <FormLabel>Звукоизоляция</FormLabel>
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
        {watch("hasIsolationSurfaces") && (
          <>
            <FormField
              control={control}
              name="isolationMaterials"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Предпочтительные материалы для звукоизоляции.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="roomsForIsolation"
              render={({ field }) => (
                <FormItem className="gap-2 sm:col-span-2">
                  <FormControl>
                    <>
                      {getValues("rooms")?.map(
                        (
                          {
                            name,
                            number,
                          }: { name: string; area: number; number: string },
                          index: number,
                        ) => (
                          <Badge
                            id={`${number}. ${name}`}
                            key={index}
                            variant={
                              field.value?.includes(`${index + 1}. ${name}`)
                                ? "default"
                                : "outline"
                            }
                            className="mr-2 cursor-pointer"
                            onClick={(val: any) => {
                              field.onChange(
                                field.value?.includes(`${index + 1}. ${name}`)
                                  ? field.value?.filter(
                                      (v: string) =>
                                        v !== `${index + 1}. ${name}`,
                                    )
                                  : [
                                      ...(field.value || []),
                                      `${index + 1}. ${name}`,
                                    ],
                              );
                            }}
                          >
                            {`${(index + 1).toLocaleString("ru-RU", {
                              minimumIntegerDigits: 2,
                            })}` +
                              ". " +
                              ` ${name}`}
                          </Badge>
                        ),
                      )}
                    </>
                  </FormControl>
                  <FormDescription>
                    Помещения в которых необходима звукоизоляция.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>
      <FormField
        control={control}
        name="innerDoorsHeight"
        render={({ field: { onChange, value } }) => (
          <FormItem className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <FormLabel>Высота дверей</FormLabel>
              <span className="rounded-md bg-neutral-800 px-2 py-1 text-xs text-neutral-100">{`${value} мм`}</span>
            </div>
            <FormControl>
              <div className="py-2">
                <Slider
                  min={2100}
                  max={3000}
                  step={100}
                  value={value}
                  onValueChange={onChange}
                />
                <div className="mt-3 flex justify-between text-sm text-neutral-600">
                  <span>{`2100 мм`}</span>
                  <span>{`+3000 мм`}</span>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default DemolitionInfoStep;
