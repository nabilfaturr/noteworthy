import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Move, PencilIcon, Trash2Icon } from "lucide-react";
import { TNoteSelect } from "@/types";
import DeleteAlert from "./DeleteAlert";
import RenameAlert from "./RenameAlert";
import MoveToAlert from "./MovetoAlert";
import { useNoteStore } from "@/store/note.store";

interface NoteDropdownProps {
  note: TNoteSelect;
  userId: string;
  folderId?: string;
}

const NoteDropdown = ({
  note,
  userId,
  folderId,
}: NoteDropdownProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showRenameAlert, setShowRenameAlert] = useState(false);
  const [showMoveToAlert, setShowMoveToAlert] = useState(false);

  const type = folderId ? "folder" : "all";

  const { fetchNotes } = useNoteStore((state) => ({
    fetchNotes: state.fetchNotes,
  }));

  const handleItemRename = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowRenameAlert(true);
  };

  const handleItemDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowDeleteAlert(true);
  };

  const closeMoveToAlert = () => {
    setShowMoveToAlert(false);
  };

  const handleItemMoveTo = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowMoveToAlert(true);
  };

  const fetchDeleteNote = async () => {
    await fetch(`/api/note/${note.id}`, {
      method: "DELETE",
    });
    fetchNotes(type, folderId, userId);
  };

  const handleRenameConfirm = async (newTitle: string) => {
    await fetch(`/api/note/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    fetchNotes(type, folderId, userId);
    setShowRenameAlert(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="invisible group-hover:visible focus:outline-none">
          <Ellipsis className="text-black/60 rounded-md hover:bg-slate-200 w-8" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={handleItemRename}
          >
            <PencilIcon className="w-4" />
            <span className="font-semibold">Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={handleItemDelete}
          >
            <Trash2Icon className="w-4" />
            <span className="font-semibold">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={handleItemMoveTo}
          >
            <Move className="w-4" />
            <span className="font-semibold">Move To</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showRenameAlert && (
        <RenameAlert
          note={note}
          onConfirm={handleRenameConfirm}
          onCancel={() => setShowRenameAlert(false)}
        />
      )}
      {showMoveToAlert && (
        <MoveToAlert
          note={note}
          onCancel={() => setShowMoveToAlert(false)}
          closeMoveToAlert={closeMoveToAlert}
        />
      )}
      {showDeleteAlert && (
        <DeleteAlert
          onConfirm={(event) => {
            event.stopPropagation();
            fetchDeleteNote();
            setShowDeleteAlert(false);
          }}
          onCancel={(event) => {
            event.stopPropagation();
            setShowDeleteAlert(false);
          }}
        />
      )}
    </>
  );
};

export default NoteDropdown;
