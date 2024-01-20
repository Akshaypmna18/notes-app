import { Button } from "@/components/ui/button";
import Header from "@/layouts/Header";
import AddNote from "@/features/notes/addNote";
import SearchNote from "@/features/notes/SearchNote";
import useNotesPage from "@/features/notes/hooks/useNotesPage";
import { Suspense, lazy } from "react";
import NotesLoader from "@/layouts/NotesLoader";
const NotesComp = lazy(() => import("@/features/notes/NotesComp"));

function Notes() {
  const { notesArray, onLogout } = useNotesPage();

  return (
    <main className="space-y-4 p-4 min-[450px]:p-8 xl:max-w-[80%] xl:mx-auto font-[roboto] relative">
      <header>
        <Header />
        <AddNote notesArray={notesArray} />
        <Button
          className="absolute top-[calc(1rem+0.75vw)] min-[450px]:top-[calc(2rem+0.75vw)] right-[calc(3rem+2vw)] min-[450px]:right-[calc(4rem+2vw)]"
          onClick={onLogout}
        >
          Logout
        </Button>
        {notesArray.length > 0 && <SearchNote />}
      </header>
      <Suspense fallback={<NotesLoader />}>
        <NotesComp notesArray={notesArray} />
      </Suspense>
    </main>
  );
}

export default Notes;
