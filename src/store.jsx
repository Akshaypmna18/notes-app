import { create } from "zustand";

const notes = (set, get) => ({
  showPassword: false,
  setShowPassword: (value) => {
    set(() => ({ showPassword: value }));
  },
});

export const useNotes = create(notes);
