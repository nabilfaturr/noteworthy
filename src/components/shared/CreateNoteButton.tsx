import React from "react";
import { auth, signIn } from "@/lib/auth";
import { Button } from "../ui/button";
import { createNote } from "@/db/query/query.note";

const CreateNoteButton = async () => {
  const session = await auth();
  const createNoteAction = async () => {
    "use server";

    if (!session) {
      return await signIn();
    }

    const userId = session.user?.id as string;
    const id = crypto.randomUUID();

    const data = {
      id,
      userId,
    };

    await createNote(data);
  };

  return (
    <form action={createNoteAction}>
      <Button type="submit">Create Note</Button>
    </form>
  );
};

export default CreateNoteButton;
