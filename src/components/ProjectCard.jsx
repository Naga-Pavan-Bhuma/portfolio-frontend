import React from "react";
import { motion } from "framer-motion";
import { FaFigma, FaGithub, FaPlayCircle } from "react-icons/fa";
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

function detectLinkType(url) {
  if (url.includes("figma.com")) {
    return (
      <>
        <FaFigma className="inline-block mr-1" />
        Figma
      </>
    );
  }
  if (url.includes("github.com")) {
    return (
      <>
        <FaGithub className="inline-block mr-1" />
        GitHub
      </>
    );
  }
  return "Link";
}

export default function ProjectCard({ project, variants }) {
  const { _id, title, description, techStack = [], githubLink, liveDemo, imageUrl } = project;

  return (
    <motion.div
      key={_id}
      className="flex flex-col justify-between max-w-sm w-full min-h-[520px] bg-neutral-900 border border-neutral-700 rounded-3xl shadow-md hover:shadow-2xl transition-shadow duration-300 text-white overflow-hidden"
      variants={variants}
    >
      {/* Top padded image */}
      {imageUrl && (
        <div className="pt-6 px-6">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
      )}

      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.map((tech, idx) => (
              <motion.span
                key={idx}
                className="px-3 py-1 text-xs rounded-full border border-indigo-500"
                variants={badgeVariants}
                whileHover="hover"
                style={{ color: "#38b6ff", borderColor: "#38b6ff" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-neutral-700">
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
              variants={linkVariants}
              whileHover="hover"
              style={{ color: "#38b6ff" }}
            >
              {detectLinkType(githubLink)} →
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
              Live Preview<FaPlayCircle className="inline-block ml-1" />→
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
