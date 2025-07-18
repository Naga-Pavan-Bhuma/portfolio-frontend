import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

// ✅ Embedded local data
const localProjects = [
  {
    _id: "6845b0f9233e52126b94a437",
    title: "Campus Pulse",
    description:
      "Campus Pulse is a smart university management system that centralizes student services like mess menus, faculty data, event tracking, and announcements — all in one sleek and responsive platform",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    githubLink: "https://github.com/Naga-Pavan-Bhuma/Campus_Pulse_Frontend",
    liveDemo: "https://campus-pulse-frontend.vercel.app/",
    imageUrl:
      "https://res.cloudinary.com/dsvroldwr/image/upload/v1749461196/Campus%20Pulse%20View.png",
    createdAt: "2025-06-08T15:49:13.699+00:00",
  },
  {
    _id: "6847e6c49e9070f25a379780",
    title: "Resumify",
    description:
      "A smart resume analyzer that helps optimize your CV for job applications by offering ATS-friendly feedback and tips.",
    techStack: ["Figma", "UI Design"],
    githubLink:
      "https://www.figma.com/design/3OUnIkdNcMMYx4z8UiBg0I/Resume-Analyzer?node-id=0%3A1",
    liveDemo:
      "https://www.figma.com/proto/3OUnIkdNcMMYx4z8UiBg0I/Resume-Analyzer?node-id=0%3A1",
    imageUrl:
      "https://res.cloudinary.com/dsvroldwr/image/upload/v1749547206/Resumify-.png",
    createdAt: "2025-06-10T08:03:16.421+00:00",
  },
  {
    _id: "6847e97c9e9070f25a379784",
    title: "Hasini Enterprises",
    description:
      "An intuitive e-commerce platform UI designed to streamline product browsing and purchasing for rural wholesale customers.",
    techStack: ["Figma", "UI Design"],
    githubLink:
      "https://www.figma.com/design/CDi2BW5pELrTEfF84s3NJu/Hasini-Enterprises",
    liveDemo:
      "https://www.figma.com/proto/CDi2BW5pELrTEfF84s3NJu/Hasini-Enterprises?node-id=0%3A1",
    imageUrl:
      "https://res.cloudinary.com/dsvroldwr/image/upload/v1749546681/Hasini%20Enterprises-.png",
    createdAt: "2025-06-10T08:14:52.324+00:00",
  },
  {
    _id: "6848044fd41d160a0357c787",
    title: "Abhiyanth RKV",
    description:
      "A vibrant techno-management and cultural fest experience, designed to enhance branding, schedule visibility, and participant interaction.",
    techStack: ["Figma", "UI Design"],
    githubLink:
      "https://www.figma.com/design/45LG1RnKR5iJyZJSk2irYV/Abhiyanth-2K25--Concept",
    liveDemo: "https://abhiyanthrkv.in/",
    imageUrl:
      "https://res.cloudinary.com/dsvroldwr/image/upload/v1749549964/Abhiyanth.png",
    createdAt: "2025-06-10T10:09:19.013+00:00",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Simulate loading delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(localProjects);
      setLoading(false);
    }, 300); // feel free to remove or change delay
    return () => clearTimeout(timer);
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
