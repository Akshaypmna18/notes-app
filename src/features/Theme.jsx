import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useNotes } from "@/store";

function Theme({ className }) {
  const { setTheme, theme } = useNotes((state) => state);
  const iconClassName = `min-w-[calc(1rem+1.5dvw)] min-h-[calc(1rem+1.5dvw)] cursor-pointer ${className}`;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {theme === "light" ? (
              <MoonIcon className={iconClassName} onClick={toggleTheme} />
            ) : (
              <SunIcon className={iconClassName} onClick={toggleTheme} />
            )}
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
