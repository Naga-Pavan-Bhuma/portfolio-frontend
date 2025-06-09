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

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => {
        // Defensive: if your API returns { skills: [...] }
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
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">Loading skills...</p>
      </section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      className="snap-start min-h-screen bg-black text-white px-6 md:px-20 flex flex-col justify-center items-center"
    >
      <h2 className="text-4xl font-bold mb-12 text-center">My Skills</h2>
      <motion.ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 w-full max-w-6xl place-items-center">
        {skills.map((skill, index) => (
          <motion.li
            key={skill._id || index}
            variants={item}
            className="group flex flex-col items-center justify-center bg-neutral-900 border border-neutral-700 rounded-2xl px-6 py-6 shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
          >
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-12 h-12 mb-3 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-white font-medium text-lg text-center">
              {skill.name}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
