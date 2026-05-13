import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { PROJECTS } from "../data/projects";
import BackButton from "../components/BackButton";
import ImageModal from "../components/ImageModal";

export default function ProjectDetail() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const project = PROJECTS.find(p => p.id === id) || PROJECTS[0];

  const title = language === 'zh' ? project.zhTitle : project.title;
  const category = language === 'zh' ? project.zhCategory : project.category;
  const role = language === 'zh' ? project.zhRole : project.role;
  const timeline = language === 'zh' ? project.zhTimeline : project.timeline;
  const description = language === 'zh' ? project.zhDescription : project.description;
  const content = project.content.map(item => ({
    title: language === 'zh' ? item.zhTitle : item.title,
    text: language === 'zh' ? item.zhText : item.text
  }));

  return (
    <div className="bg-white min-h-screen w-full relative">
      <BackButton />

      <header className="pt-48 pb-16 px-6 md:px-12 lg:px-20">
        <span className="text-accent font-bold uppercase tracking-[0.4em] text-xs mb-8 block">{category}</span>
        <h1 className="text-3xl md:text-[5vw] font-black text-gray-950 leading-[0.85] tracking-tighter mb-8">
          {title}
        </h1>
        <p className="text-xl md:text-2xl font-black text-gray-400 max-w-4xl leading-[1.6]">
          {description}
        </p>
      </header>

      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12">
            <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row gap-12 md:gap-32">
              <div>
                <p className="text-[10px] font-black text-gray-400 tracking-widest mb-2">{t("project.role")}</p>
                <p className="text-xl md:text-2xl font-black text-black">{role}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 tracking-widest mb-2">{t("project.timeline")}</p>
                <p className="text-xl md:text-2xl font-black text-black">{timeline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(project.bannerImage || project.image) && (
        <section className="px-6 md:px-12 lg:px-20 mb-32">
          <div 
            className="rounded-[3rem] overflow-hidden max-w-6xl mx-auto shadow-2xl cursor-zoom-in aspect-video"
            onClick={() => setSelectedImage(project.bannerImage || project.image || null)}
          >
            <img 
              src={project.bannerImage || project.image} 
              alt="" 
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>
      )}

      <section className="px-6 md:px-12 lg:px-20 pb-40">
        <div className="space-y-40">
          {/* Section 1: Background */}
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-4">
               <h2 className="text-xs font-black tracking-[0.2em] text-accent mb-8">01 / {content[0]?.title}</h2>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <p className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                {content[0]?.text}
              </p>
            </div>
          </div>

          {/* Section 2: Design Specs */}
          {project.specs && (
            <div className="grid grid-cols-12 gap-12 border-t border-gray-100 pt-32">
              <div className="col-span-12 lg:col-span-4">
                 <h2 className="text-xs font-black tracking-[0.2em] text-accent mb-8">02 / {language === 'zh' ? '设计规范' : 'Design Specs'}</h2>
              </div>
              <div className="col-span-12 lg:col-span-8 space-y-24">
                {/* Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 mb-6 tracking-widest">{language === 'zh' ? '色彩体系' : 'Color System'}</p>
                    <div className="flex flex-wrap gap-4">
                      {project.specs.colors.map((color, i) => (
                        <div key={i} className="group relative">
                          <div className="w-12 h-12 rounded-full border border-gray-100 shadow-sm" style={{ backgroundColor: color }} />
                          <span className="absolute top-14 left-0 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity uppercase">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 mb-6 tracking-widest">{language === 'zh' ? '字体规范' : 'Typography'}</p>
                    <div className="space-y-6">
                       <div className="flex flex-wrap gap-x-8 gap-y-4">
                          {project.specs.fonts.map((font: any, i: number) => (
                            <div key={i}>
                               <p className="text-2xl font-black tracking-tight">{font.display}</p>
                               <p className="text-[10px] text-gray-400 font-bold mt-1">{font.label}</p>
                            </div>
                          ))}
                       </div>
                       <div>
                          <div className="flex gap-4 items-baseline mb-1">
                             {project.specs.sizes.map((size: string, i: number) => (
                               <span key={i} className="font-black text-gray-950" style={{ fontSize: `${parseInt(size) + 4}px` }}>{size}</span>
                             ))}
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold">{language === 'zh' ? '字号' : 'Font Size'}</p>
                       </div>
                       <div>
                          <div className="flex gap-4 items-baseline mb-1">
                             {project.specs.weights.map((weight: string, i: number) => (
                               <span key={i} className="text-lg font-black text-gray-950">{weight}</span>
                             ))}
                          </div>
                          <p className="text-[10px] text-gray-400 font-bold">{language === 'zh' ? '字重' : 'Font Weight'}</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                {(project.specs.grid || project.specs.zhGrid) && (
                  <div className="pt-12">
                     <p className="text-[10px] font-black text-gray-400 mb-6 tracking-widest">{language === 'zh' ? '栅格布局' : 'Grid System'}</p>
                     <div className="space-y-4">
                        <p className="text-xl font-bold">{language === 'zh' ? project.specs.zhGrid : project.specs.grid}</p>
                        <div className="grid grid-cols-12 gap-2 h-20">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-gray-50 border border-gray-100 rounded-sm" />
                          ))}
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section 3: Gallery / Main Pages */}
          <div className="grid grid-cols-12 gap-12 border-t border-gray-100 pt-32">
            <div className="col-span-12 lg:col-span-4">
               <h2 className="text-xs font-black tracking-[0.2em] text-accent mb-8">03 / {language === 'zh' ? '主要页面展示' : 'Core Interfaces'}</h2>
            </div>
            <div className={`col-span-12 lg:col-span-8 ${project.id === 'metaverse-hub' ? 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24' : (project.id === 'suifly-vpn' || project.id === 'bluemountain-labs' || project.id === 'yougo-shopping' || project.id === 'xinwei-digital-twin' || project.id === 'xinwei-logistics' || project.id === 'weishi-website') ? 'space-y-12' : 'space-y-32'}`}>
              {project.id === 'weishi-website' && (
                <div className="space-y-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                    {content.slice(1, 5).map((item, idx) => (
                      <div key={idx} className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xl md:text-2xl font-black text-gray-950 uppercase tracking-tight border-b-2 border-accent inline-block pb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {project.images.slice(1, 5).map((img, i) => (
                      <div 
                        key={i} 
                        className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 aspect-video cursor-zoom-in group"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`Interface ${i + 1}`} 
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.id === 'xinwei-digital-twin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                  {content.slice(1, 5).map((item, idx) => (
                    <div key={idx} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl md:text-2xl font-black text-gray-950 uppercase tracking-tight border-b-2 border-accent inline-block pb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                          {item.text}
                        </p>
                      </div>
                      <div 
                        className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 cursor-zoom-in group"
                        onClick={() => setSelectedImage(project.images[idx + 1])}
                      >
                        <img 
                          src={project.images[idx + 1]} 
                          alt={item.title} 
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {project.id === 'xinwei-logistics' && (
                <div className="space-y-32">
                  {/* PC Section */}
                  <div className="space-y-12">
                    <div className="border-l-4 border-accent pl-6">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
                        {language === 'zh' ? 'PC端管理后台' : 'PC Management Backend'}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                      {content.slice(1, 5).map((item, idx) => (
                        <div key={idx} className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-xl md:text-2xl font-black text-gray-950 uppercase tracking-tight border-b-2 border-accent inline-block pb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                              {item.text}
                            </p>
                          </div>
                          <div 
                            className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 aspect-video cursor-zoom-in group"
                            onClick={() => setSelectedImage(project.images[idx + 1])}
                          >
                            <img 
                              src={project.images[idx + 1]} 
                              alt={item.title} 
                              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* H5 Section */}
                  <div className="space-y-12">
                    <div className="border-l-4 border-accent pl-6">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
                        {language === 'zh' ? '手机H5端' : 'Mobile H5 Terminal'}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                      {content.slice(5, 9).map((item, idx) => (
                        <div key={idx} className="space-y-6">
                          <div className="space-y-4">
                            <h4 className="text-xl md:text-2xl font-black text-gray-950 uppercase tracking-tight border-b-2 border-accent inline-block pb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                              {item.text}
                            </p>
                          </div>
                          <div 
                            className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 aspect-[375/812] max-w-[280px] mx-auto cursor-zoom-in group"
                            onClick={() => setSelectedImage(project.images[idx + 5])}
                          >
                            <img 
                              src={project.images[idx + 5]} 
                              alt={item.title} 
                              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {project.id === 'yougo-shopping' && (
                <div className="space-y-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {project.images.map((img, i) => (
                      <div 
                        key={i} 
                        className="aspect-[375/812] rounded-[2.5rem] bg-white p-[6px] shadow-2xl relative overflow-hidden border-[6px] border-gray-50 ring-1 ring-black/5 cursor-zoom-in group" 
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img} 
                          alt="" 
                          className="w-full h-full object-cover object-top rounded-[2rem] group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.id === 'suifly-vpn' && (
                <div className="space-y-20">
                  {/* PC View Row */}
                  <div 
                    className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 border border-gray-200 cursor-zoom-in group"
                    onClick={() => setSelectedImage(project.images[0])}
                  >
                    <img 
                      src={project.images[0]} 
                      alt="PC View" 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* 6 Apps Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-10">
                    {project.images.slice(1).map((img, i) => (
                      <div 
                        key={i} 
                        className="aspect-[375/812] rounded-[2rem] bg-white p-[5px] shadow-xl relative overflow-hidden border-[5px] border-gray-50 ring-1 ring-black/5 cursor-zoom-in group" 
                        onClick={() => setSelectedImage(img)}
                      >
                        <img 
                          src={img} 
                          alt="" 
                          className="w-full h-full object-cover object-top rounded-[1.8rem] group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.id === 'bluemountain-labs' && (
                <div className="space-y-12">
                  <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12 md:h-[400px] lg:h-[500px]">
                    {/* PC View */}
                    <div 
                      className="flex-[3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 cursor-zoom-in group"
                      onClick={() => setSelectedImage(project.images[0])}
                    >
                      <img 
                        src={project.images[0]} 
                        alt="PC View" 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* H5 View */}
                    <div 
                      className="flex-1 md:max-w-[280px] rounded-[2.5rem] bg-white p-[6px] shadow-2xl relative overflow-hidden border-[6px] border-gray-50 ring-1 ring-black/5 cursor-zoom-in group"
                      onClick={() => setSelectedImage(project.images[1])}
                    >
                      <img 
                        src={project.images[1]} 
                        alt="H5 View" 
                        className="w-full h-full object-cover object-top rounded-[2rem] group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {content.slice(1).map((item, idx) => {
                const isMobileLayout = project.id === 'metaverse-hub';
                const isSamayLayout = project.id === 'samay-search';
                const hasCustomLayout = [
                  'xinwei-digital-twin',
                  'xinwei-logistics',
                  'weishi-website',
                  'yougo-shopping',
                  'suifly-vpn',
                  'bluemountain-labs'
                ].includes(project.id);

                if (hasCustomLayout) return null;

                const nextImage = project.images[idx + 1];

                if (isMobileLayout && nextImage) {
                  return (
                    <div key={idx} className="flex flex-col gap-6 group">
                      <div className="space-y-4">
                        <h3 className="text-2xl font-black text-gray-950 uppercase tracking-tight border-b-2 border-accent inline-block pb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                          {item.text}
                        </p>
                      </div>
                      <div className="w-[180px] mx-auto relative">
                        <div 
                          className="aspect-[375/812] rounded-[2rem] bg-white p-[4px] shadow-xl relative overflow-hidden border-[4px] border-gray-50 ring-1 ring-black/5 cursor-zoom-in group"
                          onClick={() => setSelectedImage(nextImage)}
                        >
                          <img 
                            src={nextImage} 
                            alt="" 
                            className="w-full h-full object-cover object-top rounded-[1.8rem] group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }

                if (isSamayLayout) {
                  // Each Samay module uses 3 images: 1 PC, 2 Mobile
                  const pcImage = project.images[1 + idx * 3];
                  const mobile1 = project.images[2 + idx * 3];
                  const mobile2 = project.images[3 + idx * 3];

                  return (
                    <div key={idx} className="space-y-10">
                      <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-black text-gray-950 uppercase tracking-tight border-b-2 border-accent inline-block pb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                          {item.text}
                        </p>
                      </div>
                      
                      <div className="flex flex-row items-center md:items-end gap-3 md:gap-4 w-full h-[140px] md:h-[240px] lg:h-[300px] overflow-x-auto scrollbar-hide pb-4">
                        {/* PC Image */}
                        {pcImage && (
                          <div 
                            className="h-full aspect-video rounded-xl overflow-hidden shadow-md bg-gray-100 border border-gray-200 cursor-zoom-in group flex-shrink-0"
                            onClick={() => setSelectedImage(pcImage)}
                          >
                            <img 
                              src={pcImage} 
                              alt="" 
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        )}

                        {/* Mobile Images */}
                        {mobile1 && (
                          <div 
                            className="h-full aspect-[375/812] rounded-[0.8rem] md:rounded-[1.2rem] bg-white p-[2px] md:p-[4px] shadow-lg relative overflow-hidden border-[2px] md:border-[4px] border-gray-50 ring-1 ring-black/5 cursor-zoom-in group flex-shrink-0"
                            onClick={() => setSelectedImage(mobile1)}
                          >
                            <img 
                              src={mobile1} 
                              alt="" 
                              className="w-full h-full object-cover object-top rounded-[0.6rem] md:rounded-[1rem] group-hover:scale-110 transition-transform duration-700" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        )}
                        {mobile2 && (
                          <div 
                            className="h-full aspect-[375/812] rounded-[0.8rem] md:rounded-[1.2rem] bg-white p-[2px] md:p-[4px] shadow-lg relative overflow-hidden border-[2px] md:border-[4px] border-gray-50 ring-1 ring-black/5 cursor-zoom-in group flex-shrink-0"
                            onClick={() => setSelectedImage(mobile2)}
                          >
                            <img 
                              src={mobile2} 
                              alt="" 
                              className="w-full h-full object-cover object-top rounded-[0.6rem] md:rounded-[1rem] group-hover:scale-110 transition-transform duration-700" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={idx} className="space-y-12">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-950 uppercase tracking-tight border-b-4 border-accent inline-block pb-2">
                      {item.title}
                    </h3>
                    <div className="space-y-12">
                      {item.text.split('\n\n').map((paragraph, pIdx) => {
                        const match = paragraph.match(/^(\(|（)([0-9]+)(\)|）)\s*(.*)/s);
                        if (match) {
                          const num = match[2];
                          const lines = match[4].trim().split('\n');
                          const subTitle = lines[0];
                          const subContent = lines.slice(1).join('\n');
                          
                          return (
                            <div key={pIdx} className="flex flex-col md:flex-row gap-8 items-start group">
                              <div className="flex-shrink-0 w-14 h-14 bg-accent/5 border-2 border-accent/20 text-accent rounded-2xl flex items-center justify-center font-black text-xl italic group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                                {Number(num) < 10 ? `0${num}` : num}
                              </div>
                              <div className="space-y-4">
                                <h4 className="text-2xl font-black text-gray-950 uppercase tracking-tight">{subTitle}</h4>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                                  {subContent}
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <p key={pIdx} className="text-base md:text-lg text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              
              {project.id !== 'metaverse-hub' && project.id !== 'samay-search' && project.id !== 'suifly-vpn' && project.id !== 'bluemountain-labs' && project.id !== 'yougo-shopping' && project.id !== 'xinwei-digital-twin' && project.id !== 'xinwei-logistics' && project.id !== 'weishi-website' && (
                <div className="space-y-12">
                  {project.images.slice(1).map((img, i) => (
                    <div 
                      key={i} 
                      className="rounded-[2.5rem] overflow-hidden shadow-2xl cursor-zoom-in group"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
        src={selectedImage || ""} 
        alt={title} 
      />
    </div>
  );
}
