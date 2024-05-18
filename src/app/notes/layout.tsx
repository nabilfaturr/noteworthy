import Provider from "@/components/shared/Provider";
import React from "react";

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <div className="flex show max-w-5xl mx-auto p-2">{children}</div>
    </Provider>
  );
};

export default NotesLayout;
