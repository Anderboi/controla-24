import { getProjectsByTitle } from "@/utils/requests";

import type { Database } from "@/utils/database.types";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { FilePlus2, Files } from "lucide-react";

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
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 sm:min-h-[2lh] text-xs">
                      {project.address}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </>
        ) : (
          <div className="flex flex-col w-full items-center text-center sm:col-span-4 text-neutral-500">
            <Files size={96} strokeWidth={0.5} />
            <p className="w-full">У Вас еще нет проектов.</p>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProjectsBlock;
