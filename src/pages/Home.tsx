import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Works from "../components/Works";
import Events from "../components/Events";
import Playground from "../components/Playground";
import Marquee from "../components/Marquee";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, [location]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen bg-white"
    >
      <Hero />
      <About />
      <Works />
      <Events />
      <Playground />
    </motion.main>
  );
}
