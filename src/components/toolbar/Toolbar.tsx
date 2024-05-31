import type { Editor } from "@tiptap/react";
import React from "react";
import Typography from "./Typography";

type TToolbar = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: TToolbar) => {
  return (
    <div className="flex justify-center absolute bottom-10 left-0 w-full">
      <div className="border space-x-2 bg-white rounded-lg">
        <Typography editor={editor}/>
      </div>
    </div>
  );
};

export default Toolbar;
