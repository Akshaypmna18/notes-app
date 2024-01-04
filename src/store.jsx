import { create } from "zustand";

const notes = (set, get) => ({
  passwordVisibility: false,
  setPasswordVisibility: (value) => {
    set(() => ({ passwordVisibility: value }));
  },
});

export const useNotes = create(notes);
