import React from "react";
import { getCurrentProject, getCurrentRooms } from "@/utils/requests";
import { auth } from "@clerk/nextjs/server";
import PDFDowloader from "@/app/dashboard/_components/pdf-dowloader";
import RoomsBlock from "./_components/rooms-block";
import CommonInfoBlock from "./_components/common-info-block";
import DemolitionInfoBlock from "./_components/demolition-info-block";
import ConstructionBlock from "./_components/construction-block";

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

  if (!project) {
    return <div>Проект не найден</div>;
  }

  const rooms = await getCurrentRooms(project.id, token);

  return (
    <section className="max-w-[100vw] space-y-8 px-2 py-6">
      {/* //? Общая информация */}
      <CommonInfoBlock {...project} />

      {/* //? Состав помещений */}
      <RoomsBlock rooms={rooms} />

      {/* //? Информация по демонтажу */}
      <DemolitionInfoBlock {...project} />

      {/* //? Информация по монтажу */}
      <ConstructionBlock {...project} />

      {/* //? Кнопка - Скачать PDF */}
      <PDFDowloader project={project} rooms={rooms} />
      {/* <PDFPage project={project} rooms={rooms} /> */}
    </section>
  );
}

export default ProjectPage;
