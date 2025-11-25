import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Gauge } from 'lucide-react';
import { Button } from '../ui/button';

interface ControlPanelProps {
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

export function ControlPanel({
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
}: ControlPanelProps) {
  const progress = totalFrames > 0 ? (currentFrame / totalFrames) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-purple-500/50"
      style={{
        boxShadow: '0 0 30px rgba(138, 43, 226, 0.3)'
      }}
    >
      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-purple-300 mb-2">
          Input Text
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter text to hash..."
            className="flex-1 px-4 py-2 rounded-lg bg-black/60 border border-purple-500/40 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <motion.button
            onClick={onGenerate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all"
            style={{ boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)' }}
          >
            Hash
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            Frame {currentFrame + 1} / {totalFrames}
          </span>
          <span className="text-sm text-purple-300 font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-purple-500/30">
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
      <div className="flex items-center justify-center gap-3 mb-6">
        <motion.button
          onClick={onPrevious}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentFrame === 0}
          className="p-3 rounded-lg bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SkipBack className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={onPlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white transition-all relative overflow-hidden"
          style={{ boxShadow: '0 0 25px rgba(138, 43, 226, 0.6)' }}
        >
          {playing ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
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
          className="p-3 rounded-lg bg-slate-700/60 hover:bg-slate-700 border border-slate-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SkipForward className="w-5 h-5" />
        </motion.button>

        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 rounded-lg bg-red-600/60 hover:bg-red-600 border border-red-500/50 text-white transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Speed Control */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Gauge className="w-4 h-4 text-purple-300" />
          <label className="text-sm font-semibold text-purple-300">
            Animation Speed: {speed}ms/frame
          </label>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="50"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-purple-600"
          style={{
            background: `linear-gradient(to right, rgb(147, 51, 234) 0%, rgb(147, 51, 234) ${((speed - 50) / (2000 - 50)) * 100}%, rgb(30, 41, 59) ${((speed - 50) / (2000 - 50)) * 100}%, rgb(30, 41, 59) 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-purple-500/30">
        <div className="text-xs text-gray-400 mb-2">Quick Actions:</div>
        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() => onInputChange('hello world')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 text-xs rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-300 transition-all"
          >
            Sample 1
          </motion.button>
          <motion.button
            onClick={() => onInputChange('The quick brown fox jumps over the lazy dog')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 text-xs rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-300 transition-all"
          >
            Sample 2
          </motion.button>
          <motion.button
            onClick={() => onInputChange('BLAKE2b')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 text-xs rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-300 transition-all"
          >
            Sample 3
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}





