import Provider from "@/components/shared/Provider";
import React from "react";

const NoteLayout = ({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) => {
  return (
    <Provider noteId={params.slug}>
      {children}
    </Provider>
  );
};

export default NoteLayout;
