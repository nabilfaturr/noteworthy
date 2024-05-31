"use client";

import { useFolderStore } from "@/store/folders.store";
import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { fetchFolders } = useFolderStore((state) => state);

  return (
    <div className="w-full h-screen p-6 bg-slate-300">
      <div className="w-full h-full bg-white shadow rounded-lg flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Container;
