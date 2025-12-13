import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface CaesarCipherCryptanalysisProps {
  onNavigate: (page: string) => void;
}

interface DecryptionResult {
  key: number;
  plaintext: string;
}

export function CaesarCipherCryptanalysis({ onNavigate }: CaesarCipherCryptanalysisProps) {
  const [ciphertext, setCiphertext] = useState('');
  const [results, setResults] = useState<DecryptionResult[]>([]);

  function decryptCaesar(text: string, shift: number): string {
    return text.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base - shift + 26) % 26) + base);
      }
      return char;
    }).join('');
  }

  function runCryptanalysis() {
    if (!ciphertext.trim()) return;

    const newResults: DecryptionResult[] = [];
    for (let key = 1; key <= 25; key++) {
      const plaintext = decryptCaesar(ciphertext, key);
      newResults.push({ key, plaintext });
    }
    setResults(newResults);
  }

  return (
    <motion.div 
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 theme-transition theme-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <Button
            onClick={() => onNavigate('cryptanalysis')}
            variant="outline"
            className="mb-8 theme-card"
            style={{
              borderColor: 'var(--theme-card-border)',
              backgroundColor: 'transparent',
              color: 'var(--text-color)'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cryptanalysis
          </Button>
          
          <h1 
            className="theme-accent mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl theme-transition theme-glow"
            style={{ 
              textShadow: 'var(--theme-glow)',
            }}
          >
            Caesar Cipher - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools and demonstrations for Caesar Cipher.
          </p>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card 
            className="theme-card p-6 sm:p-8 lg:p-10 theme-transition"
            style={{ 
              boxShadow: 'var(--theme-shadow)',
            }}
          >
            <h2 className="theme-text mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-semibold theme-transition">
              Caesar Cipher Cryptanalysis
            </h2>
            
            <p className="theme-text-secondary mb-6 text-sm sm:text-base theme-transition">
              Enter encrypted text to perform brute-force decryption. The tool will try all 25 possible shift keys and display the results.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <Textarea
                className="theme-transition"
                style={{
                  backgroundColor: 'var(--theme-card-bg)',
                  borderColor: 'var(--theme-card-border)',
                  color: 'var(--theme-text)',
                  minHeight: '120px'
                }}
                placeholder="Enter ciphertext to decrypt..."
                value={ciphertext}
                onChange={(e) => setCiphertext(e.target.value)}
              />
            </div>

            <Button 
              onClick={runCryptanalysis} 
              className="w-full mb-8 theme-accent-bg theme-transition"
              style={{
                background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                borderColor: 'var(--theme-card-border)',
                boxShadow: '0 0 10px var(--theme-shadow)'
              }}
            >
              Run Cryptanalysis
            </Button>

            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="theme-accent mb-4 text-lg font-semibold theme-transition">
                  Decryption Results (All 25 Keys):
                </h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      className="theme-card p-4 rounded-lg theme-transition"
                      style={{
                        borderColor: 'var(--theme-card-border)',
                        border: '1px solid var(--theme-card-border)'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <span className="theme-accent font-mono font-semibold text-sm theme-transition">
                            Key {result.key}:
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="theme-text font-mono text-sm break-words theme-transition">
                            {result.plaintext}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
