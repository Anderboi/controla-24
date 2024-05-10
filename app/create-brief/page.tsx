"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

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
import { DatePickerDemo } from "@/components/ui/datePicker";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Database } from "@/utils/database.types";
import { formSchema } from "@/utils/formSchema";
import { postProject } from "@/utils/requests";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RangeSlider } from "@/components/ui/rangeSlider";

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
    name: "Информация по демонтажу",
    fields: [
      "planChange",
      "entranceDoorChange",
      "windowsChange",
      "furnitureDemolition",
    ],
  },
  {
    id: "step 7",
    name: "Информация по монтажу",
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
    name: "Предпочтения по цвету в интерьере",
    fields: ["preferedColors", "shouldIgnoreColors"],
  },
  {
    id: "step 9",
    name: "Система отопления",
    fields: ["heatingSystem", "warmFloor", "warmFloorRooms"],
  },
  {
    id: "step 10",
    name: "Система кондиционирования и вентиляции",
    fields: ["conditioningSystem"],
  },
  {
    id: "step 11",
    name: "Система водоподготовки и фильтрации",
    fields: ["sanitaryEquipment"],
  },
  {
    id: "step 12",
    name: "Электронная система и система управления",
    fields: ["electricSystem"],
  },
  {
    id: "step 13",
    name: "Комплектация сантехническим оборудованием",
    fields: ["sanitaryEquipment"],
  },
  {
    id: "step 14",
    name: "Комплектация кухонной зоны",
    fields: ["kitchenEquipment"],
  },
  {
    id: "step 15",
    name: "Комплектация постирочной или кладовой",
    fields: ["loundryEquipment"],
  },
  {
    id: "step 16",
    name: "Проект успешно создан",
  },
];

const CreateBrief = () => {
  // Define your form component
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
  });

  const [currentStep, setCurrentStep] = useState(2);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { userId, getToken } = useAuth();

  const purposeRef = form.register("purpose");
  const budgetRef = form.register("approxBudget");
  type FieldName = keyof Inputs;
  const next = async (e: any) => {
    e.preventDefault();
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
    try {
      // e.preventDefault();
      setSubmitting(true);
      const token = await getToken({ template: "supabase" });
      const formData: Database["public"]["Tables"]["projects"]["Insert"] = {
        projectName: values.projectName,
        contractId: values.contractId,
        address: values.address,
        area: values.area,
        residing: values.adults + (values.children ? values.children : 0),
        user_id: userId || "",
      };
      const fetchedProjects = await postProject({ formData, userId, token });
      if (fetchedProjects) {
        form.reset();
        router.push("/");
      }
      // console.log(posts);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
    } finally {
      setSubmitting(false);
    }

    console.log(values);
  }

  return (
    <section className="h-full p-6 rounded-lg bg-neutral-900 max-w-[900px] m-auto mt-[10vh]">
      <Form {...form}>
        <form
          // method="dialog"
          // onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <h2>{steps[currentStep].name}</h2>
          <article className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Назначение</FormLabel>
                      <FormControl>
                        <Select {...purposeRef}>
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
