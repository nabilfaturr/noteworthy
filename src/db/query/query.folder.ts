import { TFolderInsert } from "@/types";
import { db } from "../client";
import { folders, users } from "../schema";
import { asc, sql } from "drizzle-orm";

export const createNewFolder = async ({
  title,
  userId,
}: {
  title: string;
  userId: string;
}) => {
  const createdFolder = await db
    .insert(folders)
    .values({
      title,
      userId,
    })
    .returning();

  return createdFolder.length === 0 ? false : createdFolder;
};

export const getFoldersByUserId = async ({ userId }: { userId: string }) => {
  const foldersByUserId: TFolderInsert[] = await db
    .select()
    .from(folders)
    .where(sql`${folders.userId} = ${userId}`)
    .orderBy(asc(folders.title));

  return foldersByUserId.length === 0 ? false : foldersByUserId;
};

export const getFolderByFolderId = async (folderId: string) => {
  const folder = await db
    .select()
    .from(folders)
    .where(sql`${folders.id} = ${folderId}`);

  return folder.length === 0 ? false : folder;
};

export const deleteFolderByFolderId = async (folderId: string) => {
  const deletedFolder = await db
    .delete(folders)
    .where(sql`${folders.id} = ${folderId}`)
    .returning();

  return deletedFolder.length === 0 ? false : deletedFolder;
};

export const checkUserExist = async (userId: string) => {
  const isUserExist = await db
    .select()
    .from(users)
    .where(sql`${users.id} = ${userId}`);

  return isUserExist.length === 0 ? false : true;
};

export const updateFolderByFolderId = async (
  folderId: string,
  title: string
) => {
  const updatedFolder = await db
    .update(folders)
    .set({ title })
    .where(sql`${folders.id} = ${folderId}`)
    .returning();

  return updatedFolder.length === 0 ? false : updatedFolder;
};
