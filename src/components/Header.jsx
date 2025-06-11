import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Events } from "react-scroll";
import { MdMenu, MdClose } from "react-icons/md";
import ThemeToggle from "./ThemeToggle"; // assumes it sets `document.documentElement.classList`

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "footer", label: "Contact" },
];

export default function Header() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    Events.scrollEvent.register("begin", () => setMenuOpen(false));
    return () => Events.scrollEvent.remove("begin");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      let currentSection = "hero";

      sections.forEach(({ id }) => {
        const elem = document.getElementById(id);
        if (elem && elem.offsetTop <= scrollPos) {
          currentSection = id;
        }
      });

      setActive(currentSection);
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      } bg-white dark:bg-black`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          className="font-extrabold text-2xl cursor-pointer select-none"
          style={{ color: "#38b6ff" }}
          tabIndex={0}
          aria-label="Pavan's Portfolio - Home"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActive("hero");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActive("hero");
            }
          }}
        >
          Pavan&apos;s Portfolio
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {sections.map(({ id, label }) => (
            <ScrollLink
              key={id}
              to={id}
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              className={`cursor-pointer font-semibold transition duration-200 ${
                active === id
                  ? "text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 pb-1"
                  : "text-black dark:text-white hover:text-blue-400 dark:hover:text-blue-400"
              }`}
            >
              {label}
            </ScrollLink>
          ))}

          {/* 🌙 Theme Toggle */}
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-black dark:text-white text-3xl cursor-pointer z-50 focus:outline-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-black flex flex-col items-center py-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
          {sections.map(({ id, label }) => (
            <ScrollLink
              key={id}
              to={id}
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              onClick={() => setMenuOpen(false)}
              className={`cursor-pointer text-lg font-semibold transition ${
                active === id
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            >
              {label}
            </ScrollLink>
          ))}

          {/* 🌙 Theme Toggle */}
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
