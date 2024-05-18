import Provider from "@/components/shared/Provider";
import React from "react";

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <div className="">{children}</div>
    </Provider>
  );
};

export default NotesLayout;
