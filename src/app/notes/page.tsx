import CreateNoteButton from "@/components/shared/CreateNoteButton";
import { auth, signIn } from "@/lib/auth";
import React from "react";

const NotesPage = async () => {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  return (
    <div>
      <CreateNoteButton />
    </div>
  );
};

export default NotesPage;
