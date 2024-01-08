import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import DialogModal from "@/components/DialogModal";
import DialogForm from "@/features/notes/DialogForm";
import { deleteNote } from "@/features/notes/functions";
import { useNotes } from "@/store";
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

function NotesComp({ notesArray, username, fetchNotes, setNoteId }) {
  const { setIsDialogModalOpen } = useNotes((state) => state);
  const [isChecked, setIsChecked] = useState([]);

  const handleCheckboxClick = (index, noteId) =>
    setIsChecked(
      isChecked.map((item, pos) =>
        pos === index ? { noteId: noteId, isChecked: !item } : item
      )
    );

  useEffect(() => {
    setIsChecked(Array(notesArray.length).fill(false));
  }, [notesArray]);

  useEffect(() => {
    console.log(isChecked);
  }, [isChecked]);

  // const deleteMultipleNotes = (username, noteIds) => {
  //   noteIds.forEach((noteId) => {
  //     remove(ref(db, `/notes/${username}/${noteId}`));
  //   });
  // };

  return (
    <div className="columns-2xs mt-8">
      {notesArray.length > 0
        ? notesArray.map(([noteId, { title, note }], index) => (
            <DialogModal
              key={index}
              title="Update note"
              Forms={() => (
                <DialogForm
                  defaultValues={{ title: title, note: note }}
                  isUpdate={true}
                  username={username}
                  noteId={noteId}
                  fetchNotes={fetchNotes}
                />
              )}
            >
              <div
                className="border p-4 rounded-md max-w-full m-2 hover:border-primary cursor-pointer inline"
                onClick={() => {
                  setIsDialogModalOpen();
                  setNoteId(noteId);
                }}
              >
                <p className="font-semibold capitalize flex justify-between items-center">
                  <Checkbox
                    className="min-h-[calc(0.5rem+0.5vw)] min-w-[calc(0.5rem+0.5vw)] cursor-pointer              hover:border-primaryColor"
                    checked={isChecked[index]}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCheckboxClick(index, noteId);
                      console.log(noteId);
                    }}
                  />
                  <big className="mx-4">{title}</big>
                  <span>
                    <TrashIcon
                      className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)]  cursor-pointer              hover:text-red-800"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteNote(noteId, username);
                      }}
                    />
                  </span>
                </p>
                <Separator className="mt-2 mb-3" />
                <p className="break-words">{note}</p>
              </div>
            </DialogModal>
          ))
        : ""}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-red-800 hover:bg-red-800 fixed right-8 bottom-12 rounded-lg h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw) sm:top-[calc(1.8rem+0.75vw)] sm:right-[calc(10rem+2vw)] sm:w-12 sm:h-10">
            <TrashIcon className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)] cursor-pointer" />
            <span className="absolute -top-2 -right-1 bg-primary rounded-md w-4 text-red-800 text-[calc(1rem+0.1vw)] ">
              4
            </span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              notes from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-800"
              onClick={() => {
                deleteMultipleNotes(username, [
                  "-Nnd4N5eV44OwDpobW_f",
                  "-Nnd7B-a2Y4amZ7cz46R",
                ]);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default NotesComp;
