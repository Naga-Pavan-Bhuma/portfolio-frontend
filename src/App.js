import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect } from "react";
export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <>
      <Header />
      <main className="pt-16">
  <Hero />
  <About />
  <Skills />
  <Projects />
  <Footer />
</main>

    </>
  );
}
