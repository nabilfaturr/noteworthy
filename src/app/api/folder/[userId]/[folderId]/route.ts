import { getFolderByFolderId } from "@/db/query/query.folder";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string; folderId: string } }
) => {
  const { userId, folderId } = params;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (!folderId) {
    return NextResponse.json({ error: "Folder is required" }, { status: 400 });
  }

  try {
    const folders = await getFolderByFolderId(folderId);
    const folder = folders && folders[0];

    if (!folder) {
      return NextResponse.json(
        { error: "Folder not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ folder, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { userId: string; folderId: string } }
) => {
  const { userId, folderId } = params;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (!folderId) {
    return NextResponse.json({ error: "Folder is required" }, { status: 400 });
  }

  try {
    const folder = await getFolderByFolderId(folderId);

    if (!folder) {
      return NextResponse.json(
        { error: "Folder not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ folder, success: true });
  } catch (error) {
    console.log(error);
  }
};
