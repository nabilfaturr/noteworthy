"use server";

import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export const signInAction = async () => {
  const session = await auth();

  if (!session) {
    await signIn("", { redirectTo: "/dashboard/all" });
  } else {
    redirect("/dashboard/all");
  }
};
