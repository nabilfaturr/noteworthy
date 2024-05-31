import {
  checkUserExist,
  createNewFolder,
  deleteFolderByFolderId,
  getFoldersByUserId,
  updateFolderByFolderId,
} from "@/db/query/query.folder";
import { TFolderInsert, TFolderSelect } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const body: TFolderInsert = await req.json();
  const { title } = body;
  const { userId } = params;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (title.length > 20) {
    return NextResponse.json({ error: "Title is too long" }, { status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const data = {
    title: title as string,
    userId: userId as string,
  };

  try {
    const folder = await createNewFolder(data);

    if (!folder) {
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json(folder);
  } catch (error) {
    console.error("Error creating folder:", error);
    return NextResponse.json(
      { error: "Failed to create folder" },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const isUserExist = await checkUserExist(userId);
    if (!isUserExist) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const folders = await getFoldersByUserId({ userId });

    if (!folders) {
      return NextResponse.json({ success: true, folders: [] });
    }

    console.log({ folders });

    return NextResponse.json({ success: true, folders });
  } catch (error) {
    console.error("Error fetching folders:", error);
    return NextResponse.json(
      { error: "Failed to fetch folders" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const body: TFolderSelect = await req.json();
  console.log(body);
  const folderId = body.id;

  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (!folderId) {
    return NextResponse.json({ error: "Folder is required" }, { status: 400 });
  }

  try {
    const isUserExist = await checkUserExist(userId);
    if (!isUserExist) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const deletedFolder = await deleteFolderByFolderId(folderId);

    console.log({ deletedFolder });
    if (!deletedFolder) {
      return NextResponse.json(
        { error: "Folder not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ deletedFolder, success: true });
  } catch (error) {
    console.error("Error deleting folders:", error);
    return NextResponse.json(
      { error: "Failed to delete folders" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const body: TFolderSelect = await req.json();
  const folderId = body.id;
  const folderTitle = body.title;

  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  if (!folderId) {
    return NextResponse.json({ error: "Folder is required" }, { status: 400 });
  }

  if (!folderTitle) {
    return NextResponse.json(
      { error: "Folder title is required" },
      {
        status: 400,
      }
    );
  }

  try {
    const isUserExist = await checkUserExist(userId);
    if (!isUserExist) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedFolders = await updateFolderByFolderId(folderId, folderTitle);
    const updatedFolder = updatedFolders && updatedFolders[0];

    if (!updatedFolder) {
      return NextResponse.json(
        { error: "Folder not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ updatedFolder, success: true });
  } catch (error) {
    console.error("Error deleting folders:", error);
    return NextResponse.json(
      { error: "Failed to delete folders" },
      { status: 500 }
    );
  }
};
