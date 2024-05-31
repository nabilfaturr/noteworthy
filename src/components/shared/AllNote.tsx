import { Grid2X2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const AllNote = () => {
  return (
    <Link
      href={"/dashboard/all"}
      className="w-full px-4 py-2 flex gap-2 rounded-lg bg-white text-slate-800 hover:bg-slate-100"
    >
      <Grid2X2Icon className="w-5 h-5" />
      <p>All Files</p>
    </Link>
  );
};

export default AllNote;
