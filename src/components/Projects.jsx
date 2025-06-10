import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
    fetch(`${API_URL}/projects`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("API response is not an array");
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
    return <p className="text-center mt-12 text-gray-400">Loading projects...</p>;

  if (error)
    return (
      <p className="text-center mt-12 text-red-400">Error: {error}</p>
    );

  return (
    <section className="min-h-screen px-6 md:px-20 py-10 bg-black text-white snap-start" id="projects">
      <h2 className="text-4xl font-bold mb-10 text-center">My Projects</h2>

      <motion.div
        className="flex flex-wrap justify-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((proj) => (
          <ProjectCard key={proj._id} project={proj} variants={cardVariants} />
        ))}
      </motion.div>
    </section>
  );
}
