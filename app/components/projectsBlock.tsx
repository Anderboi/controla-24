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
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
        {projects ? (
          <>
            {projects.map((project: Project, index: number) => (
              <Link
                key={index}
                href={`/dashboard/${project.id}?&projectId=${project.id}`}
              >
                <Card className="shadow-lg hover:shadow-xl dark:shadow-none dark:hover:bg-neutral-900">
                  <CardHeader>
                    <CardTitle className="line-clamp-2 min-h-[2lh]">
                      {project.projectName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs line-clamp-2 min-h-[2lh]">
                      {project.address}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </>
        ) : (
          <p>У Вас еще нет проектов.</p>
        )}
      </ul>
    </>
  );
}

export default ProjectsBlock;
