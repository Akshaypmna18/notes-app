import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { useNotes } from "@/store";

const useNotesPage = () => {
  const {
    username,
    setUsername,
    fetchNotes,
    notes,
    setUser,
    // notesArray,
    // setNotesArray,
  } = useNotes((state) => state);
  const navigate = useNavigate();
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(auth.currentUser.email.replace(/[^a-zA-Z0-9]/g, ""));
        fetchNotes();
      }
    });
  }, []);

  useEffect(() => {
    setNotesArray([]);
    if (notes[username])
      Object.entries(notes[username]).map(
        (note) => setNotesArray((prev) => [...prev, note])
        // setNotesArray(note)
      );
  }, [notes]);

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
      setUser(false);
    });
  };
  return { onLogout, notesArray };
};

export default useNotesPage;
