import AlertDialogModal from "./AlertDialogModal";
import { TrashIcon } from "@radix-ui/react-icons";
import useNotesUtils from "../hooks/useNotesUtils";
import { useNotes } from "@/store";

function DeleteSinlgeNote() {
  const { noteId } = useNotes((state) => state);
  const { deleteNote } = useNotesUtils();
  return (
    <span onClick={(e) => e.preventDefault()}>
      <AlertDialogModal desc={`this`} func={() => deleteNote(noteId)}>
        <TrashIcon className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)] cursor-pointer hover:text-deleteIcon" />
      </AlertDialogModal>
    </span>
  );
}

export default DeleteSinlgeNote;
