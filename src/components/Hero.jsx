// Hero.js
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Particles1 from "./Particles";
import HeroContent from "./HeroContent";

export default function Hero() {
  const mouse = useRef([0, 0]);

  function handleMouseMove(e) {
    mouse.current = [
      e.clientX - window.innerWidth / 2,
      e.clientY - window.innerHeight / 2,
    ];
  }

  return (
    <section
  id="hero"
  className="w-full h-screen relative bg-white text-black dark:bg-black dark:text-white overflow-hidden transition-colors duration-300"
  onMouseMove={handleMouseMove}
>

      {/* Canvas 3D background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Particles1 mouse={mouse} />
          <ambientLight />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <HeroContent />
    </section>
  );
}
