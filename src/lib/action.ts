"use server";

import { createNewNoteForUser } from "@/db/query/query.note";
import { signOut } from "./auth";
import { checkSession } from "./utils";
import { redirect } from "next/navigation";

export const signOutAction = async () => {
  "use server";

  await signOut({ redirectTo: "/" });
};

export const createNoteAction = async () => {
  let noteId: string | null = null;

  try {
    const session = await checkSession();
    const userId = session?.user?.id as string;

    noteId = await createNewNoteForUser(userId);
  } catch (error) {
    console.log(error);
  }

  if (noteId) {
    redirect(`/workspace/${noteId}`);
  }
};
