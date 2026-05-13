import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, ParallaxImage } from "./InteractionHelpers";
import { VISUAL_WORKS } from "../data/visuals";

export default function Events() {
  const { t, language } = useLanguage();
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <section id="events" ref={targetRef} className="relative h-[300vh] z-10">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-24 left-0 w-full section-padding z-10 pointer-events-none">
          <div className="w-full pointer-events-auto">
            <Reveal>
              <span className="text-accent font-medium tracking-[0.4em] text-[10px] mb-4 block uppercase leading-none">
                {t("events.label")}
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-black">
                {t("events.title")}
              </h2>
            </Reveal>
          </div>
        </div>

        <motion.div style={{ x }} className="flex gap-6 pl-[30vw] md:pl-[40vw]">
          {VISUAL_WORKS.slice(0, 4).map((work, i) => (
            <Link key={work.id} to={`/visuals/${work.id}`} className="flex-shrink-0 w-[60vw] md:w-[28vw] lg:w-[18vw] p-4 rounded-[1.5rem] group transition-all duration-500 hover:bg-white hover:shadow-2xl bg-white/50 border border-gray-100 md:cursor-none flex flex-col" data-cursor="EXPLORE">
              <div className="aspect-[4/5] bg-gray-100 rounded-[1.2rem] overflow-hidden mb-4">
                <ParallaxImage 
                   src={work.image} 
                   alt={work.title} 
                   className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-black group-hover:text-accent transition-colors leading-snug mb-1">
                    {language === 'zh' ? work.zhTitle : work.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold tracking-widest text-black/60 group-hover:text-black transition-colors uppercase">
                      {language === 'zh' ? work.zhCategory : work.category}
                    </p>
                    <p className="text-[10px] font-mono text-accent font-black">{work.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* View All Card */}
          <div className="flex-shrink-0 w-[60vw] md:w-[28vw] lg:w-[18vw] p-4 rounded-[1.5rem] group transition-all duration-500 hover:bg-accent hover:shadow-2xl bg-gray-50/50 border border-gray-100 md:cursor-none flex flex-col" data-cursor="VIEW">
            <Link 
              to="/visuals" 
              className="w-full h-full flex flex-col justify-between"
            >
              <div className="aspect-[4/5] rounded-[1.2rem] bg-gray-100/50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-500">
                <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-500">
                  <ArrowRight size={28} className="text-gray-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="mt-4 px-2 pb-2">
                <h3 className="text-xl font-black text-black group-hover:text-white transition-colors leading-snug mb-2">
                  {language === 'zh' ? '更多作品' : 'More Works'}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-accent group-hover:bg-white transition-colors"></div>
                  <p className="text-[10px] font-bold tracking-widest text-black/40 group-hover:text-white/80 transition-colors uppercase">
                    {t("portfolio.viewAll")}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
