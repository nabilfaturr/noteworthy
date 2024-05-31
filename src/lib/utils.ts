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

export function formatToSQLiteTimestamp() {
  return new Date().toISOString();
}

export const extractFirstName = (name: string) => {
  return name.split(" ")[0];
};

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return interval === 1 ? "1 week ago" : `${interval} weeks ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }
  return "1 minute ago";
}

// export const timeAgo = (dateString: string) => {
//   console.log(dateString);
//   const localDate = new Date(dateString).toLocaleString([], { hour12: false });

//   return localDate;
// };
