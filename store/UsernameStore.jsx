import { create } from "zustand";
import { persist } from "zustand/middleware";

export const UseUsernameStore = create(
  persist(
    (set) => ({
      username: "",
      setUsername: (p) => set({ username: p }),
    }),
    {
      name: "username-storage"
    }
  )
);
