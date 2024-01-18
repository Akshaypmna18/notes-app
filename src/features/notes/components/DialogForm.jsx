import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { db } from "@/lib/firebase";
import { ref, update } from "firebase/database";
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
import useNotesUtils from "@/features/notes/hooks/useNotesUtils";
import { useNotes } from "@/store";
import useResizeTextarea from "../hooks/useResizeTextares";

export default function Forms({ defaultValues = {}, isUpdate = false }) {
  const { setIsDialogModalOpen, fetchNotes, noteId } = useNotes(
    (state) => state
  );
  const { newNote, capitalize, userNotesPath } = useNotesUtils();
  const smallForm = useForm({ defaultValues });
  const rows = useResizeTextarea(smallForm, "note");
  const onSubmit = ({ title, note }) => {
    if (isUpdate) {
      const updates = {};
      if (title) {
        updates.title = capitalize(title) || "";
      }
      if (note) {
        updates.note = capitalize(note);
      }
      if (Object.keys(updates).length > 0) {
        update(ref(db, `${userNotesPath}${noteId}`), updates);
      }
    } else {
      newNote(title, note, fetchNotes);
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
                <Textarea
                  rows={rows}
                  placeholder="Add note here..."
                  {...field}
                />
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
