import React from "react";

type TTitleForm = {
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DEFAULT_TITLE_VALUE = "Untitled Note";

const TitleForm = ({ handleTitleChange }: TTitleForm) => {
  return (
    <input
      type="text"
      className="note-title"
      defaultValue={DEFAULT_TITLE_VALUE}
      onChange={handleTitleChange}
    />
  );
};

export default TitleForm;
