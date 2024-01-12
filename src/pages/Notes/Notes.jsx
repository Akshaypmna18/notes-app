import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/layouts/Header";
import AddNote from "@/features/notes/addNote";
import NotesComp from "@/features/notes/NotesComp";
import SearchNote from "@/features/notes/SearchNote";

function Notes() {
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState([]);
  const [notesArray, setNotesArray] = useState([]);
  const [noteId, setNoteId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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
    <main className="space-y-4 p-4 min-[450px]:p-8 xl:max-w-[80%] xl:mx-auto font-[roboto] relative">
      <header>
        <Header />
        <AddNote
          username={username}
          fetchNotes={fetchNotes}
          noteId={noteId}
          notesArray={notesArray}
        />
        <Button
          className="absolute top-[calc(1rem+0.75vw)] min-[450px]:top-[calc(2rem+0.75vw)] right-[calc(3rem+2vw)] min-[450px]:right-[calc(4rem+2vw)]"
          onClick={onLogout}
        >
          Logout
        </Button>
        {notesArray.length > 0 && <SearchNote />}
      </header>
      <NotesComp
        notesArray={notesArray}
        username={username}
        fetchNotes={fetchNotes}
        setNoteId={setNoteId}
      />
    </main>
  );
}

export default Notes;
