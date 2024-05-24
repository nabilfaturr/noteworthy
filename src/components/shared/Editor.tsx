import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export type TEditor = {
  content: string;
  handleNoteContentChange: (noteContent: string) => void;
  note: { title: string; content: string };
};

const DEFAULT_CONTENT_VALUE = "<em>Tap here to start 🌎️</em>";

const Editor = ({ content, handleNoteContentChange, note }: TEditor) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      const contentHTML = editor.getHTML();
      const contentJSON = editor.getJSON();

      const firstLineContent = contentJSON.content?.[0]?.content?.[0]?.text;

      if (!firstLineContent) {
        return handleNoteContentChange(DEFAULT_CONTENT_VALUE);
      }

      return handleNoteContentChange(contentHTML);
    },
  });
  return <EditorContent editor={editor} className="w-full h-full" />;
};

export default Editor;
