"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from './ui/input';
import { useDebouncedCallback } from "use-debounce";

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
      className={twMerge(
        "text-primary-text-light dark:text-primary-text-dark",
        className
      )}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
};

export default Search;
