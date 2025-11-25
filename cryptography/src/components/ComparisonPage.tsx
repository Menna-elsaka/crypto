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
      style={{ backgroundColor: '#EFECE3' }}
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
            className="mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl font-semibold"
            style={{ color: '#4A70A9' }}
          >
            ALGORITHM COMPARISON
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base px-4" style={{ color: '#000000' }}>
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
            className="p-4 sm:p-6 lg:p-8"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid #8FABD4',
              borderRadius: '20px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.07)'
            }}
          >
            <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-semibold" style={{ color: '#4A70A9' }}>Comparison Parameters</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {algorithms.map((algorithm, index) => (
                <motion.div 
                  key={algorithm.id} 
                  className="space-y-3 p-6 rounded-xl relative overflow-hidden"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #8FABD4',
                    borderRadius: '16px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.07)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <h3 className="font-semibold" style={{ color: '#4A70A9' }}>{algorithm.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2" style={{ color: '#000000' }}>
                        <Zap className="w-4 h-4" style={{ color: '#4A70A9' }} />
                        Speed
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-4 rounded"
                            style={{
                              backgroundColor: i < algorithm.speed ? '#4A70A9' : '#E0E0E0'
                            }}
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 16, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.1 + i * 0.03,
                              duration: 0.3
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2" style={{ color: '#000000' }}>
                        <Shield className="w-4 h-4" style={{ color: '#4A70A9' }} />
                        Security
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-4 rounded"
                            style={{
                              backgroundColor: i < algorithm.security ? '#4A70A9' : '#E0E0E0'
                            }}
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 16, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.1 + i * 0.03 + 0.1,
                              duration: 0.3
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2" style={{ color: '#000000' }}>
                        <Smile className="w-4 h-4" style={{ color: '#4A70A9' }} />
                        Ease of Use
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-4 rounded"
                            style={{
                              backgroundColor: i < algorithm.easeOfUse ? '#4A70A9' : '#E0E0E0'
                            }}
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: 16, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              delay: index * 0.1 + i * 0.03 + 0.2,
                              duration: 0.3
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t" style={{ borderColor: '#8FABD4' }}>
                    <span 
                      className="text-xs px-3 py-1 rounded-full inline-block"
                      style={{ 
                        backgroundColor: '#8FABD4',
                        color: '#000000'
                      }}
                    >
                      {algorithm.type}
                    </span>
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
            className="p-6 sm:p-8"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid #8FABD4',
              borderRadius: '20px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.07)'
            }}
          >
            <h2 className="mb-6 font-semibold" style={{ color: '#4A70A9' }}>Live Encryption Comparison</h2>
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  value={compareText}
                  onChange={(e) => setCompareText(e.target.value)}
                  placeholder="Enter text to encrypt with all algorithms..."
                  className="flex-1"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #8FABD4',
                    color: '#000000',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleCompare}
                    disabled={!compareText}
                    className="px-8"
                    style={{ 
                      backgroundColor: '#4A70A9',
                      color: '#EFECE3',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      cursor: compareText ? 'pointer' : 'not-allowed',
                      opacity: compareText ? 1 : 0.5
                    }}
                    onMouseEnter={(e) => {
                      if (compareText) {
                        e.currentTarget.style.backgroundColor = '#3B5B86';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (compareText) {
                        e.currentTarget.style.backgroundColor = '#4A70A9';
                      }
                    }}
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
                          scale: 1.01,
                        }}
                        className="p-5 rounded-xl"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #8FABD4',
                          borderRadius: '16px',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.07)'
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold mb-1" style={{ color: '#4A70A9' }}>{algorithm.name}</h3>
                            <span 
                              className="text-xs px-2 py-1 rounded-full inline-block"
                              style={{ 
                                backgroundColor: '#8FABD4',
                                color: '#000000'
                              }}
                            >
                              {algorithm.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs mb-1" style={{ color: '#000000' }}>Encryption Time</p>
                            <p className="font-semibold" style={{ color: '#4A70A9' }}>{result.time.toFixed(3)}ms</p>
                          </div>
                        </div>
                        <div 
                          className="p-3 rounded font-mono text-sm break-all"
                          style={{
                            backgroundColor: '#F5F5F5',
                            border: '1px solid #8FABD4',
                            color: '#000000'
                          }}
                        >
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
