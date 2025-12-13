import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Gauge } from 'lucide-react';

interface CompactControlsProps {
  playing: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onPrevious: () => void;
  onNext: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  currentFrame: number;
  totalFrames: number;
  onInputChange: (input: string) => void;
  inputText: string;
  onGenerate: () => void;
}

export function CompactControls({
  playing,
  onPlayPause,
  onReset,
  onPrevious,
  onNext,
  speed,
  onSpeedChange,
  currentFrame,
  totalFrames,
  onInputChange,
  inputText,
  onGenerate
}: CompactControlsProps) {
  const progress = totalFrames > 0 ? (currentFrame / totalFrames) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 z-40 mb-6"
    >
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 border-2 border-purple-500/50 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Input Section */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Enter text to hash..."
                className="flex-1 px-4 py-2 rounded-lg bg-black/60 border border-purple-500/40 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
              />
              <motion.button
                onClick={onGenerate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all text-sm whitespace-nowrap"
                style={{ boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)' }}
              >
                Hash
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 w-full lg:w-auto min-w-[200px]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">
                Frame {currentFrame + 1} / {totalFrames}
              </span>
              <span className="text-xs text-purple-300 font-semibold">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-purple-500/30">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{ boxShadow: '0 0 10px rgba(138, 43, 226, 0.8)' }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-2 flex-shrink-0">
            <motion.button
              onClick={onPrevious}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentFrame === 0}
              className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <SkipBack className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={onPlayPause}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all relative overflow-hidden"
              style={{ boxShadow: '0 0 25px rgba(138, 43, 226, 0.6)' }}
            >
              {playing ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {playing && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={currentFrame >= totalFrames - 1}
              className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <SkipForward className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={onReset}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-red-600/60 hover:bg-red-600 border border-red-500/50 text-white transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-2 min-w-[120px] flex-shrink-0">
            <Gauge className="w-4 h-4 text-purple-300" />
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="flex-1 h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-purple-600"
              style={{
                background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(147, 51, 234) ${((speed - 50) / (2000 - 50)) * 100}%, rgb(30, 41, 59) ${((speed - 50) / (2000 - 50)) * 100}%, rgb(30, 41, 59) 100%)`
              }}
            />
            <span className="text-xs text-gray-400 w-12 text-right">{speed}ms</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

