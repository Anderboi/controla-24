import React from "react";
import ProjectsBlock from "./_components/projects-block";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Search from "./_components/search";
import { FilePlus2 } from "lucide-react";

function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  return (
    <div className="p-4 sm:p-0">
      <div className="m-auto flex w-full flex-col items-center gap-4 pb-4">
        <Search />
        <Button className="flex items-center gap-2 max-sm:w-full">
          <FilePlus2 />
          <Link href="/dashboard/create-brief">Создать новый проект</Link>
        </Button>
        <ProjectsBlock
          query={searchParams?.query || ""}
          currentPage={Number(searchParams?.page) || 1}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
