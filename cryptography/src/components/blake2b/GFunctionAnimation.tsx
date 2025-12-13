import { motion, AnimatePresence } from 'motion/react';

interface GFunctionAnimationProps {
  indices: number[];
  mIndices: number[];
  before: { a: string; b: string; c: string; d: string };
  after: { a: string; b: string; c: string; d: string };
  round: number;
  gIndex: number;
}
type Props = {
  before: { a: string; b: string; c: string; d: string };
  after: { a: string; b: string; c: string; d: string };
};

export function GFunctionArrows({ before, after }: Props) {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border-2 border-purple-500 text-white">
      
      <h3 className="text-purple-400 font-bold mb-4 text-center">
        G Function – Mixing Step
      </h3>

      <div className="space-y-4">

        {/* A */}
        <div className="flex items-center justify-between">
          <span className="w-12 text-purple-300 font-bold">A</span>
          <span className="px-3 py-1 bg-slate-800 rounded font-mono text-xs">
            {before.a}
          </span>
          <span className="text-purple-400 text-lg">➜</span>
          <span className="px-3 py-1 bg-purple-700 rounded font-mono text-xs">
            {after.a}
          </span>
        </div>

        {/* B */}
        <div className="flex items-center justify-between">
          <span className="w-12 text-blue-300 font-bold">B</span>
          <span className="px-3 py-1 bg-slate-800 rounded font-mono text-xs">
            {before.b}
          </span>
          <span className="text-blue-400 text-lg">➜</span>
          <span className="px-3 py-1 bg-blue-700 rounded font-mono text-xs">
            {after.b}
          </span>
        </div>

        {/* C */}
        <div className="flex items-center justify-between">
          <span className="w-12 text-green-300 font-bold">C</span>
          <span className="px-3 py-1 bg-slate-800 rounded font-mono text-xs">
            {before.c}
          </span>
          <span className="text-green-400 text-lg">➜</span>
          <span className="px-3 py-1 bg-green-700 rounded font-mono text-xs">
            {after.c}
          </span>
        </div>

        {/* D */}
        <div className="flex items-center justify-between">
          <span className="w-12 text-yellow-300 font-bold">D</span>
          <span className="px-3 py-1 bg-slate-800 rounded font-mono text-xs">
            {before.d}
          </span>
          <span className="text-yellow-400 text-lg">➜</span>
          <span className="px-3 py-1 bg-yellow-600 rounded font-mono text-xs text-black">
            {after.d}
          </span>
        </div>

      </div>

      <div className="mt-5 pt-3 border-t border-purple-500/40 text-center text-xs text-gray-300">
        ➕ Addition → ❌ XOR → 🔄 Rotation  
        <br />
        These operations increase randomness and diffusion
      </div>
    </div>
  );
}
