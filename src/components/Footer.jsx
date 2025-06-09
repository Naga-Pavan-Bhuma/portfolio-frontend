import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
        
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-6">About Me</h3>
          <p className="leading-relaxed text-gray-400">
            Hey, I’m Pavan — a passionate UI/UX designer & web developer focused on crafting smooth, user-friendly digital experiences.
            I combine creativity with clean code to build projects that both look sharp and perform flawlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#hero" className="hover:text-indigo-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-500 transition">
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="hover:text-indigo-500 transition">
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-indigo-500 transition">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-6">Contact</h3>
          <p className="text-gray-400">
            Email:{" "}
            <a
              href="mailto:bhumanagapavan@gmail.com"
              className="underline hover:text-indigo-500 transition"
            >
              bhumanagapavan@gmail.com
            </a>
          </p>
          <p className="mt-4 text-gray-400">Phone: +91 7036006588</p>
          <p className="mt-4 text-gray-400">
            Location: Hyderabad, India
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-6">Follow Me</h3>
          <div className="flex space-x-6 text-3xl">
            <a
              href="https://github.com/Naga-Pavan-Bhuma"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:opacity-80 transition"
              style={{ color: "#181717" }} // GitHub black
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/bhuma-naga-pavan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-80 transition"
              style={{ color: "#0A66C2" }} // LinkedIn blue
            >
              <FaLinkedin />
            </a>
             <a
      href="https://www.instagram.com/nagapavan_8/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="hover:opacity-80 transition"
      style={{
        color:
          "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
      }}
    >
      <FaInstagram />
    </a>
            <a
              href="mailto:bhumanagapavan@gmail.com"
              aria-label="Email"
              className="hover:opacity-80 transition"
              style={{ color: "#D44638" }} // Gmail red
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 text-center text-gray-500 text-sm select-none">
        © 2025 Pavan. All rights reserved.
      </div>
    </footer>
  );
}
