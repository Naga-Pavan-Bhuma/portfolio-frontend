import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDarkMode =
      savedTheme === "dark" ||
      (!savedTheme && (document.documentElement.classList.contains("dark") || systemPrefersDark));

    setIsDark(isDarkMode);
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`relative flex items-center w-12 h-6 rounded-full px-0.5 transition-colors duration-500
        ${isDark ? "bg-blue-500"  : "bg-yellow-400"}
        focus:outline-none shadow-inner`}
    >
      <div
        className={`absolute left-0.5 transition-transform duration-500 ease-in-out transform
          w-5 h-5 rounded-full bg-white flex items-center justify-center shadow
          ${isDark ? "translate-x-6" : "translate-x-0"}`}
      >
        {isDark ? (
          <FaMoon className="text-[10px] transition-all duration-300" style={{ color: "#38b6ff"}} />
        ) : (
          <FaSun className="text-[10px] text-yellow-500 transition-all duration-300" />
        )}
      </div>
    </button>
  );
}
