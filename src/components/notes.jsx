import Theme from "./theme";
import React, { useEffect, useState, useRef } from "react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

function Notes() {
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);
  const [notesArray, setNotesArray] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [noteId, setNoteId] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const form = useForm();

  const capitalize = (str) => {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
  };

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

  useEffect(() => {
    setNotesArray([]);
    if (notes[username]) {
      Object.entries(notes[username]).map((note) =>
        setNotesArray((oldArray) => [...oldArray, note])
      );
    }
    setIsChecked(Array(notesArray.length).fill(false));
  }, [notes]);

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
    fetchNotes();
    form.setValue("title", "");
    form.setValue("note", "");
  };

  const deleteNote = (noteId) =>
    remove(ref(db, `/notes/${username}/${noteId}`));

  const updateNote = () => {
    const updatedTitle = form.getValues(`${noteId}title`);
    const updatedNote = form.getValues(`${noteId}note`);
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
  };

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const formRef = useRef();
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setIsOpen(false);
      form.setValue("title", "");
      form.setValue("note", "");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCheckboxClick = (index) =>
    setIsChecked(isChecked.map((item, pos) => (pos === index ? !item : item)));

  return (
    <section className="space-y-8 p-4">
      <Theme />
      <p>User id = {uid}</p>
      {screenWidth > 600 ? (
        <Collapsible onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addNote)}
              className="space-y-4 w-[20rem] "
              ref={formRef}
            >
              <CollapsibleTrigger>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder={
                            isOpen ? "Add title here..." : "Add new note"
                          }
                          {...field}
                          className="w-[20rem]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
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
                      <FormControl>
                        <Textarea
                          placeholder="Add note here..."
                          {...field}
                          className="w-[20rem]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="mx-auto w-[min(90%,10rem)] mt-4"
                >
                  Submit
                </Button>
              </CollapsibleContent>
            </form>
          </Form>
        </Collapsible>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed right-8 bottom-12 text-[calc(2rem+1vw)] rounded-full h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw)">
              <span className="-mt-1">+</span>
            </Button>
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
                    <Button
                      type="submit"
                      className="mx-auto w-[min(90%,10rem)]"
                    >
                      Submit
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
      <br />
      <h3 className="font-bold text-2xl">Notes</h3>
      <div className="space-y-4">
        {notesArray.length > 0
          ? notesArray.map(([noteId, { title, note }], index) => (
              <Dialog key={noteId}>
                <DialogTrigger>
                  <div className="border p-4 mx-4 rounded-md max-w-[20rem] hover:border-primary">
                    <p className="font-semibold capitalize flex justify-between">
                      <Checkbox
                        className="min-h-[calc(0.5rem+1vw)] min-w-[calc(0.5rem+1vw)] mt-2 mr-4 cursor-pointer              hover:border-yellow-500"
                        checked={isChecked[index]}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCheckboxClick(index);
                        }}
                      />
                      <big>{title}</big>
                      <span>
                        <TrashIcon
                          className="min-h-[calc(1rem+1vw)] min-w-[calc(1rem+1vw)] mt-2 sm:mt-1 ml-4 cursor-pointer              hover:text-red-800"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteNote(noteId);
                          }}
                        />
                      </span>
                    </p>
                    <Separator className="mt-2 mb-3" />
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
                        name={`${noteId}title`}
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
                        name={`${noteId}note`}
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
                            onClick={() => setNoteId(noteId)}
                            type="submit"
                            className="mx-auto w-[min(90%,10rem)]"
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
