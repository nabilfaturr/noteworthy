import React from "react";

type TTitleForm = {
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
};

const TitleForm = ({ handleTitleChange, title }: TTitleForm) => {
  return (
    <input
      type="text"
      className="note-title"
      defaultValue={title}
      onChange={handleTitleChange}
    />
  );
};

export default TitleForm;
