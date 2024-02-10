import { db } from "@/lib/firebase";
import { useNotes } from "@/store";
import { ref, remove, push, set } from "firebase/database";

const useNotesUtils = () => {
  const username = useNotes((state) => state.username);
  const userNotesPath = `/notes/${username}/`;

  const deleteNote = (noteId) => remove(ref(db, `${userNotesPath}${noteId}`));

  const capitalize = (str) => {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function newNote(title, note, fetchNotes) {
    const userNotesRef = ref(db, `${userNotesPath}`);
    const newNoteRef = push(userNotesRef);
    set(newNoteRef, {
      title: capitalize(title) || "",
      note: capitalize(note),
    });
    fetchNotes();
  }

  return {
    deleteNote,
    newNote,
    capitalize,
    userNotesPath,
  };
};

export default useNotesUtils;
