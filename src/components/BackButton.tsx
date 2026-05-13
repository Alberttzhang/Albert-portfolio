import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function BackButton() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="fixed top-8 left-8 z-[500]">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 group text-black hover:text-accent transition-colors md:cursor-none"
        data-cursor="BACK"
      >
        <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg shadow-accent/20">
          <ArrowLeft size={18} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden md:block">
          {t("nav.back")}
        </span>
      </button>
    </div>
  );
}
