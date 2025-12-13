import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2 theme-transition"
          style={{
            borderColor: 'var(--theme-accent)',
            boxShadow: '0 0 20px var(--theme-shadow)',
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full theme-accent-bg theme-transition"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              boxShadow: '0 0 8px var(--theme-glow)',
            }}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <ChevronDown 
            className="theme-accent w-6 h-6 theme-transition" 
            style={{
              filter: 'drop-shadow(0 0 8px var(--theme-glow))',
            }}
          />
        </motion.div>

        <motion.p
          className="theme-accent text-sm mt-2 theme-transition"
          style={{
            textShadow: '0 0 10px var(--theme-glow)',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
