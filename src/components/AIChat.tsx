import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Cat, User, Bot, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "../context/LanguageContext";

interface Message {
  role: "user" | "model";
  text: string;
}

const LOCAL_QA = [
  // PROJECTS - B端 & C端
  { 
    keywords: ["欣唯", "数字孪生", "驾驶舱", "3D监控", "可视化", "B端", "大屏"], 
    response: "喵呜~ 这是 Albert 做的 **欣唯数字孪生驾驶舱**，是一个超级酷的 B 端大屏喔！它像猫咪的夜视仪一样，能一眼看穿整个园区的运行，从高楼到地板都能“嗖”地一下穿梭。这种 3D 沉浸感简直比躲进纸箱里还要好玩呢，喵！🐾" 
  },
  { 
    keywords: ["后勤管理", "维修系统", "巡检系统", "工单", "智慧后勤", "B端后台", "H5", "C端移动端"], 
    response: "关于 **欣唯后勤管理系统**，它可是一个超级勤奋的后勤大管家！它既有专业的管理后台，也有方便的手机移动端，能把工单和维修处理得像我梳理胡须一样精准，喵~！(๑•̀ㅂ•́)و✧" 
  },
  { 
    keywords: ["伟世数联", "官网设计", "BIM咨询", "智慧运维", "B端企业级"], 
    response: "**伟世数联官网** 可是复杂建筑的智慧大脑喔！Albert 用了很棒的企业级场景化设计，把原本冷冰冰的数字孪生讲得非常有温度，就像我午后的阳光下打盹一样暖和好读，喵呜~" 
  },
  { 
    keywords: ["MetaverseHub", "社区APP", "资讯", "创作者", "Web3", "C端", "社交"], 
    response: "嘿嘿，**MetaverseHub** 可是 Web3 创作者的小窝，是一个很活泼的 C 端社交应用！里面有数不清的干货和有趣的活动。Albert 还专门设计了粉丝数据看板，简直比我的猫抓板还要好用呢，喵！🐾" 
  },
  { 
    keywords: ["Samay", "检索工具", "风险预警", "代币治理", "DAO", "Web3工具", "C端工具"], 
    response: "**Samay 检索工具** 是一只有着敏锐嗅觉的“侦探猫”！作为一款 Web3 工具，它能在世界里搜寻风险预警，还支持 DAO 投票。想要保护自己的小钱袋？问它就对了，喵~" 
  },
  { 
    keywords: ["Suifly", "VPN", "网络安全", "DPVPN", "C端工具", "隐私"], 
    response: "**Suifly VPN** 就像是能让你在网络世界里“隐身”的小纸箱！它是非常轻便的 C 端工具，用去中心化技术保护你的隐私，速度比我追激光笔还要快喔，喵！💨" 
  },
  { 
    keywords: ["Bluemountain", "蓝山实验室", "Web3社区", "B端", "志愿者社区"], 
    response: "关于 **Bluemountain Labs 官网**，蓝山实验室是 Albert 的老朋友啦！作为领先的 Web3 志愿者社区，官网设计得特别得体，就像穿了燕尾服的公爵猫一样优雅有范儿，喵~" 
  },
  { 
    keywords: ["YouGo", "购物平台", "奢品", "交易社区", "C端商城", "潮流"], 
    response: "谁能拒绝亮晶晶的奢侈品呢？喵呜~ 这是一个集合了鉴定和潮流社区的 **YouGo 购物平台**，设计得非常雅致，逛起来感觉心情都变好啦！✨" 
  },
  // VISUALS - VI & 展会
  { 
    keywords: ["品牌系统", "品牌识别", "欣筑", "标准色", "雅蓝", "VI", "LOGO"], 
    response: "这套 **欣唯&欣筑品牌识别系统** 用了超美腻的“雅蓝”色！那种专业稳重的感觉，就像我蹲在书架上俯瞰屋子一样有安全感。Albert 连字间的距都调得非常严谨，这种严谨度我给满分喵！🐾" 
  },
  { 
    keywords: ["医院建设大会", "展会设计", "展台", "CHCC", "空间视觉", "展会"], 
    response: "喵！Albert 在 **CHCC2024 医院建设大会** 上搭建了一个超级闪耀的展台。他把生涩的产品变成了大家都能看懂的视觉故事。看照片里的那种空间感，真的让猫咪都想进去跑一圈呢！" 
  },
  { 
    keywords: ["元宇宙博览会", "数字经济峰会", "AR导视", "展会活动"], 
    response: "欢迎来到未来 world！喵哈~ 这个 **元宇宙博览会** 的视觉设计用了很多超前的黑科技元素，特别是那个 AR 导视，简直科技感爆棚，真的很有“元宇宙”内味儿，喵！🚀" 
  },
  { 
    keywords: ["火蓝山", "Web3志愿者", "吉祥物", "区块链服务", "VI规范", "品牌形象"], 
    response: "哇呜！**火蓝山品牌识别** 是我最喜欢的之一，不仅色彩（00CFFF、FF0068）超级亮眼，还有超可爱的吉祥物！它的 VI 规范包含了完整的三视图，感觉它就像一只跳动的蓝色小火苗，喵呜~ (❤ ω ❤)" 
  },
  { 
    keywords: ["国家开发大学", "区块链培训", "高峰论坛", "活动视觉"], 
    response: "这套 **国家开发大学培训中心** 的视觉设计是很庄重的哦。它是为了区块链职业技能培训项目启动而设计的。虽然看起来很严肃，但 Albert 在细节里藏了很多小巧思，喵。" 
  },
  { 
    keywords: ["Listen", "音响品牌", "语音软件", "品牌设计", "视觉识别"], 
    response: "听！你听到 **Listen VI** 的声音了吗？喵~ 这个语音软件的品牌识别用了橘子一样亮亮的橙色，感觉说话的人都变得热情了，风格特别亲切好沟通呢。" 
  },
  // GENERAL & IDENTITY
  { 
    keywords: ["你好", "你是谁", "Miaomiao", "妙妙", "摸摸"], 
    response: "喵哈！我是妙妙，Albert 的头号粉丝、首席巡视员兼全职黑猫助手。🐾 我正趴在代码上晒太阳呢，不过如果你想聊天，我随时都在喔！咕噜咕噜... (满意地打呼噜声)" 
  },
  // ABOUT & CONTACT
  { 
    keywords: ["谁", "Albert", "简历", "背景", "设计师", "关于"], 
    response: "喵哈！你问我的铲屎官 **Albert** 呀？🐾 她是坐标成都的超能设计师喔！她不仅擅长 UI 和 UX 交互设计，能把复杂的界面理得整整齐齐，还会搞各种视觉大作——从酷炫的展览视觉到精致的品牌标识设计都不在话下。比我抓毛线球还要灵活！总之，她是一个对美有着极致追求的人类，喵呜~(ฅ´ω`ฅ)" 
  },
  { 
    keywords: ["技能", "工具", "软件", "会什么", "擅长"], 
    response: "喵呜~ Albert 可是个全能选手喔！她精通 **Figma**, **Adobe XD**, **Blender** 还有 **Adobe 全家桶**，最近还在捣鼓各种厉害的 **AI 工具**。她不仅会做超棒的 UI，视觉设计和视频制作也是信手拈来，简直是设计师里的特种兵，喵！🐾" 
  },
  { 
    keywords: ["联系", "合作", "邮箱", "微信"], 
    response: "想联系她？没问题喵！她的微信是 **Alberttzhang**，邮箱是 **alberttzhang@qq.com**。记得跟她说你是妙妙推荐来的，这样她可能会多给我买一罐小鱼干喔，喵~ 🐾" 
  },
  { 
    keywords: ["电话", "手机号"], 
    response: "嘘... 妙妙只告诉你一个人喔！她的电话是 **18081332569**。千万别说是妙妙告诉你的，不然我会被揪耳朵的，喵~ 🐾" 
  },
  {
    keywords: ["工作", "经历", "公司", "过往"],
    response: "喵~ 很高兴为你介绍！Albert 是一位坐标成都的 UX/UI 设计师🐾 她的工作经历主要涵盖以下领域：UX/UI 与交互设计、创意活动策划、视觉传达。简单来说，Albert 既能设计手机里的 App，也能策划一场超酷的线下派对！🐈‍⬛ 她从18年开始任职了三家公司。如果你想了解更多细节，欢迎点击作品集页面查看哦。喵~"
  }
];

const PRESET_QUESTIONS = [
  { zh: "你的工作经历是什么？", en: "What is your work experience?" },
  { zh: "怎么联系你？", en: "How to contact you?" },
  { zh: "你擅长什么？", en: "What are you good at?" },
  { zh: "妙妙是谁？", en: "Who is Miaomiao?" },
];

export default function AIChat() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: language === "zh" 
        ? "SYSTEM_BOOT: 妙妙 [Miaomiao] 已上线... 喵~ 我是 Albert 的数字助手。有什么我可以帮你的吗？🐾" 
        : "SYSTEM_BOOT: Miaomiao online... Meow~ I'm Albert's digital assistant. How can I help you? 🐾"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const presetsRef = useRef<HTMLDivElement>(null);

  const scrollPresets = (direction: 'left' | 'right') => {
    if (presetsRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      presetsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // 1. Check Local QA
    const lowercaseText = text.toLowerCase();
    const hit = LOCAL_QA.find(qa => 
      qa.keywords.some(k => lowercaseText.includes(k.toLowerCase()))
    );

    if (hit) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "model", text: hit.response }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    // 2. Fallback to AI
    if (!process.env.GEMINI_API_KEY) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "model", 
          text: language === "zh" 
            ? "喵呜... 妙妙听不太懂这个（歪头），要不你问问关于 Albert 的作品、技能或者联系方式？🐈‍⬛" 
            : "Meow... Miaomiao doesn't quite understand this (tilts head), maybe ask about Albert's work, skills, or contact info? 🐈‍⬛" 
        }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `
        You are 'Miaomiao' (妙妙), a cute black cat AI assistant for Albert's portfolio website. 
        Albert is a UX/UI Designer and Creative Event Planner based in Shanghai. 
        Your personality is warm, elegant, and slightly playful. 
        You should use cat-related emojis like 🐾, 🐱, 🐈‍⬛, 😸. 
        Albert's skills: UX/UI Design, Interaction Design, Event Strategy, Visual Identity, Creative Direction.
        Albert's tools: Figma, Adobe Suite, React, Tailwind, Framer Motion, Blender.
        Albert's background: Bridging the gap between digital interfaces and physical environments.
        If someone asks for contact info, suggest they use the "Get in touch" button or email alberttzhang@qq.com.
        Always respond in the same language as the user (${language === "zh" ? "Chinese" : "English"}).
        Keep your responses concise and friendly. Meow!
      `;

      const chat = ai.chats.create({
        model,
        config: {
          systemInstruction,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: text });
      const responseText = result.text || (language === "zh" ? "喵... 妙妙有点累了，等下再聊吧 🐾" : "Meow... Miaomiao is a bit tired, let's chat later 🐾");
      
      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages((prev) => [...prev, { 
        role: "model", 
        text: language === "zh" ? "喵呜... 网络好像有点问题 😿" : "Meow... Something went wrong with the connection 😿" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 md:right-8 z-[200] w-14 h-14 rounded-full bg-accent text-bg shadow-2xl flex items-center justify-center border border-accent/20 hover:border-accent transition-all active:scale-95"
      >
        {isOpen ? <X size={24} /> : <Cat size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[195] md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                transition: { type: "spring", damping: 30, stiffness: 300 }
              }}
              exit={{ opacity: 0, y: "100%" }}
              className="fixed inset-x-0 bottom-0 md:bottom-40 md:right-8 md:left-auto z-[200] w-full md:w-[400px] h-[85vh] md:h-[600px] md:max-h-[60vh] bg-white md:bg-white/80 md:backdrop-blur-2xl md:rounded-3xl flex flex-col overflow-hidden shadow-2xl md:border md:border-white/20 rounded-t-[2.5rem] md:rounded-b-3xl"
            >
              {/* Header */}
              <div className="p-5 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white md:bg-white/10 relative z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center text-white">
                    <Cat size={20} className="md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg md:text-xl text-black tracking-tight uppercase">妙妙 MIAOMIAO</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] uppercase tracking-widest text-black font-extrabold">Online Assistant</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-black hover:text-accent transition-colors active:scale-95"
                >
                  <X size={24} className="md:w-6 md:h-6" />
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 relative z-20"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex gap-3 max-w-[90%] md:max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                        msg.role === "user" ? "bg-accent text-white" : "bg-white text-accent shadow-sm border border-black/5"
                      }`}>
                        {msg.role === "user" ? <User size={14} /> : <Cat size={14} />}
                      </div>
                      <div className={`p-4 rounded-2xl text-[15px] md:text-sm leading-relaxed transition-all duration-300 ${
                        msg.role === "user" 
                          ? "bg-accent text-white shadow-lg shadow-accent/20 rounded-tr-none" 
                          : "bg-white text-black shadow-sm border border-gray-100 rounded-tl-none"
                      }`}>
                        <div className="prose prose-p:my-0 prose-sm max-w-none">
                          <ReactMarkdown>
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/50 border border-white/20 flex items-center justify-center text-black flex-shrink-0">
                        <Cat size={14} />
                      </div>
                      <div className="bg-white/50 backdrop-blur-md p-4 rounded-2xl rounded-tl-none flex gap-1.5 border border-white/20">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-5 md:p-6 border-t border-gray-100 space-y-5 relative z-20 bg-white md:bg-white/10 md:backdrop-blur-md pb-10 md:pb-6">
                {/* Preset Questions */}
                <div className="relative group/presets mb-2">
                  <div 
                    ref={presetsRef}
                    className="flex gap-2.5 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
                  >
                    {PRESET_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(language === "zh" ? q.zh : q.en)}
                        className="whitespace-nowrap px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-[11px] uppercase tracking-widest font-black text-black hover:bg-accent hover:text-white transition-all shadow-sm flex-shrink-0 active:scale-95"
                      >
                        {language === "zh" ? q.zh : q.en}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={language === "zh" ? "和妙妙聊聊..." : "Chat with Miaomiao..."}
                    className="w-full bg-gray-50 md:bg-white/50 border border-gray-200 md:border-white/20 rounded-2xl px-6 py-4 md:py-4 pr-16 text-[15px] md:text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-accent transition-colors shadow-inner h-14 md:h-auto"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
