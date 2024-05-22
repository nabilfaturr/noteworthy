import { formatToSQLiteTimestamp, generateUUID } from "@/lib/utils";
import { db } from "../db";
import { notes } from "../schema";
import { eq, sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

type newNote = typeof notes.$inferInsert;

export const createNote = async (data: newNote) => {
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

export async function updateNote(noteId: string, data: any) {
  const currentTimestamp = formatToSQLiteTimestamp(new Date());
  await db
    .update(notes)
    .set({
      ...data,
      updatedAt: currentTimestamp,
    })
    .where(eq(notes.id, noteId));
}
