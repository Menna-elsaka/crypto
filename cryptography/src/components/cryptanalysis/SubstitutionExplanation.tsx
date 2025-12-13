import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface SubstitutionExplanationProps {
  onNavigate: (page: string) => void;
}

export function SubstitutionExplanation({ onNavigate }: SubstitutionExplanationProps) {
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
              Substitution Cipher — Cryptanalysis and Frequency Analysis
            </h1>

            <div className="space-y-6 sm:space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Introduction
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  Substitution cipher cryptanalysis relies on the statistical properties of natural languages, 
                  particularly letter frequency patterns. Unlike ciphers that shift or rearrange letters, substitution 
                  ciphers replace each letter with another according to a fixed mapping. While this seems secure, 
                  frequency analysis can break these ciphers because the frequency distribution of letters is preserved 
                  in the ciphertext.
                </p>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  The fundamental weakness exploited by cryptanalysis is that each ciphertext letter always maps to 
                  the same plaintext letter. This means that if 'E' is the most common letter in English and appears 
                  as 'X' in the ciphertext, then 'X' will be the most common letter in the ciphertext. By analyzing 
                  letter frequencies, cryptanalysts can estimate the substitution mapping.
                </p>
              </section>

              {/* Substitution Cipher Overview */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Substitution Cipher Overview
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  A substitution cipher uses a one-to-one mapping between plaintext letters and ciphertext letters. 
                  This mapping is a permutation of the alphabet—each letter maps to exactly one other letter, and no 
                  two letters map to the same letter.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The key in a substitution cipher is this permutation. For example, if A→Z, B→Y, C→X, ..., Z→A, 
                  we have a simple substitution (in this case, a reversal). More complex substitutions use random 
                  permutations, making the mapping less predictable.
                </p>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The total number of possible keys is 26! (factorial), which is approximately 4 × 10²⁶. While this 
                  is a large number, it is not sufficient to provide security against frequency analysis attacks.
                </p>
              </section>

              {/* Mathematical Model */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Mathematical Model
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Letters are mapped to numbers: A = 0, B = 1, ..., Z = 25. The substitution cipher defines a 
                  permutation function K that maps each plaintext letter to a ciphertext letter.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Encryption is performed as:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    C = K(P)
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Where C is the ciphertext letter, P is the plaintext letter, and K is the substitution function 
                  (permutation key).
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Decryption uses the inverse permutation:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    P = K⁻¹(C)
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  Since K is a permutation (one-to-one and onto), its inverse K⁻¹ always exists and is also a 
                  permutation of the alphabet.
                </p>
              </section>

              {/* Why Cryptanalysis Works */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Why Cryptanalysis Works
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  English (and most natural languages) have highly non-uniform letter frequency distributions. Some 
                  letters appear much more frequently than others, and this pattern is consistent across different 
                  texts.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The most common letters in English, in order of frequency, are approximately:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    E, T, A, O, I, N, S, H, R, D, L, C, U, M, W, F, G, Y, P, B, V, K, J, X, Q, Z
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The letter 'E' appears approximately 12.7% of the time in typical English text, while 'Z' appears 
                  less than 0.1% of the time. This dramatic difference makes frequency analysis highly effective.
                </p>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  In a substitution cipher, if 'E' is mapped to 'X', then 'X' will appear approximately 12.7% of 
                  the time in the ciphertext. By identifying the most frequent ciphertext letter, a cryptanalyst can 
                  estimate that it corresponds to 'E' in the plaintext.
                </p>
              </section>

              {/* Cryptanalysis Steps */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Cryptanalysis Steps
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The frequency analysis attack on substitution ciphers follows these steps:
                </p>
                <ol className="theme-text-secondary space-y-3 text-sm sm:text-base theme-transition list-decimal list-inside ml-4">
                  <li>
                    <strong>Count frequencies:</strong> Analyze the ciphertext and count how many times each letter 
                    appears. This produces a frequency distribution for the 26 letters.
                  </li>
                  <li>
                    <strong>Sort letters:</strong> Order the ciphertext letters by frequency, from most frequent to 
                    least frequent. This creates a frequency-ordered list of ciphertext letters.
                  </li>
                  <li>
                    <strong>Compare with English frequency:</strong> Match the sorted ciphertext letters to the known 
                    English frequency order (E, T, A, O, I, N, ...). The most frequent ciphertext letter is likely 
                    'E', the second most frequent is likely 'T', and so on.
                  </li>
                  <li>
                    <strong>Build estimated mapping:</strong> Create a substitution table mapping each ciphertext 
                    letter to its estimated plaintext letter based on frequency matching.
                  </li>
                  <li>
                    <strong>Apply mapping:</strong> Use the estimated mapping to decrypt the ciphertext, producing 
                    an approximate plaintext. Non-letter characters (spaces, punctuation) are preserved as-is.
                  </li>
                </ol>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  The accuracy of this method depends on the length of the ciphertext. Longer texts provide more 
                  reliable frequency statistics, while short texts may have frequency distributions that deviate 
                  significantly from expected English patterns.
                </p>
              </section>

              {/* Manual Refinement */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Manual Refinement
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Frequency analysis provides an initial estimate, but it is rarely perfect. Cryptanalysts use 
                  additional techniques to refine the mapping:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>
                    <strong>Common words:</strong> Look for patterns that match common English words. For example, 
                    three-letter words like "THE", "AND", "FOR" can help identify letter mappings.
                  </li>
                  <li>
                    <strong>Digraphs and trigraphs:</strong> Analyze common letter pairs (like "TH", "HE", "IN") 
                    and triplets (like "THE", "ING") to verify and correct the mapping.
                  </li>
                  <li>
                    <strong>Context clues:</strong> Use knowledge about the message's likely content, format, or 
                    context to identify words and refine letter mappings.
                  </li>
                  <li>
                    <strong>Iterative refinement:</strong> Apply partial mappings, identify recognizable words, and 
                    use those words to correct and extend the mapping.
                  </li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  The combination of automated frequency analysis and manual refinement makes substitution ciphers 
                  highly vulnerable to cryptanalysis, even for relatively short messages.
                </p>
              </section>

              {/* Purpose of This Module */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Purpose of This Module
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  This educational module demonstrates why substitution ciphers are insecure despite having a large 
                  key space (26! possible keys). The vulnerability comes from the preservation of letter frequency 
                  patterns, not from the size of the key space.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Key lessons:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>Large key spaces do not guarantee security if the cipher preserves statistical patterns</li>
                  <li>Frequency analysis is a powerful cryptanalytic technique that exploits language statistics</li>
                  <li>Substitution ciphers are vulnerable even to ciphertext-only attacks</li>
                  <li>Modern ciphers must provide both confusion (making relationships complex) and diffusion (spreading statistical patterns)</li>
                  <li>Understanding these weaknesses helps explain why modern cryptography uses more sophisticated designs</li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  While substitution ciphers are historically important and demonstrate fundamental cryptographic 
                  concepts, they are completely insecure for modern applications. This module serves as both a 
                  demonstration of cryptanalytic techniques and a lesson in why modern ciphers require more 
                  sophisticated design principles.
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

