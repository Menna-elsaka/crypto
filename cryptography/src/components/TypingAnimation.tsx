import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}

export function TypingAnimation({ text, className = '', style = {}, speed = 100 }: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className} style={style}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-1 h-[1em] ml-1 theme-accent-bg theme-transition"
        style={{
          verticalAlign: 'middle',
          boxShadow: '0 0 10px var(--theme-glow)',
        }}
      />
    </span>
  );
}
