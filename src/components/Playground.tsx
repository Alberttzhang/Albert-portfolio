import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal, ParallaxImage } from "./InteractionHelpers";
import ImageModal from "./ImageModal";

const ITEMS = [
  { title: "Graphic Design 01", zhTitle: "平面设计 01", type: "Graphic", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc01.jpg" },
  { title: "Visual Experiment 02", zhTitle: "视觉实验 02", type: "Visual", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc02.jpg" },
  { title: "Brand Exploration 03", zhTitle: "品牌探索 03", type: "Design", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc03.jpg" },
  { title: "Illustration 04", zhTitle: "插画练习 04", type: "Art", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc04.jpg" },
  { title: "Poster Design 05", zhTitle: "海报设计 05", type: "Graphic", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc05.jpg" },
  { title: "Composition Studies 06", zhTitle: "构图研究 06", type: "Visual", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc06.jpg" },
  { title: "Creative Layout 07", zhTitle: "创意排版 07", type: "Design", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc07.jpg" },
  { title: "Urban Capture 08", zhTitle: "城市快照 08", type: "Photography", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc08.jpg" },
  { title: "Visual Narrative 09", zhTitle: "视觉叙事 09", type: "Art", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc09.jpg" },
  { title: "Digital Craft 10", zhTitle: "数字工艺 10", type: "Visual", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc10.jpg" },
  { title: "Form & Function 11", zhTitle: "形式与功能 11", type: "Design", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc11.jpg" },
  { title: "Media Experiment 12", zhTitle: "媒介试验 12", type: "Art", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc12.jpg" },
  { title: "Aesthetic Study 13", zhTitle: "美学研究 13", type: "Visual", img: "https://raw.githubusercontent.com/Alberttzhang/Portfolio-image/e53939fde5ca15191e6b8a33643e18597561359f/ylc13.jpg" },
];

export default function Playground() {
  const { t, language } = useLanguage();
  const [modalData, setModalData] = useState<{ isOpen: boolean; src: string; alt: string }>({
    isOpen: false,
    src: "",
    alt: ""
  });

  const openModal = (src: string, alt: string) => {
    setModalData({ isOpen: true, src, alt });
  };

  return (
    <section id="playground" className="section-padding relative z-10 bg-white">
      <ImageModal 
        isOpen={modalData.isOpen} 
        onClose={() => setModalData({ ...modalData, isOpen: false })} 
        src={modalData.src} 
        alt={modalData.alt} 
      />

      <div className="w-full">
        <div className="mb-24 text-center">
          <div className="inline-block px-4">
            <Reveal width="100%">
              <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block leading-loose uppercase">{t("playground.label")}</span>
              <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter uppercase leading-[1.1] py-4">
                {t("playground.title")}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-5 gap-4">
          {ITEMS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="break-inside-avoid mb-4 inline-block w-full"
            >
              <div
                onClick={() => openModal(item.img, item.title)}
                className="relative group overflow-hidden rounded-xl bg-gray-100 md:cursor-none border border-gray-100"
                data-cursor="ZOOM"
              >
                <div className="w-full relative min-h-[150px]">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-[10px] font-black uppercase tracking-tight line-clamp-1">
                        {language === 'zh' ? item.zhTitle : item.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
