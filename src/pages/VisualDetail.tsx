import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { VISUAL_WORKS } from "../data/visuals";
import { Reveal, ParallaxImage } from "../components/InteractionHelpers";
import BackButton from "../components/BackButton";
import ImageModal from "../components/ImageModal";
import { ArrowLeft } from "lucide-react";

export default function VisualDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigate = useNavigate();

  const work = VISUAL_WORKS.find(w => w.id === id);

  if (!work) return <div>Project not found</div>;

  const isBranding = work.category === "Branding";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pb-40"
    >
      <BackButton />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <ParallaxImage src={work.bannerImage || work.image} alt={work.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-end">
          <div className="section-padding pb-20 w-full">
            <Reveal>
              <span className="text-secondary font-black tracking-[0.4em] text-xs mb-4 block uppercase leading-none text-white/70">
                {language === 'zh' ? work.zhCategory : work.category} / {work.date}
              </span>
              <h1 className="text-4xl md:text-[5vw] font-black leading-[0.9] text-white uppercase tracking-tighter">
                {language === 'zh' ? work.zhTitle : work.title}
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding py-24 md:py-40 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <h2 className="text-xs font-black tracking-widest text-accent uppercase mb-8">
              {language === 'zh' ? '项目背景' : 'Background'}
            </h2>
            <p className="text-xl md:text-2xl font-black text-black leading-[1.8]">
              {language === 'zh' ? work.zhDescription : work.description}
            </p>
          </Reveal>
        </div>

        {isBranding && work.specs && (
          <div className="md:col-span-8 md:pl-20">
            <div className="max-w-4xl space-y-40">
              
              {/* 01. Color System */}
              <section className="space-y-12">
                <div className="flex items-baseline gap-6 border-b-2 border-black pb-4">
                  <span className="text-xl font-mono font-black italic">01/</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {language === 'zh' ? '标准色彩系统' : 'Color System'}
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {work.id === 'v1' ? (
                    <div className="space-y-2">
                      {/* Gradient Bar */}
                      <div className="flex items-center group">
                        <div 
                          className="w-24 h-24 md:w-32 md:h-32 shrink-0 border border-gray-100" 
                          style={{ background: `linear-gradient(135deg, ${work.specs.colors[0]}, ${work.specs.colors[1]})` }} 
                        />
                        <div className="flex-grow h-24 md:h-32 border-y border-r border-gray-100 flex items-center px-8 justify-between bg-gray-50/30 group-hover:bg-white transition-colors">
                          <div className="space-y-1">
                            <p className="text-xs font-black text-black/30 uppercase tracking-widest">Primary Gradient</p>
                            <p className="text-xl font-black uppercase">Core Brand Gradient</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono font-black">{work.specs.colors[0]} → {work.specs.colors[1]}</p>
                            <p className="text-[10px] font-mono text-black/40">LINEAR GRADIENT</p>
                          </div>
                        </div>
                      </div>
                      {/* Secondary Colors */}
                      {work.specs.colors.slice(2).map((color, i) => (
                        <div key={i} className="flex items-center group">
                          <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 border border-gray-100" style={{ backgroundColor: color }} />
                          <div className="flex-grow h-24 md:h-32 border-y border-r border-gray-100 flex items-center px-8 justify-between bg-gray-50/30 group-hover:bg-white transition-colors">
                            <div className="space-y-1">
                              <p className="text-xs font-black text-black/30 uppercase tracking-widest">Secondary</p>
                              <p className="text-xl font-black uppercase">{color === '#FFFFFF' ? 'Pure White' : 'Neutral'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-mono font-black">{color}</p>
                              <p className="text-[10px] font-mono text-black/40">HEX CODE</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    work.specs.colors.map((color, i) => (
                      <div key={i} className="flex items-center group">
                        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 border border-gray-100" style={{ backgroundColor: color }} />
                        <div className="flex-grow h-24 md:h-32 border-y border-r border-gray-100 flex items-center px-8 justify-between bg-gray-50/30 group-hover:bg-white transition-colors">
                          <div className="space-y-1">
                            <p className="text-xs font-black text-black/30 uppercase tracking-widest">Primary Gradient</p>
                            <p className="text-xl font-black uppercase">{i === 0 ? 'Core Brand' : 'Accent'}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono font-black">{color}</p>
                            <p className="text-[10px] font-mono text-black/40">HEX CODE</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* 02. Typography Specimen */}
              <section className="space-y-12">
                <div className="flex items-baseline gap-6 border-b-2 border-black pb-4">
                  <span className="text-xl font-mono font-black italic">02/</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {language === 'zh' ? '标准字体集' : 'Type Specimen'}
                  </h3>
                </div>
                <div className="space-y-20">
                  {work.specs.fonts.map((font, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-center mb-8">
                        <p className="text-xs font-black text-accent uppercase tracking-[0.2em]">{font}</p>
                        <p className="text-[10px] font-mono text-black/30">SCALABLE VECTOR FONT SYSTEM</p>
                      </div>
                      <div className="space-y-4">
                        <p 
                          className="text-6xl md:text-8xl font-black tracking-tighter leading-none" 
                          style={{ fontFamily: font === 'Microsoft YaHei' ? '"Microsoft YaHei", "微软雅黑", sans-serif' : font }}
                        >
                          Aa-Zz
                        </p>
                        <div className="flex gap-2">
                          {['Black', 'Bold', 'Medium', 'Regular'].map(weight => (
                            <span key={weight} className="text-[8px] font-mono border border-black/10 px-2 py-0.5 rounded-full">{weight}</span>
                          ))}
                        </div>
                        <p 
                          className="text-xl md:text-2xl leading-tight text-gray-400 break-all pt-4" 
                          style={{ fontFamily: font === 'Microsoft YaHei' ? '"Microsoft YaHei", "微软雅黑", sans-serif' : font }}
                        >
                          The quick brown fox jumps over the lazy dog. 0123456789
                        </p>
                        {language === 'zh' && (
                          <p 
                            className="text-4xl md:text-5xl font-black tracking-tight pt-4" 
                            style={{ fontFamily: font === 'Microsoft YaHei' ? '"Microsoft YaHei", "微软雅黑", sans-serif' : font }}
                          >
                            永东南西北中，欣唯与欣筑品牌识别系统。
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 03. Grid & Geometry */}
              <section className="space-y-12">
                <div className="flex items-baseline gap-6 border-b-2 border-black pb-4">
                  <span className="text-xl font-mono font-black italic">03/</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {language === 'zh' ? '标志结构规范' : 'Grid & Geometry'}
                  </h3>
                </div>
                {work.images && work.images[0] ? (
                  <div 
                    className="rounded-[1.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 flex items-center justify-center cursor-zoom-in"
                    onClick={() => setSelectedImage(work.images![0])}
                  >
                    <img 
                      src={work.images[0]} 
                      alt="Logo Grid" 
                      className="w-full h-auto"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[16/9] w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] overflow-hidden group">
                    {/* Technical Grid Placeholder */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
                        backgroundImage: `
                          linear-gradient(to right, #000 1px, transparent 1px),
                          linear-gradient(to bottom, #000 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                      }} />
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-dashed border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-700">
                          <span className="text-gray-300 font-mono text-[10px] tracking-widest">IMG-03</span>
                      </div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] font-mono">
                          {language === 'zh' ? '品牌标志制图规范展示区域' : 'LOGO CONSTRUCTION GRID AREA'}
                      </p>
                    </div>
                    
                    <div className="absolute bottom-8 left-8 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span className="text-[8px] font-mono text-black/20 tracking-widest uppercase">
                          Technical Spec / Phase: Development
                        </span>
                    </div>
                  </div>
                )}
              </section>

              {/* 04. Tactical Kit */}
              <section className="space-y-12">
                <div className="flex items-baseline gap-6 border-b-2 border-black pb-4">
                  <span className="text-xl font-mono font-black italic">04/</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {language === 'zh' ? '应用系统' : 'Tactical Kit'}
                  </h3>
                </div>
                {work.images && work.images[1] ? (
                  <div 
                    className="rounded-[1.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 flex items-center justify-center cursor-zoom-in"
                    onClick={() => setSelectedImage(work.images![1])}
                  >
                    <img 
                      src={work.images[1]} 
                      alt="Tactical Kit" 
                      className="w-full h-auto"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] overflow-hidden group">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-dashed border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-700">
                          <span className="text-gray-300 font-mono text-[10px] tracking-widest">IMG-04</span>
                      </div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] font-mono">
                          {language === 'zh' ? '品牌办公事务及物料应用展示区域' : 'VISUAL APPLICATION SHOWCASE AREA'}
                      </p>
                    </div>
                    
                    <div className="absolute bottom-8 left-8 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        <span className="text-[8px] font-mono text-black/20 tracking-widest uppercase">
                          Application Spec / Mockup V1.2
                        </span>
                    </div>
                  </div>
                )}
              </section>

              {/* 05. Mascot System - Only for Fire Mountain Branding (v4) */}
              {work.id === "v4" && (
                <section className="space-y-12">
                  <div className="flex items-baseline gap-6 border-b-2 border-black pb-4">
                    <span className="text-xl font-mono font-black italic">05/</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight">
                      {language === 'zh' ? '吉祥物设计系统' : 'Mascot System'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative aspect-square bg-gray-50 border border-gray-100 rounded-[1.5rem] overflow-hidden group">
                      {work.mascot && work.mascot[0] ? (
                        <div 
                          className="w-full h-full flex items-center justify-center p-8 bg-white cursor-zoom-in"
                          onClick={() => setSelectedImage(work.mascot![0])}
                        >
                          <img 
                            src={work.mascot[0]} 
                            alt="Mascot Base" 
                            className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-700">
                            <span className="text-gray-300 font-mono text-xs tracking-widest">MASCOT-01</span>
                          </div>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] font-mono">
                            {language === 'zh' ? '吉祥物基础造型展示' : 'BASE CHARACTER MODEL'}
                          </p>
                        </div>
                      )}
                      <div className="absolute top-8 left-8 space-y-1">
                        <p className="text-[8px] font-mono text-black/20 uppercase tracking-widest">Type: 3D Render / Vector</p>
                        <p className="text-[8px] font-mono text-black/20 uppercase tracking-widest">Ref: BLUE FIRE SPIRIT</p>
                      </div>
                    </div>
                    <div className="space-y-8 flex flex-col justify-center">
                      <div className="space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-widest text-accent">Personality / 性格设定</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Energetic', 'Disruptive', 'Smart', 'Curious'].map(trait => (
                            <span key={trait} className="px-4 py-2 bg-black text-white text-[10px] font-black uppercase tracking-widest italic">{trait}</span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4 pt-8 border-t border-gray-100">
                        <h4 className="text-sm font-black uppercase tracking-widest text-black/30">Three Views / 三视图规范</h4>
                        <div className="flex gap-4">
                          {work.mascot && work.mascot.length > 1 ? (
                            work.mascot.slice(1, 4).map((img, i) => (
                              <div 
                                key={i} 
                                className="w-24 h-24 bg-white border border-gray-100 rounded-xl flex items-center justify-center overflow-hidden cursor-zoom-in"
                                onClick={() => setSelectedImage(img)}
                              >
                                <img 
                                  src={img} 
                                  alt={`View ${i + 1}`} 
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))
                          ) : (
                            [1,2,3].map(n => (
                              <div key={n} className="w-24 h-24 bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
                                <span className="text-[8px] font-mono text-gray-300">POV-{n}</span>
                              </div>
                            ))
                          )}
                        </div>
                        <p className="text-[10px] font-medium text-gray-400 max-w-xs leading-relaxed">
                          {language === 'zh' 
                            ? '包含吉祥物的前、侧、后三视图比例规范及动作延展说明。' 
                            : 'Detailed three-view proportions and action expansion guidelines for character consistency.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

            </div>
          </div>
        )}

        {!isBranding && (
          <div className="md:col-span-8 md:pl-20 space-y-32">
             {/* 01. Exhibition Materials */}
             <section className="space-y-12">
                <div className="flex items-baseline gap-6 border-b-2 border-black pb-4">
                  <span className="text-xl font-mono font-black italic">01/</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {language === 'zh' ? '展会物料展示' : 'Exhibition Materials'}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {work.images && work.images.length > 0 ? (
                    work.images.map((img, i) => (
                      <div 
                        key={i} 
                        className="rounded-[1.5rem] overflow-hidden shadow-xl border border-gray-100 bg-gray-50 flex items-center justify-center cursor-zoom-in group"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`Material ${i + 1}`} 
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))
                  ) : (
                    [1, 2, 3, 4].map((n) => (
                      <div key={n} className="relative aspect-[4/3] w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] overflow-hidden group">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full border border-dashed border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-700">
                            <span className="text-gray-300 font-mono text-[8px] tracking-widest">MTL-0{n}</span>
                          </div>
                          <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em] font-mono text-center px-4">
                            {language === 'zh' ? '展会物料规格展示' : 'MATERIAL SPEC SHOWCASE'}
                          </p>
                        </div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent" />
                          <span className="text-[6px] font-mono text-black/20 uppercase">MTL-0{n} / Production</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {(work.materials || work.zhMaterials) && (
                  <div className="pt-8">
                    <p className="text-xl font-black text-black leading-tight border-l-4 border-accent pl-6">
                      {language === 'zh' ? work.zhMaterials : work.materials}
                    </p>
                  </div>
                )}
             </section>

             {/* 02. Event Photos Section */}
             <section className="space-y-12">
                <div className="flex items-baseline gap-6 border-b-2 border-black pb-4">
                  <span className="text-xl font-mono font-black italic">02/</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {language === 'zh' ? '展会现场照片' : 'Event Photos'}
                  </h3>
                </div>
                <div className="space-y-8">
                  {work.photos && work.photos.length > 0 ? (
                    work.photos.map((img, i) => (
                      <div 
                        key={i} 
                        className="rounded-[1.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 flex items-center justify-center cursor-zoom-in group"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`Event Photo ${i + 1}`} 
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))
                  ) : (
                    [1, 2, 3].map((n) => (
                      <div key={n} className="relative aspect-video w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] overflow-hidden group">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="w-20 h-20 rounded-full border border-dashed border-gray-200 flex items-center justify-center mb-4 group-hover:bg-accent/5 transition-all duration-700">
                            <span className="text-gray-300 font-mono text-[10px] tracking-widest">PH-0{n}</span>
                          </div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] font-mono">
                            {language === 'zh' ? `展会现场实拍照片 ${n}` : `LIVE EVENT PHOTOGRAPHY ${n}`}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
             </section>
          </div>
        )}
      </section>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        src={selectedImage || ""} 
        alt={work.title} 
      />
    </motion.main>
  );
}
