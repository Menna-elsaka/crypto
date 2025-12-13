import { motion } from 'motion/react';

export function FloatingElements() {
  const elements = [
    { size: 60, delay: 0, duration: 20, x: '10%', y: '20%' },
    { size: 40, delay: 2, duration: 25, x: '80%', y: '30%' },
    { size: 50, delay: 1, duration: 22, x: '70%', y: '70%' },
    { size: 35, delay: 3, duration: 18, x: '20%', y: '80%' },
    { size: 45, delay: 1.5, duration: 23, x: '90%', y: '50%' },
    { size: 30, delay: 2.5, duration: 19, x: '15%', y: '50%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full theme-transition"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: index % 2 === 0 
              ? 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)'
              : 'radial-gradient(circle, var(--theme-accent-secondary) 0%, transparent 70%)',
            filter: 'blur(2px)',
            opacity: 0.1
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div 
            className="w-1 h-1 rounded-full theme-accent-bg theme-transition"
            style={{ 
              boxShadow: '0 0 10px var(--theme-glow)'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
