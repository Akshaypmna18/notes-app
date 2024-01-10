import { create } from "zustand";

const notes = (set) => ({
  isDialogModalOpen: false,
  setIsDialogModalOpen: (value) => {
    set(() => ({ isDialogModalOpen: value }));
  },
  filterValue: "",
  setFilterValue: (value) => {
    set(() => ({ filterValue: value }));
  },
});

export const useNotes = create(notes);
