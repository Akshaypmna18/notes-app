import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";

const useResizeTextarea = (form, name) => {
  const screenWidth = useWindowSize();
  const text = form.watch(name);
  const [rows, setRows] = useState(2);
  useEffect(() => {
    let charactersPerLine;
    if (screenWidth < 300) charactersPerLine = 25;
    else if (screenWidth < 400) charactersPerLine = 40;
    else if (screenWidth < 500) charactersPerLine = 45;
    else charactersPerLine = 60;
    const len = text.split("\n").reduce((acc, line) => {
      return acc + Math.ceil(line.length / charactersPerLine);
    }, 0);
    const newRows = Math.max(2, len);

    setRows(newRows);
  }, [text]);
  return rows;
};

export default useResizeTextarea;
