import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const githubRepoLink = "https://github.com/nabilfaturr/noteworthy";

const Topbar = () => {
  return (
    <div className="w-full border-b py-2 px-4 flex justify-between items-center">
      <Link href={"/"} className="font-medium text-xl text-blue-600 hover:underline">
        Noteworthy
      </Link>
      <Link href={githubRepoLink} className="hover:underline font-medium" target="_blank">
        GitHub
      </Link>
    </div>
  );
};

export default Topbar;
