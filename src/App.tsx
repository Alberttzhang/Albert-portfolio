import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import AboutDetailed from "./pages/AboutDetailed";
import Projects from "./pages/Projects";
import Visuals from "./pages/Visuals";
import VisualDetail from "./pages/VisualDetail";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import AIChat from "./components/AIChat";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Lenis from "@studio-freight/lenis";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    /*
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
    */
    return () => {};
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Cursor />
        <Navbar />
        <AIChat />
        <div className="relative min-h-screen selection:bg-accent selection:text-bg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutDetailed />} />
            <Route path="/works" element={<Projects />} />
            <Route path="/visuals" element={<Visuals />} />
            <Route path="/visuals/:id" element={<VisualDetail />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}
