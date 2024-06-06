import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="grid w-full gap-2 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }, (v, i) => i).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}

export default Loading;
