"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Database } from "@/utils/database.types";
import { postProject } from "@/utils/requests";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, redirect } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define your form schema
const formSchema = z.object({
  projectName: z.string().min(1).max(50).trim(),
  contractId: z.string().min(1).trim().optional(),
  address: z.string().min(1).trim(),
  area: z.coerce.number().min(1),
  residing: z.coerce.number().optional(),
});

type Inputs = z.infer<typeof formSchema>;

// Define your form steps
const steps = [
  {
    id: "step 1",
    name: "Информация по проекту",
    fields: ["projectName", "contractId"],
  },
  {
    id: "step 2",
    name: "Адрес объекта",
    fields: ["address"],
  },
  {
    id: "step 3",
    name: "Дополнительная информация",
    fields: ["area", "residing"],
  },
  {
    id: "step 4",
    name: "Проект успешно создан",
  },
];

const CreateBrief = () => {
  // Define your form component
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   projectName: "",
    //   address: "",
    //   area: 0,
    // },
  });

  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();
  const { userId, getToken } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [projects, setProjects] = useState<any[]>();

  type FieldName = keyof Inputs;
  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await form.handleSubmit(onSubmit)();
      }
      setCurrentStep((step) => step + 1);
    }
    // if (currentStep === steps.length - 1) {
    //   router.push("/");
    // }
  };
  const previous = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };
  async function onSubmit(values: Inputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      // e.preventDefault();
      setSubmitting(true);
      const token = await getToken({ template: "supabase" });
      const formData: Database["public"]["Tables"]["projects"]["Insert"] = {
        projectName: values.projectName,
        contractId: values.contractId,
        address: values.address,
        area: values.area,
        residing: values.residing,
        user_id: userId || "",
      };
      const fetchedProjects = await postProject({ formData, userId, token });
      if (fetchedProjects) {
        setProjects(fetchedProjects);
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
    <section>
      <Form {...form}>
        <form
          method="dialog"
          // onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {currentStep === 0 && (
            <>
              {/* <div>
                <label htmlFor="projectName">Название проекта</label>
                <div>
                  <input
                    type="text"
                    id="projectName"
                    {...form.register("projectName")}
                    autoComplete="given-name"
                  />
                  {form.formState.errors.projectName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {form.formState.errors.projectName?.message}
                    </p>
                  )}
                </div>
              </div> */}
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название проекта</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Рабочее название проекта.</FormDescription>
                    <FormMessage />
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
            </>
          )}
          {currentStep === 1 && (
            <>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Адрес</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Москва, ул. Пушкина, д. 1"
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
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Площадь объекта</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="100 кв.м." {...field} />
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
                name="residing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество проживающих</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Количество людей, которые будут единовременно проживать на
                      объекте.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {currentStep === 3 && <h2>Вы успешно создали проект!</h2>}
          <div>
            <Button variant="outline" onClick={previous}>
              Назад
            </Button>
            <Button
              // type="submit"
              onClick={next}
            >
              {currentStep === steps.length - 2
                ? submitting
                  ? "Создание..."
                  : "Создать"
                : currentStep === steps.length - 1
                ? "На Главную"
                : "Далее"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateBrief;
