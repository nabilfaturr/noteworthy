import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";

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
import React from "react";
import { useRouter } from "next/navigation";
import { useFolderStore } from "@/store/folders.store";

export type TFolderMenu = {
  folderId: string;
  userId: string;
};

const FolderMenu = ({ folderId, userId }: TFolderMenu) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-1 ml-2 mb-2 rounded-lg h-fit bg-slate-200 hover:bg-slate-300 focus:outline-none">
        <EllipsisIcon className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-medium ml-24">
        <DeleteFolderAlert type="rename" folderId={folderId} userId={userId} />
        <DeleteFolderAlert type="delete" folderId={folderId} userId={userId} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export type TDeleteFolderAlert = {
  type: "delete" | "rename";
  folderId: string;
  userId?: string;
};

const DeleteFolderAlert = ({ type, folderId, userId }: TDeleteFolderAlert) => {
  const { folderTitle, folder, fetchDeleteFolder, fetchRenameFolder } =
    useFolderStore((state) => ({
      folder: state.folder,
      folderTitle: state.folder.title,
      fetchDeleteFolder: state.fetchDeleteFolder,
      fetchRenameFolder: state.fetchRenameFolder,
    }));
  const [newTitle, setNewTitle] = React.useState(folderTitle ?? "");
  const router = useRouter();

  const handleNewTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "delete" && userId) {
      fetchDeleteFolder(userId, folderId);
      router.push("/dashboard/all");
    }

    if (type === "rename" && userId) {
      fetchRenameFolder(userId, folderId, newTitle);
      router.push(`/folder/${folderId}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full p-2 rounded text-sm text-left hover:bg-slate-100">
        {type === "delete" ? "Delete" : "Rename"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {type === "delete" ? "Delete Folder" : "Rename Folder"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {type === "delete"
                ? "Are you sure you want to delete this folder?"
                : "Please enter a new title for your folder."}

              {type === "rename" && (
                <RenameFormField
                  handleNewTitleChange={handleNewTitleChange}
                  folderTitle={folderTitle as string}
                />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className={
                type === "delete"
                  ? "bg-red-600 hover:bg-red-500"
                  : type === "rename"
                  ? "bg-blue-600 hover:bg-blue-500"
                  : undefined
              }
            >
              {type === "delete" ? "Delete" : "Rename"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const RenameFormField = ({
  folderTitle,
  handleNewTitleChange,
}: {
  folderTitle: string;
  handleNewTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      className="w-full mt-2 p-3 text-black font-medium border rounded-lg"
      defaultValue={folderTitle}
      onChange={handleNewTitleChange}
    />
  );
};

export default FolderMenu;
