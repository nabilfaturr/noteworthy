"use client";

import React from "react";
import NoteList from "./NoteList";
import FolderHeader from "./FolderHeader";
import { useNoteStore } from "@/store/note.store";
import MainbarSkeleton from "./skeleton/Mainbar.skeleton";

interface MainbarProps {
  userId: string;
  folderId?: string;
}

const Mainbar = ({ userId, folderId }: MainbarProps) => {
  const { notes, fetchNotes, loadingFetchNotes } = useNoteStore((state) => ({
    notes: state.notes,
    fetchNotes: state.fetchNotes,
    loadingFetchNotes: state.loadingFetchNotes,
  }));

  React.useEffect(() => {
    const type = folderId ? "folder" : "all";

    fetchNotes(type, folderId, userId);
  }, []);


  return (
    <div className="space-y-8 w-full">
      {notes && loadingFetchNotes===false && (
        <DisplayAvailableNotes userId={userId} folderId={folderId} />
      )}
      {loadingFetchNotes && <MainbarSkeleton />}
    </div>
  );
};

type TDisplayAvailableNotes = {
  userId: string;
  folderId?: string;
};

export const DisplayAvailableNotes = ({
  userId,
  folderId,
}: TDisplayAvailableNotes) => {
  const notes = useNoteStore((state) => state.notes);

  return (
    <div className="h-full flex flex-col gap-8">
      <div>
        {folderId ? (
          <FolderHeader userId={userId} folderId={folderId} />
        ) : (
          <h1 className="font-bold text-3xl pl-24 pt-10">Your Note</h1>
        )}
      </div>
      <div className="h-full">
        {notes.length > 0 ? (
          <NoteList userId={userId} folderId={folderId} />
        ) : (
          <div className="ml-24 flex items-center justify-center h-full">
            <p className="text-3xl font-medium mb-20">No notes available</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Loading = () => <p className="font-bold text-xl">Loading...</p>;

export default Mainbar;
