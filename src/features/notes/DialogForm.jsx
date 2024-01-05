import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { db } from "@/lib/firebase";
import { ref, set, push, update } from "firebase/database";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/features/notes/functions";
import { useNotes } from "@/store";

export default function Forms({
  defaultValues = {},
  isUpdate = false,
  username,
  noteId,
  fetchNotes,
}) {
  const { setIsDialogModalOpen } = useNotes((state) => state);
  const smallForm = useForm({ defaultValues });
  const onSubmit = ({ title, note }) => {
    if (isUpdate) {
      if (title) {
        update(ref(db, `/notes/${username}/${noteId}`), {
          title: capitalize(title) || "",
        });
      }
      if (note) {
        update(ref(db, `/notes/${username}/${noteId}`), {
          note: capitalize(note),
        });
      }
    } else {
      const userNotesRef = ref(db, `/notes/${username}/`);
      const newNoteRef = push(userNotesRef);
      set(newNoteRef, {
        title: capitalize(title) || "",
        note: capitalize(note),
      });
      fetchNotes();
    }
    setIsDialogModalOpen(false);
  };
  return (
    <Form {...smallForm}>
      <form onSubmit={smallForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={smallForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Add title here..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={smallForm.control}
          name="note"
          rules={{
            required: {
              value: true,
              message: "Note field cannot be empty",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Add note here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="mx-auto w-[min(90%,10rem)]">
            {isUpdate ? "Update" : "Add note"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
