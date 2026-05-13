import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, Magnetic, ParallaxImage } from "./InteractionHelpers";

export default function About() {
  const { t, language } = useLanguage();

  const stats = [
    { label: t("about.stats.clients"), value: "40+" },
    { label: t("about.stats.projects"), value: "30+" },
    { label: t("about.stats.experience"), value: "6yrs" },
  ];

  return (
    <section id="about" className="section-padding text-white relative z-10 overflow-hidden bg-[#1a1a1a]">
      <div className="w-full">
        <div className="magazine-grid">
          <div className="col-span-12 lg:col-span-8">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black mb-12 md:mb-16 tracking-tighter leading-[0.8] normal-case">
              About <span className="text-accent drop-shadow-[0_0_30px_rgba(0,122,255,0.3)]">Albert</span>
            </h2>
            
            <div className="space-y-8 md:space-y-10 max-w-3xl">
              <p className="text-base md:text-lg lg:text-xl font-bold leading-[1.8] text-white">
                {t("about.description")}
              </p>
              
              <p className="text-sm md:text-base lg:text-lg text-white/60 font-medium leading-[1.8]">
                {t("about.subDescription")}
              </p>
   
              <div className="pt-4 md:pt-8">
                <Link 
                  to="/about" 
                  className="group relative inline-flex items-center gap-6 px-10 py-5 md:px-12 md:py-6 bg-white text-black font-bold tracking-[0.1em] rounded-full hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
                  style={{ zIndex: 50 }}
                >
                  <span className="text-xs md:text-sm">了解更多 / About Me</span>
                  <span className="text-xl md:text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>

            <div className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-12 md:pt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <span className="text-[10px] font-black tracking-[0.3em] text-white/50 block">
                    {stat.label}
                  </span>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-20 lg:mt-0">
            <div className="relative group sticky top-32">
                <div className="absolute -inset-4 bg-accent/20 rounded-[2.5rem] blur-2xl group-hover:bg-accent/30 transition-colors duration-700"></div>
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[3/4]">
                  <img 
                    src="https://i.postimg.cc/qBsdDBh1/albert.png" 
                    alt="Albert" 
                    className="w-full h-full object-cover transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl">
                    <p className="text-[10px] font-bold tracking-[0.1em] text-white/60 mb-2">{language === "zh" ? "当前重点" : "Current Focus"}</p>
                    <h3 className="text-lg font-bold text-white leading-tight">{t("about.focus")}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
