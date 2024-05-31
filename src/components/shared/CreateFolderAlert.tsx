"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { FolderPlusIcon } from "lucide-react";
import React from "react";
import { TFolderSelect } from "@/types";
import { useRouter } from "next/navigation";

type TCreateFolderAlert = {
  userId: string;
  handleFoldersChange: (folders: TFolderSelect[]) => void;
};

const CreateFolderAlert = ({
  userId,
  handleFoldersChange,
}: TCreateFolderAlert) => {
  const [folderName, setFolderName] = React.useState("");
  const form = React.useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const fetchCreateFolder = async () => {
    try {
      const response = await fetch(`/api/folder/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: folderName }),
      });

      if (!response.ok) {
        throw new Error("Failed to create folder");
      }

      const data = await response.json();
      console.log(data);

      if (!data) {
        throw new Error("Invalid response from server");
      }

      if (data[0].title) {
        router.push(`/folder/${data[0].id}`);
      }

      // trigger sonner
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCreateFolder();
  };

  return (
    <AlertDialog>
      <Button asChild>
        <AlertDialogTrigger className="w-full bg-slate-100 flex gap-2  text-slate-700 hover:bg-slate-200">
          <span className="flex self-start items-center gap-2 w-full h-full">
            <FolderPlusIcon className="w-5 h-5" />
            <p>Create Folder</p>
          </span>
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent className="h-[220px]">
        <form
          ref={form}
          onSubmit={handleFormSubmit}
          className="h-full flex flex-col justify-between"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Create Folder</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col">
              Please enter a name for your new folder.
              <input
                type="text"
                className="border rounded-lg p-3 font-medium text-black"
                onChange={handleFolderNameChange}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Create</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateFolderAlert;
