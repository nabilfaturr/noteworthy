import { getNotesByFolderId, insertNoteToFolder } from "@/db/query/query.note";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { userId: string; folderId: string } }
) => {
  const { userId, folderId } = params;

  console.log(params);

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" });
  }

  if (!folderId) {
    return NextResponse.json({ error: "Folder ID is required" });
  }

  try {
    const notes = await getNotesByFolderId(folderId);

    console.log({ notes });

    if (!notes) {
      return NextResponse.json({ message: "No notes found" });
    }

    return NextResponse.json(notes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { userId: string; folderId: string } }
) => {
  const { userId, folderId } = params;

  const body = await request.json();

  const { noteId } = body;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" });
  }

  if (!folderId) {
    return NextResponse.json({ error: "Folder ID is required" });
  }

  if (!noteId) {
    return NextResponse.json({ error: "Note ID is required" });
  }

  try {
    const notes = await insertNoteToFolder(noteId, folderId);

    console.log({ notes });

    if (!notes) {
      return NextResponse.json({ message: "No notes found" });
    }

    return NextResponse.json(notes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
};
