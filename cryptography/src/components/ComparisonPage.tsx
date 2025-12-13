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
<<<<<<< HEAD
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 theme-bg theme-transition"
      
=======
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 theme-transition theme-bg"
>>>>>>> basmala_branch
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
<<<<<<< HEAD
            className="mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl font-semibold theme-accent theme-transition"
            
          >
            ALGORITHM COMPARISON
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base px-4  theme-text-secondary theme-transition" >
=======
            className="theme-accent mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl font-semibold theme-transition theme-glow"
          >
            ALGORITHM COMPARISON
          </h1>
          <p className="theme-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-4 theme-transition">
>>>>>>> basmala_branch
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
<<<<<<< HEAD
            className="p-4 sm:p-6 lg:p-8 theme-card theme-shadow theme-transition"
            style={{
  border: '1px solid var(--theme-card-border)'
}}
          >
            <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-semibold theme-accent theme-transition" >Comparison Parameters</h2>
=======
            className="theme-card p-4 sm:p-6 lg:p-8 theme-transition dark:!bg-[#111827] dark:!border-[#1f2937]"
            style={{ 
              borderColor: 'var(--theme-card-border)',
              boxShadow: 'var(--theme-shadow)'
            }}
          >
            <h2 className="theme-text mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-semibold theme-transition">Comparison Parameters</h2>
>>>>>>> basmala_branch
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {algorithms.map((algorithm, index) => (
                <motion.div 
                  key={algorithm.id} 
<<<<<<< HEAD
                  className="space-y-3 p-6 rounded-xl relative overflow-hidden"
                 style={{
  backgroundColor: 'var(--theme-card-bg)',
  border: '1px solid var(--theme-card-border)',
  borderRadius: '16px',
  boxShadow: '0 0 12px var(--theme-shadow)'
}}
=======
                  className="space-y-3 p-6 rounded-xl relative overflow-hidden theme-card theme-transition dark:!bg-[#111827] dark:!border-[#1f2937]"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    borderRadius: '16px',
                    boxShadow: 'var(--theme-shadow)'
                  }}
>>>>>>> basmala_branch
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
<<<<<<< HEAD
                  <h3 className="font-semibold theme-accent theme-transition">{algorithm.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 theme-text-secondary theme-transition" >
=======
                  <h3 className="font-semibold theme-text theme-transition">{algorithm.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 theme-text-secondary theme-transition">
>>>>>>> basmala_branch
                        <Zap className="w-4 h-4 theme-accent theme-transition" />
                        Speed
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
<<<<<<< HEAD
                            className="w-2 h-4 rounded"
                            style={{
                              backgroundColor: i < algorithm.speed ?  'var(--theme-accent)' 
  : 'var(--theme-card-border)'
=======
                            className="w-2 h-4 rounded theme-transition"
                            style={{
                              backgroundColor: i < algorithm.speed ? 'var(--theme-accent)' : 'var(--theme-card-border)'
>>>>>>> basmala_branch
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
                      <span className="flex items-center gap-2 theme-text-secondary theme-transition">
                        <Shield className="w-4 h-4 theme-accent theme-transition" />
                        Security
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
<<<<<<< HEAD
                            className="w-2 h-4 rounded"
                            style={{
                              backgroundColor: i < algorithm.security ?    'var(--theme-accent)'
  : 'var(--theme-card-border)'
=======
                            className="w-2 h-4 rounded theme-transition"
                            style={{
                              backgroundColor: i < algorithm.security ? 'var(--theme-accent)' : 'var(--theme-card-border)'
>>>>>>> basmala_branch
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
                      <span className="flex items-center gap-2 theme-text-secondary theme-transition">
                        <Smile className="w-4 h-4 theme-accent theme-transition" />
                        Ease of Use
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <motion.div
                            key={i}
<<<<<<< HEAD
                            className="w-2 h-4 rounded"
                            style={{
                              backgroundColor: i < algorithm.easeOfUse   ? 'var(--theme-accent)'
  : 'var(--theme-card-border)'
=======
                            className="w-2 h-4 rounded theme-transition"
                            style={{
                              backgroundColor: i < algorithm.easeOfUse ? 'var(--theme-accent)' : 'var(--theme-card-border)'
>>>>>>> basmala_branch
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

<<<<<<< HEAD
                  <div className="pt-3 mt-3 border-t" style={{ borderColor: 'var(--theme-card-border)' }}>
                    <span 
                      className="text-xs px-3 py-1 rounded-full inline-block"
style={{ 
  backgroundColor: 'var(--theme-accent)',
  color: 'var(--theme-text)'
}}
=======
                  <div className="pt-3 mt-3 border-t theme-transition" style={{ borderColor: 'var(--theme-card-border)' }}>
                    <span 
                      className="text-xs px-3 py-1 rounded-full inline-block theme-transition"
                      style={{ 
                        backgroundColor: 'var(--theme-card-bg)',
                        borderColor: 'var(--theme-card-border)',
                        border: '1px solid var(--theme-card-border)',
                        color: 'var(--theme-text)'
                      }}
>>>>>>> basmala_branch
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
<<<<<<< HEAD
            className="p-6 sm:p-8 theme-card theme-transition"
            style={{
  border: '1px solid var(--theme-card-border)',
  boxShadow: '0 0 15px var(--theme-shadow)'
}}

          >
            <h2 className="mb-6 font-semibold theme-accent theme-transition" >Live Encryption Comparison</h2>
=======
            className="theme-card p-6 sm:p-8 theme-transition dark:!bg-[#111827] dark:!border-[#1f2937]"
            style={{ 
              borderColor: 'var(--theme-card-border)',
              boxShadow: 'var(--theme-shadow)'
            }}
          >
            <h2 className="theme-text mb-6 font-semibold theme-transition">Live Encryption Comparison</h2>
>>>>>>> basmala_branch
            
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  value={compareText}
                  onChange={(e) => setCompareText(e.target.value)}
                  placeholder="Enter text to encrypt with all algorithms..."
<<<<<<< HEAD
                  className="flex-1"
                 style={{
  backgroundColor: 'var(--theme-card-bg)',
  border: '1px solid var(--theme-card-border)',
  color: 'var(--theme-text)'
}}
=======
                  className="flex-1 theme-transition"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    color: 'var(--theme-text)',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}
>>>>>>> basmala_branch
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleCompare}
                    disabled={!compareText}
<<<<<<< HEAD
                    className="px-8"
                    style={{
  backgroundColor: 'var(--theme-accent)',
  color: 'var(--theme-text)',
  borderRadius: '8px',
  cursor: compareText ? 'pointer' : 'not-allowed',
  opacity: compareText ? 1 : 0.5
}}
                  onMouseEnter={(e) => {
  if (compareText) {
    e.currentTarget.style.backgroundColor = 'var(--theme-accent-secondary)';
  }
}}
onMouseLeave={(e) => {
  if (compareText) {
    e.currentTarget.style.backgroundColor = 'var(--theme-accent)';
  }
}}>
=======
                    className="px-8 theme-accent-bg theme-transition"
                    style={{ 
                      background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                      borderColor: 'var(--theme-card-border)',
                      boxShadow: '0 0 10px var(--theme-shadow)',
                      cursor: compareText ? 'pointer' : 'not-allowed',
                      opacity: compareText ? 1 : 0.5
                    }}
                  >
>>>>>>> basmala_branch
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
<<<<<<< HEAD
                        className="p-5 rounded-xl"
                        style={{
                        backgroundColor: 'var(--theme-card-bg)',
border: '1px solid var(--theme-card-border)',
boxShadow: '0 0 15px var(--theme-shadow)',
color: 'var(--theme-text)'

=======
                        className="theme-card p-5 rounded-xl theme-transition"
                        style={{
                          borderColor: 'var(--theme-card-border)',
                          boxShadow: 'var(--theme-shadow)'
>>>>>>> basmala_branch
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
<<<<<<< HEAD
                            <h3 className="font-semibold mb-1 theme-accent theme-transition">{algorithm.name}</h3>
                            <span 
                              className="text-xs px-2 py-1 rounded-full inline-block"
                              style={{ 
                                backgroundColor: 'var(--theme-accent-secondary)',
color: 'var(--theme-text)'
=======
                            <h3 className="font-semibold mb-1 theme-text theme-transition">{algorithm.name}</h3>
                            <span 
                              className="text-xs px-2 py-1 rounded-full inline-block theme-transition"
                              style={{ 
                                backgroundColor: 'var(--theme-card-bg)',
                                borderColor: 'var(--theme-card-border)',
                                border: '1px solid var(--theme-card-border)',
                                color: 'var(--theme-text)'
>>>>>>> basmala_branch
                              }}
                            >
                              {algorithm.type}
                            </span>
                          </div>
                          <div className="text-right">
<<<<<<< HEAD
                            <p className="text-xs mb-1 theme-text-secondary theme-transition" >Encryption Time</p>
=======
                            <p className="text-xs mb-1 theme-text-secondary theme-transition">Encryption Time</p>
>>>>>>> basmala_branch
                            <p className="font-semibold theme-accent theme-transition">{result.time.toFixed(3)}ms</p>
                          </div>
                        </div>
                        <div 
<<<<<<< HEAD
                          className="p-3 rounded font-mono text-sm break-all"
                          style={{
     backgroundColor: 'var(--theme-card-bg)',
border: '1px solid var(--theme-card-border)',
color: 'var(--theme-text)'
=======
                          className="p-3 rounded font-mono text-sm break-all theme-transition"
                          style={{
                            backgroundColor: 'var(--theme-card-bg)',
                            border: '1px solid var(--theme-card-border)',
                            color: 'var(--theme-text)'
>>>>>>> basmala_branch
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
