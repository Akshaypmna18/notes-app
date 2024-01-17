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
import { capitalize } from "@/features/notes/utils";
import { useNotes } from "@/store";
import { newNote } from "../addNote/utils";

export default function Forms({ defaultValues = {}, isUpdate = false }) {
  // const textareaRef = useRef(null);
  // const [value, setValue] = useState("");
  // useEffect(() => {
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "auto";
  //     textareaRef.current.style.minHeight =
  //       textareaRef.current.scrollHeight + "px";
  //     textareaRef.current.style.maxHeight = "50svh";
  //   }
  // }, [value]);
  const { setIsDialogModalOpen, username, fetchNotes, noteId } = useNotes(
    (state) => state
  );
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
      newNote(username, title, note, fetchNotes);
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
                  // value={value}
                  // onChange={(e) => setValue(e.target.value)}
                  // ref={textareaRef}
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
