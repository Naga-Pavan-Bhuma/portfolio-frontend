import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const invertIcons = ["Express.js"];

// ✅ Frontend-only static skill data
const localSkills = [
  {
    _id: "6846d3ac1cf3abf31d426caf",
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    _id: "6846d4151cf3abf31d426cb1",
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    _id: "6846d4251cf3abf31d426cb3",
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    _id: "6846d44a1cf3abf31d426cb5",
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    _id: "6846d4551cf3abf31d426cb7",
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    _id: "6846d46a1cf3abf31d426cb9",
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    _id: "6846d47b1cf3abf31d426cbb",
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    _id: "6846d4851cf3abf31d426cbd",
    name: "SQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    _id: "6846d48e1cf3abf31d426cbf",
    name: "UI/UX",
    logo: "https://cdn-icons-png.flaticon.com/512/4661/4661406.png",
  },
  {
    _id: "6846d4991cf3abf31d426cc1",
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="snap-start min-h-screen bg-blue-100 dark:bg-black text-black dark:text-white px-6 md:px-20 flex flex-col justify-center items-center transition-colors duration-300"
    >
      <h2 className="text-4xl font-bold mb-12 mt-10 text-center">My Skills</h2>

      <motion.ul
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 w-full max-w-6xl place-items-center"
      >
        {localSkills.map((skill) => (
          <motion.li
            key={skill._id}
            variants={item}
            className="
              group flex flex-col items-center justify-center 
              bg-blue-50
              border border-gray-300 
              rounded-2xl px-6 py-6 
              shadow-sm hover:shadow-md 
              transition-all duration-300 hover:scale-105 
              w-36 h-36 sm:w-40 sm:h-40
              dark:bg-black dark:border-neutral-700 dark:shadow-lg dark:hover:shadow-indigo-500/30
            "
          >
            <img
              src={skill.logo.trim()}
              alt={skill.name}
              className={`w-12 h-12 mb-3 transition-transform duration-300 group-hover:scale-110 ${
                invertIcons.includes(skill.name)
                  ? "filter brightness-0 invert"
                  : ""
              }`}
            />
            <span className="font-medium text-lg text-center">
              {skill.name}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
