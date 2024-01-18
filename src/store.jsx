import { create } from "zustand";
import { onValue, ref } from "firebase/database";
import { db } from "./lib/firebase";

const fetchNotes = (set) => {
  onValue(ref(db, `/notes/`), (snapshot) => {
    set(() => ({ notes: snapshot.val() }));
  });
};

const notes = (set) => ({
  isDialogModalOpen: false,
  setIsDialogModalOpen: (isDialogModalOpen) => set({ isDialogModalOpen }),

  filterValue: "",
  setFilterValue: (filterValue) => set({ filterValue }),

  username: "",
  setUsername: (username) => set({ username }),

  // notesArray: [],
  // setNotesArray: (note) =>
  //   set((state) => ({ notesArray: [...state.notesArray, note] })),

  noteId: "",
  setNoteId: (noteId) => set({ noteId }),

  notes: [],
  fetchNotes: () => fetchNotes(set),
});

export const useNotes = create(notes);
