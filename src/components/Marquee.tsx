import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Marquee({ speed = 20 }: { text?: string; speed?: number }) {
  const { t } = useLanguage();
  return (
    <div className="relative flex overflow-x-hidden border-y border-border py-12 bg-ink text-bg">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-6xl md:text-9xl font-black uppercase tracking-tighter px-12 flex items-center gap-12">
            Let’s work together <span className="text-accent">✱</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
