"use client";

import TitleForm from "@/components/shared/TitleField";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const Tiptap = ({ id }: { id: string }) => {
  const [data, setData] = React.useState({
    title: "",
    content: "",
  });

  console.log(data);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setData({ ...data, title: newTitle });
  };

  const handleContentChange = () => {
    const newContent = editor?.getHTML() || "";
    setData({ ...data, content: newContent });
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Tap here to start 🌎️</p>",
  });

  editor?.on("update", () => {
    handleContentChange();
  });

  return (
    <form className="w-full h-full">
      <TitleForm handleTitleChange={handleTitleChange} />
      <EditorContent editor={editor} />
    </form>
  );
};

export default Tiptap;
