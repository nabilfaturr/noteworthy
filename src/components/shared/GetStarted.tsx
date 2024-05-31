"use client";

import { signInAction } from "@/actions/action";
import { Button } from "../ui/button";

const GetStarted = () => {
  return (
    <form action={signInAction}>
      <Button type="submit">Get Started</Button>
    </form>
  );
};

export default GetStarted;
