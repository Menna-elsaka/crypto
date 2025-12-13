import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ArrowLeft } from "lucide-react";
import { decryptVigenere } from "../../lib/utils/vigenereUtils";

interface VigenereCryptanalysisProps {
  onNavigate: (page: string) => void;
}

// English letter frequencies (A-Z)
const ENGLISH_FREQ = [
  8.167,1.492,2.782,4.253,12.702,2.228,2.015,6.094,6.966,
  0.153,0.772,4.025,2.406,6.749,7.507,1.929,0.095,5.987,
  6.327,9.056,2.758,0.978,2.360,0.150,1.974,0.074
];

// Helper functions matching Algorithms page logic (A=0, B=1, ..., Z=25)
function cleanText(text: string): string {
  return (text || "").toUpperCase().replace(/[^A-Z]/g, "");
}

function charToNum(c: string): number {
  // A=0, B=1, ..., Z=25 (matching Algorithms page)
  return c.charCodeAt(0) - 65;
}

function numToChar(n: number): string {
  // Convert 0-25 back to A-Z (matching Algorithms page)
  return String.fromCharCode(((n % 26) + 26) % 26 + 65);
}

function chiSquared(obs: number[], total: number): number {
  let chi = 0;
  for (let i = 0; i < 26; i++) {
    const expected = (ENGLISH_FREQ[i] / 100) * total;
    const diff = obs[i] - expected;
    chi += (diff * diff) / (expected || 1);
  }
  return chi;
}

function estimateKey(cipher: string, keyLen: number): string {
  const c = cleanText(cipher);
  if (c.length === 0) return "";
  
  let key = "";
  for (let j = 0; j < keyLen; j++) {
    const freq = Array(26).fill(0);
    let total = 0;

    // Collect frequency for column j
    for (let i = j; i < c.length; i += keyLen) {
      freq[charToNum(c[i])]++; 
      total++;
    }

    let bestShift = 0;
    let bestScore = Infinity;

    // Try all possible shifts (0-25)
    for (let s = 0; s < 26; s++) {
      const shifted = Array(26).fill(0);
      // Shift frequencies by s positions
      for (let k = 0; k < 26; k++) {
        shifted[(k - s + 26) % 26] += freq[k];
      }
      const score = chiSquared(shifted, total);
      if (score < bestScore) {
        bestScore = score;
        bestShift = s;
      }
    }
    key += numToChar(bestShift);
  }
  return key;
}

// Note: We use the shared decryptVigenere function from vigenereUtils
// Cryptanalysis-specific: we clean the ciphertext to A-Z only before decryption

export function VigenereCipherCryptanalysis({ onNavigate }: VigenereCryptanalysisProps) {
  const [rawCipher, setRawCipher] = useState("");
  const [keyLen, setKeyLen] = useState<number | "">("");
  const [estimatedKey, setEstimatedKey] = useState<string>("");
  const [decrypted, setDecrypted] = useState<string>("");

  function runAttack() {
    setEstimatedKey("");
    setDecrypted("");

    const L = Number(keyLen);
    if (!L || L <= 0) {
      setEstimatedKey("Invalid key length.");
      setDecrypted("");
      return;
    }

    const cipher = cleanText(rawCipher);
    if (cipher.length === 0) {
      setEstimatedKey("Ciphertext must contain letters only.");
      setDecrypted("");
      return;
    }

    try {
      const estimatedKeyResult = estimateKey(cipher, L);
      
      // Use the shared decryptVigenere function (same as Algorithms page)
      // The cipher is already cleaned to A-Z only, so we can pass it directly
      // The shared function will handle the decryption with the exact same logic
      const decryptedResult = decryptVigenere(cipher, estimatedKeyResult);
      
      setEstimatedKey(estimatedKeyResult.toLowerCase());
      setDecrypted(decryptedResult.toLowerCase());
    } catch (error) {
      setEstimatedKey("Error: " + (error instanceof Error ? error.message : "Unknown error"));
      setDecrypted("");
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
            Vigenère Cipher - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools for Vigenère Cipher using chi-squared frequency analysis and key recovery.
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
              Vigenère Cipher Cryptanalysis
            </h2>
            
            <p className="theme-text-secondary mb-6 text-sm sm:text-base theme-transition">
              This is a ciphertext-only frequency attack where you supply the ciphertext and an assumed
              key length. The system will analyze columns using chi-squared statistics to estimate the key and decrypt the text.
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
                  placeholder="Enter ciphertext to decrypt..."
                  value={rawCipher}
                  onChange={(e) => setRawCipher(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                    Assumed key length
                  </label>
                  <Input
                    type="number"
                    min={1}
                    className="theme-transition"
                    style={{
                      border: "1px solid white",
                      background: "transparent",
                      color: "white",
                      padding: "10px",
                      borderRadius: "6px",
                      width: "120px"
                    }}
                    value={keyLen}
                    onChange={(e) => setKeyLen(e.target.value === "" ? "" : Number(e.target.value))}
                  />
                </div>

                <div className="flex-1 pt-6">
                  <Button 
                    onClick={runAttack} 
                    className="w-full theme-accent-bg theme-transition"
                    style={{
                      background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                      borderColor: 'var(--theme-card-border)',
                      boxShadow: '0 0 10px var(--theme-shadow)'
                    }}
                  >
                    Run Cryptanalysis
                  </Button>
                </div>
              </div>
            </div>

            {estimatedKey && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 mb-4"
              >
                <div className="theme-card p-4 rounded-lg theme-transition"
                  style={{
                    borderColor: 'var(--theme-card-border)',
                    border: '1px solid var(--theme-card-border)'
                  }}
                >
                  <h3 className="theme-accent mb-2 text-lg font-semibold theme-transition">
                    Estimated Key:
                  </h3>
                  <p className="theme-text font-mono text-sm break-words theme-transition">
                    {estimatedKey}
                  </p>
                </div>
              </motion.div>
            )}

            {decrypted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="theme-card p-4 rounded-lg theme-transition"
                  style={{
                    borderColor: 'var(--theme-card-border)',
                    border: '1px solid var(--theme-card-border)'
                  }}
                >
                  <h3 className="theme-accent mb-2 text-lg font-semibold theme-transition">
                    Decrypted Text:
                  </h3>
                  <p className="theme-text font-mono text-sm break-words theme-transition">
                    {decrypted}
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
