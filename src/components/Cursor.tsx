import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverData = target.closest("[data-cursor]") as HTMLElement;
      if (hoverData) {
        setIsHovered(true);
        setCursorText(hoverData.getAttribute("data-cursor") || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", moveMouse);
      window.addEventListener("mouseover", handleHover);
    }
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className={`custom-cursor ${isHovered ? "hovering" : ""}`}
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      data-label={cursorText}
    />
  );
}
