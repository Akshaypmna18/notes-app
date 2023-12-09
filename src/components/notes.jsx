import Theme from "./theme";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

function Notes() {
  const [uid, setUid] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const form = useForm();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      }
    });
  }, []);

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  const addNotes = (data) => {
    const username = auth.currentUser.email.replace(/[^a-zA-Z0-9]/g, "");
    const userNotesRef = ref(db, `/notes/${username}/`);
    const newNoteRef = push(userNotesRef);
    set(newNoteRef, {
      title: data.title,
      note: data.note,
    });
    form.reset();
  };

  return (
    <div className="space-y-8">
      <Theme />
      <p>User id = {uid}</p>
      <div className="space-y-4">
        <h3 className="font-bold text-2xl">Notes</h3>
        {notes.map(({ title, note }, index) => {
          return (
            <div key={index} className="border p-4 mx-4">
              <p className="font-semibold capitalize">{title}</p>
              <Separator className="max-w-[10rem] mt-2 mb-3" />
              <p>{note}</p>
            </div>
          );
        })}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new note</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new note</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addNotes)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="capitalize"
                        placeholder="Add title here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
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
                <DialogClose asChild>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <br />
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
}

export default Notes;
