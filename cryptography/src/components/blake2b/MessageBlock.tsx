import { motion } from 'motion/react';

interface MessageBlockProps {
  values: string[];
  highlightIndices?: number[];
  className?: string;
}

export function MessageBlock({ values, highlightIndices = [], className = '' }: MessageBlockProps) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg"
        >
          📦
        </motion.div>
        Message Block m[0..15]
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map((value, index) => {
          const isHighlighted = highlightIndices.includes(index);
          return (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHighlighted ? 1.1 : 1,
                opacity: 1,
                boxShadow: isHighlighted
                  ? '0 0 25px rgba(59, 130, 246, 0.8), 0 0 50px rgba(139, 92, 246, 0.4)'
                  : '0 0 5px rgba(59, 130, 246, 0.2)'
              }}
              transition={{
                scale: { duration: 0.3, type: "spring", stiffness: 300 },
                boxShadow: { duration: 0.3 }
              }}
              className={`
                px-3 py-2 rounded-lg font-mono text-xs border-2 relative overflow-hidden
                ${isHighlighted
                  ? 'bg-gradient-to-br from-blue-600/60 to-indigo-600/60 border-blue-400 text-white'
                  : 'bg-slate-800/60 border-slate-700 text-gray-300'
                }
              `}
            >
              {/* Pulse effect for highlighted items */}
              {isHighlighted && (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    className="absolute -inset-1 border-2 border-blue-400 rounded-lg"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  />
                </>
              )}
              
              <div className="relative z-10">
                <div className="text-[10px] text-gray-400 mb-1">m[{index}]</div>
                <div className="font-bold text-[11px] truncate">{value}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

