import React, { Children } from "react";

const NoteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen p-10 bg-white">
      <div className="w-full h-full rounded-lg bg-slate-50  border px-8 md:px-16 lg:px-32 py-20">
        {children}
      </div>
    </div>
  );
};

export default NoteLayout;
