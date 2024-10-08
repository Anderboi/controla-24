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

const HobbyHealthStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormField
        control={control}
        name="hobbies"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Увлечения</FormLabel>
            <FormControl>
              <Textarea
                maxLength={500}
                placeholder="Игра на гитаре. Предусмотреть место для гитарной стойки и усилителя."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Увлечения, которые могут повлиять на планировку (охота, музыка,
              чтение, спорт и проч.)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="healthFeatures"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Ограничения по здоровью</FormLabel>
            <FormControl>
              <Textarea
                maxLength={500}
                placeholder="Аллергия на шерсть. Не использовать ковры из шерсти."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Есть ли ограничения по здоровью у проживающих, которые могут
              повлиять на дизайн-проект? Что может помешать использовать
              определенные материалы? Какие необходимо создать условия для более
              комфортного проживания?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default HobbyHealthStep;
