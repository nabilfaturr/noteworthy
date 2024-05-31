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
import { TNoteSelect } from "@/types";
import RenameFormField from "./RenameFormField";

export type TRenameAlert = {
  onConfirm: (newTitle: string) => void;
  onCancel: () => void;
  note: TNoteSelect;
};

const RenameAlert = ({ onConfirm, onCancel, note }: TRenameAlert) => {
  const [newTitle, setNewTitle] = React.useState(note.title ?? "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting form with new title:", newTitle);
    onConfirm(newTitle);
  };

  return (
    <AlertDialog open onOpenChange={() => {}}>
      <AlertDialogOverlay
        className="opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertDialogContent className="h-[230px] flex flex-col justify-between">
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader className="h-full">
              <AlertDialogTitle>Rename Note</AlertDialogTitle>
              <AlertDialogDescription className="h-full">
                Please enter a new title for your note.
                <RenameFormField note={note} setNewTitle={setNewTitle} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Rename</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default RenameAlert;
