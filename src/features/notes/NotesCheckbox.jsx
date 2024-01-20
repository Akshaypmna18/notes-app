import { Checkbox } from "@/components/ui/checkbox";
import { useNotes } from "@/store";

function NotesCheckbox({ index, noteId }) {
  const { setNotesId, notesId, isChecked, setIsChecked } = useNotes(
    (state) => state
  );

  const handleCheckboxClick = (index, noteId) => {
    const latestChecks = isChecked.map((item, pos) =>
      pos === index ? !item : item
    );
    setIsChecked(latestChecks);
    let delNotes;
    if (isChecked[index]) {
      delNotes = notesId.filter((id) => id !== noteId);
    } else {
      delNotes = [...notesId, noteId];
    }
    setNotesId(delNotes);
  };

  return (
    <Checkbox
      className="min-h-[calc(0.5rem+0.5vw)] min-w-[calc(0.5rem+0.5vw)] cursor-pointer              lg:hover:border-primaryColor"
      checked={isChecked[index]}
      onClick={(e) => {
        e.preventDefault();
        handleCheckboxClick(index, noteId);
      }}
    />
  );
}

export default NotesCheckbox;
