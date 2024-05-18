import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth, signIn } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkSession = async () => {
  const session = await auth();

  if (!session) {
    await signIn();
  }

};
