import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme === "dark" || (!savedTheme && prefersDark) || !savedTheme;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`relative flex items-center w-12 h-6 rounded-full px-0.5 transition-colors duration-500
        ${isDark ? "bg-blue-500" : "bg-yellow-400"}
        focus:outline-none shadow-inner`}
    >
      <div
        className={`absolute left-0.5 transition-transform duration-500 ease-in-out transform
          w-5 h-5 rounded-full bg-white flex items-center justify-center shadow
          ${isDark ? "translate-x-6" : "translate-x-0"}`}
      >
        {isDark ? (
          <FaMoon className="text-[10px]" style={{ color: "#38b6ff" }} />
        ) : (
          <FaSun className="text-[10px] text-yellow-500" />
        )}
      </div>
    </button>
  );
}
