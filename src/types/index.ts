import { notes } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type TNoteSelect = InferInsertModel<typeof notes>
export type TNoteInsert = InferSelectModel<typeof notes>