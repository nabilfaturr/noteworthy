import React from "react";
import { Button } from "../ui/button";
import { createNoteAction } from "@/lib/action";

const CreateNoteButton = () => {
  return (
    <form action={createNoteAction}>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500">
        Create Note
      </Button>
    </form>
  );
};

export default CreateNoteButton;
