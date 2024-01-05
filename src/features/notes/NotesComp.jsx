import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import DialogModal from "@/components/DialogModal";
import DialogForm from "@/features/notes/DialogForm";
import { deleteNote } from "@/features/notes/functions";
import { useNotes } from "@/store";

function NotesComp({ notesArray, username, fetchNotes, setNoteId }) {
  const { setIsDialogModalOpen } = useNotes((state) => state);
  const [isChecked, setIsChecked] = useState([]);
  const handleCheckboxClick = (index) =>
    setIsChecked(isChecked.map((item, pos) => (pos === index ? !item : item)));
  useEffect(() => {
    setIsChecked(Array(notesArray.length).fill(false));
  }, [notesArray]);

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
                className="border p-4 rounded-md m-2 hover:border-primary cursor-pointer inline"
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
                      handleCheckboxClick(index);
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
                <p>{note}</p>
              </div>
            </DialogModal>
          ))
        : ""}
    </div>
  );
}

export default NotesComp;
