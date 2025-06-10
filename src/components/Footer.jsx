import React from "react";
import Contact from "./Contact";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp
} from "react-icons/fa";

export default function Footer() {
  return (
    <section id="footer" className="relative">
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-12">

        {/* About Section */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto">
  <h3 style={{ color: "#38b6ff" }} className="text-2xl font-bold mb-6">About Me</h3>
  <p className="leading-relaxed text-gray-400 text-justify">
    Hey, I’m Pavan — a passionate UI/UX designer & web developer focused on crafting smooth, user-friendly digital experiences.
    I combine creativity with clean code to build projects that both look sharp and perform flawlessly.
  </p>
</div>


        {/* Contact Info */}
       <div className="flex flex-col items-center text-center px-4">
  <h2 style={{ color: "#38b6ff" }} className="text-3xl font-bold mb-8">Contact Us</h2>
  <div className="w-full max-w-2xl">
    <Contact />
  </div>
</div>




        {/* Social Media */}
       <div className="flex flex-col items-center text-center">
  <h3 style={{ color: "#38b6ff" }} className="text-2xl font-bold text-indigo-400 mb-6">
  Follow Me
</h3>
  <div className="flex space-x-6 text-2xl">
    <a
      href="https://github.com/Naga-Pavan-Bhuma"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
      className="hover:text-blue-200 transition"
    >
      <FaGithub />
    </a>
    <a
      href="https://www.linkedin.com/in/bhuma-naga-pavan/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="hover:text-blue-500 transition"
    >
      <FaLinkedin />
    </a>

    <a
      href="mailto:bhumanagapavan@gmail.com"
      aria-label="Email"
      className="hover:text-red-500 transition"
    >
      <FaEnvelope />
    </a>
    <a
      href="https://wa.me/7036006588"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="hover:text-green-600 transition"
    >
      <FaWhatsapp />
    </a>
    <a
      href="https://www.instagram.com/nagapavan_8/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="hover:text-pink-400 transition"
    >
      <FaInstagram />
    </a>
    
  </div>        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Pavan. All rights reserved.
      </div>
    </footer>
    </section>
  );
}
