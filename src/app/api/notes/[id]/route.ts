import { getNoteByNoteId, updateNote } from "@/db/query/query.note";
import { TNoteSelect } from "@/types";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const noteId = params.id;
  const data = await request.json();

  // store the note into the client
  updateNote(noteId, data);

  return NextResponse.json(noteId);
};

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const noteId = params.id;

  const note: TNoteSelect = await getNoteByNoteId(noteId);

  console.log(note)

  const { content, title } = note;

  return NextResponse.json({ content, title });
};
