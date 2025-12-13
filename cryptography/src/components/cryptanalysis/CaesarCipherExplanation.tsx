import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface CaesarCipherExplanationProps {
  onNavigate: (page: string) => void;
}

export function CaesarCipherExplanation({ onNavigate }: CaesarCipherExplanationProps) {
  return (
    <motion.div 
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 theme-transition theme-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-3xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            onClick={() => onNavigate('cryptanalysis')}
            variant="outline"
            className="mb-8 theme-card theme-transition"
            style={{
              borderColor: 'var(--theme-card-border)',
              backgroundColor: 'transparent',
              color: 'var(--theme-inverted-text)'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cryptanalysis
          </Button>
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
            <h1 className="theme-accent mb-6 text-2xl sm:text-3xl lg:text-4xl font-semibold theme-transition theme-glow">
              Caesar Cipher — Mathematical and Cryptographic Explanation
            </h1>

            <div className="space-y-6 sm:space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Introduction
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The Caesar Cipher is one of the oldest known encryption techniques, based on shifting letters in the alphabet by a fixed amount. Despite its simplicity, it demonstrates the foundational concepts behind substitution ciphers and highlights the importance of key space and frequency analysis in cryptanalysis.
                </p>
              </section>

              {/* Core Operation */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Core Operation
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The Caesar Cipher shifts each letter in the plaintext by a constant key value k (1–25).
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Mathematically, the encryption function is:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    E(x) = (x + k) mod 26
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Decryption is performed using:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    D(x) = (x – k) mod 26
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  where x is the numerical index of a letter (A=0, B=1, …, Z=25).
                </p>
              </section>

              {/* Key Space */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Key Space
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The cipher has only 25 possible keys. This extremely small key space makes it vulnerable to brute-force attacks, where every possible shift is tested until a meaningful plaintext is revealed.
                </p>
              </section>

              {/* Modular Arithmetic */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Modular Arithmetic
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The use of mod 26 ensures that shifting beyond 'Z' wraps around to the beginning of the alphabet. This operation is crucial for maintaining the cyclic structure of the cipher.
                </p>
              </section>

              {/* Cryptanalysis — Brute Force */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Cryptanalysis — Brute Force
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  Since there are only 25 keys, an attacker can decrypt the message using every possible key and observe which output forms readable text. The correct plaintext typically becomes obvious.
                </p>
              </section>

              {/* Cryptanalysis — Frequency Analysis */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Cryptanalysis — Frequency Analysis
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Natural languages have recognizable letter frequency distributions.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  For example, in English:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>'E' appears most frequently</li>
                  <li>'T', 'A', 'O', 'N' follow</li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  By comparing ciphertext frequencies with known English frequencies, attackers can estimate the correct shift key even faster than brute-forcing.
                </p>
              </section>

              {/* Weaknesses */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Weaknesses
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The Caesar Cipher is insecure due to:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>Very small key space</li>
                  <li>Preservation of letter frequency patterns</li>
                  <li>Direct one-to-one substitution</li>
                </ul>
              </section>

              {/* Final Notes */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Final Notes
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  While cryptographically weak, the Caesar Cipher remains historically important.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  It demonstrates:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>The role of modular arithmetic in cryptography</li>
                  <li>The importance of diffusion and confusion</li>
                  <li>Why modern ciphers must use large key spaces and nonlinear transformations</li>
                </ul>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
