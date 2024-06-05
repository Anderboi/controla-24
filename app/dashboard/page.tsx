import React from "react";
import ProjectsBlock from "../components/projectsBlock";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Search from "../components/search";
import { FilePlus2, Plus } from 'lucide-react';

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
          <Link href="/create-brief">Создать новое задание</Link>
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
