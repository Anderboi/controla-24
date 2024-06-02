import React, { Suspense } from "react";
import ProjectsBlock from "../components/projectsBlock";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Search from "../components/search";
import { Plus } from 'lucide-react';

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
      <div className="items-center m-auto w-full flex flex-col gap-4">
        <Search />
        <ProjectsBlock
          query={searchParams?.query || ""}
          currentPage={Number(searchParams?.page) || 1}
        />
        <Button className='flex items-center gap-2'>
          <Plus />
          <Link href="/create-brief">
            Создать новое задание
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default DashboardPage;
