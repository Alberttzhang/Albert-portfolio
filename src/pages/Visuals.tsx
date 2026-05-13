import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { VISUAL_WORKS } from "../data/visuals";
import { Reveal, ParallaxImage } from "../components/InteractionHelpers";
import BackButton from "../components/BackButton";

export default function Visuals() {
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
          <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-6 block">VISUAL ARCHIVE / 2024 — 2025</span>
          <h1 className="text-5xl md:text-[7vw] font-black text-gray-950 uppercase leading-[0.9] tracking-tighter">
            {language === 'zh' ? '视觉识别' : 'VISUAL IDENTITY'}
          </h1>
        </Reveal>
      </header>

      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {VISUAL_WORKS.map((work, index) => (
              <Reveal key={work.id} delay={index * 0.1}>
                <Link to={`/visuals/${work.id}`} className="block group md:cursor-none" data-cursor="VIEW">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gray-100 shadow-sm mb-8 transition-transform duration-700 group-hover:scale-[1.02]">
                    <ParallaxImage 
                      src={work.image} 
                      alt={work.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <span className="text-secondary font-black text-[8px] uppercase tracking-widest">{language === 'zh' ? work.zhCategory : work.category}</span>
                       <h2 className="text-xl font-black text-gray-950 uppercase group-hover:text-secondary transition-colors leading-[1.3]">
                          {language === 'zh' ? work.zhTitle : work.title}
                       </h2>
                    </div>
                    <span className="text-[10px] font-black text-gray-300">{work.date}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
      </section>
    </motion.main>
  );
}
