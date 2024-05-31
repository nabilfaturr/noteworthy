import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MainbarSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 pl-24 h-full">
      <Skeleton className="title w-[400px] mt-10 h-16" />
      <div className="box pb-5 pr-20 w-full h-full">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
};

export const EditorSkeleton = () => {
  return (
    <div className="relative -top-10 left-0 flex flex-col gap-8 h-full">
      <Skeleton className="title w-[400px] mt-10 h-16" />
      <div className="box space-y-4 pb-5 pr-20 w-full h-full">
        <Skeleton className="w-[80%] h-10" />
        <Skeleton className="w-[60%] h-10" />
        <Skeleton className="w-[40%] h-10" />
        <Skeleton className="w-[20%] h-10" />
      </div>
    </div>
  );
};

export default MainbarSkeleton;
