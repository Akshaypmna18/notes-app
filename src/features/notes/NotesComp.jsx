import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import DialogModal from "@/features/notes/components/DialogModal";
import DialogForm from "@/features/notes/components/DialogForm";
import DeleteSingleNote from "./deleteNotes/singleNote";
import DeleteMultipleNotes from "./deleteNotes/multipleNotes";
import useNotesComp from "./hooks/useNotesComp";

function NotesComp({ notesArray }) {
  const {
    filteredNotes,
    setIsDialogModalOpen,
    setNoteId,
    isChecked,
    handleCheckboxClick,
    highlightMatches,
    setNotesId,
    notesId,
  } = useNotesComp(notesArray);

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
                <DeleteSingleNote />
              </p>
              <Separator className="mt-2 mb-3" />
              <p className="break-words">{highlightMatches(note)}</p>
            </div>
          </DialogModal>
        ))}
      <DeleteMultipleNotes notesId={notesId} setNotesId={setNotesId} />
    </section>
  );
}

export default NotesComp;
