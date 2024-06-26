import React, { memo } from "react";
import {
  InfoBlock,
  InfoBlockContent,
  InfoBlockItem,
  InfoBlockLabel,
  InfoBlockTitle,
  InfoBlockValue,
} from "@/components/ui/info-block";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/utils";

const CommonInfoBlock = memo(
  ({
    residing,
    children,
    approxBudget,
    contractId,
    address,
    area,
    purpose,
    adultHeight,
    childrenAge,
    pets,
    hobbies,
    healthFeatures,
  }: {
    residing: number | null;
    children: number;
    approxBudget: number[] | null;
    contractId: string | null;
    address: string;
    area: number | null;
    purpose: string;
    adultHeight: number[] | null;
    childrenAge: number[] | null;
    pets: string | null;
    hobbies: string | null;
    healthFeatures: string | null;
  }) => {
    // const totalResidents = residing ?? 0 + (children ?? 0);
    const apprBudget = approxBudget ?? [0, 100];

    return (
      <>
        <InfoBlock className="h-fit">
          <InfoBlockTitle>Общая информация</InfoBlockTitle>
          <InfoBlockContent>
            <InfoBlockItem>
              <InfoBlockLabel>Номер договора</InfoBlockLabel>
              <InfoBlockValue>{contractId}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />
            <InfoBlockItem>
              <InfoBlockLabel>Адрес</InfoBlockLabel>
              <InfoBlockValue>{address}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />
            <InfoBlockItem>
              <InfoBlockLabel>Площадь объекта</InfoBlockLabel>
              <InfoBlockValue>{area}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />
            <InfoBlockItem>
              <InfoBlockLabel>Назначение объекта</InfoBlockLabel>
              <InfoBlockValue>{purpose}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />
            <InfoBlockItem>
              <InfoBlockLabel>Бюджет</InfoBlockLabel>
              <InfoBlockValue>
                <span>{formatCurrency(apprBudget[0])}</span>
                <span>{" - "}</span>
                <span>{formatCurrency(apprBudget[1])}</span>
              </InfoBlockValue>
            </InfoBlockItem>
          </InfoBlockContent>
        </InfoBlock>
        <InfoBlock className="h-fit">
          <InfoBlockTitle>Информация о проживающих</InfoBlockTitle>
          <InfoBlockContent>
            <InfoBlockItem>
              <InfoBlockLabel>Взрослых</InfoBlockLabel>
              <InfoBlockValue>{`${residing} чел. ${adultHeight && `(Рост ${adultHeight?.join(" см, ")} см)`}`}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />
            <InfoBlockItem>
              <InfoBlockLabel>Детей</InfoBlockLabel>
              <InfoBlockValue>{`${children} ${children && childrenAge ? `(Возраст ${childrenAge?.join("лет, ")} лет)` : ""}`}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />

            <InfoBlockItem>
              <InfoBlockLabel>Домашние животные</InfoBlockLabel>
              <InfoBlockValue>{pets || "-"}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />

            <InfoBlockItem>
              <InfoBlockLabel>Увлечения</InfoBlockLabel>
              <InfoBlockValue>{hobbies || "-"}</InfoBlockValue>
            </InfoBlockItem>
            <Separator />

            <InfoBlockItem>
              <InfoBlockLabel>Проблемы со здоровьем</InfoBlockLabel>
              <InfoBlockValue>{healthFeatures || "-"}</InfoBlockValue>
            </InfoBlockItem>
          </InfoBlockContent>
        </InfoBlock>
      </>
    );
  },
);

CommonInfoBlock.displayName = "CommonInfoBlock";

export default CommonInfoBlock;
