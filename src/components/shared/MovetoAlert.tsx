import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

type TMoveToAlert = {
  onCancel: (event: React.MouseEvent) => void;
  note: TNoteSelect;
  closeMoveToAlert: () => void;
};

const MoveToAlert = ({ onCancel, note, closeMoveToAlert }: TMoveToAlert) => {
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const [selectedFolder, setSelectedFolder] = React.useState<{
    id: string;
    title: string;
  }>({
    id: "",
    title: "",
  });
  const router = useRouter();
  const { userId } = useSessionStore((state) => state);

  const handleSelectedFolder = (folder: any) => {
    setSelectedFolder(folder);
  };

  const fetchSelectedNotesToFolder = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${userId}/${selectedFolder.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId: note.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch selected notes");
      }

      console.log(response);

      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const { folders } = useFolderStore((state) => state);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchSelectedNotesToFolder();
    closeMoveToAlert();
    router.push(`/folder/${selectedFolder.id}`);
  };

  return (
    <AlertDialog open onOpenChange={() => {}}>
      <AlertDialogOverlay className="opacity-0" onClick={stopPropagation}>
        <AlertDialogContent className="h-[400px]">
          <form
            className="h-full flex flex-col justify-between w-full space-y-3"
            onSubmit={handleSubmit}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Move Note</AlertDialogTitle>
              <AlertDialogDescription>
                <span>Select a folder to move the note to</span>
              </AlertDialogDescription>
              {folders.length > 0 && (
                <ScrollAreaFolder
                  folders={folders}
                  handleSelectedFolder={handleSelectedFolder}
                />
              )}
              {folders.length === 0 && (
                <div className="w-full h-[200px] flex items-center justify-center">
                  <p className="text-red-500">No folders</p>
                </div>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={onCancel}
                className="bg-blue-600 hover:bg-blue-500 text-white hover:text-white"
              >
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

import { ScrollArea } from "@/components/ui/scroll-area";
import { useFolderStore } from "@/store/folders.store";
import { Button } from "../ui/button";
import ScrollAreaFolder from "./ScrollAreaFolder";
import { useSessionStore } from "@/store/session.store";
import { TNoteSelect } from "@/types";
import { notes } from "@/db/schema";

export default MoveToAlert;
