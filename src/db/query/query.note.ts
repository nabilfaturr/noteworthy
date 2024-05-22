import { formatToSQLiteTimestamp, generateUUID } from "@/lib/utils";
import { db } from "../db";
import { notes } from "../schema";
import { eq, sql } from "drizzle-orm";
import { TNoteSelect } from "@/types";

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

export const getNoteByUserId = async (userId: string) => {
  const note = await db
    .select()
    .from(notes)
    .where(sql`${notes.userId} = ${userId}`);
  return note;
};

export const getNoteByNoteId = async (noteId: string) => {
  const note : TNoteSelect[]= await db
    .select()
    .from(notes)
    .where(sql`${notes.id} = ${noteId}`)
    .limit(1)
  return note[0];
};
