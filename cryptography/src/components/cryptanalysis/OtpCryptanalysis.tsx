import React, { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { ArrowLeft } from "lucide-react";

interface OtpCryptanalysisProps {
  onNavigate: (page: string) => void;
}

interface AttackStep {
  position: number;
  c1Value: number;
  c2Value: number;
  p1Char: string;
  p1CharCode: number;
  recoveredKey: number;
  p2Char: string;
  p2CharCode: number;
}

export function OtpCryptanalysis({ onNavigate }: OtpCryptanalysisProps) {
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [knownP1, setKnownP1] = useState("");
  const [startIndex, setStartIndex] = useState("");
  const [recoveredP2, setRecoveredP2] = useState("");
  const [steps, setSteps] = useState<AttackStep[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  function parseNumberArray(input: string): number[] {
    return input
      .trim()
      .split(/\s+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
  }

  function runAttack() {
    setRecoveredP2("");
    setSteps([]);
    setErrorMessage("");

    // Validate inputs
    if (!c1.trim()) {
      setErrorMessage("C1 must not be empty.");
      return;
    }

    if (!c2.trim()) {
      setErrorMessage("C2 must not be empty.");
      return;
    }

    if (!knownP1.trim()) {
      setErrorMessage("Known part of P1 must not be empty.");
      return;
    }

    if (!startIndex.trim()) {
      setErrorMessage("Start index must not be empty.");
      return;
    }

    // Parse inputs
    const c1Array = parseNumberArray(c1);
    const c2Array = parseNumberArray(c2);
    const startIdx = parseInt(startIndex.trim(), 10);

    if (isNaN(startIdx) || startIdx < 0) {
      setErrorMessage("Start index must be a non-negative number.");
      return;
    }

    if (c1Array.length === 0) {
      setErrorMessage("C1 must contain valid numbers.");
      return;
    }

    if (c2Array.length === 0) {
      setErrorMessage("C2 must contain valid numbers.");
      return;
    }

    if (c1Array.length !== c2Array.length) {
      setErrorMessage("C1 and C2 must have the same length.");
      return;
    }

    if (startIdx + knownP1.length > c1Array.length) {
      setErrorMessage("Start index + known P1 length exceeds ciphertext length.");
      return;
    }

    // Perform attack
    const attackSteps: AttackStep[] = [];
    let recovered = "";

    for (let i = 0; i < knownP1.length; i++) {
      const pos = startIdx + i;
      
      if (pos >= c1Array.length || pos >= c2Array.length) {
        break;
      }

      const c1Value = c1Array[pos];
      const c2Value = c2Array[pos];
      const p1Char = knownP1[i];
      const p1CharCode = p1Char.charCodeAt(0);

      // Recover key: K = C1 XOR P1
      const recoveredKey = c1Value ^ p1CharCode;

      // Recover P2: P2 = C2 XOR K
      const p2CharCode = c2Value ^ recoveredKey;
      const p2Char = String.fromCharCode(p2CharCode);

      recovered += p2Char;

      attackSteps.push({
        position: pos,
        c1Value,
        c2Value,
        p1Char,
        p1CharCode,
        recoveredKey,
        p2Char,
        p2CharCode,
      });
    }

    setRecoveredP2(recovered);
    setSteps(attackSteps);
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
            One-Time Pad - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools for One-Time Pad using known plaintext attack to demonstrate key reuse vulnerability.
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
              OTP Cryptanalysis (Known Plaintext Attack - Key Reuse)
            </h2>
            
            <p className="theme-text-secondary mb-6 text-sm sm:text-base theme-transition">
              This tool demonstrates a known plaintext attack on One-Time Pad when the same key is reused. 
              If you know part of plaintext P1, you can recover the corresponding part of plaintext P2 using 
              the relationship: K = C1 XOR P1, then P2 = C2 XOR K.
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  C1 (ciphertext 1, numbers separated by spaces):
                </label>
                <Textarea
                  className="theme-transition"
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    minHeight: '80px',
                    width: "100%"
                  }}
                  placeholder="Enter C1 as numbers separated by spaces (e.g., 72 101 108 108 111)..."
                  value={c1}
                  onChange={(e) => setC1(e.target.value)}
                />
              </div>

              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  C2 (ciphertext 2, numbers separated by spaces):
                </label>
                <Textarea
                  className="theme-transition"
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    minHeight: '80px',
                    width: "100%"
                  }}
                  placeholder="Enter C2 as numbers separated by spaces..."
                  value={c2}
                  onChange={(e) => setC2(e.target.value)}
                />
              </div>

              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  Known part of P1 (text):
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
                  placeholder="Enter known plaintext (e.g., HELLO)..."
                  value={knownP1}
                  onChange={(e) => setKnownP1(e.target.value)}
                />
              </div>

              <div>
                <label className="theme-text-secondary block mb-2 text-sm sm:text-base theme-transition">
                  Start index (position in ciphertext where known P1 starts):
                </label>
                <Input
                  type="number"
                  min="0"
                  className="theme-transition"
                  style={{
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    padding: "10px",
                    borderRadius: "6px",
                    width: "100%"
                  }}
                  placeholder="Enter start index (e.g., 0)..."
                  value={startIndex}
                  onChange={(e) => setStartIndex(e.target.value)}
                />
              </div>
            </div>

            <Button 
              onClick={runAttack} 
              className="w-full mb-6 theme-accent-bg theme-transition"
              style={{
                background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                borderColor: 'var(--theme-card-border)',
                boxShadow: '0 0 10px var(--theme-shadow)'
              }}
            >
              Run Attack
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

            {/* Recovered P2 */}
            {recoveredP2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <div className="theme-card p-4 rounded-lg theme-transition"
                  style={{
                    borderColor: 'var(--theme-card-border)',
                    border: '1px solid var(--theme-card-border)'
                  }}
                >
                  <h3 className="theme-accent mb-2 text-lg font-semibold theme-transition">
                    Recovered part of P2:
                  </h3>
                  <p className="theme-text font-mono text-sm sm:text-base break-words theme-transition">
                    {recoveredP2}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step-by-step explanation */}
            {steps.length > 0 && (
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
                    Step-by-Step Attack Details:
                  </h3>
                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="p-3 rounded theme-transition"
                        style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid var(--theme-card-border)'
                        }}
                      >
                        <p className="theme-text text-sm sm:text-base theme-transition">
                          <strong>Position {step.position}:</strong>
                        </p>
                        <p className="theme-text-secondary text-xs sm:text-sm theme-transition ml-4">
                          C1[{step.position}] = {step.c1Value}, C2[{step.position}] = {step.c2Value}
                        </p>
                        <p className="theme-text-secondary text-xs sm:text-sm theme-transition ml-4">
                          Known P1[{step.position}] = '{step.p1Char}' (char code: {step.p1CharCode})
                        </p>
                        <p className="theme-text-secondary text-xs sm:text-sm theme-transition ml-4">
                          Recovered K = C1[{step.position}] XOR P1[{step.position}] = {step.c1Value} XOR {step.p1CharCode} = {step.recoveredKey}
                        </p>
                        <p className="theme-text-secondary text-xs sm:text-sm theme-transition ml-4">
                          Recovered P2[{step.position}] = C2[{step.position}] XOR K = {step.c2Value} XOR {step.recoveredKey} = {step.p2CharCode} = '{step.p2Char}'
                        </p>
                      </div>
                    ))}
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

