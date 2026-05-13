import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();

  const navItems = [
    { id: "about", path: "/about", label: t("nav.about") },
    { id: "works", path: "/works", label: t("nav.works") },
    { id: "events", path: "/visuals", label: t("nav.events") },
    { id: "playground", path: "/#playground", label: t("nav.playground") }
  ];

  useEffect(() => {
    if (location.pathname === "/") {
      const sections = ["hero", "works", "about", "events", "playground"];
      
      const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Focus on the middle 60% of the screen
        threshold: 0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveItem(id === "hero" ? "" : id);
          }
        });
      }, observerOptions);

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });

      return () => {
        observer.disconnect();
      };
    } else {
      if (location.pathname.startsWith("/about")) setActiveItem("about");
      else if (location.pathname.startsWith("/works")) setActiveItem("works");
      else if (location.pathname.startsWith("/project")) setActiveItem("works");
      else if (location.pathname.startsWith("/visuals")) setActiveItem("events");
      else setActiveItem("");
    }
  }, [location.pathname]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavItemClick = (e: React.MouseEvent, item: any) => {
    if (item.path.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = item.path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveItem(item.id);
      }
    } else {
      setActiveItem(item.id);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button - Floating at top right */}
      <div className="fixed top-6 right-6 z-[200] md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 bg-ink text-bg rounded-full flex items-center justify-center shadow-xl border border-white/10 active:scale-95 transition-transform"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[180] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80vw] max-w-[300px] bg-ink text-bg z-[190] shadow-2xl md:hidden p-10 flex flex-col justify-between"
            >
              <div className="space-y-8 mt-12">
                <div className="mb-12">
                  <img 
                    src="https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/ad94c9391bea2637c5d970103ed2fea81df1d337/logo.png" 
                    alt="Logo" 
                    className="h-10 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mt-2 font-black">Portfolio</p>
                </div>
                
                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={(e) => handleNavItemClick(e, item)}
                      className="group flex items-center gap-4 py-2"
                    >
                      <span className={`text-2xl font-black uppercase tracking-tight transition-colors ${
                        activeItem === item.id ? "text-accent" : "text-bg/80 hover:text-white"
                      }`}>
                        {item.label}
                      </span>
                      {activeItem === item.id && (
                        <motion.div 
                          layoutId="sidebar-active"
                          className="w-2 h-2 bg-accent rounded-full" 
                        />
                      )}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center gap-4 pt-12 border-t border-white/10">
                  <button 
                    onClick={() => setLanguage('zh')}
                    className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${language === 'zh' ? 'bg-accent text-bg' : 'bg-white/5 text-bg/40'}`}
                  >
                    简体中文
                  </button>
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${language === 'en' ? 'bg-accent text-bg' : 'bg-white/5 text-bg/40'}`}
                  >
                    ENGLISH
                  </button>
                </div>
              </div>


            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Navbar (Bottom Floating) */}
      <nav 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] w-fit hidden md:block"
      >
        <div className="bg-ink text-bg rounded-full px-4 py-2 flex items-center gap-4 shadow-2xl border border-white/5 backdrop-blur-xl">
          <Link 
            to="/" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveItem("");
            }}
            className="group flex items-center gap-2 pr-4 border-r border-white/10 h-8"
          >
            <img 
              src="https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/ad94c9391bea2637c5d970103ed2fea81df1d337/logo.png" 
              alt="Logo" 
              className="h-full w-auto object-contain transition-all group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </Link>

          <div className="flex items-center h-full">
            {navItems.map((item) => (
              <Link 
                key={item.id}
                to={item.path}
                onClick={(e) => handleNavItemClick(e, item)}
                className={`relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 z-10 ${
                  activeItem === item.id ? "text-bg" : "text-bg hover:text-accent"
                }`}
              >
                {activeItem === item.id && (
                  <motion.div 
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-accent rounded-full -z-10" 
                  />
                )}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-4 border-l border-white/10 ml-2">
            <button 
              onClick={() => setLanguage('zh')}
              className={`text-[8px] font-black w-6 h-6 rounded-full flex items-center justify-center transition-all ${language === 'zh' ? 'bg-accent text-bg shadow-lg' : 'text-bg/40 hover:text-bg'}`}
            >
              中
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-[8px] font-black w-6 h-6 rounded-full flex items-center justify-center transition-all ${language === 'en' ? 'bg-accent text-bg shadow-lg' : 'text-bg/40 hover:text-bg'}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
