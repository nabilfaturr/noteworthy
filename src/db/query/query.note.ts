import { db } from "../db";
import { notes } from "../schema";

type newNote = typeof notes.$inferInsert;

export const createNote = async (data : newNote) => {
  await db.insert(notes).values(data);
};
