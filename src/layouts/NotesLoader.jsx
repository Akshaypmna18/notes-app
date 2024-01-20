import PulseLoader from "react-spinners/PulseLoader";

function NotesLoader() {
  return (
    <div className="flex justify-center items-center gap-2 pt-52">
      <span>Notes Loading</span>
      <PulseLoader
        color="#0077b5"
        size={10}
        speedMultiplier={0.5}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default NotesLoader;
