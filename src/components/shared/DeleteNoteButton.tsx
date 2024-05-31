// DeleteNoteButton.tsx
import React, { forwardRef, Ref } from "react";
import { Trash2Icon } from "lucide-react";

const DeleteButton = forwardRef<HTMLButtonElement, {}>(
  (props, ref: Ref<HTMLButtonElement>) => (
    <button ref={ref} className="flex items-center gap-2 cursor-pointer">
      <Trash2Icon className="w-4" />
      <span className="font-semibold">Delete</span>
    </button>
  )
);

DeleteButton.displayName = "DeleteButton";

export default DeleteButton;
