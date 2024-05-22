import { getNoteByNoteId } from "@/db/query/query.note";
import { auth, signIn } from "@/lib/auth";
import { TNoteSelect } from "@/types";

type TProvider = {
  children: React.ReactNode;
  noteId?: string;
};

const Provider = async ({ children, noteId }: TProvider) => {
  const session = await auth();
  const userId = session?.user?.id as string;

  if (!session) {
    await signIn("", { redirectTo: "/notes" });
  }

  if (noteId) {
    const note: TNoteSelect = await getNoteByNoteId(noteId);

    if (note.userId !== userId) {
      // return unauthorized
      return null;
    }
  }

  return <>{children}</>;
};

export default Provider;
