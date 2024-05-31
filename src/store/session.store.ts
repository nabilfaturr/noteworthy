import { create } from "zustand";

type TSession = {
  userId: string;
  image: string;
};

type TSessionStore = {
  session: TSession;
  userId: string
  setSession: (session: TSession) => void;
  setUserId: (userId: string) => void;
};

export const useSessionStore = create<TSessionStore>((set) => ({
  session: {
    userId: "",
    image: "",
  },
  userId: "",
  setUserId: (userId: string) => set({ userId }),
  setSession: (session: TSession) => set({ session }),
}));
