import { motion } from 'motion/react';

interface StateGridProps {
  values: string[];
  highlightIndices?: number[];
  title: string;
  className?: string;
}

export function StateGrid({ values, highlightIndices = [], title, className = '' }: StateGridProps) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-lg"
        >
          ⚙️
        </motion.div>
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {values.map((value, index) => {
          const isHighlighted = highlightIndices.includes(index);
          return (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: isHighlighted ? 1.05 : 1,
                opacity: 1,
                boxShadow: isHighlighted
                  ? '0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(91, 141, 238, 0.4)'
                  : '0 0 5px rgba(138, 43, 226, 0.2)'
              }}
              transition={{
                scale: { duration: 0.3, type: "spring", stiffness: 300 },
                boxShadow: { duration: 0.3 }
              }}
              className={`
                px-3 py-2 rounded-lg font-mono text-xs border-2 relative overflow-hidden
                ${isHighlighted
                  ? 'bg-gradient-to-br from-purple-600/60 to-blue-600/60 border-purple-400 text-white'
                  : 'bg-slate-800/60 border-slate-700 text-gray-300'
                }
              `}
            >
              {/* Animated glow effect for highlighted items */}
              {isHighlighted && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
              
              <div className="relative z-10">
                <div className="text-[10px] text-gray-400 mb-1">v[{index}]</div>
                <div className="font-bold text-[11px] truncate">{value}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

