import { auth, signIn } from "@/lib/auth";
import React from "react";

const NotesPage = async () => {
  const session = await auth();

  if (!session) {
  await signIn();
  }

  return <div>NotesPage</div>;
};

export default NotesPage;
