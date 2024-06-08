import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col space-y-8 px-2 py-6">
      {Array.from({ length: 3 }, (v, i) => i).map((_, index) => (
        <div key={index}>
          <Skeleton className="mb-4 h-6 w-[320px]" />
          <Skeleton className="h-[326px] w-full" />
        </div>
      ))}
    </div>
  );
}

export default Loading;
