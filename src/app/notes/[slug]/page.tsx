"use client";

import TitleForm, { DEFAULT_TITLE_VALUE } from "@/components/shared/TitleField";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const DEFAULT_CONTENT_VALUE = "<em>Tap here to start 🌎️</em>";

const Tiptap = ({ params }: { params: { slug: string } }) => {
  const noteId = params.slug;
  const [data, setData] = React.useState<{
    title: string;
    content: string | "";
  }>({
    title: DEFAULT_TITLE_VALUE,
    content: DEFAULT_CONTENT_VALUE,
  });

  React.useEffect(() => {
    handleAutoSave(data);
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (!newTitle) {
      return setData({ ...data, title: DEFAULT_TITLE_VALUE });
    }

    setData({ ...data, title: newTitle });
  };

  const fetchData = async (data: { title: string; content: string }) => {
    const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const handleAutoSave = useDebouncedCallback((data) => {
    console.log("Saving..");
    fetchData(data);
  }, 1500);

  const editor = useEditor({
    extensions: [StarterKit],
    content: DEFAULT_CONTENT_VALUE,
    onUpdate: ({ editor }) => {
      const contentHTML = editor.getHTML();
      const contentJSON = editor.getJSON();

      const firstLineContent = contentJSON.content?.[0]?.content?.[0]?.text;

      if (!firstLineContent) {
        return setData({ ...data, content: DEFAULT_CONTENT_VALUE });
      }

      setData({ ...data, content: contentHTML });
    },
  });

  return (
    <form
      className="w-full h-full"
      onChange={() => {
        console.log("Something changing");
      }}
    >
      <TitleForm handleTitleChange={handleTitleChange} />
      <EditorContent editor={editor} />
    </form>
  );
};

export default Tiptap;
