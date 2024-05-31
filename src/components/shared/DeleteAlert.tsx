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

const DeleteAlert = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: (event: React.MouseEvent) => void;
  onCancel: (event: React.MouseEvent) => void;
}) => {
  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <AlertDialog open onOpenChange={() => {}}>
      <AlertDialogOverlay className="opacity-0" onClick={stopPropagation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500"
              type="button"
              onClick={onConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteAlert;
