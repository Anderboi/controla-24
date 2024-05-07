"use client";
import { useState, useEffect } from "react";
import { getProjectsByTitle } from "@/utils/requests";
import { useAuth } from "@clerk/nextjs";

import type { Database } from "@/utils/database.types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];

function ProjectsBlock({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { getToken, userId } = useAuth();
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = await getToken({ template: "supabase" });
      const data = await getProjectsByTitle({title: query, userId, token});
      setProjects(data);
    };
    fetchProjects();
  }, [query]);

  return (
    <div>
      {projects ? (
        <ul>
          {projects.map((project: Project) => (
            <li key={project.id}>{project.address}</li>
          ))}
        </ul>
      ) : (
        <p>У Вас еще нет проектов.</p>
      )}
    </div>
  );
}

export default ProjectsBlock;
