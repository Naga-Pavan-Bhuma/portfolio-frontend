import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function About() {
  return (
    <motion.section
      id="about"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="snap-start min-h-screen flex items-center bg-black text-white px-6 md:px-20"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side - Text */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            About Me
          </h2>
          <p className="text-base md:text-lg leading-relaxed max-w-md text-gray-300">
            Hey you, I’m Naga Pavan Bhuma — the guy who finds joy in building
            cool stuff on the web. From crafting clean, intuitive UIs to diving
            deep into full-stack MERN code, I love creating things that just
            click. All I need is VS Code and a good idea
          </p>
          <p className="text-base md:text-lg leading-relaxed max-w-md text-gray-300">
            I spend hours in Figma making sure every button feels right and
            every flow makes sense — because great design isn’t just visual,
            it’s emotional.
          </p>
          <p className="text-base md:text-lg leading-relaxed max-w-md text-gray-300">
            Off-screen? I’m that 4 AM yoga person — finding calm before the
            world stirs. And when life gets noisy, I turn to chess, reset, and
            plan my next move... maybe even with you
          </p>
          <p className="text-base md:text-lg leading-relaxed max-w-md text-gray-300">
            Truth is, I’m always building — websites, skills, and myself. Always
            learning. Always dreaming.
          </p>
        </div>

        {/* Right side - Image with reduced height */}
        <div className="relative w-full max-w-[280px] mx-auto md:mx-0 flex justify-center">
          <div
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500"
            style={{
              borderRadius: "20px / 30px", // elliptical rounding for subtle style
              height: "75%", // <-- here you go
              width: "100%",
              maxHeight: "420px", // optional max height to keep it neat
            }}
          >
            <img
              src="https://res.cloudinary.com/dsvroldwr/image/upload/v1749559497/PAVAN_20250104_085956_0000_qcxh8y.png"
              alt="Pavan"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.9)" }}
            />
          </div>

          {/* Optional subtle decorative blob behind image */}
          <div
            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 rounded-full filter blur-2xl opacity-30"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </motion.section>
  );
}
