"use client";

import Editor from "@/components/shared/Editor";
import TitleForm, { DEFAULT_TITLE_VALUE } from "@/components/shared/TitleField";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const DEFAULT_CONTENT_VALUE = "<em>Tap here to start 🌎️</em>";

const Tiptap = ({ params }: { params: { slug: string } }) => {
  const noteId = params.slug;
  const [note, setNote] = React.useState<{
    title: string;
    content: string | "";
  }>({
    title: DEFAULT_TITLE_VALUE,
    content: "",
  });

  React.useEffect(() => {
    const fetchNote = async () => {
      const response = await fetch(`http://localhost:3000/api/notes/${noteId}`);
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
    const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
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
  }, 1500);

  return (
    <form
      className="w-full h-full"
      onChange={() => {
        console.log("Something changing");
      }}
    >
      <TitleForm handleTitleChange={handleTitleChange} />
      {note.content === "" ? (
        <p>Belum boleh masih kosong</p>
      ) : (
        <Editor
          content={note.content}
          handleNoteContentChange={handleNoteContentChange}
          note={note}
        />
      )}
    </form>
  );
};

export default Tiptap;
