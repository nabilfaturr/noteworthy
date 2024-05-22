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

  return session;
};

export const generateUUID = () => {
  return crypto.randomUUID();
};

export function formatToSQLiteTimestamp(date: Date) {
  const pad = (number: number) => (number < 10 ? "0" + number : number);

  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    " " +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds())
  );
}
