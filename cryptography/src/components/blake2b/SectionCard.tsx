import { motion } from 'motion/react';
import type { Blake2bFrame } from '../../lib/blake2b';
import { StepCard } from './StepCard';

interface SectionCardProps {
  title: string;
  icon: string;
  frames: Blake2bFrame[];
  startIndex: number;
  currentFrameIndex: number;
  onStepClick: (index: number) => void;
  color: string;
}

export function SectionCard({
  title,
  icon,
  frames,
  startIndex,
  currentFrameIndex,
  onStepClick,
  color
}: SectionCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'rgba(59, 130, 246, 0.5)',
    purple: 'rgba(168, 85, 247, 0.5)',
    green: 'rgba(34, 197, 94, 0.5)',
    orange: 'rgba(249, 115, 22, 0.5)',
  };

  const borderColor = colorMap[color] || colorMap.purple;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="min-w-[300px] sm:min-w-[320px] p-4 sm:p-6 rounded-xl border-2 bg-gradient-to-br from-slate-900/90 to-slate-800/90 shadow-xl"
      style={{
        borderColor: borderColor
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          {icon}
        </motion.div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <span className="ml-auto text-xs text-gray-400 px-2 py-1 bg-slate-700/50 rounded">
          {frames.length} steps
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-frame-index={startIndex}>
        {frames.map((frame, idx) => {
          const frameIndex = startIndex + idx;
          const isActive = frameIndex === currentFrameIndex;
          return (
            <div key={frameIndex} data-frame-index={frameIndex}>
              <StepCard
                frame={frame}
                frameIndex={frameIndex}
                isActive={isActive}
                onClick={() => onStepClick(frameIndex)}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

