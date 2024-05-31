"use client";

import React from "react";
import CreateNoteButton from "./CreateNoteButton";
import Account from "./Account";
import { User } from "next-auth";
import FolderContainer from "./FolderContainer";
import CreateFolderAlert from "./CreateFolderAlert";
import { TFolderSelect } from "@/types";
import AllNote from "./AllNote";
import { useFolderStore } from "@/store/folders.store";
import { useSessionStore } from "@/store/session.store";

type TSidebar = {
  userInfo: User | undefined;
  userId: string;
};

const Sidebar = ({ userInfo, userId }: TSidebar) => {
  const { fetchFolders, folders, setFolders } = useFolderStore(
    (state) => state
  );

  const { setUserId } = useSessionStore((state) => state);

  React.useEffect(() => {
    fetchFolders(userId);
    setUserId(userId);
  }, []);

  const handleFoldersChange = (folders: TFolderSelect[]) => {
    setFolders(folders);
  };

  return (
    <div className="hidden border-r border-slate-100 col-span-4 w-[320px] p-3  space-y-10 sm:flex flex-col justify-between">
      <div>
        <Account userInfo={userInfo} />
        <div className="w-full pt-10 space-y-6">
          <AllNote />
          <div className="space-y-3">
            <CreateFolderAlert
              userId={userId}
              handleFoldersChange={
                handleFoldersChange as (folders: TFolderSelect[]) => void
              }
            />
            <FolderContainer />
          </div>
        </div>
      </div>
      <div>
        <CreateNoteButton />
      </div>
    </div>
  );
};

export default Sidebar;
