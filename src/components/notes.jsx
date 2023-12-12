import Theme from "./theme";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
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
import { TrashIcon } from "@radix-ui/react-icons";

function Notes() {
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState("");
  const navigate = useNavigate();
  const form = useForm();

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        setUsername(auth.currentUser.email.replace(/[^a-zA-Z0-9]/g, ""));
        fetchNotes();
      }
    });
  }, []);

  const fetchNotes = () => {
    onValue(ref(db, `/notes/`), (snapshot) => {
      setNotes(snapshot.val());
    });
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  const addNote = ({ title, note }) => {
    const userNotesRef = ref(db, `/notes/${username}/`);
    const newNoteRef = push(userNotesRef);
    set(newNoteRef, {
      title: capitalize(title) || "",
      note: note,
    });
    form.reset();
    fetchNotes();
  };

  const deleteNote = (noteId) =>
    remove(ref(db, `/notes/${username}/${noteId}`));

  const updateNote = ({ updatedTitle, updatedNote }) => {
    if (updatedTitle) {
      update(ref(db, `/notes/${username}/${noteId}`), {
        title: capitalize(updatedTitle) || "",
      });
    }
    if (updatedNote) {
      update(ref(db, `/notes/${username}/${noteId}`), {
        note: updatedNote,
      });
    }
    form.reset();
  };

  return (
    <section className="space-y-8">
      <Theme />
      <p>User id = {uid}</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new note</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new note</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addNote)} className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                <DialogClose asChild>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <br />
      <div className="space-y-4">
        <h3 className="font-bold text-2xl">Notes</h3>
        {notes[username]
          ? Object.entries(notes[username]).map(([noteId, { title, note }]) => (
              <Dialog key={noteId}>
                <DialogTrigger>
                  <div className="border p-4 mx-4 rounded-md">
                    <p className="font-semibold capitalize flex ">
                      <big>{title}</big>
                      <span>
                        <TrashIcon
                          className="h-[calc(1rem+1vw)] w-[calc(1rem+1vw)] mt-1 ml-4 cursor-pointer              hover:text-red-800"
                          onClick={() => deleteNote(noteId)}
                        />
                      </span>
                    </p>
                    <Separator className="max-w-[10rem] mt-2 mb-3" />
                    <p>{note}</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(updateNote)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="updatedTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input defaultValue={title} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="updatedNote"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Note</FormLabel>
                            <FormControl>
                              <Textarea defaultValue={note} {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            onClick={() => setNoteId(noteId)}
                          >
                            Update
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            ))
          : ""}
      </div>
      <Button onClick={onLogout}>Logout</Button>
    </section>
  );
}

export default Notes;
