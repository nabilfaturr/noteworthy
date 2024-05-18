import { generateUUID } from "@/lib/utils";
import { db } from "../db";
import { notes } from "../schema";

type newNote = typeof notes.$inferInsert;

export const createNote = async (data : newNote) => {
  await db.insert(notes).values(data);
};

export async function createNewNoteForUser(userId: string) {
  const id = generateUUID();
  const noteData = {
    id,
    userId,
  };

  await createNote(noteData);
  return id;
}