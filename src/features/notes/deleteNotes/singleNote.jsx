import AlertDialogModal from "./AlertDialogModal";
import { TrashIcon } from "@radix-ui/react-icons";
import useNotesUtils from "../hooks/useNotesUtils";
import { useNotes } from "@/store";

function DeleteSinlgeNote() {
  const { noteId } = useNotes((state) => state);
  const { deleteNote } = useNotesUtils();
  return (
    <AlertDialogModal desc={`this`} func={() => deleteNote(noteId)}>
      <p className="space-x-2 flex">
        <TrashIcon className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)]" />
        <span>Delete this note</span>
      </p>
    </AlertDialogModal>
  );
}

export default DeleteSinlgeNote;
