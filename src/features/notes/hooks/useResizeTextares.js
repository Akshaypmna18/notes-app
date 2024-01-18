import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";

const useResizeTextarea = (form, name) => {
  const screenWidth = useWindowSize();
  const text = form.watch(name);
  const [rows, setRows] = useState(2);
  useEffect(() => {
    const charactersPerLine = screenWidth < 300 ? 30 : 40;
    const newRows = Math.max(2, Math.ceil(text.length / charactersPerLine));
    setRows(newRows);
  }, [text]);
  return rows;
};

export default useResizeTextarea;
