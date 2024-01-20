import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import AlertDialogModal from "./AlertDialogModal";
import useNotesUtils from "../hooks/useNotesUtils";

function DeleteMultipleNotes({ notesId, setNotesId }) {
  const { deleteNote } = useNotesUtils();
  const deleteMultipleNotes = (noteIds) => {
    noteIds.forEach((noteId) => {
      deleteNote(noteId);
    });
    setNotesId([]);
  };
  return (
    <AlertDialogModal
      desc={`${notesId.length > 1 ? notesId.length : "this"} ${
        notesId.length > 1 ? "notes" : "note"
      }`}
      func={() => deleteMultipleNotes(notesId)}
    >
      <Button
        className={`bg-deleteIcon hover:bg-deleteIcon z-20 fixed right-8 bottom-12 rounded-lg h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw) sm:top-[calc(1.8rem+0.75vw)] sm:right-[calc(10rem+2vw)] xl:right-[calc(18.5rem+2vw)] sm:w-12 sm:h-10 ${
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
