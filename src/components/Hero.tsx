import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, Magnetic } from "./InteractionHelpers";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const services = (t("hero.services") as string[]).map((title, i) => ({
    id: `0${i + 1}`,
    title
  }));

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center section-padding pt-20 bg-white overflow-hidden">
      <ParticleBackground backgroundColor="#ffffff" />
      <motion.div 
        style={{ y }}
        className="relative z-10 w-full"
      >
        <div className="flex flex-col">
          <Reveal delay={0.1}>
            <div className="mb-6 md:mb-10 flex items-center gap-4">
              <span className="w-12 h-px" style={{ backgroundColor: '#C0C4CC' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#C0C4CC', opacity: 1 }}>
                {t("hero.subtitle1")}
              </span>
            </div>
          </Reveal>
 
          <div className="relative">
            <motion.h1 
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              whileHover={{ 
                skewX: -2,
                y: -5,
                color: "var(--color-accent)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.85] flex flex-col cursor-none"
              style={{ color: '#2A2A2A', opacity: 1 }}
              data-cursor="HELLO"
            >
              <span>DESIGN BEYOND</span>
              <span className="flex items-center gap-4">
                <span className="text-accent" style={{ opacity: 0.5 }}>+</span>
                <span>SCREENS</span>
              </span>
            </motion.h1>
 
            <Magnetic 
              strength={0.15}
              className="absolute -top-10 -right-4 lg:right-0 lg:top-0 hidden md:flex w-48 h-48 items-center justify-center md:cursor-none"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                className="w-full h-full flex items-center justify-center p-4"
                data-cursor="ABOUT"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Rotating Circular Text */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full opacity-40 overflow-visible">
                      <defs>
                        <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                      </defs>
                      <text className="text-[8px] font-bold uppercase tracking-[0.25em] fill-current" style={{ fill: '#C0C4CC' }}>
                        <textPath xlinkHref="#circlePath">
                          Creative individual • turning ideas into realities •
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>

                  {/* Center Element */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-24 h-24 border rounded-full flex items-center justify-center p-4 border-[#E5E7EB] bg-white/60 backdrop-blur-md shadow-sm transition-all duration-500 hover:border-accent hover:bg-white"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            </Magnetic>
          </div>
 
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-4 md:mt-6 relative z-30"
          >
            <p className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight max-w-4xl leading-relaxed" style={{ color: '#8E9299' }}>
              {t("hero.subtitle2")}
            </p>
          </motion.div>
 
          <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t pt-10" style={{ borderColor: '#E5E7EB' }}>
            {services.map((service, i) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                className="flex flex-col"
              >
                <span className="text-[10px] font-bold mb-3 block uppercase tracking-[0.2em]" style={{ color: '#C0C4CC' }}>
                  {service.id}.
                </span>
                <h3 className="text-lg font-bold" style={{ color: '#4A4A4A' }}>
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
