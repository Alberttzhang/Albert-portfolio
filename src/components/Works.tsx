import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, Magnetic, ParallaxImage } from "./InteractionHelpers";
import { PROJECTS } from "../data/projects";

export default function Works() {
  const { t, language } = useLanguage();

  return (
    <section id="works" className="section-padding bg-bg relative z-10">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
        <Reveal>
          <span className="text-accent font-medium uppercase tracking-[0.4em] text-xs mb-4 block text-left">PORTFOLIO & WORKS</span>
          <h2 className="text-5xl md:text-7xl font-black text-black text-left uppercase">
            {language === 'zh' ? '精选项目' : 'Selected Works'}
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <motion.p 
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xs text-black text-sm font-medium uppercase tracking-widest leading-relaxed text-left md:text-right"
          >
            {t("works.description")}
          </motion.p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {PROJECTS.slice(0, 4).map((project, index) => (
          <Reveal key={project.id} delay={index * 0.1}>
            <div className="group">
              <Link to={`/project/${project.id}`} className="block md:cursor-none" data-cursor="VIEW">
                  <div className="mb-6 overflow-hidden rounded-[1.5rem] relative">
                    <ParallaxImage 
                      src={project.image} 
                      alt={project.title} 
                      className="aspect-[4/3] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 backdrop-blur-sm text-black px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {language === 'zh' ? '查看项目' : 'VIEW PROJECT'}
                      </div>
                    </div>
                  </div>
                <div className="flex flex-col border-t border-black/10 pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[8px] font-black text-black/40">0{index + 1}.</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-black/40">{project.year}</span>
                  </div>
                  <Magnetic strength={0.2}>
                    <div>
                      <h3 className="text-lg font-black uppercase group-hover:text-accent transition-colors text-black leading-tight mb-1">
                        {language === 'zh' ? project.zhTitle : project.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 block">
                        {language === 'zh' ? project.zhCategory : project.category}
                      </span>
                    </div>
                  </Magnetic>
                </div>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-32 flex justify-center">
        <Magnetic strength={0.5}>
          <Link to="/works" className="group flex items-center gap-6 text-xs font-black uppercase tracking-[0.4em] border-b-2 border-ink pb-4 hover:text-accent hover:border-accent transition-all duration-500 md:cursor-none" data-cursor="ALL">
            {t("works.viewAll")}
            <span className="group-hover:translate-x-4 transition-transform duration-500">→</span>
          </Link>
        </Magnetic>
      </div>
    </div>
  </section>
  );
}
