import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ArrowLeft } from "lucide-react";

interface HillCipherCryptanalysisProps {
  onNavigate: (page: string) => void;
}

/**
 * Convert text to uppercase letters only and map to numbers (A=0, B=1, ..., Z=25)
 */
function textToNumbers(text: string): number[] {
  return text
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .map((char) => char.charCodeAt(0) - 65);
}

/**
 * Convert numbers to letters (0=A, 1=B, ..., 25=Z)
 */
function numbersToText(numbers: number[]): string {
  return numbers.map((n) => String.fromCharCode((n % 26) + 65)).join("");
}

/**
 * Calculate GCD using Euclidean algorithm
 */
function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

/**
 * Calculate modular inverse of a mod m using extended Euclidean algorithm
 * Returns null if inverse doesn't exist
 */
function modInverse(a: number, m: number): number | null {
  a = ((a % m) + m) % m;
  if (gcd(a, m) !== 1) return null;

  let [oldR, r] = [a, m];
  let [oldS, s] = [1, 0];

  while (r !== 0) {
    const quotient = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - quotient * r];
    [oldS, s] = [s, oldS - quotient * s];
  }

  return ((oldS % m) + m) % m;
}

/**
 * Calculate determinant of 2x2 matrix mod 26
 */
function determinant2x2(matrix: number[][]): number {
  return ((matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % 26 + 26) % 26;
}

/**
 * Calculate adjugate (adjoint) of 2x2 matrix
 */
function adjugate2x2(matrix: number[][]): number[][] {
  return [
    [matrix[1][1], -matrix[0][1]],
    [-matrix[1][0], matrix[0][0]]
  ];
}

/**
 * Calculate inverse of 2x2 matrix mod 26
 * Returns null if matrix is not invertible
 */
function matrixInverse2x2(matrix: number[][]): number[][] | null {
  const det = determinant2x2(matrix);
  const detInv = modInverse(det, 26);
  
  if (detInv === null) return null;

  const adj = adjugate2x2(matrix);
  
  return [
    [((adj[0][0] * detInv) % 26 + 26) % 26, ((adj[0][1] * detInv) % 26 + 26) % 26],
    [((adj[1][0] * detInv) % 26 + 26) % 26, ((adj[1][1] * detInv) % 26 + 26) % 26]
  ];
}

/**
 * Multiply two 2x2 matrices mod 26
 */
function matrixMultiply2x2(a: number[][], b: number[][]): number[][] {
  return [
    [
      ((a[0][0] * b[0][0] + a[0][1] * b[1][0]) % 26 + 26) % 26,
      ((a[0][0] * b[0][1] + a[0][1] * b[1][1]) % 26 + 26) % 26
    ],
    [
      ((a[1][0] * b[0][0] + a[1][1] * b[1][0]) % 26 + 26) % 26,
      ((a[1][0] * b[0][1] + a[1][1] * b[1][1]) % 26 + 26) % 26
    ]
  ];
}

/**
 * Build 2x2 matrix from number array (pads with X=23 if needed)
 */
function buildMatrix2x2(numbers: number[]): number[][] | null {
  if (numbers.length < 2) return null;
  
  const padded = [...numbers];
  while (padded.length < 4) {
    padded.push(23); // X
  }
  
  return [
    [padded[0], padded[1]],
    [padded[2], padded[3]]
  ];
}

export function HillCipherCryptanalysis({ onNavigate }: HillCipherCryptanalysisProps) {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [recoveredKey, setRecoveredKey] = useState<number[][] | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  function recoverKey() {
    setRecoveredKey(null);
    setErrorMessage("");

    // Validate inputs
    if (!plaintext.trim()) {
      setErrorMessage("Plaintext must not be empty.");
      return;
    }

    if (!ciphertext.trim()) {
      setErrorMessage("Ciphertext must not be empty.");
      return;
    }

    // Convert to numbers
    const plainNumbers = textToNumbers(plaintext);
    const cipherNumbers = textToNumbers(ciphertext);

    if (plainNumbers.length < 4) {
      setErrorMessage("Plaintext must contain at least 4 letters.");
      return;
    }

    if (cipherNumbers.length < 4) {
      setErrorMessage("Ciphertext must contain at least 4 letters.");
      return;
    }

    // Build matrices from first 4 letters (2x2 blocks)
    const plainMatrix = buildMatrix2x2(plainNumbers.slice(0, 4));
    const cipherMatrix = buildMatrix2x2(cipherNumbers.slice(0, 4));

    if (!plainMatrix || !cipherMatrix) {
      setErrorMessage("Failed to build matrices.");
      return;
    }

    // Check if plaintext matrix is invertible
    const det = determinant2x2(plainMatrix);
    const detInv = modInverse(det, 26);

    if (detInv === null) {
      setErrorMessage("Plaintext matrix is not invertible modulo 26. The determinant (" + det + ") is not coprime with 26.");
      return;
    }

    // Compute inverse of plaintext matrix
    const plainInv = matrixInverse2x2(plainMatrix);
    
    if (!plainInv) {
      setErrorMessage("Failed to compute inverse of plaintext matrix.");
      return;
    }

    // Recover key: K = C * P^-1 mod 26
    const key = matrixMultiply2x2(cipherMatrix, plainInv);
    setRecoveredKey(key);
  }

  function formatMatrix(matrix: number[][]): string {
    return `[${matrix[0][0]}, ${matrix[0][1]}]\n[${matrix[1][0]}, ${matrix[1][1]}]`;
  }

  function formatMatrixAsLetters(matrix: number[][]): string {
    return `${numbersToText([matrix[0][0], matrix[0][1]])}\n${numbersToText([matrix[1][0], matrix[1][1]])}`;
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
            Hill Cipher - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools for Hill Cipher using known plaintext attack to recover the key matrix.
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
              Hill Cipher Cryptanalysis (Known Plaintext Attack)
            </h2>
            
            <p className="theme-text-secondary mb-6 text-sm sm:text-base theme-transition">
              This tool demonstrates a known plaintext attack on Hill Cipher. Provide a plaintext–ciphertext pair 
              (at least 4 letters each) to recover the 2×2 key matrix. The attack uses the formula K = C × P⁻¹ mod 26, 
              where P⁻¹ is the modular inverse of the plaintext matrix.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  Plaintext (at least 4 letters):
                </label>
                <Input
                  className="theme-transition"
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    width: "100%"
                  }}
                  placeholder="Enter plaintext (e.g., HELLO)..."
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                />
              </div>

              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  Ciphertext (at least 4 letters):
                </label>
                <Input
                  className="theme-transition"
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    width: "100%"
                  }}
                  placeholder="Enter ciphertext (e.g., HILL)..."
                  value={ciphertext}
                  onChange={(e) => setCiphertext(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={recoverKey} 
              className="w-full mb-6 theme-accent-bg theme-transition"
              style={{
                background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                borderColor: 'var(--theme-card-border)',
                boxShadow: '0 0 10px var(--theme-shadow)'
              }}
            >
              Recover Key
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

            {/* Recovered Key Matrix */}
            {recoveredKey && (
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
                  <h3 className="theme-accent mb-3 text-lg font-semibold theme-transition">
                    Recovered Key Matrix:
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="theme-text-secondary text-sm mb-2 theme-transition">As Numbers (0-25):</p>
                      <p className="theme-text font-mono text-sm break-words whitespace-pre theme-transition">
                        {formatMatrix(recoveredKey)}
                      </p>
                    </div>
                    <div>
                      <p className="theme-text-secondary text-sm mb-2 theme-transition">As Letters (A-Z):</p>
                      <p className="theme-text font-mono text-sm break-words whitespace-pre theme-transition">
                        {formatMatrixAsLetters(recoveredKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

