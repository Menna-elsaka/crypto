import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { algorithms, encryptSimple, hashText } from '../lib/algorithms';
import { Zap, Shield, Smile } from 'lucide-react';

interface ComparisonPageProps {}

export function ComparisonPage({}: ComparisonPageProps) {
  const [compareText, setCompareText] = useState('');
  const [results, setResults] = useState<Record<string, { encrypted: string; time: number }>>({});

  const handleCompare = () => {
    if (!compareText) return;

    const newResults: Record<string, { encrypted: string; time: number }> = {};

    algorithms.forEach(algorithm => {
      const start = performance.now();
      const encrypted = algorithm.type === 'hash' 
        ? hashText(compareText)
        : encryptSimple(compareText, algorithm.id);
      const end = performance.now();
      
      newResults[algorithm.id] = {
        encrypted,
        time: end - start
      };
    });

    setResults(newResults);
  };

  return (
    <motion.div 
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 
            className="text-purple-400 mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl"
            style={{ textShadow: '0 0 10px rgba(114, 32, 191, 0.8)' }}
          >
            ALGORITHM COMPARISON
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Compare encryption algorithms side-by-side. See how they differ in speed, security, and output format.
          </p>
        </motion.div>

        {/* Comparison Parameters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <Card 
            className="bg-gradient-to-br from-[#0A0F3C]/80 to-[#1a0f4d]/30 border-purple-500/30 p-4 sm:p-6 lg:p-8"
            style={{ boxShadow: '0 0 20px rgba(105, 40, 167, 0.2)' }}
          >
            <h2 className="text-purple-400 mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl" style={{ textShadow: '0 0 10px rgba(138, 43, 226, 0.5)' }}>Comparison Parameters</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {algorithms.map((algorithm, index) => (
                <motion.div 
                  key={algorithm.id} 
                  className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 relative overflow-hidden"
                  initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    y: -8,
                    rotateY: 3,
                    boxShadow: '0 10px 30px rgba(138, 43, 226, 0.5)',
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                  
                  <h3 className="text-purple-400 relative z-10">{algorithm.name}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Speed
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-2 h-4 rounded ${
                              i < algorithm.speed ? 'bg-purple-500' : 'bg-gray-700'
                            }`}
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 16, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.1 + i * 0.03,
                              duration: 0.3
                            }}
                            whileHover={{ 
                              height: 20,
                              backgroundColor: i < algorithm.speed ? '#a855f7' : '#4b5563'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Security
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-2 h-4 rounded ${
                              i < algorithm.security ? 'bg-green-500' : 'bg-gray-700'
                            }`}
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 16, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.1 + i * 0.03 + 0.1,
                              duration: 0.3
                            }}
                            whileHover={{ 
                              height: 20,
                              backgroundColor: i < algorithm.security ? '#10b981' : '#4b5563'
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-2">
                        <Smile className="w-4 h-4" />
                        Ease of Use
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-2 h-4 rounded ${
                              i < algorithm.easeOfUse ? 'bg-blue-500' : 'bg-gray-700'
                            }`}
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 16, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.1 + i * 0.03 + 0.2,
                              duration: 0.3
                            }}
                            whileHover={{ 
                              height: 20,
                              backgroundColor: i < algorithm.easeOfUse ? '#3b82f6' : '#4b5563'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-purple-500/30">
                    <span className="text-xs text-gray-500">{algorithm.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Live Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card 
            className="bg-gradient-to-br from-[#0A0F3C]/60 to-[#1a0f4d]/40 border-purple-500/30 p-8"
            style={{ boxShadow: '0 0 20px rgba(138, 43, 226, 0.2)' }}
          >
            <h2 className="text-purple-300 mb-6" style={{ textShadow: '0 0 10px rgba(138, 43, 226, 0.5)' }}>Live Encryption Comparison</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <Input
                  value={compareText}
                  onChange={(e) => setCompareText(e.target.value)}
                  placeholder="Enter text to encrypt with all algorithms..."
                  className="flex-1 bg-black/60 border-purple-500/40 text-white placeholder:text-gray-500"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleCompare}
                    disabled={!compareText}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 px-8"
                    style={{ boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)' }}
                  >
                    Compare All
                  </Button>
                </motion.div>
              </div>

              {Object.keys(results).length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {algorithms.map((algorithm) => {
                    const result = results[algorithm.id];
                    if (!result) return null;

                    return (
                      <motion.div
                        key={algorithm.id}
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 0 25px rgba(138, 43, 226, 0.4)'
                        }}
                        className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-purple-400">{algorithm.name}</h3>
                            <p className="text-xs text-gray-500">{algorithm.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Encryption Time</p>
                            <p className="text-purple-300">{result.time.toFixed(3)}ms</p>
                          </div>
                        </div>
                        <div className="bg-black/60 p-3 rounded border border-purple-500/30 font-mono text-sm text-purple-300 break-all">
                          {result.encrypted}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
