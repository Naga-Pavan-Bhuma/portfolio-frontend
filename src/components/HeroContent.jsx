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
    <div className="absolute inset-0 z-10 flex flex-col sm:flex-row items-center justify-between px-8 sm:px-20 pointer-events-none">
      {/* Left: Text */}
      <div className="w-full sm:w-[40%] pointer-events-auto text-center sm:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-6xl font-bold"
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
          className="text-2xl mt-4"
        >
          FullStack Developer & UI/UX Designer
        </motion.p>
      </div>

      {/* Right: GIF */}
      <div className="w-full sm:w-[50%] flex justify-center items-center pointer-events-auto mt-8 sm:mt-0">
        <img
          src={profilePicUrl}
          alt="Pavan GIF"
          className="max-w-full max-h-[225px] object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
