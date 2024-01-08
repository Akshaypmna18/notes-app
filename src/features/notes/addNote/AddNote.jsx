import React from "react";
import useWindowSize from "@/features/notes/addNote/useWindowSize";
import CollapsibleForm from "@/features/notes/addNote/CollapsibleForm";
import DialogModal from "@/components/DialogModal";
import { Button } from "@/components/ui/button";
import DialogForm from "@/features/notes/DialogForm";
import { useNotes } from "@/store";

function AddNote({ username, fetchNotes, noteId }) {
  const { setIsDialogModalOpen } = useNotes((state) => state);
  const screenWidth = useWindowSize();

  return screenWidth > 600 ? (
    <CollapsibleForm fetchNotes={fetchNotes} username={username} />
  ) : (
    <DialogModal
      title="Add new note"
      Forms={() => (
        <DialogForm
          isUpdate={false}
          username={username}
          noteId={noteId}
          fetchNotes={fetchNotes}
        />
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
