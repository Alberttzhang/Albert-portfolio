import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { PROJECTS } from "../data/projects";
import { Reveal, Magnetic, ParallaxImage } from "../components/InteractionHelpers";
import BackButton from "../components/BackButton";

export default function Projects() {
  const { t, language } = useLanguage();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      <BackButton />

      <header className="pt-48 pb-24 px-6 md:px-12 lg:px-20">
        <Reveal>
          <span className="text-accent font-black uppercase tracking-[0.4em] text-xs mb-6 block">ARCHIVE / 2023 — 2025</span>
          <h1 className="text-5xl md:text-[7vw] font-black text-gray-950 uppercase leading-[0.9] tracking-tighter">
            {language === 'zh' ? '作品列表' : 'ALL PROJECTS'}
          </h1>
        </Reveal>
      </header>

      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {PROJECTS.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.1}>
                <Link to={`/project/${project.id}`} className="block group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm mb-8 transition-transform duration-700 group-hover:scale-[1.02]">
                    <ParallaxImage 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                       <div className="bg-white text-black px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">
                          {t("works.view")}
                       </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <span className="text-accent font-black text-[8px] uppercase tracking-widest">{language === 'zh' ? project.zhCategory : project.category}</span>
                       <h2 className="text-xl font-black text-gray-950 uppercase group-hover:text-accent transition-colors leading-[1.3]">
                          {language === 'zh' ? project.zhTitle : project.title}
                       </h2>
                    </div>
                    <span className="text-[10px] font-black text-gray-300">{project.year}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
      </section>
    </motion.main>
  );
}
