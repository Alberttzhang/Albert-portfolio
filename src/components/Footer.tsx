import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#1a1a1a] text-white py-32 px-6 md:px-12 lg:px-24 relative z-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-black leading-none uppercase mb-12">
              {t("footer.title").split(" ")[0]} <br />
              <span className="text-accent">{t("footer.title").split(" ").slice(1).join(" ")}</span>
            </h2>

            <div className="mt-12">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-black mb-4">Links</p>
              <div className="flex flex-row flex-wrap gap-8">
                <Link to="/about" className="text-sm font-bold hover:text-accent transition-colors uppercase tracking-widest">{t("nav.about")}</Link>
                <Link to="/works" className="text-sm font-bold hover:text-accent transition-colors uppercase tracking-widest">{t("nav.works")}</Link>
                <Link to="/visuals" className="text-sm font-bold hover:text-accent transition-colors uppercase tracking-widest">{t("nav.events")}</Link>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-12">
            <div className="text-left md:text-right space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-black">
                  {language === 'zh' ? '微信' : 'WeChat'}
                </p>
                <p className="text-2xl md:text-4xl font-black text-white">Alberttzhang</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-black">
                  {language === 'zh' ? '邮箱' : 'Email'}
                </p>
                <a 
                  href="mailto:alberttzhang@qq.com" 
                  className="text-2xl md:text-4xl font-black hover:text-accent transition-all border-b-2 border-white/10 hover:border-accent pb-2"
                >
                  alberttzhang@qq.com
                </a>
              </div>
            </div>
            
            <div className="w-full h-px bg-white/10" />
            
            <div className="flex flex-col md:flex-row justify-between w-full gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
              <p>{t("footer.rights")}</p>
              <p>DESIGNED & BUILT BY ALBERT</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
