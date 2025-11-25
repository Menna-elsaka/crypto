import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateBlake2bFrames, prepareInput, IV, toHex64 } from '../../lib/blake2b';
import type { Blake2bFrame } from '../../lib/blake2b';
import { StateGrid } from './StateGrid';
import { MessageBlock } from './MessageBlock';
import { GFunctionAnimation } from './GFunctionAnimation';
import { FinalDigest } from './FinalDigest';
import { ControlPanel } from './ControlPanel';

export function Blake2bVisualizer() {
  const [inputText, setInputText] = useState('hello world');
  const [frames, setFrames] = useState<Blake2bFrame[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const timerRef = useRef<number | null>(null);

  const currentFrame = frames[currentFrameIndex];

  // Generate frames when input changes
  const generateFrames = () => {
    const bytes = prepareInput(inputText);
    const newFrames = generateBlake2bFrames(bytes, 64);
    setFrames(newFrames);
    setCurrentFrameIndex(0);
    setPlaying(false);
  };

  // Initialize frames on mount
  useEffect(() => {
    generateFrames();
  }, []);

  // Animation timer
  useEffect(() => {
    if (playing && frames.length > 0) {
      timerRef.current = window.setInterval(() => {
        setCurrentFrameIndex((prev) => {
          if (prev >= frames.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, [playing, speed, frames.length]);

  const handlePlayPause = () => {
    if (currentFrameIndex >= frames.length - 1) {
      setCurrentFrameIndex(0);
    }
    setPlaying(!playing);
  };

  const handleReset = () => {
    setCurrentFrameIndex(0);
    setPlaying(false);
  };

  const handlePrevious = () => {
    setCurrentFrameIndex((prev) => Math.max(0, prev - 1));
    setPlaying(false);
  };

  const handleNext = () => {
    setCurrentFrameIndex((prev) => Math.min(frames.length - 1, prev + 1));
    setPlaying(false);
  };

  // Get initial h values
  const initialH = frames.find((f) => f.type === 'init')?.h || IV.map((x) => toHex64(x));
  
  // Get message block
  const messageBlock = frames.find((f) => f.type === 'load_block')?.m || [];
  
  // Get current v snapshot
  const getCurrentV = (): string[] => {
    if (currentFrame?.vSnapshot) return currentFrame.vSnapshot;
    const lastRoundEnd = frames
      .slice(0, currentFrameIndex + 1)
      .reverse()
      .find((f) => f.type === 'round_end');
    if (lastRoundEnd?.v) return lastRoundEnd.v;
    // Initialize v with h + IV
    return initialH.concat(IV.map((x) => toHex64(x)));
  };

  const currentV = getCurrentV();

  // Get highlight indices for current frame
  const getHighlightIndices = (): number[] => {
    if (currentFrame?.type === 'G' && currentFrame.indices) {
      return currentFrame.indices;
    }
    return [];
  };

  const getMessageHighlightIndices = (): number[] => {
    if (currentFrame?.type === 'G' && currentFrame.mIndices) {
      return currentFrame.mIndices;
    }
    return [];
  };

  // Get status text
  const getStatusText = (): string => {
    if (!currentFrame) return 'Ready';
    switch (currentFrame.type) {
      case 'init':
        return 'Initializing with IV values';
      case 'load_block':
        return 'Loading message block';
      case 'round_start':
        return `Starting Round ${(currentFrame.round ?? 0) + 1}`;
      case 'G':
        return `Round ${(currentFrame.round ?? 0) + 1}, G Function #${(currentFrame.i ?? 0) + 1}`;
      case 'round_end':
        return `Round ${(currentFrame.round ?? 0) + 1} complete`;
      case 'compress':
        return 'Compressing final state';
      case 'final':
        return 'Final digest computed';
      default:
        return 'Processing...';
    }
  };

  // Group frames by section for better organization
  const getInitializationFrames = () => frames.filter(f => f.type === 'init' || f.type === 'load_block');
  const getRoundFrames = (roundNum: number) => frames.filter(f => 
    (f.type === 'round_start' || f.type === 'G' || f.type === 'round_end') && f.round === roundNum
  );
  const getFinalizationFrames = () => frames.filter(f => f.type === 'compress' || f.type === 'final');

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
        .custom-scrollbar-blue::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
        }
        .custom-scrollbar-blue::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
        .custom-scrollbar-green::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.5);
        }
        .custom-scrollbar-green::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.7);
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 mb-4">
            BLAKE2b Visualizer
          </h1>
          <p className="text-purple-300 text-lg mb-2">
            by Mohammed Abueldhb
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
          >
            BLAKE2b is a cryptographic hash function that provides security equivalent to SHA-3
            but is faster than MD5, SHA-1, SHA-2, and SHA-3. This visualization demonstrates
            the internal workings of BLAKE2b, showing how input data is processed through
            12 rounds of mixing operations using the G function, sigma permutations, and
            bitwise operations.
          </motion.p>
        </motion.div>

        {/* Controls - Centered at Top */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-2xl">
            <ControlPanel
              playing={playing}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
              onPrevious={handlePrevious}
              onNext={handleNext}
              speed={speed}
              onSpeedChange={setSpeed}
              currentFrame={currentFrameIndex}
              totalFrames={frames.length}
              onInputChange={setInputText}
              inputText={inputText}
              onGenerate={generateFrames}
            />
          </div>
        </div>

        {/* Main Content - Vertical Layout */}
        <div className="space-y-6">
          {/* Status Card */}
          <motion.div
            key={currentFrameIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-2 border-purple-500/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {getStatusText()}
                </h3>
                <p className="text-sm text-gray-400">
                  Frame {currentFrameIndex + 1} of {frames.length}
                </p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: playing ? 2 : 0, repeat: Infinity, ease: "linear" }}
                className="text-2xl"
              >
                {playing ? '⚡' : '⏸️'}
              </motion.div>
            </div>
          </motion.div>

          {/* Initialization Section */}
          {getInitializationFrames().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-blue-500/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  🚀
                </motion.div>
                <h2 className="text-xl font-bold text-white">Initialization</h2>
              </div>
              <div 
                className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar custom-scrollbar-blue"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(59, 130, 246, 0.5) rgba(30, 41, 59, 0.5)'
                }}
              >
                <StateGrid
                  values={initialH}
                  highlightIndices={
                    currentFrame?.type === 'compress'
                      ? [0, 1, 2, 3, 4, 5, 6, 7]
                      : []
                  }
                  title="Initial Hash (h[0..7])"
                />
                <MessageBlock
                  values={messageBlock}
                  highlightIndices={getMessageHighlightIndices()}
                />
              </div>
            </motion.div>
          )}

          {/* G Function Animation - Show when current frame is G */}
          <AnimatePresence mode="wait">
            {currentFrame?.type === 'G' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GFunctionAnimation
                  key={`${currentFrame.round}-${currentFrame.i}`}
                  indices={currentFrame.indices || []}
                  mIndices={currentFrame.mIndices || []}
                  before={currentFrame.before || { a: '0x0', b: '0x0', c: '0x0', d: '0x0' }}
                  after={currentFrame.after || { a: '0x0', b: '0x0', c: '0x0', d: '0x0' }}
                  round={currentFrame.round || 0}
                  gIndex={currentFrame.i || 0}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mixing Rounds Section */}
          {Array.from({ length: 12 }, (_, i) => i).map((roundNum) => {
            const roundFrames = getRoundFrames(roundNum);
            if (roundFrames.length === 0) return null;

            const isActiveRound = roundFrames.some(f => 
              frames.indexOf(f) === currentFrameIndex
            );

            return (
              <motion.div
                key={roundNum}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  borderColor: isActiveRound ? 'rgba(168, 85, 247, 0.8)' : 'rgba(168, 85, 247, 0.5)'
                }}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-purple-500/50"
                style={{
                  boxShadow: isActiveRound 
                    ? '0 0 30px rgba(168, 85, 247, 0.4)' 
                    : '0 0 10px rgba(168, 85, 247, 0.2)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: isActiveRound ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isActiveRound ? Infinity : 0, ease: "linear" }}
                    className="text-2xl"
                  >
                    ⚙️
                  </motion.div>
                  <h2 className="text-xl font-bold text-white">Round {roundNum + 1}</h2>
                  <span className="ml-auto text-xs text-gray-400 px-2 py-1 bg-slate-700/50 rounded">
                    {roundFrames.length} steps
                  </span>
                </div>
                <div 
                  className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(168, 85, 247, 0.5) rgba(30, 41, 59, 0.5)'
                  }}
                >
                  <StateGrid
                    values={currentV}
                    highlightIndices={getHighlightIndices()}
                    title="Working Vector (v[0..15])"
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Finalization Section */}
          {getFinalizationFrames().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-green-500/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl"
                >
                  🎯
                </motion.div>
                <h2 className="text-xl font-bold text-white">Finalization</h2>
              </div>
              <div 
                className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar custom-scrollbar-green"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(34, 197, 94, 0.5) rgba(30, 41, 59, 0.5)'
                }}
              >
                <AnimatePresence>
                  {currentFrame?.type === 'final' && currentFrame.out && (
                    <FinalDigest digest={currentFrame.out} />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-purple-500/50"
          >
            <h3 className="text-lg font-semibold text-white mb-4">How BLAKE2b Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
              <div>
                <h4 className="text-purple-300 font-semibold mb-2">1. Initialization</h4>
                <p className="text-gray-400">
                  The algorithm starts with 8 initialization constants (IV) that are derived
                  from the square roots of the first 8 prime numbers.
                </p>
              </div>
              <div>
                <h4 className="text-purple-300 font-semibold mb-2">2. Message Processing</h4>
                <p className="text-gray-400">
                  Input is padded and split into 128-byte blocks. Each block is processed
                  through 12 rounds of compression.
                </p>
              </div>
              <div>
                <h4 className="text-purple-300 font-semibold mb-2">3. G Function</h4>
                <p className="text-gray-400">
                  The core mixing function performs XOR, rotation, and addition operations
                  on 4 state variables using message words from a sigma permutation.
                </p>
              </div>
              <div>
                <h4 className="text-purple-300 font-semibold mb-2">4. Final Compression</h4>
                <p className="text-gray-400">
                  After all rounds, the state is compressed with the initial hash values
                  using XOR to produce the final digest.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
