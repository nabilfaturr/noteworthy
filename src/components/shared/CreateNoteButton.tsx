import React from "react";
import { auth, signIn } from "@/lib/auth";
import { Button } from "../ui/button";
import { createNewNoteForUser, createNote } from "@/db/query/query.note";
import { redirect } from "next/navigation";
import { checkSession, generateUUID } from "@/lib/utils";

const CreateNoteButton = async () => {
  const createNoteAction = async () => {
    "use server";

    let noteId: string | null = null;

    try {
      const session = await checkSession();
      const userId = session?.user?.id as string;

      noteId = await createNewNoteForUser(userId);
    } catch (error) {
      console.log(error);
    }

    if (noteId) {
      redirect(`/notes/${noteId}`);
    }
  };

  return (
    <form action={createNoteAction}>
      <Button type="submit">Create Note</Button>
    </form>
  );
};

export default CreateNoteButton;
