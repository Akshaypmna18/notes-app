import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Textarea } from "../components/ui/textarea";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import DialogModal from "../components/DialogModal";
import Header from "@/layouts/Header";

function Notes() {
  const [uid, setUid] = useState(""),
    [username, setUsername] = useState(""),
    [notes, setNotes] = useState([]),
    [notesArray, setNotesArray] = useState([]),
    [screenWidth, setScreenWidth] = useState(window.innerWidth),
    [noteId, setNoteId] = useState(""),
    [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false),
    [isSmallFormOpen, setIsSmallFormOpen] = useState(false),
    [isChecked, setIsChecked] = useState([]);
  const defaultValues = {};
  const navigate = useNavigate();

  const largeForm = useForm({ defaultValues });

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
  }, [notes]);

  useEffect(() => {
    setIsChecked(Array(notesArray.length).fill(false));
  }, [notesArray]);

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  const deleteNote = (noteId) =>
    remove(ref(db, `/notes/${username}/${noteId}`));

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
      setIsCollapsibleOpen(false);
      largeForm.setValue("title", "");
      largeForm.setValue("note", "");
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

  const addNote = ({ title, note }) => {
    const userNotesRef = ref(db, `/notes/${username}/`);
    const newNoteRef = push(userNotesRef);
    set(newNoteRef, {
      title: capitalize(title) || "",
      note: capitalize(note),
    });
    fetchNotes();
    largeForm.reset();
    largeForm.setValue("title", "");
    largeForm.setValue("note", "");
    setIsSmallFormOpen(false);
  };

  const [open, setOpen] = useState(false);
  const SmallForms = ({ defaultValues = {}, isUpdate = false }) => {
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
      setOpen(false);
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
  };

  return (
    <section className="space-y-4 p-8 xl:max-w-[80%] xl:mx-auto font-[roboto] relative">
      <Header />
      {screenWidth > 600 ? (
        <Collapsible
          onOpenChange={() => setIsCollapsibleOpen(!isCollapsibleOpen)}
          open={isCollapsibleOpen}
        >
          <Form {...largeForm}>
            <form
              onSubmit={largeForm.handleSubmit(addNote)}
              className="space-y-4 w-[20rem] mx-auto"
              ref={formRef}
            >
              <FormField
                control={largeForm.control}
                name="title"
                rules={{
                  maxLength: {
                    value: 25,
                    message: "Title length should not exceed 25 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CollapsibleTrigger
                        onClick={(e) => {
                          if (isCollapsibleOpen) e.preventDefault();
                        }}
                      >
                        <Input
                          placeholder={
                            isCollapsibleOpen
                              ? "Add title here..."
                              : "Add new note"
                          }
                          {...field}
                          className="w-[20rem]"
                        />
                      </CollapsibleTrigger>
                    </FormControl>
                    <FormMessage
                      className={isCollapsibleOpen ? "" : "hidden"}
                    />
                  </FormItem>
                )}
              />
              <CollapsibleContent>
                <FormField
                  control={largeForm.control}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-4">
                  Add note
                </Button>
              </CollapsibleContent>
            </form>
          </Form>
        </Collapsible>
      ) : (
        <DialogModal
          open={open}
          title="Add new note"
          Forms={() => <SmallForms isUpdate={false} />}
        >
          <Button
            onClick={() => setOpen()}
            className="fixed right-8 bottom-12 text-[calc(2rem+1vw)] rounded-full h-[calc(2.5rem+1vw)] w-[calc(2.5rem+1vw)"
          >
            <span>+</span>
          </Button>
        </DialogModal>
      )}
      <br />
      <div className="columns-2xs space-y-4 mt-8">
        {notesArray.length > 0
          ? notesArray.map(([noteId, { title, note }], index) => (
              <DialogModal
                key={index}
                open={open}
                title="Update note"
                Forms={() => (
                  <SmallForms
                    defaultValues={{ title: title, note: note }}
                    isUpdate={true}
                  />
                )}
              >
                <div
                  className="border p-4 rounded-md mx-4 hover:border-primary cursor-pointer inline"
                  onClick={() => {
                    setOpen();
                    setNoteId(noteId);
                  }}
                >
                  <p className="font-semibold capitalize flex justify-between items-center">
                    <Checkbox
                      className="min-h-[calc(0.5rem+0.5vw)] min-w-[calc(0.5rem+0.5vw)] cursor-pointer              hover:border-primaryColor"
                      checked={isChecked[index]}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCheckboxClick(index);
                      }}
                    />
                    <big className="mx-4">{title}</big>
                    <span>
                      <TrashIcon
                        className="min-h-[calc(1.25rem+0.1vw)] min-w-[calc(1.25rem+0.1vw)]  cursor-pointer              hover:text-red-800"
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
              </DialogModal>
            ))
          : ""}
      </div>
      <Button
        className="absolute top-[calc(1rem+0.75vw)] right-[calc(4rem+2vw)]"
        onClick={onLogout}
      >
        Logout
      </Button>
    </section>
  );
}

export default Notes;
