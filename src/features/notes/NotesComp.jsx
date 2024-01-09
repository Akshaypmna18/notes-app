import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import DialogModal from "@/components/DialogModal";
import DialogForm from "@/features/notes/DialogForm";
import { deleteNote } from "@/features/notes/functions";
import { useNotes } from "@/store";
import DeleteNotes from "./DeleteNotes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

function NotesComp({ notesArray, username, fetchNotes, setNoteId }) {
  const { setIsDialogModalOpen } = useNotes((state) => state);
  const [isChecked, setIsChecked] = useState([]);
  const [notesId, setNotesId] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const filteredNotes = notesArray.filter((note) =>
    note[1].note.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

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
      return <span>{text}</span>; // No highlighting when filterValue is blank
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
  }, [notesArray]);

  return (
    <section className="columns-2xs mt-8">
      {notesArray.length > 0 && (
        <div className="absolute top-16 min-[450px]:top-20 min-[640px]:top-9 left-[50%] translate-x-[-50%]">
          <span className="absolute top-[0.85rem] left-3">
            <MagnifyingGlassIcon />
          </span>
          <Input
            placeholder="Search notes..."
            onChange={handleInputChange}
            value={filterValue}
            className="px-8 rounded-full"
          />
          <span
            className={`cursor-pointer absolute top-[0.85rem] right-4 ${
              filterValue.length > 0 ? "" : "hidden"
            }`}
            onClick={() => setFilterValue("")}
          >
            <Cross1Icon />
          </span>
        </div>
      )}
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
              className="border p-4 rounded-md max-w-full m-2 max-[640px]:mt-6 hover:border-primary cursor-pointer inline"
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
              <p className="break-words">{highlightMatches(note)}</p>
            </div>
          </DialogModal>
        ))}
      <DeleteNotes
        username={username}
        notesId={notesId}
        setNotesId={setNotesId}
      />
    </section>
  );
}

export default NotesComp;
