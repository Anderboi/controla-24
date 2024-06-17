"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { formSchema } from "@/utils/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postProject } from "@/utils/requests";
import { toast } from "sonner";
import Stepper from "./components/Stepper";
import ClientInfoStep from "./components/ClientInfoStep";
import ProjectMainInfoStep from "./components/ProjectMainInfoStep";
import ProjectAdditionalInfoStep from "./components/ProjectAdditionalInfoStep";
import ResidingInfoStep from "./components/ResidingInfoStep";
import HobbyHealthStep from "./components/HobbyHealthStep";
import PremisesStep from "./components/PremisesStep";
import DemolitionInfoStep from "./components/DemolitionInfoStep";
import ConstructionInfoStep from "./components/ConstructionInfoStep";
import EngeneeringInfoStep from "./components/EngeneeringInfoStep";
import EquipmentInfoStep from "./components/EquipmentInfoStep";
import FormBottomNav from "./components/FormBottomNav";
import SuccessStep from './components/SuccessStep';

export type Inputs = z.infer<typeof formSchema>;
type FieldName = keyof Inputs;

//? Form steps
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
      approxBudget: [1000000, 100000000],
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

  const router = useRouter();
  const { userId, getToken } = useAuth();

  const next = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log(form.getValues("lastName"));

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
            {currentStep === 0 && <ClientInfoStep />}
            {currentStep === 1 && <ProjectMainInfoStep />}
            {currentStep === 2 && <ProjectAdditionalInfoStep />}
            {currentStep === 3 && <ResidingInfoStep />}
            {currentStep === 4 && <HobbyHealthStep />}
            {currentStep === 5 && <PremisesStep />}
            {currentStep === 6 && <DemolitionInfoStep />}
            {currentStep === 7 && <ConstructionInfoStep />}
            {currentStep === 8 && <EngeneeringInfoStep />}
            {currentStep === 9 && <EquipmentInfoStep />}
            {currentStep === 10 && <SuccessStep steps={steps}/>}
          </article>
          <FormBottomNav
            currentStep={currentStep}
            next={next}
            previous={previous}
            skipAll={skipAll}
            submitting={submitting}
            steps={steps}
          />
        </form>
      </Form>
    </section>
  );
};

export default CreateBrief;
