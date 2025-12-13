import { motion, AnimatePresence } from 'motion/react';

interface GFunctionAnimationProps {
  indices: number[];
  mIndices: number[];
  before: { a: string; b: string; c: string; d: string };
  after: { a: string; b: string; c: string; d: string };
  round: number;
  gIndex: number;
}

export function GFunctionAnimation({
  indices,
  mIndices,
  before,
  after,
  round,
  gIndex
}: GFunctionAnimationProps) {
  const labels = ['a', 'b', 'c', 'd'];
  const colors = [
    'from-purple-500 to-purple-700',
    'from-blue-500 to-blue-700',
    'from-green-500 to-green-700',
    'from-yellow-500 to-yellow-700'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-purple-500/50"
      style={{
        boxShadow: '0 0 30px rgba(138, 43, 226, 0.3), inset 0 0 20px rgba(138, 43, 226, 0.1)'
      }}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-bold text-white">
            G Function #{gIndex} — Round {round}
          </h4>
          <motion.div
            className="px-3 py-1 bg-purple-600/30 rounded-full border border-purple-400/50"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs text-purple-200">G Function</span>
          </motion.div>
        </div>
        <p className="text-sm text-purple-300">
          Mixing state variables • Working on indices: [{indices.join(', ')}]
        </p>
        <p className="text-xs text-blue-300 mt-1">
          Message words: m[{mIndices[0]}] and m[{mIndices[1]}]
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {labels.map((label, idx) => {
          const index = indices[idx];
          const beforeValue = Object.values(before)[idx];
          const afterValue = Object.values(after)[idx];
          const hasChanged = beforeValue !== afterValue;
          
          return (
            <motion.div
              key={label}
              className="relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: hasChanged ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`
                p-3 rounded-lg border-2 relative overflow-hidden
                bg-gradient-to-br ${colors[idx]}
                ${hasChanged ? 'border-white/50' : 'border-gray-600/50'}
              `}>
                {hasChanged && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10">
                  <div className="text-xs font-semibold text-white/80 mb-1">
                    v[{index}] ({label})
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {hasChanged ? (
                      <motion.div
                        key="after"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="font-mono text-xs text-white font-bold"
                      >
                        {afterValue}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="before"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-xs text-white/90"
                      >
                        {beforeValue}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Operation flow visualization */}
      <motion.div
        className="mt-4 pt-4 border-t border-purple-500/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-purple-400"
          >
            ⚡
          </motion.span>
          <span>XOR → Rotate → Mix → Rotate</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            className="text-blue-400"
          >
            ⚡
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

