import React from "react";
import { getCurrentProject, getCurrentRooms } from "@/utils/requests";
import { auth } from "@clerk/nextjs/server";
import PDFPage from "../../components/PDFFile";
import PDFDowloader from "@/app/components/PDFDowloader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  InfoBlock,
  InfoBlockContent,
  InfoBlockItem,
  InfoBlockLabel,
  InfoBlockTitle,
  InfoBlockValue,
} from "@/components/ui/infoBlock";

async function ProjectPage({
  searchParams,
}: {
  searchParams: {
    projectId: string;
  };
}) {
  const user = auth();
  const token = await user.getToken({ template: "supabase" });

  const project = await getCurrentProject({
    projectId: searchParams?.projectId,
    token,
  });

  const rooms = await getCurrentRooms(project.id, token);

  return (
    <section className="max-w-[100vw] space-y-8 px-2 py-6">
      {/* //? Общая информация */}
      <InfoBlock className="h-fit">
        <InfoBlockTitle>Общая информация</InfoBlockTitle>
        <InfoBlockContent>
          <InfoBlockItem>
            <InfoBlockLabel>Номер договора</InfoBlockLabel>
            <InfoBlockValue>{project?.contractId}</InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Адрес</InfoBlockLabel>
            <InfoBlockValue>{project?.address}</InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Площадь объекта</InfoBlockLabel>
            <InfoBlockValue>{project?.area}</InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Назначение объекта</InfoBlockLabel>
            <InfoBlockValue>{project?.purpose}</InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Количество проживающих</InfoBlockLabel>
            <InfoBlockValue>
              {project && project.residing !== null && project.children !== null
                ? project.residing + project.children
                : null}
            </InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Бюджет</InfoBlockLabel>
            <InfoBlockValue>
              <span>
                {project?.approxBudget?.[0].toLocaleString("ru-RU", {
                  currency: "RUB",
                  style: "currency",
                  maximumFractionDigits: 0,
                  notation: "compact",
                }) ?? "0"}
              </span>
              <span>{" - "}</span>
              <span>
                {project?.approxBudget?.[1].toLocaleString("ru-RU", {
                  currency: "RUB",
                  style: "currency",
                  maximumFractionDigits: 0,
                  notation: "compact",
                }) ?? "100+"}
              </span>
            </InfoBlockValue>
          </InfoBlockItem>
        </InfoBlockContent>
      </InfoBlock>

      {/* //? Состав помещений */}
      <InfoBlock className="h-fit">
        <InfoBlockTitle>Состав помещений</InfoBlockTitle>
        <InfoBlockContent className="p-0">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Номер</TableHead>
                <TableHead>Название</TableHead>
                <TableHead className="w-[150px] text-right">Площадь</TableHead>
                <TableHead className="w-[150px] text-center">
                  Теплый пол
                </TableHead>
                <TableHead className="w-[150px] text-center">
                  Звукоизоляция
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell role="contentinfo" className="text-right">
                    {room.room_number}
                  </TableCell>
                  <TableCell className="font-medium">{room.name}</TableCell>
                  <TableCell className="text-right">
                    {room.area || 0}
                    {` м.кв.`}
                  </TableCell>
                  <TableCell role="checkbox">
                    <Checkbox className="size-5" checked={room.hasWarmFloor} />
                  </TableCell>
                  <TableCell role="checkbox">
                    <Checkbox className="size-5" checked={room.hasIsolation} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoBlockContent>
      </InfoBlock>

      {/* <div className="md:grid grid-cols-2 gap-4 space-y-8 md:space-y-0 //h-fit"> */}
      {/* //? Информация по демонтажу */}
      <InfoBlock>
        <InfoBlockTitle>Информация по демонтажу</InfoBlockTitle>
        <InfoBlockContent className="">
          <InfoBlockItem className="flex justify-between sm:justify-start">
            <InfoBlockLabel>Демонтаж перегородок</InfoBlockLabel>
            <Checkbox
              className="size-5 place-content-end"
              checked={project.planChange}
            />
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem className="flex justify-between sm:justify-start">
            <InfoBlockLabel>Замена входной двери</InfoBlockLabel>
            <Checkbox
              className="size-5 place-content-end"
              checked={project.entranceDoorChange}
            />
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem className="flex justify-between sm:justify-start">
            <InfoBlockLabel>Замена окон</InfoBlockLabel>
            <Checkbox
              className="size-5 place-content-end"
              checked={project.windowsChange}
            />
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem className="flex justify-between sm:justify-start">
            <InfoBlockLabel>Демонтаж встроенной мебели</InfoBlockLabel>
            <Checkbox
              className="size-5 place-content-end"
              checked={project.furnitureDemolition}
            />
          </InfoBlockItem>
        </InfoBlockContent>
      </InfoBlock>

      {/* //? Информация по монтажу */}
      <InfoBlock>
        <InfoBlockTitle>Информация по монтажу</InfoBlockTitle>
        <InfoBlockContent>
          <InfoBlockItem>
            <InfoBlockLabel>Материал перегородок</InfoBlockLabel>
            <InfoBlockValue>{project.wallsMaterial.join(", ")}</InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Материал потолка</InfoBlockLabel>
            <InfoBlockValue>
              {project.ceilingMaterial.join(", ")}
            </InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Напольные покрытия</InfoBlockLabel>
            <InfoBlockValue>{project.floorMaterial.join(", ")}</InfoBlockValue>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Звукоизоляционные материалы</InfoBlockLabel>
            <InfoBlockValue>
              {project.isolationMaterials || "Не применяются"}
            </InfoBlockValue>
          </InfoBlockItem>
        </InfoBlockContent>
      </InfoBlock>

      <PDFDowloader project={project} rooms={rooms} />
      {/* <PDFPage project={project} rooms={rooms} /> */}
    </section>
  );
}

export default ProjectPage;
