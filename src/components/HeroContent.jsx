// HeroContent.js
import React from "react";
import { motion } from "framer-motion";

const profilePicUrl = "hi.gif";

export default function HeroContent() {
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
          Hey, I’m <span className="text-blue-500">Pavan</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl mt-4"
        >
          UI/UX Designer & Web Developer
        </motion.p>
      </div>

      {/* Right: GIF */}
      <div className="w-full sm:w-[50%] flex justify-center items-center pointer-events-auto mt-8 sm:mt-0">
        <img
          src={profilePicUrl}
          alt="Pavan GIF"
          className="max-w-full max-h-[300px] object-contain rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
