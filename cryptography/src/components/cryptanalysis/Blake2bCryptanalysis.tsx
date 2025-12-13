import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { blake2b } from 'blakejs';
import { ArrowLeft } from 'lucide-react';

interface Blake2bCryptanalysisProps {
  onNavigate: (page: string) => void;
}

export function Blake2bCryptanalysis({ onNavigate }: Blake2bCryptanalysisProps) {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [hash1, setHash1] = useState('');
  const [hash2, setHash2] = useState('');
  const [changedBits, setChangedBits] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number | null>(null);

  function toHex(buffer: Uint8Array): string {
    return Array.from(buffer)
      .map((x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  }

  function hashText(text: string): Uint8Array {
    const encoder = new TextEncoder();
    const inputBytes = encoder.encode(text);
    return blake2b(inputBytes, undefined, 64);
  }

  function countChangedBits(a: Uint8Array, b: Uint8Array): number {
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
      diff += ((a[i] ^ b[i]).toString(2).match(/1/g) || []).length;
    }
    return diff;
  }

  function runComparison() {
    if (!word1.trim() || !word2.trim()) return;

    const h1 = hashText(word1);
    const h2 = hashText(word2);

    const hex1 = toHex(h1);
    const hex2 = toHex(h2);

    const bits = countChangedBits(h1, h2);
    const pct = Number(((bits / 512) * 100).toFixed(2));

    setHash1(hex1);
    setHash2(hex2);
    setChangedBits(bits);
    setPercentage(pct);
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
            className="mb-8 theme-card dark:!text-white"
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
            BLAKE2b - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools and demonstrations for BLAKE2b.
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
              BLAKE2b Cryptanalysis Tool
            </h2>
            
            <p className="theme-text-secondary mb-6 text-sm sm:text-base theme-transition">
              Enter two different words to analyze how much the output hash changes
              — demonstrating the avalanche effect in BLAKE2b.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <Input
                className="theme-transition"
                style={{
                  backgroundColor: 'var(--theme-card-bg)',
                  borderColor: 'var(--theme-card-border)',
                  color: 'var(--theme-text)'
                }}
                placeholder="Enter Word 1"
                value={word1}
                onChange={(e) => setWord1(e.target.value)}
              />

              <Input
                className="theme-transition"
                style={{
                  backgroundColor: 'var(--theme-card-bg)',
                  borderColor: 'var(--theme-card-border)',
                  color: 'var(--theme-text)'
                }}
                placeholder="Enter Word 2"
                value={word2}
                onChange={(e) => setWord2(e.target.value)}
              />
            </div>

            <Button 
              onClick={runComparison} 
              className="w-full mb-8 theme-accent-bg theme-transition"
              style={{
                background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                borderColor: 'var(--theme-card-border)',
                boxShadow: '0 0 10px var(--theme-shadow)'
              }}
            >
              Compare
            </Button>

            {hash1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="theme-text-secondary mb-4 theme-transition"
              >
                <h2 className="theme-accent mb-2 text-lg font-semibold theme-transition">Hash 1:</h2>
                <pre 
                  className="whitespace-pre-wrap break-words p-3 rounded theme-transition"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    color: 'var(--theme-text)',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                >
                  {hash1}
                </pre>
              </motion.div>
            )}

            {hash2 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="theme-text-secondary mb-4 theme-transition"
              >
                <h2 className="theme-accent mb-2 text-lg font-semibold theme-transition">Hash 2:</h2>
                <pre 
                  className="whitespace-pre-wrap break-words p-3 rounded theme-transition"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    color: 'var(--theme-text)',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                >
                  {hash2}
                </pre>
              </motion.div>
            )}

            {changedBits !== null && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="theme-text-secondary theme-transition"
              >
                <h2 className="theme-accent mb-2 text-lg font-semibold theme-transition">Avalanche Effect:</h2>
                <div 
                  className="p-4 rounded theme-transition"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)'
                  }}
                >
                  <p className="mb-2 theme-text theme-transition">
                    <span className="font-semibold">Changed Bits:</span> {changedBits} / 512
                  </p>
                  <p className="theme-text theme-transition">
                    <span className="font-semibold">Avalanche Percentage:</span> {percentage}%
                  </p>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
