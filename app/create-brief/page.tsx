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
  floorMaterials,
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
// import Select from "react-select";

import { Database } from "@/utils/database.types";
import { formSchema } from "@/utils/formSchema";
import { postProject } from "@/utils/requests";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, FileDiff, Heater, Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RangeSlider } from "@/components/ui/rangeSlider";
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
import { cn } from "@/utils/utils";
import DataCard from "@/components/ui/dataCard";

type Inputs = z.infer<typeof formSchema>;

// Define your form steps
const steps = [
  {
    id: "step 1",
    name: "Контактная информация о клиенте",
    fields: ["firstName", "lastName", "middleName", "email", "phone"],
  },
  {
    id: "step 2",
    name: "Информация по проекту",
    fields: ["projectName", "contractId", "address"],
  },
  {
    id: "step 3",
    name: "Дополнительная информация",
    fields: ["area", "floorsNumber", "purpose", "approxBudget"],
  },
  {
    id: "step 4",
    name: "Информация о проживающих",
    fields: ["pets", "hobbies", "allergy", "children", "adults", "childrenAge"],
  },
  {
    id: "step 5",
    name: "Перечень помещений",
    fields: ["rooms"],
  },
  {
    id: "step 6",
    name: "Демонтаж",
    fields: [
      "planChange",
      "entranceDoorChange",
      "windowsChange",
      "furnitureDemolition",
    ],
  },
  {
    id: "step 7",
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
    id: "step 8",
    name: "Система отопления",
    fields: ["heatingSystem", "warmFloor", "warmFloorRooms"],
  },
  {
    id: "step 9",
    name: "Система кондиционирования и вентиляции",
    fields: ["conditioningSystem"],
  },
  {
    id: "step 10",
    name: "Система водоподготовки и фильтрации",
    fields: ["sanitaryEquipment"],
  },
  {
    id: "step 11",
    name: "Электронная система и система управления",
    fields: ["electricSystem"],
  },
  {
    id: "step 12",
    name: "Комплектация сантехническим оборудованием",
    fields: ["sanitaryEquipment"],
  },
  {
    id: "step 13",
    name: "Комплектация кухонной зоны",
    fields: ["kitchenEquipment"],
  },
  {
    id: "step 14",
    name: "Комплектация постирочной или кладовой",
    fields: ["loundryEquipment"],
  },
  {
    id: "step 15",
    name: "Проект успешно создан",
  },
];

const CreateBrief = () => {
  // Define your form component
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // rooms:[],
      innerDoorsHeight: [2100],
      warmFloorRooms: [],
    },
  });

  // const { fields:rooms, append, remove } = useFieldArray({
    
  //   name: "rooms",
  //   control: form.control,
  // });


  const [currentStep, setCurrentStep] = useState(6);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { userId, getToken } = useAuth();

  const budgetRef = form.register("approxBudget");

  type FieldName = keyof Inputs;

  const next = async (e: any) => {
    e.preventDefault();

    console.log(form.getValues("floorMaterial"));

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
  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };
  async function onSubmit(values: Inputs) {
    // try {
    //   // e.preventDefault();
    //   setSubmitting(true);
    //   const token = await getToken({ template: "supabase" });
    //   const formData: Database["public"]["Tables"]["projects"]["Insert"] = {
    //     projectName: values.projectName,
    //     contractId: values.contractId,
    //     address: values.address,
    //     area: values.area,
    //     residing: values.adults + (values.children ? values.children : 0),
    //     user_id: userId || "",
    //   };
    //   const fetchedProjects = await postProject({ formData, userId, token });
    //   if (fetchedProjects) {
    //     form.reset();
    //     router.push("/");
    //   }
    //   // console.log(posts);
    // } catch (error) {
    //   // Handle the error here
    //   console.error("An error occurred:", error);
    // } finally {
    //   setSubmitting(false);
    // }

    console.log(values);
  }

  return (
    <section className="h-full p-6 rounded-lg bg-neutral-900 max-w-[900px] m-auto mt-[10vh]">
      <Form {...form}>
        <form className="space-y-6">
          <h2>{steps[currentStep].name}</h2>
          <article className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-x-6">
            {currentStep === 0 && (
              <>
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
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
                          <Input defaultValue={1} type="number" {...field} />
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
                            <SelectItem value="living">Жилое</SelectItem>
                            <SelectItem value="commercial">
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
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Бюджет</FormLabel>
                      <FormControl>
                        <RangeSlider
                          formatLabel={(value) =>
                            new Intl.NumberFormat("ru-RU", {
                              style: "currency",
                              currency: "RUB",
                              compactDisplay: "short",
                              maximumFractionDigits: 0,
                              useGrouping: true,
                            }).format(value)
                          }
                          //@ts-ignore
                          max={100000000}
                          //@ts-ignore
                          min={100000}
                          step={100000}
                          minStepsBetweenThumbs={1}
                          {...budgetRef}
                        />
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
                        <Input
                          defaultValue={1}
                          step={1}
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                            
                          </FormDescription> */}
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
                        <Input step={1} type="number" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                            
                          </FormDescription> */}
                      <FormMessage />
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
                  name="allergy"
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
            {currentStep === 4 && (
              <>
                <FormField
                  control={form.control}
                  name="rooms"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      {/* <FormLabel>Состав помещений</FormLabel> */}
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
                  )}
                />
              </>
            )}
            {currentStep === 5 && (
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
                  {form.watch("planChange") && (
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
            {currentStep === 6 && (
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
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
                                onChange={field.onChange}
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
            {currentStep === 7 && (
              <>
                <FormField
                  control={form.control}
                  name="heatingSystem"
                  render={({ field: { onChange, value } }) => (
                    <FormItem className="sm:col-span-2">
                      {/* <FormLabel>Материал стен</FormLabel> */}
                      <FormControl>
                        <div className="grid sm:grid-cols-4 gap-2">
                          <DataCard
                            value={value}
                            name="Радиаторы"
                            isChecked={value?.includes("Радиаторы") || false}
                            onChange={onChange}
                            icon={<Heater size={44} strokeWidth={1} />}
                          />
                          <DataCard
                            value={value}
                            name="Конвекторы"
                            isChecked={value?.includes("Конвекторы") || false}
                            onChange={onChange}
                            icon={<Heater size={44} strokeWidth={1} />}
                          />
                          <DataCard
                            value={value}
                            name="ИК-радиаторы"
                            isChecked={value?.includes("ИК-радиаторы") || false}
                            onChange={onChange}
                            icon={<Heater size={44} strokeWidth={1} />}
                          />
                          <DataCard
                            value={value}
                            name="Теплый пол"
                            isChecked={value?.includes("Теплый пол") || false}
                            onChange={onChange}
                            icon={<Heater size={44} strokeWidth={1} />}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="border border-neutral-600 rounded-lg p-4 col-span-2 space-y-4">
                  {/* <FormField
                    control={form.control}
                    name="warmFloor"
                    render={({ field: { onChange, value } }) => (
                      <FormItem
                        className="
                        col-span-2
                        flex flex-row 
                        items-center justify-between
                        "
                      >
                        <FormLabel>Теплый пол</FormLabel>
                        <FormControl>
                          <Switch
                            className="!m-0"
                            checked={value}
                            onCheckedChange={onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  /> */}
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
              </>
            )}
            {currentStep === 8 && (
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
            <Button onClick={next}>
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
