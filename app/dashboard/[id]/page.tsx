import React from "react";
import { getCurrentProject, getCurrentRooms } from "@/utils/requests";
import { auth } from "@clerk/nextjs/server";
import PDFPage from "../pdf/page";
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
} from "@/components/ui/infoBlock";
import { Sortable, SortableItem } from '@/components/ui/sortable';
import { Skeleton } from '@/components/ui/skeleton';

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
    <section className="space-y-8 max-w-[100vw] px-2">
      {/* //? Общая информация */}
      <InfoBlock className="h-fit">
        <InfoBlockTitle>Общая информация</InfoBlockTitle>
        <InfoBlockContent>
          <InfoBlockItem>
            <InfoBlockLabel>Номер договора</InfoBlockLabel>
            <span>{project?.contractId}</span>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Адрес</InfoBlockLabel>
            <span>{project?.address}</span>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Площадь объекта</InfoBlockLabel>
            <span>{project?.area}</span>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Назначение объекта</InfoBlockLabel>
            <span>{project?.purpose}</span>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Количество проживающих</InfoBlockLabel>
            {project && project.residing !== null && project.children !== null
              ? project.residing + project.children
              : null}
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Бюджет</InfoBlockLabel>
            <div>
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
            </div>
          </InfoBlockItem>
        </InfoBlockContent>
      </InfoBlock>

      {/* //? Состав помещений */}
      <InfoBlock className="h-fit">
        <InfoBlockTitle>Состав помещений</InfoBlockTitle>
        <InfoBlockContent className="p-0">
          {" "}
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
                    {room.id}
                  </TableCell>
                  <TableCell>{room.name}</TableCell>
                  <TableCell className="text-right">
                    {room.area || 0}
                    {` м.кв.`}
                  </TableCell>
                  <TableCell role="checkbox">
                    <Checkbox checked={room.hasWarmFloor} />
                  </TableCell>
                  <TableCell role="checkbox">
                    <Checkbox checked={room.hasIsolation} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoBlockContent>
      </InfoBlock>

      {/* <div className="md:grid grid-cols-2 gap-4 space-y-8 md:space-y-0 //h-fit"> */}
      {/* //? Информация по демонтажу */}
      <InfoBlock className="">
        <InfoBlockTitle>Информация по демонтажу</InfoBlockTitle>
        <InfoBlockContent className="">
          <InfoBlockItem className="flex">
            <InfoBlockLabel>Демонтаж перегородок:</InfoBlockLabel>
            <Checkbox
              className="place-content-end"
              checked={project.planChange}
            />
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem className="flex">
            <InfoBlockLabel>Замена входной двери:</InfoBlockLabel>
            <Checkbox
              className="place-content-end"
              checked={project.entranceDoorChange}
            />
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem className="flex">
            <InfoBlockLabel>Замена окон:</InfoBlockLabel>
            <Checkbox
              className="place-content-end"
              checked={project.windowsChange}
            />
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem className="flex">
            <InfoBlockLabel>Демонтаж встроенной мебели:</InfoBlockLabel>
            <Checkbox
              className="place-content-end"
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
            <InfoBlockLabel>Материал перегородок:</InfoBlockLabel>
            <span>{project.wallsMaterial.join(", ")}</span>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Материал потолка:</InfoBlockLabel>
            <span>{project.ceilingMaterial.join(", ")}</span>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Напольные покрытия:</InfoBlockLabel>
            <span>{project.floorMaterial.join(", ")}</span>
          </InfoBlockItem>
          <Separator />
          <InfoBlockItem>
            <InfoBlockLabel>Звукоизоляционные материалы:</InfoBlockLabel>
            <span>{project.isolationMaterials || "Не применяются"}</span>
          </InfoBlockItem>
        </InfoBlockContent>
      </InfoBlock>
      
      {/* <article className="space-y-2">
          <h3 className="font-semibold text-lg">Информация по монтажу</h3>
          <div className="space-y-2 border dark:border-none dark:border-neutral-800 dark:bg-neutral-900 rounded-xl py-4 pl-4">
            <div className="grid gap-x-2 md:grid-cols-[1fr_2fr]">
              <span className="text-neutral-400">Материал перегородок:</span>
              <span>{project.wallsMaterial.join(", ")}</span>
            </div>
            <Separator />
            <div className="grid gap-x-2 md:grid-cols-[1fr_2fr]">
              <span className="text-neutral-400">Материал потолка:</span>
              <span>{project.ceilingMaterial.join(", ")}</span>
            </div>
            <Separator />
            <div className="grid gap-x-2 md:grid-cols-[1fr_2fr]">
              <span className="text-neutral-400">Напольные покрытия:</span>
              <span>{project.floorMaterial.join(", ")}</span>
            </div>
            <Separator />
            <div className="grid gap-x-2 md:grid-cols-[1fr_2fr]">
              <span className="text-neutral-400">
                Звукоизоляционные материалы:
              </span>
              <span>{project.isolationMaterials || "Не применяются"}</span>
            </div>
          </div>
        </article> */}
      {/* </div> */}
      <PDFDowloader project={project} rooms={rooms} />
      {/* <PDFPage project={project} rooms={rooms} /> */}
    </section>
  );
}

export default ProjectPage;
