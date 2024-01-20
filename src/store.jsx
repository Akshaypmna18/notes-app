import { create } from "zustand";
import { onValue, ref } from "firebase/database";
import { db } from "./lib/firebase";
import { devtools, persist } from "zustand/middleware";

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

  theme: "dark",
  setTheme: (theme) => set({ theme }),

  title: "",
  setTitle: (title) => set({ title }),

  note: "",
  setNote: (note) => set({ note }),

  notes: [],
  fetchNotes: () => fetchNotes(set),
});

export const useNotes = create(notes);

devtools(persist(notes, { name: "theme" }));
