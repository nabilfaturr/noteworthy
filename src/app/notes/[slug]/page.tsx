"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ id }: { id: string }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <>
      <EditorContent editor={editor} />
      <h1>{id}</h1>
    </>
  );
};

export default Tiptap;
