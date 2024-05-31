// const dynamic = 'force-dynamic'

import { formatToSQLiteTimestamp, generateUUID } from "@/lib/utils";
import { db } from "../client";
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
  const currentTimestamp = formatToSQLiteTimestamp();
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
  const note: TNoteSelect[] = await db
    .select()
    .from(notes)
    .where(sql`${notes.id} = ${noteId}`)
    .limit(1);
  return note[0];
};

export const getNotesByUserId = async (userId: string) => {
  const note: TNoteSelect[] = await db
    .select()
    .from(notes)
    .where(sql`${notes.userId} = ${userId}`);
  return note;
};

export const deleteNoteByNoteId = async (noteId: string) => {
  await db.delete(notes).where(sql`${notes.id} = ${noteId}`);
};

export const updateNoteTitleByNoteId = async (
  noteId: string,
  title: string
) => {
  const currentTimestamp = formatToSQLiteTimestamp();

  await db
    .update(notes)
    .set({ title, updatedAt: currentTimestamp })
    .where(sql`${notes.id} = ${noteId}`);
};

export const getNotesByFolderId = async (folderId: string) => {
  const notesByFolderId: TNoteSelect[] = await db
    .select()
    .from(notes)
    .where(sql`${notes.folderId} = ${folderId}`);

  return notesByFolderId.length === 0 ? false : notesByFolderId;
};

export const insertNoteToFolder = async (noteId: string, folderId: string) => {
  const insertedNote = await db
    .update(notes)
    .set({ folderId })
    .where(sql`${notes.id} = ${noteId}`)
    .returning();

  console.log(insertedNote);

  return insertedNote.length === 0 ? false : true;
};
