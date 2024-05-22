import { updateNote } from "@/db/query/query.note";
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