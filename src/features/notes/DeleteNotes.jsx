import React from "react";
import { db } from "@/lib/firebase";
import { ref, remove } from "firebase/database";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

function DeleteNotes({ username, notesId, setNotesId }) {
  const deleteMultipleNotes = (username, noteIds) => {
    noteIds.forEach((noteId) => {
      remove(ref(db, `/notes/${username}/${noteId}`));
    });
    setNotesId([]);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`bg-red-800 hover:bg-red-800 fixed sm:absolute right-8 bottom-12 rounded-lg h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw) sm:top-[calc(1.8rem+0.75vw)] sm:right-[calc(10rem+2vw)] sm:w-12 sm:h-10 ${
            notesId.length === 0 ? "hidden" : ""
          }`}
        >
          <TrashIcon className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)] cursor-pointer" />
          <span className="absolute -top-2 -right-1 bg-primary rounded-md w-4 text-red-600 text-[calc(1rem+0.1vw)] ">
            {notesId.length}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-[640px]:max-w-[15rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {` This action cannot be undone. This will permanently delete ${notesId.length} notes
            from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-800 hover:bg-red-800"
            onClick={() => {
              deleteMultipleNotes(username, notesId);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNotes;
