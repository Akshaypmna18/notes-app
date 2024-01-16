import { db } from "@/lib/firebase";
import { push, ref, set } from "firebase/database";
import React from "react";
import { capitalize } from "../utils";

export function newNote(username, title, note, fetchNotes) {
  const userNotesRef = ref(db, `/notes/${username}/`);
  const newNoteRef = push(userNotesRef);
  set(newNoteRef, {
    title: capitalize(title) || "",
    note: capitalize(note),
  });
  fetchNotes();
}
