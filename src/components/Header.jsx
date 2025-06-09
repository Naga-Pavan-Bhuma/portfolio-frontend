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
    Events.scrollEvent.register("end", () => {});
    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
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
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/20 shadow-md transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-none"
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
              offset={-80} // height of header
              duration={500}
              className={`cursor-pointer font-semibold text-white hover:text-blue-400 transition ${
                active === id
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]"
                  : ""
              }`}
            >
              {label}
            </ScrollLink>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <MdClose className="w-8 h-8 text-blue-400" />
          ) : (
            <MdMenu className="w-8 h-8 text-blue-400" />
          )}
        </button>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white/20 backdrop-blur-md shadow-md px-6 py-4 flex flex-col space-y-4">
          {sections.map(({ id, label }) => (
            <ScrollLink
              key={id}
              to={id}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className={`cursor-pointer text-white font-semibold hover:text-blue-400 transition ${
                active === id
                  ? "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]"
                  : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </ScrollLink>
          ))}
        </nav>
      )}
    </header>
  );
}
