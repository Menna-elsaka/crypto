import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateBlake2bFrames, prepareInput, IV, toHex64 } from '../../lib/blake2b';
import type { Blake2bFrame } from '../../lib/blake2b';

import { StateGrid } from './StateGrid';
import { MessageBlock } from './MessageBlock';
import { ControlPanel } from './ControlPanel';

import { AlgorithmProgress } from './AlgorithmProgress';
import { GFunctionArrows } from './GFunctionAnimation';
import { FinalDigestAnimated } from './FinalDigestAnimated';

export function Blake2bVisualizer() {
  const [inputText, setInputText] = useState('hello world');
  const [frames, setFrames] = useState<Blake2bFrame[]>([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const timerRef = useRef<number | null>(null);

  const currentFrame = frames[currentFrameIndex];

  // ================================
  // STEP 1: GENERATE ALGORITHM STEPS
  // ================================
  const generateFrames = () => {
    const bytes = prepareInput(inputText);
    const newFrames = generateBlake2bFrames(bytes, 64);
    setFrames(newFrames);
    setCurrentFrameIndex(0);
    setPlaying(false);
  };

  useEffect(() => {
    generateFrames();
  }, []);

  // ================================
  // STEP 2: PLAYBACK TIMER
  // ================================
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

  // ================================
  // CONTROLS
  // ================================
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

  // ================================
  // ALGORITHM DATA EXTRACTION
  // ================================
  const initialH =
    frames.find((f) => f.type === 'init')?.h || IV.map((x) => toHex64(x));

  const messageBlock =
    frames.find((f) => f.type === 'load_block')?.m || [];

  const getCurrentV = (): string[] => {
    if (currentFrame?.vSnapshot) return currentFrame.vSnapshot;

    const lastRoundEnd = frames
      .slice(0, currentFrameIndex + 1)
      .reverse()
      .find((f) => f.type === 'round_end');

    if (lastRoundEnd?.v) return lastRoundEnd.v;

    return initialH.concat(IV.map((x) => toHex64(x)));
  };

  const currentV = getCurrentV();

  // ================================
  // ALGORITHM PHASE TRACKER
  // ================================
  const getCurrentPhase = () => {
    if (!currentFrame) return 'input';
    if (currentFrame.type === 'init' || currentFrame.type === 'load_block')
      return 'init';
    if (currentFrame.type === 'final') return 'final';
    return 'rounds';
  };

  // ================================
  // EDUCATIONAL STATUS TEXT
  // ================================
  const getEducationalStatus = (): string => {
    if (!currentFrame) return 'Waiting for input...';

    switch (currentFrame.type) {
      case 'init':
        return 'Initializing the hash state using fixed constants (IV)';
      case 'load_block':
        return 'Loading the message block into memory';
      case 'round_start':
        return 'Starting a new mixing round to increase randomness';
      case 'G':
        return 'Mixing 4 values using addition, XOR, and rotations (G Function)';
      case 'round_end':
        return 'Round is complete – internal state updated';
      case 'compress':
        return 'Combining final state with original hash values';
      case 'final':
        return 'Final secure hash value is ready';
      default:
        return 'Processing cryptographic operations...';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <motion.div className="text-center">
          <h1 className="text-4xl font-bold text-purple-400 mb-2">
            BLAKE2b Visualizer (Educational Mode)
          </h1>
          <p className="text-gray-400">
            Step-by-step visualization of how BLAKE2b processes your input
          </p>
        </motion.div>

        {/* ALGORITHM PROGRESS BAR */}
        <AlgorithmProgress phase={getCurrentPhase()} />

        {/* CONTROL PANEL */}
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

        {/* STATUS CARD */}
        <motion.div className="p-4 rounded-xl bg-purple-900/40 border border-purple-500 text-white">
          <h3 className="text-lg font-bold">{getEducationalStatus()}</h3>
          <p className="text-xs text-gray-300">
            Step {currentFrameIndex + 1} / {frames.length}
          </p>
        </motion.div>

        {/* INITIALIZATION */}
        <StateGrid
          values={initialH}
          highlightIndices={[]}
          title="Initial Hash Values (h[0..7])"
        />

        <MessageBlock values={messageBlock} highlightIndices={[]} />

        {/* G FUNCTION VISUALIZATION */}
        <AnimatePresence>
          {currentFrame?.type === 'G' && (
            <GFunctionArrows
              before={currentFrame.before!}
              after={currentFrame.after!}
            />
          )}
        </AnimatePresence>

        {/* ROUND STATE */}
        <StateGrid
          values={currentV}
          highlightIndices={currentFrame?.indices || []}
          title="Current Working State (v[0..15])"
        />

        {/* FINAL DIGEST */}
        <AnimatePresence>
          {currentFrame?.type === 'final' && currentFrame.out && (
            <FinalDigestAnimated digest={currentFrame.out} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
