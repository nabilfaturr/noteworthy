import { getNotesByUserId } from "@/db/query/query.note";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  const notes = await getNotesByUserId(userId);
  return NextResponse.json(notes);
};

export const POST = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  const notes = await getNotesByUserId(userId);

  return NextResponse.json(notes);
};
