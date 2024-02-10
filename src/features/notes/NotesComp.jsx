import { Separator } from "@/components/ui/separator";
import DialogModal from "@/features/notes/components/DialogModal";
import DialogForm from "@/features/notes/components/DialogForm";
import { Toaster } from "@/components/ui/toaster";
import DeleteMultipleNotes from "./deleteNotes/multipleNotes";
import useNotesComp from "./hooks/useNotesComp";
import NotesMenu from "./menu";
import NotesCheckbox from "./NotesCheckbox";

function NotesComp({ notesArray }) {
  const { filteredNotes, highlightMatches, handleNoteClick } =
    useNotesComp(notesArray);

  return (
    <section className="columns-2xs max-[640px]:pt-7">
      <Toaster className="bg-primaryColor text-white" />
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
              className="border p-4 rounded-md max-w-full m-2 max-h-[30svh] sm:max-h-[70svh] overflow-hidden max-[640px]:mt-6 lg:hover:border-primary cursor-pointer inline"
              onClick={() => handleNoteClick(noteId, title, note)}
            >
              <div className="font-semibold capitalize flex justify-between items-center">
                <NotesCheckbox
                  index={index}
                  noteId={noteId}
                  notesArray={notesArray}
                />
                <big className="mx-4 uppercase">{highlightMatches(title)}</big>
                <NotesMenu />
              </div>
              <Separator className="mt-2 mb-3" />
              <p className="break-words">{highlightMatches(note)}</p>
            </div>
          </DialogModal>
        ))}
      <DeleteMultipleNotes />
    </section>
  );
}

export default NotesComp;
