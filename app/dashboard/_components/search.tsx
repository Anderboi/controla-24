"use client";

import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "../../../components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { cn } from '@/utils/utils';

const Search = ({ className }: { className?: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      type="search"
      placeholder="Найти ..."
      className={cn(
        "text-primary-text-light dark:text-primary-text-dark bg-transparent dark:bg-transparent",
        className,
      )}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
};

export default Search;
