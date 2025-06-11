import React from "react";
import { motion } from "framer-motion";

const educations = [
  {
    id: 1,
    institution: "Rajiv Gandhi University of Knowledge Technologies, RK Valley",
    logo: "college_logo.png",
    degree: "B.Tech in Computer Science & Engineering",
    cgpa: "8.95 / 10.0",
    duration: "2022 – 2026",
  },
  {
    id: 2,
    institution: "Rajiv Gandhi University of Knowledge Technologies, RK Valley",
    logo: "college_logo.png",
    degree: "Pre-University Course (PUC) in MPC",
    cgpa: "9.78 / 10.0",
    duration: "2020 – 2022",
  },
  {
    id: 3,
    institution: "Rayalaseems High School, Proddatur",
    logo: "school_logo.png",
    degree: "High School - (10th Class)",
    cgpa: "10.0 / 10.0",
    duration: "2019 - 2020",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-16 bg-blue-100 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">
          Education
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {educations.map((edu) => (
            <motion.div
              key={edu.id}
              className="flex flex-col md:flex-row items-center bg-blue-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={edu.logo}
                alt={`${edu.institution} logo`}
                className="w-24 h-24 object-contain mb-4 md:mb-0 md:mr-6"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-black dark:text-white">
                  {edu.institution}
                </h3>
                <p className="font-medium" style={{ color: "#38b6ff"}}>
                  {edu.degree}
                </p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  CGPA: <span className="font-semibold">{edu.cgpa}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
