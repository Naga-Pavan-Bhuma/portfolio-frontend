import React from "react";
import { motion } from "framer-motion";

const badgeVariants = {
  hover: {
    scale: 1.2,
    backgroundColor: "#6366F1",
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

export default function ProjectCard({ project, variants }) {
  const { _id, title, description, techStack = [], githubLink, liveDemo, imageUrl } = project;

  return (
    <motion.div
      key={_id}
      className="max-w-sm w-full bg-neutral-900 border border-neutral-700 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 text-white"
      variants={variants}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, idx) => (
            <motion.span
              key={idx}
              className="px-3 py-1 text-sm rounded-full border border-indigo-500 text-indigo-400"
              variants={badgeVariants}
              whileHover="hover"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-indigo-400 hover:underline"
              variants={linkVariants}
              whileHover="hover"
            >
              GitHub →
            </motion.a>
          )}
          {liveDemo && (
            <motion.a
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-green-400 hover:underline"
              variants={linkVariants}
              whileHover="hover"
            >
              Live Demo →
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
