"use client";

import * as React from "react";
import { ChevronsUpDown, FolderIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TFolderSelect } from "@/types";
import Link from "next/link";
import { useFolderStore } from "@/store/folders.store";
import { useNoteStore } from "@/store/note.store";
import { usePathname } from "next/navigation";

const FolderContainer = () => {
  const { folders } = useFolderStore((state) => state);

  const [isOpen, setIsOpen] = React.useState(true);
  const foldersLength = folders.length;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full flex items-center border justify-between space-x-4 px-4 py-5 rounded-lg hover:bg-slate-50"
          >
            <h4 className="text-sm font-semibold">
              {foldersLength === 0 && "No Folder"}
              {foldersLength > 0 && `${foldersLength} Folders`}
            </h4>
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        {folders.map((folder) => (
          <Folder key={folder.id} folder={folder} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export const Folder = ({ folder }: { folder: TFolderSelect }) => {
  const currentPath = usePathname();
  const { setNotes } = useNoteStore((state) => state);

  return (
    <Link
      href={`/folder/${folder.id}`}
      className={`flex items-center gap-2 rounded-md px-4 ml-2 py-2 text-sm hover:bg-slate-100 ${
        currentPath === `/folder/${folder.id}` ? "bg-slate-100" : ""
      }`}
      onClick={() => setNotes([])}
    >
      <FolderIcon className="w-4 h-4 text-slate-500" />
      <span>{folder.title}</span>
    </Link>
  );
};

export default FolderContainer;
