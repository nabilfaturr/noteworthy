import { folders, notes } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { User } from "next-auth";

export type TNoteSelect = InferInsertModel<typeof notes>;
export type TNoteInsert = InferSelectModel<typeof notes>;

export type TFolderSelect = InferSelectModel<typeof folders>;
export type TFolderInsert = InferInsertModel<typeof folders>;

