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

function CreateBrief() {
  const formSchema = z.object({
    projectName: z.string().min(2).max(50).trim(),
    contractId: z.string().min(2).optional(),
    address: z.string().min(2).trim(),
    area: z.coerce.number().min(1),
    residing: z.coerce.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      address: "",
      area: 0,
    },
  });

  const router = useRouter();
  const { userId, getToken } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [projects, setProjects] = useState<any[]>();

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес</FormLabel>
                <FormControl>
                  <Input placeholder="Москва, ул. Пушкина, д. 1" {...field} />
                </FormControl>
                <FormDescription>
                  Укажите адрес объекта проектирования.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit">Создать</Button>
        </form>
      </Form>
    </section>
  );
}

export default CreateBrief;
