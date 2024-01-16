import React from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import AlertDialogModal from "./AlertDialogModal";
import { deleteNote } from "../utils";
import { useNotes } from "@/store";

function DeleteMultipleNotes({ notesId, setNotesId }) {
  const { username } = useNotes((state) => state);
  const deleteMultipleNotes = (username, noteIds) => {
    noteIds.forEach((noteId) => {
      deleteNote(username, noteId);
    });
    setNotesId([]);
  };
  return (
    <AlertDialogModal
      desc={`${notesId.length > 1 ? notesId.length : "this"} ${
        notesId.length > 1 ? "notes" : "note"
      }`}
      func={() => deleteMultipleNotes(username, notesId)}
    >
      <Button
        className={`bg-deleteIcon hover:bg-deleteIcon fixed sm:absolute right-8 bottom-12 rounded-lg h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw) sm:top-[calc(1.8rem+0.75vw)] sm:right-[calc(10rem+2vw)] sm:w-12 sm:h-10 ${
          notesId.length === 0 ? "hidden" : ""
        }`}
      >
        <TrashIcon className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)] cursor-pointer" />
        <span className="absolute -top-2 -right-1 bg-primary rounded-md w-4 text-red-600 text-[calc(1rem+0.1vw)] ">
          {notesId.length}
        </span>
      </Button>
    </AlertDialogModal>
  );
}

export default DeleteMultipleNotes;
