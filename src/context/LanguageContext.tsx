import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "zh";

interface Translations {
  [key: string]: {
    [key: string]: string | string[] | any;
  };
}

export const translations: Translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      works: "Works",
      events: "Visual",
      playground: "Playground",
      menu: "Menu",
      back: "Back",
      getInTouch: "Get in touch",
    },
    hero: {
      dream: "Dream",
      subtitle1: "UX/UI Designer & Creative Event Planner",
      subtitle2: "Be a different designer",
      location: "Location",
      status: "Status",
      availability: "Available for projects",
      scroll: "Scroll to Explore",
      services: [
        "UI/UX Design",
        "Brand Design",
        "Product Design",
        "Visual Design"
      ]
    },
    marquee: "UX/UI DESIGNER • EVENT PLANNER • CREATIVE DIRECTOR • ",
    about: {
      label: "Editor's Note",
      quote: "Design is the silent ambassador of your brand.",
      title: "Crafting Experiences that resonate.",
      description: "I am Albert, a problem solver who uses design as his primary tool. From internet tech to fintech, I've spent my career doing one thing across different industries: transforming complex requirements into simple, intuitive products.",
      subDescription: "Having navigated the 0-to-1 process many times, I excel at finding clues in chaos and building frameworks from scratch. Whether it's the logical closure of B2B systems or the emotional connection of B2C products, I can handle it all independently.",
      skills: "Core Skills",
      skillsList: ["UX/UI Design", "Interaction Design", "Event Strategy", "Visual Identity", "Creative Direction"],
      tools: "Tools",
      toolsList: ["Figma / Adobe Suite", "React / Tailwind", "Framer Motion", "Blender (3D)", "Notion / Strategy"],
      focus: "Transforming complexity into intuitive products.",
      stats: {
        clients: "Clients",
        projects: "Projects",
        experience: "Experience"
      }
    },
    works: {
      label: "Portfolio",
      title: "Selected Works",
      description: "A curated collection of digital products and physical experiences designed to push boundaries",
      view: "View",
      viewAll: "View all",
    },
    events: {
      label: "Visual Identity",
      title: "Visual Identity",
      attendees: "Details",
    },
    playground: {
      label: "Side Projects",
      title: "Creative Playground",
      expand: "Expand",
    },
    footer: {
      title: "Contact me",
      rights: "© 2026 Albertの领域. All rights reserved.",
    },
    project: {
      back: "Back",
      role: "Role",
      timeline: "Timeline",
      tools: "Tools",
      client: "Client",
      next: "Next Project",
      home: "Back to Home",
    },
    aboutDetailed: {
      hero: {
        title1: "Hello, I am",
        title2: "Albert",
        tags: ["Developer", "Designer", "Problem Solver", "Innovator"]
      },
      narrative: {
        title: "The Narrative",
        p1: "I'm Albert. With deep experience in Tech and Fintech, I specialize in transforming complex requirements into intuitive products. From 0-to-1 ventures to balancing B2B logic with B2C emotion, I thrive on building order from scratch. My leadership experience has taught me that design and management share the same DNA: identifying, deconstructing, and solving problems.",
        p2: "This drive for clarity extends to large-scale event orchestration. Whether aligning pixels or coordinating cross-departmental operations, I focus on thinking clearly and executing precisely. I don't just draft designs; I ensure they work in the real world. For me, it's always about delivering tangible results."
      },
      skills: {
        title: "Technical Arsenal",
        categories: {
          frontend: "Brand Design",
          backend: "Visual Design",
          design: "Design",
          stack: "AI Integration"
        }
      },
      experience: {
        title: "Professional Journey",
        present: "Present",
        items: [
          {
            company: "Chengdu Weishi Shulian Technology",
            role: "Senior UI/UX Designer",
            period: "2023.8 - 2025.12",
            description: "Led end-to-end UI/UX design for a diverse B2B ecosystem, including sophisticated data platforms, admin backends, and large-scale data visualization projects. Strategically defined complex interaction logics through cross-functional reviews and delivered high-fidelity design systems. Independently authored comprehensive interactive documentation and conducted UX audits to optimize product flows. Architected the corporate brand identity from the ground up and spearheaded the end-to-end planning and execution of multiple high-stakes industry summits and exhibitions, ensuring seamless operations and unified brand presence.",
            achievements: ["Established 0-to-1 Brand Architecture", "Orchestrated 5+ High-impact Industry Summits"]
          },
          {
            company: "Chengdu Huolanshan Technology",
            role: "Design Lead / UI/UX Specialist",
            period: "2019.09 - 2023.05",
            description: "Architected the design department from the ground up, establishing performance KPIs and a mentorship-driven team structure to foster talent growth. Developed a comprehensive Brand Identity System (VI) and IP character ecosystem, ensuring design consistency across marketing, sales, and product development lifecycles. Led the R&D of core products (prototyping, UX/UI), collaborating cross-functionally to ensure high-fidelity implementation and strategically iterating on design systems to boost retention and conversion rates. Directed full-scale marketing visuals for major industry events and spearheaded multimedia content strategy, scaling the brand's social presence to 20,000+ followers.",
            achievements: ["Built 0-to-1 Design team & workflows", "Scaled social presence to 20k+ followers"]
          },
          {
            company: "Sichuan Mingxin Education Consulting",
            role: "Visual Designer",
            period: "2018.07 — 2019.07",
            description: "Led visual design for a comprehensive education product line and official website brand revitalization. Orchestrated the design and launch of 10+ key course landing pages, optimizing engagement and conversion. Developed the corporate VI system and managed end-to-end production of educational multimedia content, including recording and post-production, establishing high visual standards for brand communication.",
            achievements: ["Led visuals for 10+ course landing pages", "Managed end-to-end e-learning content production"]
          }
        ]
      },
      cta: {
        title: "Want to build \n something extraordinary?",
        button: "Get In Touch"
      },
      back: "Back to Portfolio"
    }
  },
  zh: {
    nav: {
      home: "首页",
      about: "关于",
      works: "项目",
      events: "视觉",
      playground: "游乐场",
      menu: "菜单",
      back: "返回",
      getInTouch: "联系我",
    },
    hero: {
      dream: "梦想",
      subtitle1: "UX/UI 设计师 & 创意品牌策划师",
      subtitle2: "做不一样的设计师",
      location: "所在地",
      status: "当前状态",
      availability: "开放项目合作",
      scroll: "向下探索",
      services: [
        "UI/UX设计",
        "品牌设计",
        "产品设计",
        "视觉设计"
      ]
    },
    marquee: "UX/UI 设计师 • 品牌策划 • 创意总监 • ",
    about: {
      label: "关于我",
      quote: "设计是品牌的无声大使。",
      title: "打造共鸣的体验。",
      description: "我是Albert，一个用设计解决问题的人。从互联网到金融，我在不同的行业里反复做一件事：把复杂的需求，变成简单好用的产品。",
      subDescription: "从0到1的过程我走过很多次，每一次都是从混沌里找线索，从空白里建框架。B端系统的逻辑闭环，C端产品的情感连接，我都能独立扛下来。",
      skills: "核心技能",
      skillsList: ["UX/UI 设计", "交互设计", "活动策略", "视觉识别", "创意指导"],
      tools: "工具",
      toolsList: ["Figma / Adobe Suite", "React / Tailwind", "Framer Motion", "Blender (3D)", "Notion / 策略"],
      focus: "把复杂的需求，变成简单好用的产品。",
      stats: {
        clients: "客户",
        projects: "项目",
        experience: "经验"
      }
    },
    works: {
      label: "作品集",
      title: "精选项目",
      description: "精心策划的数字产品和物理体验集合，旨在突破界限",
      view: "查看",
      viewAll: "查看全部",
    },
    events: {
      label: "Visual Identity",
      title: "视觉识别",
      attendees: "详情",
    },
    playground: {
      label: "业余项目",
      title: "创意游乐场",
      expand: "展开",
    },
    footer: {
      title: "联系我吧",
      rights: "© 2026 Albertの领域。保留所有权利。",
    },
    project: {
      back: "返回",
      role: "角色",
      timeline: "周期",
      tools: "工具",
      client: "客户",
      next: "下一个项目",
      home: "返回首页",
    },
    aboutDetailed: {
      hero: {
        title1: "你好",
        title2: "我是Albert",
        tags: ["开发者", "设计师", "问题解决者", "创新者"]
      },
      narrative: {
        title: "关于我的叙事",
        p1: "我是Albert。在互联网与金融行业深耕多年，我始终致力于将复杂需求转化为极简产品。从0到1的混沌探索，到B端逻辑闭环与C端情感连接的构建，我享受在空白中建立秩序的过程。两年的团队管理经验更让我明白：设计与管理本质相同，都是在不断地拆解并解决问题。",
        p2: "这种“理清头绪”的掌控感也延伸到了大型活动统筹。从屏幕像素的对齐到现场环节的咬合，我始终坚持“想清楚，做到位”。我不仅仅是画图，更在意方案是否跑得通、用户是否真的受益。我所追求的，始终是最终的结果。"
      },
      skills: {
        title: "技术武器库",
        categories: {
          frontend: "品牌设计",
          backend: "视觉设计",
          design: "UI/UX 设计",
          stack: "AI 运用"
        }
      },
      experience: {
        title: "职业旅程",
        present: "至今",
        items: [
          {
            company: "成都伟世数联科技有限公司",
            role: "高级 UI/UX 设计师",
            period: "2023.8 - 2025.12",
            description: "主导公司 B 端全链路设计体系建设，深度参与大数据可视化平台、复杂管理后台等核心项目的交互创新。通过技术评审深度参与业务逻辑构建，输出具备行业竞争力的 UI/UX 解决方案。独立产出标准化交互原型文档，驱动产品信息架构优化。从 0 到 1 统筹构建企业品牌视觉识别系统（VI）。作为大型行业会议及展会的核心负责人，负责从策略规划、展台搭建到人员调度等全流程落地，确保品牌在行业展场的高质量呈现与物料统筹进度。",
            achievements: ["统筹品牌视觉体系从 0 到 1 的构建", "主导多场大型行业展会全生命周期落地"]
          },
          {
            company: "成都火蓝山科技有限公司",
            role: "设计主管 / UI/UX 专家",
            period: "2019.09 - 2023.05",
            description: "主导设计团队从 0 到 1 的组建与效能优化，建立完善的绩效考核与人才梯度培养机制。构建全链路品牌视觉系统（VI）与 IP 形象体系，并推动其在市场、销售、产品等跨职能团队的规模化应用。带领团队负责核心产品的交互探索与 UI 研发，通过与上下游部门的紧密协作，确保产品高还原度上线；针对业务目标实时迭代设计策略，驱动用户留存与转化。统筹超大规模活动的营销视觉输出，把控从创意概念到线下物料交付的整体审美方向。开启多媒体运营矩阵，主导科普类系列短视频制作，助力品牌社交账号粉丝量突破 20,000+。",
            achievements: ["从 0 到 1 组建高效设计团队", "主导科普系列动画，粉丝数达 20,000+"]
          },
          {
            company: "四川明信教育咨询有限公司",
            role: "视觉设计师",
            period: "2018.07 — 2019.07",
            description: "主导教育产品全线视觉物料设计与官网品牌化升级。统筹设计并上线 10+ 核心课程专题页，显著提升了页面视觉吸引力与用户转化。负责公司 VI 系统构建、网课录制及后期剪辑全流程内容产出，确立了品牌传播的视觉标准。",
            achievements: ["主导 10+ 课程专题页视觉设计", "全流程管控网课多媒体内容产出"]
          }
        ]
      },
      cta: {
        title: "想要构建一些\n非凡的东西吗？",
        button: "取得联系"
      },
      back: "返回作品集"
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");

  const t = (path: string) => {
    const keys = path.split(".");
    let result: any = translations[language];
    for (const key of keys) {
      if (result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
