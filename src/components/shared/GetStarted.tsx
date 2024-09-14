"use client";

import { signInAction } from "@/actions/action";
import { Button } from "../ui/button";

const GetStarted = () => {
  return (
    <form action={signInAction}>
      <Button
        type="submit"
        className="w-28 bg-blue-200 text-blue-500 hover:bg-blue-300"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default GetStarted;
