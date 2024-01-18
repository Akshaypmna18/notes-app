import useWindowSize from "@/features/notes/hooks/useWindowSize";
import CollapsibleForm from "@/features/notes/addNote/CollapsibleForm";
import DialogModal from "@/features/notes/components/DialogModal";
import { Button } from "@/components/ui/button";
import DialogForm from "@/features/notes/components/DialogForm";
import { useNotes } from "@/store";

function AddNote({ notesArray }) {
  const { setIsDialogModalOpen } = useNotes((state) => state);
  const screenWidth = useWindowSize();

  return screenWidth > 640 ? (
    <CollapsibleForm notesArray={notesArray} />
  ) : (
    <DialogModal
      title="Add new note"
      Forms={() => (
        <DialogForm defaultValues={{ title: "", note: "" }} isUpdate={false} />
      )}
    >
      <Button
        onClick={() => setIsDialogModalOpen()}
        className="fixed right-8 bottom-12 text-[calc(2rem+1vw)] rounded-full h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw)"
      >
        <span>+</span>
      </Button>
    </DialogModal>
  );
}

export default AddNote;
