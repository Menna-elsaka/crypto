import { motion } from 'motion/react';
import type { Blake2bFrame } from '../../lib/blake2b';

interface StepCardProps {
  frame: Blake2bFrame;
  frameIndex: number;
  isActive: boolean;
  onClick: () => void;
}

export function StepCard({ frame, frameIndex, isActive, onClick }: StepCardProps) {
  const getStepTitle = (): string => {
    switch (frame.type) {
      case 'init':
        return 'Initialization';
      case 'load_block':
        return 'Load Block';
      case 'round_start':
        return `Round ${(frame.round ?? 0) + 1} Start`;
      case 'G':
        return `G${(frame.i ?? 0) + 1}`;
      case 'round_end':
        return `Round ${(frame.round ?? 0) + 1} End`;
      case 'compress':
        return 'Compress';
      case 'final':
        return 'Final Digest';
      default:
        return 'Step';
    }
  };

  const getStepIcon = (): string => {
    switch (frame.type) {
      case 'init':
        return '🚀';
      case 'load_block':
        return '📦';
      case 'round_start':
        return '⏭️';
      case 'G':
        return '⚙️';
      case 'round_end':
        return '✅';
      case 'compress':
        return '🗜️';
      case 'final':
        return '🎯';
      default:
        return '•';
    }
  };

  const getStepColor = (): string => {
    switch (frame.type) {
      case 'init':
        return 'from-blue-600/60 to-blue-800/60 border-blue-400';
      case 'load_block':
        return 'from-indigo-600/60 to-indigo-800/60 border-indigo-400';
      case 'round_start':
        return 'from-purple-600/60 to-purple-800/60 border-purple-400';
      case 'G':
        return 'from-purple-600/60 to-blue-600/60 border-purple-400';
      case 'round_end':
        return 'from-green-600/60 to-green-800/60 border-green-400';
      case 'compress':
        return 'from-orange-600/60 to-orange-800/60 border-orange-400';
      case 'final':
        return 'from-emerald-600/60 to-emerald-800/60 border-emerald-400';
      default:
        return 'from-gray-600/60 to-gray-800/60 border-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: isActive ? 1.05 : 1,
        y: 0
      }}
      transition={{ 
        duration: 0.3,
        delay: frameIndex * 0.02
      }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer transition-all
        bg-gradient-to-br ${getStepColor()}
        ${isActive 
          ? 'shadow-[0_0_30px_rgba(138,43,226,0.8),0_0_60px_rgba(91,141,238,0.4)] ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900' 
          : 'shadow-lg hover:shadow-xl'
        }
      `}
    >
      {/* Animated glow effect for active step */}
      {isActive && (
        <>
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50 rounded-xl blur-sm -z-10"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{getStepIcon()}</span>
          <span className="text-xs text-white/60">#{frameIndex + 1}</span>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">
          {getStepTitle()}
        </h4>
        {frame.type === 'G' && (
          <p className="text-xs text-white/80">
            Round {frame.round} • Mix {frame.indices?.join(',')}
          </p>
        )}
        {frame.type === 'round_start' && (
          <p className="text-xs text-white/80">
            Starting 8 G functions
          </p>
        )}
        {frame.type === 'round_end' && (
          <p className="text-xs text-white/80">
            Round complete
          </p>
        )}
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />
      )}
    </motion.div>
  );
}

