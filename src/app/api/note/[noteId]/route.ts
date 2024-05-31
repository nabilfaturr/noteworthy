import {
  deleteNoteByNoteId,
  getNoteByNoteId,
  updateNote,
  updateNoteTitleByNoteId,
} from "@/db/query/query.note";
import { TNoteSelect } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const DEFAULT_CONTENT = "<em>Tap here to start 🌎️</em>";
const DEFAULT_TITLE = "Untitled Note";

interface NoteData {
  title: string;
  content: string;
}

const setDefaultValues = (data: NoteData): NoteData => {
  if (data.title === "") {
    data.title = DEFAULT_TITLE;
  }

  if (
    data.content === "" ||
    data.content === `<em></em>` ||
    data.content === `<p></p>`
  ) {
    data.content = DEFAULT_CONTENT;
  }

  return data;
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { noteId: string } }
) => {
  const { noteId } = params;
  try {
    const data: NoteData = await request.json();
    const updatedData = setDefaultValues(data);
    await updateNote(noteId, updatedData);
    return NextResponse.json({ noteId });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { noteId: string } }
) => {
  const { noteId } = params;
  try {
    const note: TNoteSelect = await getNoteByNoteId(noteId);
    const { content, title } = note;
    return NextResponse.json({ content, title });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { noteId: string } }
) => {
  const { noteId } = params;
  try {
    await deleteNoteByNoteId(noteId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { noteId: string } }
) => {
  const { noteId } = params;
  try {
    const { title }: { title: string } = await request.json();
    await updateNoteTitleByNoteId(noteId, title);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating note title:", error);
    return NextResponse.json(
      { error: "Failed to update note title" },
      { status: 500 }
    );
  }
};
