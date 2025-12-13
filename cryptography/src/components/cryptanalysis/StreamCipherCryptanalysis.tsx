import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ArrowLeft } from "lucide-react";

interface StreamCipherCryptanalysisProps {
  onNavigate: (page: string) => void;
}

export function StreamCipherCryptanalysis({ onNavigate }: StreamCipherCryptanalysisProps) {
  const [ciphertext, setCiphertext] = useState("");
  const [knownPlaintext, setKnownPlaintext] = useState("");
  const [recoveredKeystream, setRecoveredKeystream] = useState<string>("");
  const [decryptedPlaintext, setDecryptedPlaintext] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  /**
   * Convert string to byte array (treating each character as ASCII byte 0-255)
   * Uses masking to ensure byte range: charCodeAt(i) & 0xFF
   */
  function stringToBytes(str: string): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i++) {
      // Mask to ensure byte range (0-255)
      bytes.push(str.charCodeAt(i) & 0xFF);
    }
    return bytes;
  }

  /**
   * Convert byte array to string (treating each byte as ASCII character)
   */
  function bytesToString(bytes: number[]): string {
    return bytes.map(b => String.fromCharCode(b)).join('');
  }

  /**
   * Convert ciphertext string to byte array
   * Treats input as raw ASCII bytes (not Base64-encoded)
   * This is a simplified educational model for cryptanalysis demonstration
   */
  function decodeCiphertext(cipher: string): number[] {
    // Treat ciphertext as raw ASCII bytes
    return stringToBytes(cipher.trim());
  }

  /**
   * Recover keystream from known plaintext attack
   * K = C XOR P (byte-level XOR)
   */
  function recoverKeystream(cipherBytes: number[], plainBytes: number[]): number[] {
    const keystream: number[] = [];
    const minLen = Math.min(cipherBytes.length, plainBytes.length);
    
    for (let i = 0; i < minLen; i++) {
      // Byte-level XOR: K = C XOR P
      const k = (cipherBytes[i] ^ plainBytes[i]) & 0xFF;
      keystream.push(k);
    }
    
    return keystream;
  }

  /**
   * Convert keystream bytes to hex string for display
   */
  function keystreamToHex(keystream: number[]): string {
    return keystream.map(k => k.toString(16).padStart(2, '0').toUpperCase()).join(' ');
  }

  /**
   * Convert hex string back to byte array
   */
  function hexToBytes(hex: string): number[] {
    return hex.split(' ').map(h => parseInt(h, 16) & 0xFF);
  }

  /**
   * Decrypt full ciphertext using recovered keystream
   * P = C XOR K (with repeating keystream, byte-level XOR)
   */
  function decryptWithKeystream(cipherBytes: number[], keystreamBytes: number[]): string {
    const plaintextBytes: number[] = [];
    
    for (let i = 0; i < cipherBytes.length; i++) {
      // Byte-level XOR: P = C XOR K (with repeating keystream)
      const k = keystreamBytes[i % keystreamBytes.length];
      const p = (cipherBytes[i] ^ k) & 0xFF;
      plaintextBytes.push(p);
    }
    
    return bytesToString(plaintextBytes);
  }

  function runCryptanalysis() {
    // Reset previous results
    setRecoveredKeystream("");
    setDecryptedPlaintext("");
    setErrorMessage("");

    // Validation
    if (!ciphertext.trim()) {
      setErrorMessage("Ciphertext must not be empty.");
      return;
    }

    if (!knownPlaintext.trim()) {
      setErrorMessage("Known plaintext must not be empty.");
      return;
    }

    // Convert inputs to byte arrays (treating as ASCII bytes)
    const plainBytes = stringToBytes(knownPlaintext);
    
    // Decode ciphertext (handles base64 or raw bytes) - returns byte array
    let cipherBytes: number[];
    try {
      cipherBytes = decodeCiphertext(ciphertext);
    } catch (error) {
      setErrorMessage("Error decoding ciphertext: " + (error instanceof Error ? error.message : "Invalid format"));
      return;
    }

    if (plainBytes.length > cipherBytes.length) {
      setErrorMessage("Known plaintext length must be less than or equal to ciphertext length.");
      return;
    }

    try {
      // Recover keystream from known plaintext (byte-level XOR)
      // K = C XOR P
      const keystreamBytes = recoverKeystream(cipherBytes, plainBytes);
      
      // Convert keystream to hex for display
      const keystreamHex = keystreamToHex(keystreamBytes);
      setRecoveredKeystream(keystreamHex);

      // Decrypt full ciphertext using recovered keystream (repeating, byte-level XOR)
      // P = C XOR K
      const decrypted = decryptWithKeystream(cipherBytes, keystreamBytes);
      setDecryptedPlaintext(decrypted);
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
            Stream Cipher - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools for Stream Cipher using known plaintext attack to recover the keystream.
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
              Stream Cipher Cryptanalysis (Known Plaintext Attack)
            </h2>
            
            <div className="theme-card p-4 rounded-lg mb-6 theme-transition" style={{ 
              borderColor: 'var(--theme-card-border)', 
              border: '1px solid var(--theme-card-border)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            }}>
              <p className="theme-text-secondary text-sm sm:text-base theme-transition">
                <strong>Note:</strong> Cryptanalysis uses a simplified raw XOR model and does not operate on encoded 
                ciphertext from the Algorithms page. This module demonstrates the fundamental known plaintext attack 
                on stream ciphers using direct byte-level XOR operations.
              </p>
            </div>
            
            <p className="theme-text-secondary mb-6 text-sm sm:text-base theme-transition">
              In a known plaintext attack, the attacker knows a small portion of the plaintext from the beginning 
              and uses it to recover the keystream, which can then decrypt the entire ciphertext. If you know part 
              of the plaintext (from the beginning), you can recover the keystream using the formula K = C XOR P. 
              The recovered keystream can then be used to decrypt the entire ciphertext, assuming the keystream repeats.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  Ciphertext (full message):
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
                  placeholder="Enter the full ciphertext (raw ASCII bytes)..."
                  value={ciphertext}
                  onChange={(e) => setCiphertext(e.target.value)}
                />
              </div>

              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  Known plaintext (partial, from the beginning):
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
                  placeholder="Enter the known plaintext prefix..."
                  value={knownPlaintext}
                  onChange={(e) => setKnownPlaintext(e.target.value)}
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
              Recover Key and Decrypt
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

            {/* Recovered Keystream */}
            {recoveredKeystream && (
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
                    Recovered Keystream (hex):
                  </h3>
                  <p className="theme-text font-mono text-sm break-words theme-transition">
                    {recoveredKeystream}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Decrypted Plaintext */}
            {decryptedPlaintext && (
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
                    Decrypted Full Plaintext:
                  </h3>
                  <p className="theme-text font-mono text-sm break-words theme-transition whitespace-pre-wrap">
                    {decryptedPlaintext}
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

