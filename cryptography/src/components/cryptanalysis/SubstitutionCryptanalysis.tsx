import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ArrowLeft } from "lucide-react";

interface SubstitutionCryptanalysisProps {
  onNavigate: (page: string) => void;
}

interface LetterFrequency {
  letter: string;
  count: number;
  frequency: number;
}

interface FrequencyResult {
  frequencies: LetterFrequency[];
  estimatedMapping: Map<string, string>;
  decryptedText: string;
}

// English letter frequency order (most to least common)
const ENGLISH_ORDER = "ETAOINSHRDLCUMWFGYPBVKJXQZ";

export function SubstitutionCryptanalysis({ onNavigate }: SubstitutionCryptanalysisProps) {
  const [ciphertext, setCiphertext] = useState("");
  const [result, setResult] = useState<FrequencyResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Clean text to A-Z only (uppercase)
   */
  function cleanText(text: string): string {
    return text.toUpperCase().replace(/[^A-Z]/g, "");
  }

  /**
   * Count letter frequencies in ciphertext
   */
  function countFrequencies(text: string): LetterFrequency[] {
    const counts: Record<string, number> = {};
    const cleaned = cleanText(text);
    const total = cleaned.length;

    // Initialize all letters to 0
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i); // A-Z
      counts[letter] = 0;
    }

    // Count occurrences
    for (let i = 0; i < cleaned.length; i++) {
      const letter = cleaned[i];
      if (letter >= 'A' && letter <= 'Z') {
        counts[letter]++;
      }
    }

    // Convert to array and calculate frequencies
    const frequencies: LetterFrequency[] = [];
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      const count = counts[letter];
      const frequency = total > 0 ? (count / total) * 100 : 0;
      frequencies.push({ letter, count, frequency });
    }

    // Sort by frequency (descending)
    frequencies.sort((a, b) => b.count - a.count);

    return frequencies;
  }

  /**
   * Build estimated mapping from ciphertext frequencies to English frequencies
   */
  function buildMapping(frequencies: LetterFrequency[]): Map<string, string> {
    const mapping = new Map<string, string>();
    
    // Map ciphertext letters (sorted by frequency) to English letters (sorted by frequency)
    for (let i = 0; i < Math.min(frequencies.length, ENGLISH_ORDER.length); i++) {
      const cipherLetter = frequencies[i].letter;
      const englishLetter = ENGLISH_ORDER[i];
      mapping.set(cipherLetter, englishLetter);
    }

    return mapping;
  }

  /**
   * Apply mapping to decrypt ciphertext (preserving non-letter characters)
   */
  function applyMapping(text: string, mapping: Map<string, string>): string {
    let result = "";
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const upperChar = char.toUpperCase();
      
      if (upperChar >= 'A' && upperChar <= 'Z') {
        const mapped = mapping.get(upperChar) || upperChar;
        // Preserve original case
        result += char === char.toUpperCase() ? mapped : mapped.toLowerCase();
      } else {
        // Preserve non-letter characters
        result += char;
      }
    }
    
    return result;
  }

  function runCryptanalysis() {
    setResult(null);
    setErrorMessage("");

    if (!ciphertext.trim()) {
      setErrorMessage("Ciphertext must not be empty.");
      return;
    }

    const cleaned = cleanText(ciphertext);
    if (cleaned.length === 0) {
      setErrorMessage("Ciphertext must contain at least one letter.");
      return;
    }

    try {
      // Count frequencies
      const frequencies = countFrequencies(ciphertext);

      // Build estimated mapping
      const estimatedMapping = buildMapping(frequencies);

      // Apply mapping to decrypt
      const decryptedText = applyMapping(ciphertext, estimatedMapping);

      setResult({
        frequencies,
        estimatedMapping,
        decryptedText,
      });
    } catch (error) {
      setErrorMessage("Error during cryptanalysis: " + (error instanceof Error ? error.message : "Unknown error"));
    }
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
            onClick={() => onNavigate("cryptanalysis")}
            variant="outline"
            className="mb-8 theme-card theme-transition"
            style={{
              borderColor: "var(--theme-card-border)",
              backgroundColor: "transparent",
              color: "white"
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
            Substitution Cipher - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools for Substitution Cipher using frequency analysis to recover the letter mapping.
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
              Substitution Cipher Cryptanalysis (Frequency Analysis)
            </h2>
            
            <p className="theme-text-secondary mb-6 text-sm sm:text-base theme-transition">
              This tool performs frequency analysis on the ciphertext to estimate the substitution mapping. 
              It counts letter frequencies, sorts them, and maps them to English letter frequencies (E, T, A, O, I, N, ...) 
              to produce an approximate decryption.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  Enter ciphertext:
                </label>
                <Textarea
                  className="theme-transition"
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    minHeight: '120px',
                    width: "100%"
                  }}
                  placeholder="Enter ciphertext to analyze..."
                  value={ciphertext}
                  onChange={(e) => setCiphertext(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={runCryptanalysis} 
              className="w-full mb-6 theme-accent-bg theme-transition"
              style={{
                background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                borderColor: 'var(--theme-card-border)',
                boxShadow: '0 0 10px var(--theme-shadow)'
              }}
            >
              Run Cryptanalysis
            </Button>

            {/* Error Message */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <div className="theme-card p-4 rounded-lg theme-transition"
                  style={{
                    borderColor: 'var(--theme-card-border)',
                    border: '1px solid var(--theme-card-border)',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)'
                  }}
                >
                  <p className="theme-text text-sm sm:text-base text-red-400 theme-transition">
                    {errorMessage}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Letter Frequencies */}
                <div className="theme-card p-4 rounded-lg theme-transition"
                  style={{
                    borderColor: 'var(--theme-card-border)',
                    border: '1px solid var(--theme-card-border)'
                  }}
                >
                  <h3 className="theme-accent mb-3 text-lg font-semibold theme-transition">
                    Letter Frequencies:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {result.frequencies.map((freq, index) => (
                      <div
                        key={index}
                        className="p-2 rounded theme-transition"
                        style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid var(--theme-card-border)'
                        }}
                      >
                        <p className="theme-text text-xs sm:text-sm font-mono theme-transition">
                          {freq.letter}: {freq.count} ({freq.frequency.toFixed(2)}%)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Estimated Mapping */}
                <div className="theme-card p-4 rounded-lg theme-transition"
                  style={{
                    borderColor: 'var(--theme-card-border)',
                    border: '1px solid var(--theme-card-border)'
                  }}
                >
                  <h3 className="theme-accent mb-3 text-lg font-semibold theme-transition">
                    Estimated Mapping (Cipher → Plain):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {Array.from(result.estimatedMapping.entries()).map(([cipher, plain], index) => (
                      <div
                        key={index}
                        className="p-2 rounded theme-transition"
                        style={{
                          backgroundColor: 'rgba(138, 43, 226, 0.1)',
                          border: '1px solid var(--theme-card-border)'
                        }}
                      >
                        <p className="theme-text text-xs sm:text-sm font-mono theme-transition">
                          {cipher} → {plain}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approximate Decrypted Text */}
                <div className="theme-card p-4 rounded-lg theme-transition"
                  style={{
                    borderColor: 'var(--theme-card-border)',
                    border: '1px solid var(--theme-card-border)'
                  }}
                >
                  <h3 className="theme-accent mb-2 text-lg font-semibold theme-transition">
                    Approximate Decrypted Text:
                  </h3>
                  <p className="theme-text font-mono text-sm sm:text-base break-words whitespace-pre-wrap theme-transition">
                    {result.decryptedText}
                  </p>
                  <p className="theme-text-secondary text-xs sm:text-sm mt-2 theme-transition">
                    Note: This is an approximation based on frequency analysis. Manual refinement may be needed for accuracy.
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

