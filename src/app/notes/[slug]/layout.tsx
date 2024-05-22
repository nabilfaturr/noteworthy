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
      <div className="w-screen h-screen p-10 bg-white">
        <div className="w-full h-full rounded-lg bg-slate-100  border px-8 md:px-16 lg:px-32 py-20">
          {children}
        </div>
      </div>
    </Provider>
  );
};

export default NoteLayout;
