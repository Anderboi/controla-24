import { getProjectsByTitle } from "@/utils/requests";

import type { Database } from "@/utils/database.types";
import Link from "next/link";
import { formatDate } from "@/utils/utils";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { Files } from "lucide-react";
import MenuProjectButton from "./MenuProjectButton";

export type Project = Database["public"]["Tables"]["projects"]["Row"];

async function ProjectsBlock({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { userId, getToken } = auth();
  const token = await getToken({ template: "supabase" });

  const projects = await getProjectsByTitle({ title: query, userId, token });

  return (
    <>
      <ul className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-4">
        {projects ? (
          <>
            {projects.map((project: Project, index: number) => (
              <Link
                key={index}
                href={`/dashboard/${project.id}?&projectId=${project.id}`}
              >
                <Card className="shadow-lg hover:shadow-xl dark:shadow-none dark:hover:bg-neutral-900">
                  <CardHeader>
                    <CardTitle className="line-clamp-1 sm:line-clamp-2 sm:min-h-[2lh]">
                      {project.projectName}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm sm:min-h-[2lh]">
                      {project.address}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="items-end justify-between">
                    <span className="text-sm dark:text-neutral-500">
                      {formatDate(project.created_at)}
                    </span>
                    <MenuProjectButton projectId={project.id} token={token} />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </>
        ) : (
          <div className="flex w-full flex-col items-center text-center text-neutral-500 sm:col-span-4">
            <Files size={96} strokeWidth={0.5} />
            <p className="w-full">У Вас еще нет проектов.</p>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProjectsBlock;
