import React from "react";

type TTitleForm = {
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TitleForm = ({ handleTitleChange }: TTitleForm) => {
  return (
    <input
      type="text"
      className="note-title"
      defaultValue={"Untitled Note"}
      onChange={handleTitleChange}
    />
  );
};

export default TitleForm;
