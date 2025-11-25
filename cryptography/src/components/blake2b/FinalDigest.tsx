import { motion } from 'motion/react';
import { CheckCircle2, Copy } from 'lucide-react';
import { useState } from 'react';

interface FinalDigestProps {
  digest: string[];
  className?: string;
}

export function FinalDigest({ digest, className = '' }: FinalDigestProps) {
  const [copied, setCopied] = useState(false);
  const fullHash = digest.join('').replace(/0x/g, '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={className}
    >
      <div className="relative p-6 rounded-xl bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-2 border-green-500/50 overflow-hidden">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ✅
              </motion.div>
              Final BLAKE2b Digest
            </h3>
            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg bg-green-600/30 hover:bg-green-600/50 border border-green-400/50 text-green-300 transition-colors"
            >
              {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </motion.button>
          </div>

          <div className="space-y-3">
            {/* Individual words */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {digest.map((word, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-3 rounded-lg bg-green-800/40 border border-green-500/50"
                >
                  <div className="text-xs text-green-300 mb-1">Word {index}</div>
                  <div className="font-mono text-sm text-white font-bold truncate">{word}</div>
                </motion.div>
              ))}
            </div>

            {/* Full hash display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-lg bg-black/40 border border-green-500/30 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative z-10">
                <div className="text-xs text-green-300 mb-2">Complete Hash (Hexadecimal)</div>
                <div className="font-mono text-sm text-green-200 break-all select-all">
                  {fullHash}
                </div>
              </div>
            </motion.div>

            {/* Success animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 text-green-400 text-sm"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <span>Hash computation complete!</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

