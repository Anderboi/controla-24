"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { formSchema } from "@/utils/formSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postProject } from "@/utils/requests";
import { toast } from "sonner";

import ClientInfoStep from "./_components/client-info-step";
import ProjectMainInfoStep from "./_components/project-main-info-step";
import ProjectAdditionalInfoStep from "./_components/project-additional-info-step";
import ResidingInfoStep from "./_components/residing-info-step";
import HobbyHealthStep from "./_components/hobby-health-step";
import PremisesStep from "./_components/premises-step";
import DemolitionInfoStep from "./_components/demolition-info-step";
import ConstructionInfoStep from "./_components/construction-info-step";
import EngeneeringInfoStep from "./_components/engeneering-info-step";
import EquipmentInfoStep from "./_components/equipment-info-step";
import FormBottomNav from "./_components/form-bottom-navigation";
import SuccessStep from "./_components/success-step";
import Stepper from "./_components/stepper";

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
  const [hasMounted, setHasMounted] = useState(false);

  //! Set hasMounted to true only after the component mounts in the browser
  useEffect(() => {
    setHasMounted(true);
  }, []);

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
      rooms: [{ name: "", area: 0 }],
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

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Number(localStorage.getItem("currentStep")) || 0;
    }
    return 0;
  });
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const { userId, getToken } = useAuth();

  //! Load saved form values on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFormData = localStorage.getItem("formData");
      if (savedFormData) {
        form.reset(JSON.parse(savedFormData)); // Load saved values
      }
    }
  }, []);

  //! Save currentStep to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentStep", currentStep.toString());
    }
  }, [currentStep]);

  //! Save form values to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const subscription = form.watch((values) => {
        localStorage.setItem("formData", JSON.stringify(values));
      });
      return () => subscription.unsubscribe();
    }
  }, [form]);

  const next = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

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
        toast.success("Вы создали техническое задание для проекта", {
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

  // Only render the form once the component has mounted
  if (!hasMounted) return null;

  return (
    <>
      <Stepper
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        steps={steps}
        className="absolute left-0 right-0 top-0 px-6 pt-4"
      />
      <Form {...form}>
        <form className="h-full w-full space-y-6 overflow-y-scroll no-scrollbar sm:mb-[60px] sm:h-[calc(100%-120px)] md:mt-[60px]">
          <h2 className="text-balance text-3xl font-bold tracking-tight">
            {steps[currentStep].name}
          </h2>
          <article className="grid grid-cols-1 gap-y-6 pb-[100px] sm:grid-cols-2 sm:gap-x-6 sm:pb-4">
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
            {currentStep === 10 && <SuccessStep steps={steps} />}
          </article>
        </form>
      </Form>
      <FormBottomNav
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white from-80% to-transparent px-4 pb-4 pt-6 dark:from-neutral-900 dark:from-80% dark:to-transparent sm:p-6"
        currentStep={currentStep}
        next={next}
        previous={previous}
        skipAll={skipAll}
        submitting={submitting}
        steps={steps}
      />
    </>
  );
};

export default CreateBrief;
