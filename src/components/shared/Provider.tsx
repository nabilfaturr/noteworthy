import { auth, signIn } from "@/lib/auth";
import React from "react";

const Provider = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    await signIn("", { redirectTo: "/notes" });
  }

  return <>{children}</>;
};

export default Provider;
