import { create } from "zustand";

export const useTaskStore = create((set) => ({
  task: "",
  setTask: (newtask) => set({ task: newtask }),
}));
