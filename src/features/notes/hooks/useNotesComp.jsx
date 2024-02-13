import { useEffect, useMemo } from "react";
import { useNotes } from "@/store";

const useNotesComp = (notesArray) => {
  const {
    setIsDialogModalOpen,
    filterValue,
    setNoteId,
    setNote,
    setTitle,
    setIsChecked,
    setNotesId,
  } = useNotes((state) => state);

  const filteredNotes = useMemo(() => {
    return notesArray.filter(
      (item) =>
        item[1].note.toLowerCase().includes(filterValue.toLowerCase()) ||
        item[1].title.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [notesArray, filterValue]);

  const highlightMatches = (text) => {
    if (filterValue.trim() === "") {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${filterValue})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-600 font-semibold">
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
  }, [notesArray, filterValue]);

  const handleNoteClick = (noteId, title, note) => {
    setIsDialogModalOpen();
    setNoteId(noteId);
    setTitle(title);
    setNote(note);
  };

  return {
    setIsDialogModalOpen,
    setNoteId,
    filteredNotes,
    highlightMatches,
    handleNoteClick,
  };
};

export default useNotesComp;
