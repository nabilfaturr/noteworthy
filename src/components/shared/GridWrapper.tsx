import React from "react";

const GridWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="sm:flex w-full h-full">{children}</div>;
};

export default GridWrapper;
