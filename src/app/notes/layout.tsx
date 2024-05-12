import Provider from "@/components/shared/Provider";
import React from "react";

const NotesLayout = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default NotesLayout;
