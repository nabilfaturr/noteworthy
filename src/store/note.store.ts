import { TNoteSelect } from "@/types";
import { create } from "zustand";

type TNoteStore = {
  note: TNoteSelect;
  notes: TNoteSelect[];
  loadingFetchNotes: boolean;

  setNote: (note: TNoteSelect) => void;
  setNotes: (notes: TNoteSelect[]) => void;
  setLoadingFetchNotes: (loadingFetchNotes: boolean) => void;

  fetchNotes: (
    type: "all" | "folder",
    folderId: string | undefined,
    userId: string
  ) => Promise<void>;
};

export const useNoteStore = create<TNoteStore>((set) => ({
  note: {
    id: "",
    userId: "",
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  },
  notes: [],
  loadingFetchNotes: false,

  setNote: (note) => set({ note }),
  setNotes: (notes) => set({ notes }),
  setLoadingFetchNotes: (loadingFetchNotes) => set({ loadingFetchNotes }),

  fetchNotes: async (type, folderId, userId) => {
    const url =
      type === "folder" && folderId
        ? `/api/notes/${userId}/${folderId}`
        : `/api/notes/${userId}`;

    const options: any =
      type === "folder"
        ? {}
        : {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
            cache: "no-store",
          };

    try {
      set({ loadingFetchNotes: true });
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();

      if (!data) {
        set({ loadingFetchNotes: false });
        throw new Error("Invalid response from server");
      }

      set({ loadingFetchNotes: false });
      set({ notes: data });
    } catch (error) {
      set({ loadingFetchNotes: true });
      console.error("Error fetching notes:", error);
    }
  },
}));
