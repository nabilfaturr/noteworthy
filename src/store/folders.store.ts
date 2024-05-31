import { create } from "zustand";
import { TFolderSelect } from "@/types";
import { redirect } from "next/navigation";

type FolderStore = {
  folder: TFolderSelect;
  folders: TFolderSelect[];

  setFolder: (folder: TFolderSelect) => void;
  setFolders: (folders: TFolderSelect[]) => void;

  fetchFolder: (userId: string, folderId: string) => Promise<void>;
  fetchFolders: (userId: string) => Promise<void>;
  fetchDeleteFolder: (userId: string, folderId: string) => Promise<void>;
  fetchRenameFolder: (
    userId: string,
    folderId: string,
    newTitle: string
  ) => Promise<void>;
};

export const useFolderStore = create<FolderStore>((set, get) => ({
  folder: {
    id: "",
    title: "",
    userId: "",
  },
  folders: [],
  setFolder: (folder: TFolderSelect) => set({ folder }),
  setFolders: (folders: TFolderSelect[]) => set({ folders }),
  fetchFolders: async (userId: string) => {
    try {
      const response = await fetch(
        `/api/folder/${userId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch folders");
      }

      const data = await response.json();

      const { success, folders } = data;

      if (success) {
        folders.length > 0 ? set({ folders: folders }) : set({ folders: [] });
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchFolder: async (userId: string, folderId: string) => {
    try {
      const response = await fetch(
        `/api/folder/${userId}/${folderId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch folder");
      }

      const data = await response.json();
      const { success, folder } = data;

      if (success) {
        set({ folder: folder });
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchDeleteFolder: async (userId: string, folderId: string) => {
    try {
      const response = await fetch(
        `/api/folder/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: folderId }),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete folder");
      }
    } catch (error) {
      console.log(error);
    }
  },

  fetchRenameFolder: async (
    userId: string,
    folderId: string,
    newTitle: string
  ) => {
    try {
      const response = await fetch(`/api/folder/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: folderId, title: newTitle }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to rename folder");
      }

      const data = await response.json();

      const { success, updatedFolder } = data;

      if (success) {
        set({ folder: updatedFolder });
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
