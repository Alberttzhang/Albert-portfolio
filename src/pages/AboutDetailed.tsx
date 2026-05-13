import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "../components/InteractionHelpers";
import { 
  Code2, 
  Palette, 
  Terminal, 
  Cpu, 
  Briefcase, 
  Calendar,
  Globe,
  Database,
  Layers,
  Sparkles,
  Compass,
  Monitor
} from "lucide-react";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function AboutDetailed() {
  const { t } = useLanguage();

  const skills = [
    {
      category: t("aboutDetailed.skills.categories.design"),
      icon: <Palette className="w-6 h-6" />,
      items: ["UI/UX", "Figma", "Motion Design", "Visual Identity", "3D Modeling"]
    },
    {
      category: t("aboutDetailed.skills.categories.frontend"),
      icon: <Compass className="w-6 h-6" />,
      items: ["Brand Strategy", "Visual Identity", "Typography", "Color Systems", "Brand Guidelines"]
    },
    {
      category: t("aboutDetailed.skills.categories.backend"),
      icon: <Monitor className="w-6 h-6" />,
      items: ["Illustration", "3D Rendering", "Motion Graphics", "Photo Manipulation", "Key Visuals"]
    },
    {
      category: t("aboutDetailed.skills.categories.stack"),
      icon: <Sparkles className="w-6 h-6" />,
      items: ["Prompt Engineering", "Large Language Models", "Midjourney / SD", "AI Workflow", "Model Fine-tuning"]
    }
  ];

  const experienceItems = t("aboutDetailed.experience.items") || [];

  return (
    <main className="min-h-screen text-gray-900 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="py-24 md:py-32 px-6 md:px-12 lg:px-20 pt-32 relative z-10">
        <div className="w-full">
          {/* Hero & Narrative Section */}
          <section className="mb-40">
            <div className="magazine-grid">
              {/* Left Column: Image */}
              <div className="col-span-12 lg:col-span-3">
                <Reveal>
                  <div className="relative aspect-square md:aspect-[3/4] rounded-[2rem] overflow-hidden border border-gray-100 group shadow-2xl">
                    <img 
                      src="https://i.postimg.cc/qBsdDBh1/albert.png" 
                      alt="Albert" 
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Reveal>
              </div>

              {/* Right Column: Title & Intro (Adaptive) */}
              <div className="col-span-12 lg:col-span-8 lg:col-start-5 flex flex-col justify-end">
                <div className="mb-12">
                  <Reveal width="100%">
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight text-gray-950">
                      <span className="uppercase">{t("aboutDetailed.hero.title1")}</span> <span className="text-accent normal-case">{t("aboutDetailed.hero.title2")}</span>
                    </h1>
                  </Reveal>
                  <Reveal delay={0.2} width="100%">
                    <div className="flex flex-wrap gap-4">
                      {(t("aboutDetailed.hero.tags") || []).map((tag: string) => (
                        <span 
                          key={tag} 
                          className="px-4 py-1.5 rounded-full border border-gray-100 bg-gray-50 text-xs font-bold uppercase tracking-widest text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>

                <Reveal delay={0.3} width="100%">
                  <div className="space-y-8 text-xl md:text-2xl font-medium leading-relaxed text-gray-800 border-t border-gray-100 pt-16">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-accent mb-6 leading-none">
                      {t("aboutDetailed.narrative.title")}
                    </h2>
                    <p className="max-w-3xl leading-[1.8]">
                       {t("aboutDetailed.narrative.p1")}
                     </p>
                     <p className="text-gray-400 max-w-3xl leading-[1.8]">
                       {t("aboutDetailed.narrative.p2")}
                     </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* Skills Matrix */}
          <section className="mb-40">
            <Reveal width="100%">
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-accent mb-16 leading-none border-b border-gray-100 pb-8">
                {t("aboutDetailed.skills.title")}
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, i) => (
                <Reveal key={skill.category} delay={i * 0.1} width="100%" className="h-full">
                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-accent/10 transition-all h-full group">
                    <div className="mb-6 p-4 rounded-2xl bg-accent/10 text-accent inline-block group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-wider mb-6 text-gray-900">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span key={item} className="text-sm text-gray-500">{item}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="mb-40">
            <Reveal width="100%">
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-accent mb-16 leading-none border-b border-gray-100 pb-10">
                {t("aboutDetailed.experience.title")}
              </h2>
            </Reveal>
            
            <div className="space-y-0">
              {experienceItems.map((exp: any, i: number) => (
                <div key={exp.company} className="group relative border-b border-gray-100 hover:bg-gray-50/50 transition-all py-16 lg:py-24 rounded-none">
                  <div className="magazine-grid">
                    {/* Left Column: Fixed Timeline Side */}
                    <div className="col-span-12 lg:col-span-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                          <span className="text-sm lg:text-base font-black tracking-[0.2em] text-gray-950 uppercase block">
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-4xl font-black text-gray-950 group-hover:text-accent transition-colors leading-none tracking-tighter uppercase">
                          {exp.company}
                        </h3>
                      </div>
                    </div>

                    {/* Right Column: Narrative Side (Adaptive) */}
                    <div className="col-span-12 lg:col-span-8 lg:col-start-5">
                      <Reveal delay={0.1} width="100%">
                        <div className="max-w-3xl">
                          <h4 className="text-xl lg:text-2xl font-black mb-6 text-gray-950 uppercase tracking-tight leading-tight group-hover:translate-x-2 transition-transform duration-500">
                            {exp.role}
                          </h4>
                          <p className="text-base lg:text-lg text-gray-500 mb-10 leading-[1.8] font-medium">
                            {exp.description}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                            {(exp.achievements || []).map((achievement: string) => (
                              <div key={achievement} className="flex items-start gap-3 p-5 rounded-2xl bg-gray-50 group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all shadow-sm hover:shadow-xl">
                                <Sparkles className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span className="text-xs lg:text-sm font-bold text-gray-800 leading-snug">{achievement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <BackButton />
    </main>
  );
}
