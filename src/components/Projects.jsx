import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const badgeVariants = {
    hover: {
      scale: 1.2,
      backgroundColor: "#6366F1", // Indigo-500 tailwind color
      color: "#fff",
      transition: { duration: 0.3 },
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
  };

  if (loading)
    return <p className="text-center mt-12 text-gray-600">Loading projects...</p>;

  if (error)
    return (
      <p className="text-center mt-12 text-red-500">
        Error: {error}
      </p>
    );

  return (
    <section className="min-h-screen px-6 md:px-20 py-10 bg-white snap-start">
      <h2 className="text-4xl font-bold mb-10 text-center">My Projects</h2>

      <motion.div
        className="flex flex-wrap justify-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map(
          ({ _id, title, description, techStack, githubLink, liveDemo, imageUrl }) => (
            <motion.div
              key={_id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.2)" }}
              className="bg-gray-100 rounded-lg shadow-md p-6 max-w-sm cursor-pointer flex flex-col"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
              )}

              <h3 className="text-2xl font-semibold mb-2">{title}</h3>

              <p className="text-gray-700 mb-4 flex-grow">{description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {techStack?.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    variants={badgeVariants}
                    whileHover="hover"
                    className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="flex gap-6 mt-auto">
                {githubLink && (
                  <motion.a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    GitHub →
                  </motion.a>
                )}
                {liveDemo && (
                  <motion.a
                    href={liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Live Demo →
                  </motion.a>
                )}
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </section>
  );
}
