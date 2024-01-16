import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Theme from "@/features/Theme";

export default function Home() {
  let timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) navigate("/notes");
        else navigate("/login");
      });
    }, 3000);
    timerRef.current = timer;
  }, []);

  return (
    <section className="grid place-items-center min-h-[100svh] p-8">
      <h1 className="text-[calc(2rem+1vw)] text-center  font-[lobster] text-primaryColor">
        Hello Welcome to{" "}
        <span className="font-dancingScript whitespace-nowrap">Aks Notes</span>{" "}
        <Theme className={"hidden"} />
      </h1>
    </section>
  );
}
