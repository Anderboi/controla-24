import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
      {Array.from(Array(4).keys()).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}

export default Loading