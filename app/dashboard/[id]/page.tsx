import React from "react";
import { getCurrentProject, getCurrentRooms } from "@/utils/requests";
import { auth } from "@clerk/nextjs/server";
import PDFDowloader from "@/app/dashboard/components/PDFDowloader";
import RoomsBlock from "./components/roomsBlock";
import CommonInfoBlock from "./components/commonInfoBlock";
import DemolitionInfoBlock from "./components/demolitionInfoBlock";
import ConstructionBlock from "./components/constructionBlock";

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

      <PDFDowloader project={project} rooms={rooms} />
      {/* <PDFPage project={project} rooms={rooms} /> */}
    </section>
  );
}

export default ProjectPage;
