import { useEffect } from "react";

export default function useClickOutside(ref, callback) {
  const handleClickOutside = (event) => {
    if (
      ref.current &&
      typeof ref.current.contains === "function" &&
      !ref.current.contains(event.target)
    )
      callback();
  };

  useEffect(() => {
    const handleDocumentClick = (event) => handleClickOutside(event);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [ref, callback]);

  return handleClickOutside;
}
