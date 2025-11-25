import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center theme-transition theme-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            textShadow: [
              '0 0 20px var(--theme-glow)',
              '0 0 40px var(--theme-glow)',
              '0 0 60px var(--theme-glow)',
              '0 0 40px var(--theme-glow)',
              '0 0 20px var(--theme-glow)',
            ]
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            y: { duration: 0.8 },
            textShadow: { duration: 3, repeat: Infinity }
          }}
          className="theme-accent tracking-[0.3em] mb-4 theme-transition"
          style={{ fontSize: '4rem' }}
        >
          CRYPTOGRAPHY
        </motion.h1>
        
        {showSubtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.7,
              textShadow: '0 0 15px var(--theme-glow)'
            }}
            transition={{ duration: 1 }}
            className="theme-accent tracking-[0.2em] theme-transition"
            style={{ fontSize: '1.5rem' }}
          >
            BLAKE2b
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
