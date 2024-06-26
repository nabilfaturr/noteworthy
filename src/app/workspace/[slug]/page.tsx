"use client";

import "./style.css";
import Editor from "@/components/shared/Editor";
import TitleForm from "@/components/shared/TitleField";
import { EditorSkeleton } from "@/components/shared/skeleton/Mainbar.skeleton";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const DEFAULT_CONTENT_VALUE = "<em>Tap here to start 🌎️</em>";
const DEFAULT_TITLE_VALUE = "Untitled Note";

const Tiptap = ({ params }: { params: { slug: string } }) => {
  const noteId = params.slug;
  const [note, setNote] = React.useState<{
    title: string;
    content: string | "";
  }>({
    title: "",
    content: "",
  });

  React.useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`/api/note/${noteId}`);
      const data = await response.json();
      console.log(data);
      setNote(data);
    };
    fetchNote();
  }, []);

  React.useEffect(() => {
    handleAutoSave(note);
  }, [note]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (!newTitle) {
      return setNote({ ...note, title: DEFAULT_TITLE_VALUE });
    }

    setNote({ ...note, title: newTitle });
  };

  const handleNoteContentChange = (noteContent: string) => {
    setNote({ ...note, content: noteContent });
  };

  const fetchData = async (note: { title: string; content: string }) => {
    const response = await fetch(`/api/note/${noteId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const handleAutoSave = useDebouncedCallback((note) => {
    console.log("Saving..");
    fetchData(note);
  }, 500);

  return (
    <div className="w-screen h-screen p-6 bg-white">
      <div className="w-full h-full rounded-lg bg-slate-100  border px-8 md:px-16 lg:px-32 py-20">
        <form className="w-full h-full" onSubmit={(e) => e.preventDefault()}>
          {note.title === "" && note.content === "" ? (
            <EditorSkeleton />
          ) : (
            <>
              <TitleForm
                handleTitleChange={handleTitleChange}
                title={note.title}
              />
              <Editor
                content={note.content}
                handleNoteContentChange={handleNoteContentChange}
                note={note}
              />
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Tiptap;
