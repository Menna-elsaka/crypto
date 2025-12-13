import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface OtpExplanationProps {
  onNavigate: (page: string) => void;
}

export function OtpExplanation({ onNavigate }: OtpExplanationProps) {
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
              One-Time Pad — Mathematical and Cryptographic Explanation
            </h1>

            <div className="space-y-6 sm:space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Introduction
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The One-Time Pad (OTP) is a theoretically unbreakable encryption scheme when used correctly. 
                  It was first described by Frank Miller in 1882 and later independently invented by Gilbert Vernam 
                  in 1917. The cipher achieves perfect secrecy under specific conditions: the key must be truly random, 
                  at least as long as the message, used only once, and kept completely secret.
                </p>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  Claude Shannon proved in 1949 that OTP provides perfect secrecy—meaning that even with unlimited 
                  computational resources, an attacker cannot gain any information about the plaintext from the 
                  ciphertext alone. However, this security guarantee only holds when the key is never reused.
                </p>
              </section>

              {/* Encryption and Decryption */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Encryption and Decryption
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  One-Time Pad encryption is performed using the XOR (exclusive OR) operation. For each position 
                  in the message, the plaintext character is combined with the corresponding key character:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    C = P ⊕ K
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Where C is the ciphertext, P is the plaintext, K is the key, and ⊕ represents the XOR operation. 
                  The XOR operation is performed bit-by-bit on the binary representation of each character.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Decryption uses the same operation, since XOR is its own inverse:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    P = C ⊕ K
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  This works because (P ⊕ K) ⊕ K = P, demonstrating that XOR is a symmetric operation. The same 
                  key that encrypts the message can decrypt it.
                </p>
              </section>

              {/* The Key Reuse Problem */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  The Key Reuse Problem
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The fundamental security requirement of OTP is that the key must be used only once. When the same 
                  key encrypts two different messages, the cipher becomes completely vulnerable to cryptanalysis.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Consider two messages encrypted with the same key K:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>C₁ = P₁ ⊕ K (first ciphertext)</li>
                  <li>C₂ = P₂ ⊕ K (second ciphertext)</li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  If an attacker intercepts both C₁ and C₂, they can compute C₁ ⊕ C₂. This reveals information 
                  about the relationship between the two plaintexts, even without knowing the key.
                </p>
              </section>

              {/* Mathematical Breakdown */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Mathematical Breakdown
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  When the same key is used for two messages, XORing the two ciphertexts eliminates the key:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    C₁ ⊕ C₂ = (P₁ ⊕ K) ⊕ (P₂ ⊕ K) = P₁ ⊕ P₂
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  This mathematical relationship is critical: the XOR of two ciphertexts equals the XOR of their 
                  corresponding plaintexts. The key cancels out completely, leaving only the relationship between 
                  the two messages.
                </p>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  This means that even without knowing the key, an attacker can learn about the relationship between 
                  P₁ and P₂. If they know or can guess part of one plaintext, they can recover the corresponding 
                  part of the other plaintext.
                </p>
              </section>

              {/* Known Plaintext Attack */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Known Plaintext Attack
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  A known plaintext attack becomes possible when the key is reused. If an attacker knows part of 
                  plaintext P₁, they can recover the key for those positions and then use it to decrypt the 
                  corresponding part of P₂.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The attack proceeds as follows:
                </p>
                <ol className="theme-text-secondary space-y-3 text-sm sm:text-base theme-transition list-decimal list-inside ml-4">
                  <li>
                    <strong>Recover the key:</strong> Since K = C₁ ⊕ P₁, knowing C₁ and P₁ allows the attacker 
                    to compute K for the known positions.
                  </li>
                  <li>
                    <strong>Decrypt P₂:</strong> Using the recovered key, compute P₂ = C₂ ⊕ K for the same positions.
                  </li>
                </ol>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  This attack demonstrates that key reuse completely breaks the security of OTP. Even knowing a 
                  small portion of one plaintext can reveal the corresponding portion of another plaintext encrypted 
                  with the same key.
                </p>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  In practice, attackers might know plaintext from predictable message formats (headers, standard 
                  greetings, file formats) or from context. This makes key reuse a critical vulnerability in real-world 
                  implementations.
                </p>
              </section>

              {/* Purpose of This Module */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Purpose of This Module
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  This educational module demonstrates a critical security principle: One-Time Pad keys must never be 
                  reused. While OTP is theoretically unbreakable when used correctly, key reuse completely destroys 
                  its security properties.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Key lessons:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>OTP provides perfect secrecy only when keys are truly random, as long as the message, used once, and kept secret</li>
                  <li>Key reuse makes OTP completely insecure, even against known plaintext attacks</li>
                  <li>The XOR operation's mathematical properties make key reuse particularly dangerous</li>
                  <li>Real-world OTP implementations must ensure keys are never reused, which is often impractical for large-scale systems</li>
                  <li>Modern cryptography uses stream ciphers with unique initialization vectors (IVs) to achieve similar security without the key management burden</li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  This module serves as both a demonstration of perfect secrecy when used correctly and a warning 
                  about the catastrophic consequences of key reuse. It illustrates why modern cryptographic systems 
                  use more practical approaches that provide strong security without requiring truly random keys as 
                  long as the message.
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

