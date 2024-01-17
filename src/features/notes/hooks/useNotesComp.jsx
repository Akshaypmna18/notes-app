import { useState, useEffect } from "react";
import { useNotes } from "@/store";

const useNotesComp = (notesArray) => {
  const { setIsDialogModalOpen, filterValue, setNoteId } = useNotes(
    (state) => state
  );
  const [isChecked, setIsChecked] = useState([]);
  const [notesId, setNotesId] = useState([]);

  const filteredNotes = notesArray.filter((item) =>
    item[1].note.toLowerCase().includes(filterValue.toLowerCase())
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
  }, [notesArray, filterValue]);

  return {
    setIsDialogModalOpen,
    setNotesId,
    setNoteId,
    notesId,
    filteredNotes,
    isChecked,
    handleCheckboxClick,
    highlightMatches,
  };
};

export default useNotesComp;
