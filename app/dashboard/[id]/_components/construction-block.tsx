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

const ConstructionBlock = memo(
  ({
    wallsMaterial,
    ceilingMaterial,
    floorMaterial,
    isolationMaterials,
  }: {
    wallsMaterial: string[];
    ceilingMaterial: string[];
    floorMaterial: string[];
    isolationMaterials: string;
  }) => (
    <InfoBlock>
      <InfoBlockTitle>Информация по монтажу</InfoBlockTitle>
      <InfoBlockContent>
        <InfoBlockItem>
          <InfoBlockLabel>Материал перегородок</InfoBlockLabel>
          <InfoBlockValue>{wallsMaterial.join(", ")}</InfoBlockValue>
        </InfoBlockItem>
        <Separator />
        <InfoBlockItem>
          <InfoBlockLabel>Материал потолка</InfoBlockLabel>
          <InfoBlockValue>{ceilingMaterial.join(", ")}</InfoBlockValue>
        </InfoBlockItem>
        <Separator />
        <InfoBlockItem>
          <InfoBlockLabel>Напольные покрытия</InfoBlockLabel>
          <InfoBlockValue>{floorMaterial.join(", ")}</InfoBlockValue>
        </InfoBlockItem>
        <Separator />
        <InfoBlockItem>
          <InfoBlockLabel>Звукоизоляционные материалы</InfoBlockLabel>
          <InfoBlockValue>
            {isolationMaterials || "Не применяются"}
          </InfoBlockValue>
        </InfoBlockItem>
      </InfoBlockContent>
    </InfoBlock>
  ),
);

ConstructionBlock.displayName = "ConstructionBlock";

export default ConstructionBlock;
