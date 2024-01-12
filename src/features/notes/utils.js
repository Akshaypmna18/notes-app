import { db } from "@/lib/firebase";
import { ref, remove } from "firebase/database";

export const deleteNote = (username, noteId) =>
  remove(ref(db, `/notes/${username}/${noteId}`));

export const capitalize = (str) => {
  if (str) return str.charAt(0).toUpperCase() + str.slice(1);
};
