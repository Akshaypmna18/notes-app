import React, { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import DialogModal from "@/features/notes/components/DialogModal";
import DialogForm from "@/features/notes/components/DialogForm";
import { useNotes } from "@/store";
import DeleteSingleNote from "./deleteNotes/singleNote";
import DeleteMultipleNotes from "./deleteNotes/multipleNotes";

function NotesComp({ notesArray, username, fetchNotes, setNoteId }) {
  const { setIsDialogModalOpen, filterValue } = useNotes((state) => state);
  const [isChecked, setIsChecked] = useState([]);
  const [notesId, setNotesId] = useState([]);

  const filteredNotes = notesArray.filter((note) =>
    note[1].note.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleCheckboxClick = (index, noteId) => {
    setIsChecked((prevChecked) =>
      prevChecked.map((item, pos) => (pos === index ? !item : item))
    );
    setNotesId((prevNotesId) => {
      if (isChecked[index]) {
        return prevNotesId.filter((id) => id !== noteId);
      } else {
        return [...prevNotesId, noteId];
      }
    });
  };

  const highlightMatches = (text) => {
    if (filterValue.trim() === "") {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${filterValue})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    setIsChecked(Array(notesArray.length).fill(false));
    setNotesId([]);
  }, [notesArray]);

  return (
    <section className="columns-2xs max-[640px]:pt-7">
      {filteredNotes.length > 0 &&
        filteredNotes.map(([noteId, { title, note }], index) => (
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
              className="border p-4 rounded-md max-w-full m-2 max-h-[70svh] overflow-hidden max-[640px]:mt-6 hover:border-primary cursor-pointer inline"
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
                  }}
                />
                <big className="mx-4">{title}</big>
                <DeleteSingleNote
                  username={username}
                  noteId={noteId}
                  onClick={(e) => e.preventDefault()}
                />
              </p>
              <Separator className="mt-2 mb-3" />
              <p className="break-words">{highlightMatches(note)}</p>
            </div>
          </DialogModal>
        ))}
      <DeleteMultipleNotes
        username={username}
        notesId={notesId}
        setNotesId={setNotesId}
      />
    </section>
  );
}

export default NotesComp;
