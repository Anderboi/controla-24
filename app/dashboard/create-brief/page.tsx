"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useFieldArray, useForm } from "react-hook-form";

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
  equipment,
  floorMaterials,
  heatingSystems,
  plumbingSystems,
  roomList,
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
  ChevronLeft,
  GripVertical,
  Heater,
  Info,
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
import Stepper from "../../components/Stepper";
import { PhoneInput } from "@/components/ui/phone-input";
import AddressSuggest from "@/components/ui/address-suggest";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
    fields: ["area", "purpose", "approxBudget"],
  },
  {
    id: "Шаг 4",
    name: "Кто будет проживать?",
    fields: ["pets", "children", "adults", "adultHeight", "childrenAge"],
  },
  {
    id: "Шаг 5",
    name: "Что стоит учесть?",
    fields: ["hobbies", "healthFeatures"],
  },
  {
    id: "Шаг 6",
    name: "Какие помещения будут в проекте?",
    fields: ["floorsNumber", "rooms"],
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
    name: "Инженерные системы",
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
    name: "Комплектация оборудованием",
    fields: ["equipment"],
  },
  {
    id: "Шаг 11",
    name: "Проект успешно создан",
  },
];

const CreateBrief = () => {
  // Define your form component
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      middleName: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      area: 0,
      innerDoorsHeight: [2100],
      healthFeatures: "",
      adults: 1,
      adultHeight: [],
      children: 0,
      childrenAge: [],
      hasPets: false,
      pets: "",
      hobbies: "",
      purpose: "Жилое",
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
      rooms: [{ name: "", area: 0, number: "" }],
      hasIsolationSurfaces: false,
      roomsForIsolation: [],
      kitchenEquipment: [],
      sanitaryEquipment: [],
      ceilingMaterial: [],
      floorMaterial: [],
      wallsMaterial: [],
      isolationMaterials: "",
      heatingSystem: [],
      conditioningSystem: [],
      electricSystem: [],
      plumbingSystem: [],
      loundryEquipment: [],
      equipment: [{ name: [], room_id: "" }],
    },
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const { userId, getToken } = useAuth();

  const {
    fields: roomFields,
    append,
    move,
    remove,
    update,
  } = useFieldArray({
    control: form.control,
    name: "rooms",
  });

  const {
    fields: equipmentFields,
    append: equipmentAppend,
    move: equipmentMove,
    remove: equipmentRemove,
    update: equipmentUpdate,
  } = useFieldArray({
    control: form.control,
    name: "equipment",
  });

  const next = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // console.log(form.getValues("adultHeight"));

    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
    if (currentStep === steps.length - 1) {
      await form.handleSubmit(onSubmit)();
    }
  };

  const skipAll = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    setCurrentStep(steps.length - 1);
  };

  const previous = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };
  async function onSubmit(values: Inputs) {
    try {
      setSubmitting(true);
      const token = await getToken({ template: "supabase" });

      const uploadedProject = await postProject({ values, userId, token });
      if (uploadedProject) {
        form.reset();
        router.push("/dashboard");
        toast.success("Вы создали тхническое задание для проекта", {
          description: new Date().toLocaleString(),
          action: {
            label: "Перейти к проекту",
            onClick: () =>
              router.push(
                `/dashboard/${uploadedProject.id}?&projectId=${uploadedProject.id}`,
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
  }

  return (
    <section className="flex h-full rounded-lg p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:m-auto sm:max-w-[900px] sm:border sm:p-6 md:flex-col">
      <Stepper currentStep={currentStep} steps={steps} />
      <Form {...form}>
        <form className="w-full space-y-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            {steps[currentStep].name}
          </h2>
          <article className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
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
                        {form.formState.errors.middleName?.message}
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
                        <PhoneInput {...field} defaultCountry="RU" />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.phone?.message}
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
                        <AddressSuggest {...field} />
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
                <FormField
                  control={form.control}
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
                              <div className="flex justify-between gap-6 pt-4">
                                <div className="w-full rounded-lg border dark:border-neutral-800">
                                  <label className="px-3 text-xs">
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
                                        parseLocaleNumber(
                                          i.target.value,
                                          "ru-RU",
                                        ),
                                        value?.[1],
                                      ])
                                    }
                                  />
                                </div>
                                <div className="w-full rounded-lg border dark:border-neutral-800">
                                  <label className="px-3 text-xs">
                                    Максимальная сумма
                                  </label>
                                  <div className="flex items-center">
                                    <Input
                                      className="border-none"
                                      min={2000000}
                                      max={100000000}
                                      step={1000000}
                                      value={value?.[1].toLocaleString(
                                        "ru-RU",
                                        {
                                          currency: "RUB",
                                          style: "currency",
                                          maximumFractionDigits: 0,
                                          useGrouping: true,
                                          notation: "compact",
                                        },
                                      )}
                                      onChange={(i) => {
                                        onChange([
                                          value?.[0],
                                          parseLocaleNumber(
                                            i.target.value,
                                            "ru-RU",
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
                  </CollapsibleContent>
                </Collapsible>
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
                  control={form.control}
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
                        {Array.from(Array(Number(form.watch("adults")))).map(
                          (item, adultIndex) => (
                            <FormField
                              defaultValue={0}
                              key={adultIndex}
                              control={form.control}
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
                      {form.watch("children") > 0 && (
                        <div className="space-y-4">
                          <FormLabel>Возраст детей</FormLabel>
                          {Array.from(
                            Array(Number(form.watch("children"))),
                          ).map((item, adultIndex) => (
                            <FormField
                              defaultValue={0}
                              key={adultIndex}
                              control={form.control}
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
                          ))}
                          <FormDescription>
                            Поможет при планировании детских комнат.
                          </FormDescription>
                        </div>
                      )}
                    </>
                  </CollapsibleContent>
                </Collapsible>

                <div className="space-y-4 rounded-lg border border-neutral-600 p-4 sm:col-span-2">
                  <FormField
                    control={form.control}
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
                      <SortableItem
                        key={fieldItem.id}
                        value={fieldItem.id}
                        asChild
                      >
                        <div className="grid grid-cols-[0.3fr,2fr,0.5fr,auto,auto] items-center gap-2">
                          <FormField
                            control={form.control}
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
                            control={form.control}
                            name={`rooms.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <>
                                    <CreatableSelect
                                      formatCreateLabel={(value) =>
                                        `Создать '${value}'`
                                      }
                                      placeholder="Помещение..."
                                      options={roomList}
                                      onChange={(val) =>
                                        field.onChange(val?.value)
                                      }
                                      className="h-8 !rounded-lg"
                                      classNames={{
                                        control: (
                                          state,
                                        ) => `h-8 !rounded-md border-red-300 !border-neutral-200 !focused:border-teal-500
                                                  !focused:ring-teal-500 
                                                  dark:bg-neutral-900 
                                                  dark:!text-neutral-50 dark:!border-neutral-800`,

                                        input: (state) => "text-sm",
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
                                  <Input
                                    className="h-8"
                                    type="number"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <SortableDragHandle
                            variant="ghost"
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
            )}
            {currentStep === 6 && (
              <>
                <div className="space-y-4 rounded-lg border border-neutral-600 p-4 sm:col-span-2">
                  <FormField
                    control={form.control}
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

                <FormField
                  control={form.control}
                  name="entranceDoorChange"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-y-4 rounded-lg border border-neutral-600 p-4 sm:col-span-2">
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
                    <FormItem className="flex flex-row items-center justify-between space-y-4 rounded-lg border border-neutral-600 p-4 sm:col-span-2">
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
                <div className="space-y-4 rounded-lg border border-neutral-600 p-4 sm:col-span-2">
                  <FormField
                    control={form.control}
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
                          onChange={(val: any) =>
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
                <div className="space-y-4 rounded-lg border p-4 dark:border-neutral-800 sm:col-span-2">
                  <FormField
                    control={form.control}
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
                      {/* //TODO: Add rooms selector */}
                      <FormField
                        control={form.control}
                        name="roomsForIsolation"
                        render={({ field }) => (
                          <FormItem className="gap-2 sm:col-span-2">
                            <FormControl>
                              <>
                                {form
                                  .getValues("rooms")
                                  ?.map(({ name }, index) => (
                                    <Badge
                                      id={name}
                                      key={index}
                                      variant={
                                        field.value?.includes(name)
                                          ? "default"
                                          : "outline"
                                      }
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange(
                                          field.value?.includes(name)
                                            ? field.value?.filter(
                                                (v) => v !== name,
                                              )
                                            : [...(field.value || []), name],
                                        );
                                      }}
                                    >
                                      {name}
                                    </Badge>
                                  ))}
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
                  control={form.control}
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
            )}
            {currentStep === 8 && (
              <>
                <FormField
                  control={form.control}
                  name="heatingSystem"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Система отопления</FormLabel>
                      <FormControl>
                        <div className="grid gap-2 sm:grid-cols-3">
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
                <>
                  {form.watch("heatingSystem")?.includes("Теплый пол") ? (
                    <div className="space-y-3 rounded-lg border p-4 dark:border-neutral-800 sm:col-span-2">
                      <FormField
                        control={form.control}
                        name="warmFloorRooms"
                        render={({ field }) => (
                          <>
                            <FormItem className="col-span-2">
                              <FormLabel>Помещения с теплым полом</FormLabel>
                              <FormControl className="flex flex-wrap gap-2">
                                <>
                                  {form
                                    .getValues("rooms")
                                    ?.map(({ name }, index) => (
                                      <Badge
                                        id={name}
                                        key={index}
                                        variant={
                                          field.value?.includes(name)
                                            ? "default"
                                            : "outline"
                                        }
                                        className="cursor-pointer"
                                        onClick={() => {
                                          field.onChange(
                                            field.value?.includes(name)
                                              ? field.value?.filter(
                                                  (v) => v !== name,
                                                )
                                              : [...(field.value || []), name],
                                          );
                                        }}
                                      >
                                        {name}
                                      </Badge>
                                    ))}
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
                  control={form.control}
                  name="conditioningSystem"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Система кондиционирования</FormLabel>
                      <FormControl>
                        <div className="grid gap-2 sm:grid-cols-3">
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
                      <FormLabel>Система водоснабжения</FormLabel>
                      <FormControl>
                        <div className="grid gap-2 sm:grid-cols-3">
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
                {equipmentFields.map((fieldItem, index) => (
                  <div
                    key={index}
                    className="items-srart grid grid-cols-[1fr,2fr,auto] gap-2 sm:col-span-2"
                  >
                    <FormField
                      control={form.control}
                      name={`equipment.${index}.room_id`}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue placeholder="Выберите помещение" />
                          </SelectTrigger>
                          <SelectContent>
                            {form.getValues("rooms")?.map(({ name }, index) => (
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
                      control={form.control}
                      name={`equipment.${index}.name`}
                      render={({ field: { onChange, value } }) => (
                        <FormItem>
                          <FormControl>
                            <MultipleSelector
                              onChange={(
                                val: { value: string; label: string }[],
                              ) =>
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
                      <TrashIcon
                        className="text-destructive size-4"
                        aria-hidden="true"
                      />
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
            )}

            {currentStep === 10 && (
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
                      ),
                  )}
                </div>
              </>
            )}
          </article>
          <div className="flex w-full justify-between gap-4">
            <Button
              variant="link"
              onClick={skipAll}
              className="!px-0 text-neutral-500 dark:text-neutral-500"
            >
              Пропустить всё
            </Button>
            <div className="flex gap-4">
              <Button variant="ghost" onClick={previous}>
                <ChevronLeft className="text-neutral-500 dark:text-neutral-500 sm:hidden" />
                <span className="hidden sm:block">Назад</span>
              </Button>
              <Button className="bg-teal-600" onClick={next}>
                {currentStep === steps.length - 1
                  ? submitting
                    ? "Создание..."
                    : "Создать"
                  : "Далее"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateBrief;
