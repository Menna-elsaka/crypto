import { motion } from 'motion/react';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingParticlesProps {
  count?: number;
}

export function FloatingParticles({ count = 50 }: FloatingParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {particles.slice(0, 20).map((particle, i) => {
          const nextParticle = particles[(i + 1) % 20];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${particle.x}%`}
              y1={`${particle.y}%`}
              x2={`${nextParticle.x}%`}
              y2={`${nextParticle.y}%`}
              stroke="var(--theme-accent)"
              strokeWidth="1"
              strokeOpacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
              className="theme-transition"
            />
          );
        })}
      </svg>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full theme-transition"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, var(--theme-accent) 0%, var(--theme-accent-secondary) 100%)',
            boxShadow: '0 0 10px var(--theme-glow)',
            opacity: 0.8
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Neural Network Nodes */}
      {particles.slice(0, 10).map((particle) => (
        <motion.div
          key={`node-${particle.id}`}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        >
          <motion.div
            className="relative w-6 h-6"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div 
              className="absolute inset-0 rounded-full border-2 theme-transition" 
              style={{
                borderColor: 'var(--theme-accent)',
                opacity: 0.3
              }}
            />
            <motion.div
              className="absolute inset-1 rounded-full theme-transition"
              style={{
                backgroundColor: 'var(--theme-accent)',
                opacity: 0.2
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Glowing orbs */}
      {particles.slice(0, 5).map((particle) => (
        <motion.div
          key={`orb-${particle.id}`}
          className="absolute rounded-full blur-xl theme-transition"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: 100,
            height: 100,
            background: 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)',
            opacity: 0.2
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration * 2,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
