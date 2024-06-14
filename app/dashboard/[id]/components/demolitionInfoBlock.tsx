import React, { memo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InfoBlock,
  InfoBlockContent,
  InfoBlockItem,
  InfoBlockLabel,
  InfoBlockTitle,
} from "@/components/ui/infoBlock";
import { Separator } from "@/components/ui/separator";

const DemolitionInfoBlock = memo(
  ({
    planChange,
    entranceDoorChange,
    windowsChange,
    furnitureDemolition,
  }: {
    planChange: boolean;
    entranceDoorChange: boolean;
    windowsChange: boolean;
    furnitureDemolition: boolean;
  }) => (
    <InfoBlock>
      <InfoBlockTitle>Информация по демонтажу</InfoBlockTitle>
      <InfoBlockContent>
        <InfoBlockItem className="flex justify-between sm:justify-start">
          <InfoBlockLabel>Демонтаж перегородок</InfoBlockLabel>
          <Checkbox className="size-5 place-content-end" checked={planChange} />
        </InfoBlockItem>
        <Separator />
        <InfoBlockItem className="flex justify-between sm:justify-start">
          <InfoBlockLabel>Замена входной двери</InfoBlockLabel>
          <Checkbox
            className="size-5 place-content-end"
            checked={entranceDoorChange}
          />
        </InfoBlockItem>
        <Separator />
        <InfoBlockItem className="flex justify-between sm:justify-start">
          <InfoBlockLabel>Замена окон</InfoBlockLabel>
          <Checkbox
            className="size-5 place-content-end"
            checked={windowsChange}
          />
        </InfoBlockItem>
        <Separator />
        <InfoBlockItem className="flex justify-between sm:justify-start">
          <InfoBlockLabel>Демонтаж встроенной мебели</InfoBlockLabel>
          <Checkbox
            className="size-5 place-content-end"
            checked={furnitureDemolition}
          />
        </InfoBlockItem>
      </InfoBlockContent>
    </InfoBlock>
  ),
);

DemolitionInfoBlock.displayName = "DemolitionInfoBlock";

export default DemolitionInfoBlock;
