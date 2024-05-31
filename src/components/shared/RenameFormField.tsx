import { TNoteSelect } from "@/types";
import React from "react";

export type TRenameForm = {
  note: TNoteSelect;
  setNewTitle: React.Dispatch<React.SetStateAction<string>>;
};

const RenameFormField = ({ note, setNewTitle }: TRenameForm) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <input
      type="text"
      defaultValue={note.title ?? ""}
      className="border p-3 rounded-lg w-full font-semibold text-black"
      onChange={handleChange}
    />
  );
};

export default RenameFormField;
