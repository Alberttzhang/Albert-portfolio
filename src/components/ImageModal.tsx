import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export default function ImageModal({ isOpen, onClose, src, alt }: ImageModalProps) {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');

  useEffect(() => {
    if (!isOpen) {
      setViewMode('desktop');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out"
        >
          <motion.button
            className="absolute top-10 right-10 text-white hover:text-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={32} />
          </motion.button>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`
              w-full bg-black/20 rounded-2xl md:rounded-[3rem] 
              overflow-hidden shadow-2xl relative flex items-center justify-center p-2
              ${viewMode === 'mobile' 
                ? 'max-w-[400px] aspect-[375/812]' 
                : 'max-w-[90vw] lg:max-w-7xl aspect-video'
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`
              w-full h-full overflow-y-auto custom-scrollbar 
              rounded-[1.5rem] md:rounded-[2.5rem] scroll-smooth
            `}>
              <div className="min-h-full flex flex-col items-center bg-black/40">
                <img 
                  src={src} 
                  alt={alt} 
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    const width = img.naturalWidth;
                    const height = img.naturalHeight;
                    const ratio = width / height;
                    
                    // Logic: Mobile images are typically vertical and narrow (< 1000px width)
                    // Desktop images are wider, or if they are long/tall, their original design width is large.
                    if (width < 900 && ratio < 0.7) {
                      setViewMode('mobile');
                    } else {
                      setViewMode('desktop');
                    }
                  }}
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
