"use client";

import React from "react";
import Mainbar from "./Mainbar";
import { User } from "next-auth";
import Sidebar from "./Sidebar";
import { useFolderStore } from "@/store/folders.store";

type TFolderWrapper = {
  userInfo: User | undefined;
  userId: string;
  folderId: string;
};

const FolderWrapper = ({ userId, userInfo, folderId }: TFolderWrapper) => {
  const { fetchFolders, fetchFolder, folder } = useFolderStore((state) => ({
    fetchFolders: state.fetchFolders,
    fetchFolder: state.fetchFolder,
    folder: state.folder,
  }));

  React.useEffect(() => {
    fetchFolders(userId);
    fetchFolder(userId, folderId);
  }, []);

  React.useEffect(() => {
    fetchFolders(userId);
  }, [folder]);

  return (
    <div className="sm:flex w-full h-full -">
      <Sidebar userInfo={userInfo} userId={userId} />
      <Mainbar userId={userId} folderId={folderId} />
    </div>
  );
};

export default FolderWrapper;
