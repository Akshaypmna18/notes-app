import React from "react";
import AlertDialogModal from "./AlertDialogModal";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteNote } from "../utils";

function DeleteSinlgeNote({ username, noteId, onClick }) {
  return (
    <span onClick={onClick}>
      <AlertDialogModal desc={`this`} func={() => deleteNote(username, noteId)}>
        <TrashIcon className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)] cursor-pointer hover:text-deleteIcon" />
      </AlertDialogModal>
    </span>
  );
}

export default DeleteSinlgeNote;
