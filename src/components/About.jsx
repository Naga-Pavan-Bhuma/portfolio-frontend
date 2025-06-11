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
      className="snap-start min-h-screen flex items-center bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 px-6 md:px-20"
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side - Image */}
        <div className="relative w-full flex justify-center">
          <div
            className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500 w-[120px] sm:w-[160px] md:w-[200px] max-h-[320px]"
            style={{ borderRadius: "20px / 30px" }}
          >
            <img
              src="https://yt3.ggpht.com/ytc/AIdro_mCZUi9xwC0E3fpFhFkHJ82ctJ2jtr_F5uQG11rlF8Kda4=s600-c-k-c0x00ffffff-no-rj-rp-mo"
              alt="Pavan"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.9)" }}
            />
          </div>

          {/* Decorative blob */}
          <div
            className="absolute -top-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 rounded-full filter blur-2xl opacity-30"
            aria-hidden="true"
          ></div>
        </div>

        {/* Right side - Text */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            About Me
          </h2>
          <p className="text-base text-justify md:text-lg leading-relaxed max-w-md text-gray-700 dark:text-gray-300 mx-auto md:mx-0">
            Hey you, I’m Naga Pavan Bhuma — the guy who finds joy in building
            cool stuff on the web. From crafting clean, intuitive UIs to diving
            deep into full-stack MERN code, I love creating things that just
            click. All I need is VS Code and a good idea.
          </p>
          <p className="text-base text-justify md:text-lg leading-relaxed max-w-md text-gray-700 dark:text-gray-300 mx-auto md:mx-0">
            I spend hours in Figma making sure every button feels right and
            every flow makes sense — because great design isn’t just visual,
            it’s emotional.
          </p>
          <p className="text-base text-justify md:text-lg leading-relaxed max-w-md text-gray-700 dark:text-gray-300 mx-auto md:mx-0">
            Off-screen? I’m that 4 AM yoga person — finding calm before the
            world stirs. And when life gets noisy, I turn to chess, reset, and
            plan my next move... maybe even with you.
          </p>
          <p className="text-base text-justify md:text-lg leading-relaxed max-w-md text-gray-700 dark:text-gray-300 mx-auto md:mx-0">
            Truth is, I’m always building — websites, skills, and myself. Always
            learning. Always dreaming.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
