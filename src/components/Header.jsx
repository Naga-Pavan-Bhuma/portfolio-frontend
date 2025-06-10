import React, { useState, useEffect } from "react";
import { Link as ScrollLink, Events } from "react-scroll";
import { MdMenu, MdClose } from "react-icons/md";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-blue-400 font-extrabold text-2xl cursor-pointer select-none">
          Pavan&apos;s Portfolio
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-10">
          {sections.map(({ id, label }) => (
            <ScrollLink
              key={id}
              to={id}
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              className={`cursor-pointer font-semibold text-white hover:text-blue-400 transition duration-200 ${
                active === id ? "text-blue-400 border-b-2 border-blue-400 pb-1" : ""
              }`}
            >
              {label}
            </ScrollLink>
          ))}
        </nav>

        {/* Mobile menu icon */}
        <div className="md:hidden text-white text-3xl cursor-pointer z-50" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <MdClose /> : <MdMenu />}
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black flex flex-col items-center py-6 space-y-6 border-t border-gray-700">
          {sections.map(({ id, label }) => (
            <ScrollLink
              key={id}
              to={id}
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              className={`cursor-pointer text-white text-lg hover:text-blue-400 transition ${
                active === id ? "text-blue-400" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </ScrollLink>
          ))}
        </div>
      )}
    </header>
  );
}
