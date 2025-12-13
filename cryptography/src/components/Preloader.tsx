import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import logo from 'figma:asset/e74a85a657cb63546e0a553caf049b3afbacaa51.png';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center theme-transition theme-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{ pointerEvents: progress >= 100 ? 'none' : 'auto' }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 theme-transition" 
          style={{
            backgroundImage: 'linear-gradient(var(--theme-accent) 1px, transparent 1px), linear-gradient(90deg, var(--theme-accent) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} 
        />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full theme-accent-bg theme-transition"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo with Circuit Reveal Effect */}
        <motion.div className="relative">
          {/* Outer rotating rings */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0 rounded-full border-2 theme-transition"
              style={{
                width: 200 + index * 40,
                height: 200 + index * 40,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
                borderColor: 'var(--theme-accent)',
                opacity: 0.3
              }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: 1,
                rotate: 360,
                opacity: [0, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                rotate: {
                  duration: 3 + index,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
            />
          ))}

          {/* Circuit lines drawing effect */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ width: 280, height: 280, left: '50%', top: '50%', x: '-50%', y: '-50%' }}
          >
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x1 = 140 + Math.cos(angle) * 60;
              const y1 = 140 + Math.sin(angle) * 60;
              const x2 = 140 + Math.cos(angle) * 120;
              const y2 = 140 + Math.sin(angle) * 120;
              
              return (
                <motion.line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--theme-accent)"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 6px var(--theme-glow))',
                  }}
                  className="theme-transition"
                />
              );
            })}
          </svg>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring' }}
            className="relative z-10"
          >
            <motion.img
              src={logo}
              alt="FCAI Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 theme-transition"
              style={{
                borderColor: 'var(--theme-accent)',
                boxShadow: '0 0 30px var(--theme-shadow)',
                filter: 'drop-shadow(0 0 20px var(--theme-glow))'
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 20px var(--theme-glow))',
                  'drop-shadow(0 0 40px var(--theme-glow))',
                  'drop-shadow(0 0 20px var(--theme-glow))',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-3xl theme-transition"
            style={{
              backgroundColor: 'var(--theme-accent)',
              opacity: 0.2
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Neural Network Loading Animation */}
        <div className="flex gap-2 mt-8">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full theme-transition"
              style={{
                background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                boxShadow: '0 0 15px var(--theme-glow)'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.h3
            className="theme-accent mb-2 text-lg sm:text-xl theme-transition theme-glow"
          >
            Loading Cryptography Platform
          </motion.h3>
          
          {/* Progress Bar */}
          <div 
            className="w-64 h-2 rounded-full overflow-hidden theme-transition"
            style={{
              backgroundColor: 'var(--theme-card-bg)',
              border: '1px solid var(--theme-card-border)'
            }}
          >
            <motion.div
              className="h-full theme-transition"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary), var(--theme-accent))`,
                boxShadow: '0 0 20px var(--theme-glow)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
            />
          </div>
          
          <motion.p className="theme-accent mt-2 text-sm theme-transition">
            {progress}%
          </motion.p>
        </motion.div>

        {/* Scanning effect */}
        <motion.div
          className="absolute inset-0 theme-transition"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--theme-accent), transparent)',
            opacity: 0.1
          }}
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </motion.div>
  );
}
