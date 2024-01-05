import { create } from "zustand";

const notes = (set, get) => ({
  isDialogModalOpen: false,
  setIsDialogModalOpen: (value) => {
    set(() => ({ isDialogModalOpen: value }));
  },
});

export const useNotes = create(notes);
