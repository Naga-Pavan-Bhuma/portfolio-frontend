import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProjects() {
    setLoading(true);
    setError(null);
    try {
      const API_URL = process.env.REACT_APP_API_URL;
      const res = await fetch(`${API_URL}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("API response is not an array");
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (loading)
    return (
      <main
        aria-live="polite"
        className="min-h-screen flex items-center justify-center bg-black text-white"
      >
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading projects...
        </motion.p>
      </main>
    );

  if (error)
    return (
      <main
        aria-live="assertive"
        className="min-h-screen flex flex-col items-center justify-center bg-black text-red-400 p-6"
      >
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Error: {error}
        </motion.p>
        <button
          onClick={fetchProjects}
          className="px-5 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Retry
        </button>
      </main>
    );

  return (
    <main
      id="projects"
      className="min-h-screen px-6 md:px-20 py-10 snap-start
             bg-blue-100 text-gray-900
             dark:bg-black dark:text-white"
    >
      <h2 className="text-4xl font-bold mb-10 mt-5 text-center">My Projects</h2>

      <motion.div
        className="flex flex-wrap justify-center gap-6 sm:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((proj) => (
          <ProjectCard key={proj._id} project={proj} variants={cardVariants} />
        ))}
      </motion.div>
    </main>
  );
}
