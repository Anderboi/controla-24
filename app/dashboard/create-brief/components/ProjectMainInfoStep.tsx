'use client'

import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AddressSuggest from '@/components/ui/address-suggest';
import { useFormContext } from 'react-hook-form';

const ProjectMainInfoStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  
  return (
    <>
      <FormField
        control={control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Название проекта</FormLabel>
            <FormControl>
              <Input placeholder='Дом в "Москве"' {...field} />
            </FormControl>
            <FormDescription>Рабочее название проекта.</FormDescription>
            <FormMessage>
              {errors.root?.message}
            </FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="contractId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номер договора</FormLabel>
            <FormControl>
              <Input placeholder="00/00-00" {...field} />
            </FormControl>
            <FormDescription>
              Вы можете указать номер договора, к которому привязано техническое
              задание.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
  );
}

export default ProjectMainInfoStep