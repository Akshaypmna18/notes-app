import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/layouts/Header";
import AddNote from "@/features/notes/addNote";
import NotesComp from "@/features/notes/NotesComp";

function Notes() {
  const [uid, setUid] = useState(""),
    [username, setUsername] = useState(""),
    [notes, setNotes] = useState([]),
    [notesArray, setNotesArray] = useState([]),
    [noteId, setNoteId] = useState("");
  const navigate = useNavigate();

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

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <section className="space-y-4 p-4 min-[450px]:p-8 xl:max-w-[80%] xl:mx-auto font-[roboto] relative">
      <Header />
      <AddNote username={username} fetchNotes={fetchNotes} noteId={noteId} />
      <br />
      <NotesComp
        notesArray={notesArray}
        username={username}
        fetchNotes={fetchNotes}
        setNoteId={setNoteId}
      />
      <Button
        className="absolute top-[calc(0.1rem+0.75vw)] min-[450px]:top-[calc(1rem+0.75vw)] right-[calc(3rem+2vw)] min-[450px]:right-[calc(4rem+2vw)]"
        onClick={onLogout}
      >
        Logout
      </Button>
    </section>
  );
}

export default Notes;
