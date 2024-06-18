'use client'

import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

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
          <FormItem>
            <FormLabel>Увлечения</FormLabel>
            <FormControl>
              <Textarea
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
          <FormItem>
            <FormLabel>Особенности здоровья</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Аллергия на шерсть. Не использовать ковры из шерсти."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Есть ли аллергия у проживающих? Что может помешать использовать
              определенные материалы
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export default HobbyHealthStep