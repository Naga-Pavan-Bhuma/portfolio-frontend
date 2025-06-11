import React, { useEffect, useState } from "react";
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

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/skills`)
      .then((res) => res.json())
      .then((data) => {
        const skillsArray = Array.isArray(data) ? data : data.skills || [];
        setSkills(skillsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen bg-blue-100 dark:bg-black text-black dark:text-white flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400 text-xl">
          Loading skills...
        </p>
      </section>
    );
  }

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
        {skills.map((skill, index) => (
          <motion.li
  key={skill._id || index}
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
              src={skill.logo}
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
