'use client'

import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { useFormContext } from 'react-hook-form';

const ClientInfoStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  
  return (
    <>
      <FormField
        control={control}
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
            <FormMessage>{errors.root?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
            <FormMessage>{errors.root?.message}</FormMessage>
          </FormItem>
        )}
      />

      <FormField
        control={control}
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
            <FormMessage>{errors.root?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Электорнная почта</FormLabel>
            <FormControl>
              <Input {...field} type="email" />
            </FormControl>
            <FormMessage>{errors.root?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Номер телефона</FormLabel>
            <FormControl>
              <PhoneInput {...field} defaultCountry="RU" />
            </FormControl>
            <FormMessage>{errors.root?.message}</FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}

export default ClientInfoStep