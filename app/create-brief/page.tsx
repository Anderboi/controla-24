"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ceilingMaterials,
  conditioningSystems,
  floorMaterials,
  heatingSystems,
  kitchenEquipment,
  plumbingSystems,
  roomList,
  sanitaryEquipment,
  wallsMaterials,
} from "@/utils/formSchema";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formSchema } from "@/utils/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  GripVertical,
  Heater,
  Info,
  Plus,
  TrashIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector from "@/components/ui/multiSelector";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import DataCard from "@/components/ui/dataCard";
import { postProject } from "@/utils/requests";
import { toast } from "sonner";
import { parseLocaleNumber } from "@/utils/utils";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Skeleton } from "@/components/ui/skeleton";
import CreatableSelect from "react-select/creatable";

export type Inputs = z.infer<typeof formSchema>;
type FieldName = keyof Inputs;

// Define your form steps
const steps = [
  {
    id: "Шаг 1",
    name: "Контактная информация о клиенте",
    fields: ["firstName", "lastName", "middleName", "email", "phone"],
  },
  {
    id: "Шаг 2",
    name: "Информация по проекту",
    fields: ["projectName", "contractId", "address"],
  },
  {
    id: "Шаг 3",
    name: "Дополнительная информация",
    fields: ["area", "floorsNumber", "purpose", "approxBudget"],
  },
  {
    id: "Шаг 4",
    name: "Кто будет проживать?",
    fields: ["pets", "children", "adults", "childrenAge"],
  },
  {
    id: "Шаг 5",
    name: "Что стоит учесть?",
    fields: ["hobbies", "healthFeatures"],
  },
  {
    id: "Шаг 6",
    name: "Какие помещения будут в проекте?",
    fields: ["rooms"],
  },
  {
    id: "Шаг 7",
    name: "Демонтаж",
    fields: [
      "planChange",
      "entranceDoorChange",
      "windowsChange",
      "furnitureDemolition",
    ],
  },
  {
    id: "Шаг 8",
    name: "Монтаж и отделка",
    fields: [
      "wallsMaterial",
      "floorMaterial",
      "ceilingMaterial",
      "isIsolationSurfaces",
      "isolationMaterials",
      "roomsForIsolation",
      "innerDoorsHeight",
    ],
  },
  {
    id: "Шаг 9",
    name: "Система отопления",
    fields: [
      "heatingSystem",
      "warmFloor",
      "warmFloorRooms",
      "conditioningSystem",
      "plumbingSystem",
      "electricSystem",
    ],
  },
  {
    id: "Шаг 10",
    name: "Комплектация кухонной зоны",
    fields: ["kitchenEquipment"],
  },
  {
    id: "Шаг 11",
    name: "Комплектация сантехническим оборудованием",
    fields: ["sanitaryEquipment"],
  },

  // {
  //   id: "step 11",
  //   name: "Комплектация постирочной или кладовой",
  //   fields: ["loundryEquipment"],
  // },
  {
    id: "Шаг 12",
    name: "Проект успешно создан",
  },
];

const CreateBrief = () => {
  // Define your form component
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: 0,
      innerDoorsHeight: [2100],
      healthFeatures: "",
      adults: 1,
      children: 0,
      childrenAge: "",
      pets: "",
      hobbies: "",
      purpose: "Жилое помещение",
      projectName: "",
      contractId: "",
      address: "",
      warmFloorRooms: [],
      floorsNumber: 1,
      planChange: false,
      entranceDoorChange: false,
      windowsChange: false,
      furnitureDemolition: false,
      approxBudget: [1000000, 10000000],
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [roomscount, setRoomscount] = useState([{ id: "01", name: "" }]);

  const router = useRouter();
  const { userId, getToken } = useAuth();

  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "rooms",
  });

  const next = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log(form.getValues("approxBudget"));

    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
    // if (currentStep === steps.length - 1) {
    if (currentStep === steps.length - 1) {
      await form.handleSubmit(onSubmit)();
    }
    //   router.push("/");
    // }
  };
  const previous = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };
  async function onSubmit(values: Inputs) {
    try {
      // e.preventDefault();
      setSubmitting(true);
      const token = await getToken({ template: "supabase" });

      const uploadedProject = await postProject({ values, userId, token });
      if (uploadedProject) {
        form.reset();
        router.push("/");
        toast("Вы создали тхническое задание для проекта", {
          description: new Date().toLocaleString(),
          action: {
            label: "Перейти к проекту",
            onClick: () =>
              router.push(
                `/dashboard/${uploadedProject.id}?&projectId=${uploadedProject.id}`
              ),
          },
        });
      }
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
    } finally {
      setSubmitting(false);
    }

    // console.log(values);
  }

  return (
    <section className="h-full p-6 rounded-lg dark:bg-neutral-900 max-w-[900px] m-auto mt-[10vh] sm:border dark:border-neutral-800 flex md:flex-col">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="space-y-2 md:flex md:space-x-2 md:space-y-0 mb-4"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full min-w-2 flex-col border-l-4 border-teal-800 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="hidden md:block text-xs font-medium text-teal-600 transition-colors">
                    {step.id}
                  </span>
                  {/* <span className="text-sm font-medium">{step.name}</span> */}
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full  min-w-2 flex-col border-l-4 border-teal-400 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="hidden md:block  text-xs font-medium text-teal-400">
                    {step.id}
                  </span>
                  {/* <span className="text-sm font-medium">{step.name}</span> */}
                </div>
              ) : (
                <div className="group  min-w-2 flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="hidden md:block text-xs font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  {/* <span className="text-sm font-medium">{step.name}</span> */}
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <Form {...form}>
        <form className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-balance">
            {steps[currentStep].name}
          </h2>
          <article className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-6">
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Фамилия</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Фамилия клиента, используемая в договоре.
                      </FormDescription>
                      <FormMessage>
                        {form.formState.errors.lastName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Имя клиента, используемое в договоре.
                      </FormDescription>
                      <FormMessage>
                        {form.formState.errors.firstName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Отчество</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Отчество клиента, используемое в договоре.
                      </FormDescription>
                      <FormMessage>
                        {form.formState.errors.lastName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Электорнная почта</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      {/* <FormDescription>Ваш адрес электронной почты.</FormDescription> */}
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер телефона</FormLabel>
                      <FormControl>
                        <Input {...field} type="phone" />
                      </FormControl>
                      {/* <FormDescription>Ваш адрес электронной почты.</FormDescription> */}
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название проекта</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Дом в "Санкт-Петербурге"'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Рабочее название проекта.
                      </FormDescription>
                      <FormMessage>
                        {form.formState.errors.projectName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contractId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Номер договора</FormLabel>
                      <FormControl>
                        <Input placeholder="00/00-00" {...field} />
                      </FormControl>
                      <FormDescription>
                        Вы можете указать номер договора, к которому привязано
                        техническое задание.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Адрес</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Москва, ул. Пушкина 1/1"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Укажите адрес объекта проектирования.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Площадь</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Площадь подлежащая проектированию.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="floorsNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Этажность</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Количество этажей на объекте.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
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
                            <SelectItem value="Коммерческое">
                              Коммерческое
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="approxBudget"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormControl></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                          <div className="flex gap-6 justify-between pt-4">
                            <div className="border dark:border-neutral-800 rounded-lg w-full">
                              <label className="text-xs px-3">
                                Минимальная сумма
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
                            <div className="border dark:border-neutral-800 rounded-lg w-full">
                              <label className="text-xs px-3">
                                Максимальная сумма
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
                                      parseLocaleNumber(
                                        i.target.value,
                                        "ru-RU"
                                      ),
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
              </>
            )}
            {currentStep === 3 && (
              <>
                <FormField
                  control={form.control}
                  name="adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Взрослые</FormLabel>
                      <FormControl>
                        <Input step={1} min={1} type="number" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                            
                          </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Дети</FormLabel>
                        <FormControl>
                          <Input step={1} min={0} type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="childrenAge"
                    render={({ field }) => (
                      <>
                        {/* @ts-ignore */}
                        {form.watch("children") > 0 && (
                          <FormItem>
                            <FormLabel>Возраст</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="3, 10"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      </>
                    )}
                  />
                </div>
                <div
                  className="rounded-lg 
                  sm:col-span-2 
                  border border-neutral-600 
                  p-4 space-y-4
                  "
                >
                  <FormField
                    control={form.control}
                    name="hasPets"
                    render={({ field }) => (
                      <FormItem
                        className="
                        
                        flex flex-row 
                        items-center justify-between
                        "
                      >
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
                  {form.watch("hasPets") && (
                    <FormField
                      control={form.control}
                      name="pets"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          {/* <FormLabel>Необходимо предусмотреть</FormLabel> */}
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
            )}
            {currentStep === 4 && (
              <>
                <FormField
                  control={form.control}
                  name="hobbies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Увлечения</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Игра на гитаре. Предусмотреть место для гитарной стойки и усилителя."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Увлечения, которые могут повлиять на планировку (охота,
                        музыка, чтение, спорт и проч.)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="healthFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Особенности здоровья</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Аллергия на шерсть. Не использовать ковры из шерсти."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Есть ли аллергия у проживающих? Что может помешать
                        использовать определенные материалы
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 5 && (
              <>
                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <>
                      <Sortable
                        value={roomscount}
                        onMove={({ activeIndex, overIndex }) =>
                          move(activeIndex, overIndex)
                        }
                        overlay={
                          <div className="grid grid-cols-[auto,1fr,auto,auto] items-center gap-2 ">
                            <Skeleton className="h-8 w-full rounded-sm" />
                            <Skeleton className="h-8 w-full rounded-sm" />
                            <Skeleton className="size-8 shrink-0 rounded-sm" />
                            <Skeleton className="size-8 shrink-0 rounded-sm" />
                          </div>
                        }
                      >
                        <div className="w-full space-y-2 sm:col-span-2 ">
                          {roomscount.map((field, index) => (
                            <SortableItem
                              key={field.id}
                              value={field.id}
                              asChild
                            >
                              <div className="grid grid-cols-[auto,1fr,auto,auto] items-center gap-2">
                                <div>{field.id}</div>
                                <FormField
                                  control={form.control}
                                  name={`rooms.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <CreatableSelect
                                          isClearable
                                          onChange={field.onChange}
                                          options={roomList}
                                        />
                                        {/* <MultipleSelector
                                          
                                          maxSelected={1}
                                          hidePlaceholderWhenSelected
                                          // selectFirstItem
                                          onChange={field.onChange}
                                          defaultOptions={roomList}
                                          placeholder="Укажите названия помещений..."
                                          creatable
                                          emptyIndicator={
                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                              Не найдено.
                                            </p>
                                          }
                                        /> */}
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <SortableDragHandle
                                  variant="outline"
                                  size="icon"
                                  className="size-8 shrink-0"
                                >
                                  <GripVertical
                                    className="size-4"
                                    aria-hidden="true"
                                  />
                                </SortableDragHandle>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="size-8 shrink-0"
                                  onClick={() => remove(index)}
                                >
                                  <TrashIcon
                                    className="size-4 text-destructive"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </div>
                            </SortableItem>
                          ))}
                          <Button
                            size={"icon"}
                            onClick={(e) => {
                              e.preventDefault();
                              setRoomscount([
                                ...roomscount,
                                {
                                  id: String(roomscount.length + 1).padStart(
                                    2,
                                    "0"
                                  ),
                                  name: "",
                                },
                              ]);
                            }}
                          >
                            <Plus />
                          </Button>
                        </div>
                      </Sortable>
                    </>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <>
                      {Array.from(
                        Array(Number(form.watch("floorsNumber")))
                      ).map((_, index) => (
                        <FormItem key={index} className="sm:col-span-2">
                          {Number(form.watch("floorsNumber")) > 1 && (
                            <FormLabel>Помещения {index + 1} этажа</FormLabel>
                          )}
                          <FormControl>
                            <MultipleSelector
                              onChange={field.onChange}
                              defaultOptions={roomList}
                              placeholder="Укажите названия помещений..."
                              creatable
                              emptyIndicator={
                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                  Не найдено.
                                </p>
                              }
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      ))}
                    </>
                  )}
                />
              </>
            )}
            {currentStep === 6 && (
              <>
                <div
                  className="
                  rounded-lg 
                  sm:col-span-2 
                  border border-neutral-600 
                  p-4 space-y-4
                  "
                >
                  <FormField
                    control={form.control}
                    name="planChange"
                    render={({ field }) => (
                      <FormItem
                        className="
                        flex flex-row 
                        items-center justify-between
                        "
                      >
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

                <FormField
                  control={form.control}
                  name="entranceDoorChange"
                  render={({ field }) => (
                    <FormItem
                      className="
                        rounded-lg 
                        sm:col-span-2 
                        border border-neutral-600 
                        p-4 space-y-4
                        flex flex-row 
                        items-center justify-between
                        "
                    >
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

                <FormField
                  control={form.control}
                  name="windowsChange"
                  render={({ field }) => (
                    <FormItem
                      className="
                        rounded-lg 
                        sm:col-span-2 
                        border border-neutral-600 
                        p-4 space-y-4
                        flex flex-row 
                        items-center justify-between
                        "
                    >
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
                <div
                  className="
                  rounded-lg 
                  sm:col-span-2 
                  border border-neutral-600 
                  p-4 space-y-4
                  "
                >
                  <FormField
                    control={form.control}
                    name="furnitureDemolition"
                    render={({ field }) => (
                      <FormItem
                        className="
                        flex flex-row 
                        items-center justify-between
                        "
                      >
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
                  {form.watch("furnitureDemolition") && (
                    <FormField
                      control={form.control}
                      // TODO Change pets
                      name="pets"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormControl>
                            <Textarea placeholder="" {...field} />
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
            )}
            {currentStep === 7 && (
              <>
                <FormField
                  control={form.control}
                  name="wallsMaterial"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>Материал перегородок</FormLabel>
                        <Sheet>
                          <SheetTrigger asChild className="cursor-pointer">
                            <Info className="text-neutral-500 size-5" />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Материал перегородок</SheetTitle>
                              <SheetDescription>
                                Выберите один или несколько материалов.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4 grid gap-4">
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Tempora vero voluptatem
                                ratione magnam, incidunt odit asperiores placeat
                                eius. Numquam veritatis a earum deleniti maiores
                                commodi iusto nemo aliquam incidunt quisquam!
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <FormControl>
                        <MultipleSelector
                          onChange={(val) =>
                            onChange(val.map((item: any) => item.value))
                          }
                          defaultOptions={wallsMaterials}
                          placeholder="Укажите один или несколько материалов..."
                          creatable
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Не найдено.
                            </p>
                          }
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ceilingMaterial"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>Потолок</FormLabel>
                        <Sheet>
                          <SheetTrigger asChild className="cursor-pointer">
                            <Info className="text-neutral-500 size-5" />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Материал потолка</SheetTitle>
                              <SheetDescription>
                                Выберите один или несколько материалов.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4 grid gap-4">
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Tempora vero voluptatem
                                ratione magnam, incidunt odit asperiores placeat
                                eius. Numquam veritatis a earum deleniti maiores
                                commodi iusto nemo aliquam incidunt quisquam!
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <FormControl>
                        <MultipleSelector
                          onChange={(val) =>
                            onChange(val.map((item: any) => item.value))
                          }
                          defaultOptions={ceilingMaterials}
                          placeholder="Укажите один или несколько материалов..."
                          creatable
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Не найдено.
                            </p>
                          }
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="floorMaterial"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>Напольные покрытия</FormLabel>
                        <Sheet>
                          <SheetTrigger asChild className="cursor-pointer">
                            <Info className="text-neutral-500 size-5" />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Материал перегородок</SheetTitle>
                              <SheetDescription>
                                Выберите один или несколько материалов.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4 grid gap-4">
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Tempora vero voluptatem
                                ratione magnam, incidunt odit asperiores placeat
                                eius. Numquam veritatis a earum deleniti maiores
                                commodi iusto nemo aliquam incidunt quisquam!
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <FormControl>
                        <MultipleSelector
                          onChange={(val) =>
                            field.onChange(val.map((item: any) => item.value))
                          }
                          defaultOptions={floorMaterials}
                          placeholder="Укажите один или несколько материалов..."
                          creatable
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Не найдено.
                            </p>
                          }
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <div
                  className="rounded-lg 
                  sm:col-span-2 
                  border border-neutral-600 
                  p-4 space-y-4
                  "
                >
                  <FormField
                    control={form.control}
                    name="hasIsolationSurfaces"
                    render={({ field }) => (
                      <FormItem
                        className="
                        
                        flex flex-row 
                        items-center justify-between
                        "
                      >
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
                  {form.watch("hasIsolationSurfaces") && (
                    <>
                      <FormField
                        control={form.control}
                        name="isolationMaterials"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            {/* <FormLabel>Необходимо предусмотреть</FormLabel> */}
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
                        control={form.control}
                        name="roomsForIsolation"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            {/* <FormLabel>Необходимо предусмотреть</FormLabel> */}
                            <FormControl>
                              <MultipleSelector
                                onChange={(val) =>
                                  field.onChange(
                                    val.map((item: any) => item.value)
                                  )
                                }
                                defaultOptions={[
                                  { value: "rooms", label: "Все комнаты" },
                                ]}
                                placeholder="Выберите помещения..."
                                creatable
                                options={form.getValues("rooms")}
                                emptyIndicator={
                                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                    Не найдено.
                                  </p>
                                }
                              />
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
                  control={form.control}
                  name="innerDoorsHeight"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <FormLabel>Высота дверей</FormLabel>
                        <span className="text-xs bg-neutral-800 py-1 px-2 rounded-md text-neutral-100">{`${value} мм`}</span>
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
                          <div className="flex justify-between text-sm mt-3 text-neutral-600">
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
            )}
            {currentStep === 8 && (
              <>
                <FormField
                  control={form.control}
                  name="heatingSystem"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      {/* <FormLabel>Материал стен</FormLabel> */}
                      <FormControl>
                        <div className="grid sm:grid-cols-4 gap-2">
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
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="border border-neutral-600 rounded-lg p-4 col-span-2 space-y-4">
                  {form.watch("heatingSystem")?.includes("Теплый пол") ? (
                    <FormField
                      control={form.control}
                      name="warmFloorRooms"
                      render={({ field }) => (
                        <>
                          <FormItem
                            className="
                            col-span-2
                            "
                          >
                            <FormLabel>Помещения с теплым полом</FormLabel>
                            <FormControl className="flex flex-wrap gap-2">
                              <>
                                {form
                                  .getValues("rooms")
                                  ?.map(({ value, label }, index) => (
                                    <Badge
                                      id={value}
                                      key={index}
                                      variant={
                                        field.value?.includes(value)
                                          ? "default"
                                          : "outline"
                                      }
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange(
                                          field.value?.includes(value)
                                            ? field.value?.filter(
                                                (v) => v !== value
                                              )
                                            : [...(field.value || []), value]
                                        );
                                      }}
                                    >
                                      {label}
                                    </Badge>
                                  ))}
                              </>
                            </FormControl>
                          </FormItem>
                        </>
                      )}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="conditioningSystem"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      {/* <FormLabel>Материал стен</FormLabel> */}
                      <FormControl>
                        <div className="grid sm:grid-cols-4 gap-2">
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
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="plumbingSystem"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      {/* <FormLabel>Материал стен</FormLabel> */}
                      <FormControl>
                        <div className="grid sm:grid-cols-4 gap-2">
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
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 9 && (
              <>
                <FormField
                  control={form.control}
                  name="kitchenEquipment"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <Sheet>
                          <SheetTrigger asChild className="cursor-pointer">
                            <Info className="text-neutral-500 size-5" />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Оборудование</SheetTitle>
                              <SheetDescription>
                                Выберите один или несколько материалов.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4 grid gap-4">
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Tempora vero voluptatem
                                ratione magnam, incidunt odit asperiores placeat
                                eius.
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <FormControl>
                        <MultipleSelector
                          onChange={(val) =>
                            onChange(val.map((item: any) => item.value))
                          }
                          defaultOptions={kitchenEquipment}
                          creatable
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Не найдено.
                            </p>
                          }
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 10 && (
              <>
                <FormField
                  control={form.control}
                  name="sanitaryEquipment"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      <div className="flex justify-between items-center">
                        <Sheet>
                          <SheetTrigger asChild className="cursor-pointer">
                            <Info className="text-neutral-500 size-5" />
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Оборудование</SheetTitle>
                              <SheetDescription>
                                Выберите один или несколько материалов.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-4 grid gap-4">
                              <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Tempora vero voluptatem
                                ratione magnam, incidunt odit asperiores placeat
                                eius. Numquam veritatis a earum deleniti maiores
                                commodi iusto nemo aliquam incidunt quisquam!
                              </p>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                      <FormControl>
                        <MultipleSelector
                          onChange={(val) =>
                            onChange(val.map((item: any) => item.value))
                          }
                          defaultOptions={sanitaryEquipment}
                          creatable
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Не найдено.
                            </p>
                          }
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 11 && (
              <>
                <h2 className="text-3xl font-bold">
                  Вы успешно создали проект!
                </h2>
                <div className="space-y-2">
                  {steps.map(
                    (step, stepIndex) =>
                      stepIndex < steps.length - 1 && (
                        <div
                          key={stepIndex}
                          className="flex items-center gap-2"
                        >
                          <Check className="size-[14px]" />
                          <div className="text-xs">{step.name}</div>
                        </div>
                      )
                  )}
                </div>
              </>
            )}
          </article>
          <div className="flex justify-end gap-4">
            <Button variant="ghost" onClick={previous}>
              Назад
            </Button>
            <Button className="bg-teal-600" onClick={next}>
              {currentStep === steps.length - 1
                ? submitting
                  ? "Создание..."
                  : "Создать"
                : "Далее"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateBrief;
