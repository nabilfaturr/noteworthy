"use client";

import { signInAction } from "@/actions/action";
import { Button } from "../ui/button";

const GetStarted = () => {
  return (
    <form action={signInAction}>
      <Button
        type="submit"
        className="self-start px-6 rounded-none text-xl bg-black lg:ml-2 hover:bg-black/80"
      >
        Get Started
      </Button>
    </form>
  );
};

export default GetStarted;
