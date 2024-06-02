// "use client";

import { useState, useEffect, useCallback } from "react";
import { getProjectsByTitle } from "@/utils/requests";
import { useAuth } from "@clerk/nextjs";

import type { Database } from "@/utils/database.types";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  // const { getToken, userId } = useAuth();
  // const [loading, setLoading] = useState<boolean>(true);
  // const [projects, setProjects] = useState<any>([]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const token = await getToken({ template: "supabase" });
  //       if (!token) {
  //         throw new Error("No token");
  //       }
  //       const data = await getProjectsByTitle({ title: query, userId, token });
  //       setProjects(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProjects();
  // }, [query]);

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
            {/* </ul> */}
          </>
        ) : (
          <p>У Вас еще нет проектов.</p>
        )}
      </ul>
    </>
  );
}

export default ProjectsBlock;
