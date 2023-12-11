import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

function Theme() {
  const iconClassName = `w-[calc(1rem+1.5dvw)] h-[calc(1rem+1.5dvw)] cursor-pointer`;

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
