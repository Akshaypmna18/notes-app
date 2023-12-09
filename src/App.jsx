import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/signin/login";
import Signup from "./components/signin/signup";
import Theme from "./components/theme";
import { useRef } from "react";
import Notes from "./components/notes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function Home() {
  let timerRef = useRef(null);
  const navigate = useNavigate();

  const timer = setTimeout(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/notes");
      else navigate("/login");
    });
  }, 3000);
  timerRef.current = timer;

  return (
    <>
      Hello Welcome to Aks Notes
      <Theme />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="notes" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
