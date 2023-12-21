import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/signin/login";
import ForgetPassword from "./components/signin/forgetPassword";
import Signup from "./components/signin/signup";
import { useRef } from "react";
import Notes from "./components/notes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Theme from "./components/theme";

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
    <section className="grid place-items-center min-h-[100svh] p-8">
      <h1 className="text-[calc(2rem+1vw)] text-center font-semibold font-[lobster] text-primaryColor">
        Hello Welcome to Aks Notes <Theme className={"hidden"} />
      </h1>
    </section>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="forgetPassword" element={<ForgetPassword />} />
        <Route path="signup" element={<Signup />} />
        <Route path="notes" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
