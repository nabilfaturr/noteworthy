import React from "react";
import FolderMenu from "./FolderMenu";
import { useFolderStore } from "@/store/folders.store";

type TFolderHeader = {
  folderId: string;
  userId: string;
};

const FolderHeader = ({ folderId, userId }: TFolderHeader) => {
  const { folder } = useFolderStore((state) => ({
    folder: state.folder,
  }));

  return (
    <div className="flex items-end">
      <h1 className="font-bold text-3xl pl-24 pt-10 bold text-black">
        {folder.title}
      </h1>
      <FolderMenu userId={userId} folderId={folderId} />
    </div>
  );
};

export default FolderHeader;
