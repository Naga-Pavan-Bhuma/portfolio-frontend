import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const profilePicUrl = "hero.gif";

const names = [
  { label: "Pavan", color: "#38b6ff" },
  { label: "పవన్", color: "#10B981" },
  { label: "पवन", color: "#F59E0B" },
  { label: "पवन्", color: "#EC4899" },
  { label: "Pavan", color: "#38b6ff" },
];

export default function HeroContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < names.length - 1) {
      const interval = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [index]);

  return (
    <div className="relative w-full min-h-screen flex flex-col sm:flex-row items-center justify-center sm:justify-between px-6 sm:px-20 py-10 gap-y-6">
      {/* Left: Text */}
      <div className="w-full sm:w-[45%] text-center sm:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-6xl font-bold"
        >
          Hey, I’m{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={names[index].label}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{
                color: names[index].color,
                display: "inline-block",
                backfaceVisibility: "hidden",
              }}
            >
              {names[index].label}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl sm:text-2xl mt-4"
        >
          FullStack Developer & UI/UX Designer
        </motion.p>
      </div>

      {/* Right: GIF */}
<div className="flex justify-center items-center w-full sm:w-auto sm:mr-8 md:mr-16">
        <img
          src={profilePicUrl}
          alt="Pavan GIF"
          className="w-[120px] h-[120px] object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
