import React from "react";
import { Moon, Sun } from "lucide-react"; 
import useTheme from "../useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
    </button>
  );
}
