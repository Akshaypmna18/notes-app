import { useEffect, useState } from "react";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

function Theme({ className }) {
  const getTheme = () => {
    let savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  };

  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <FontAwesomeIcon
              className={`cursor-pointer text-[calc(1rem+1.5dvw)] ${className}`}
              icon={theme === "light" ? faMoon : faSun}
              onClick={toggleTheme}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to toggle theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default Theme;
