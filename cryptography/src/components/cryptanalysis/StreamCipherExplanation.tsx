import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface StreamCipherExplanationProps {
  onNavigate: (page: string) => void;
}

export function StreamCipherExplanation({ onNavigate }: StreamCipherExplanationProps) {
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
              Stream Cipher — Cryptanalysis and Known Plaintext Attack
            </h1>

            <div className="space-y-6 sm:space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Introduction
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  Stream ciphers encrypt data one bit or byte at a time by combining the plaintext with a pseudorandom 
                  keystream. While stream ciphers can be secure when implemented correctly, they become vulnerable if the 
                  keystream is reused. This explanation demonstrates how a known plaintext attack can completely break 
                  a stream cipher that reuses its keystream.
                </p>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  The fundamental weakness exploited here is that XOR operations are reversible and symmetric. If an 
                  attacker knows even a small portion of the plaintext, they can recover the corresponding portion of 
                  the keystream, which can then be used to decrypt the entire message if the keystream repeats.
                </p>
              </section>

              {/* How Stream Cipher Encryption Works */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  How Stream Cipher Encryption Works
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Stream ciphers operate by generating a keystream (a sequence of random or pseudorandom bits) and 
                  combining it with the plaintext using the XOR operation.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The encryption formula is:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    C = P ⊕ K
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Where:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li><strong>C</strong> is the ciphertext (encrypted data)</li>
                  <li><strong>P</strong> is the plaintext (original message)</li>
                  <li><strong>K</strong> is the keystream (random sequence)</li>
                  <li><strong>⊕</strong> represents the XOR (exclusive OR) operation</li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  The XOR operation is performed bit-by-bit or byte-by-byte. For each position, if the plaintext bit 
                  and keystream bit are different, the result is 1; if they are the same, the result is 0. When 
                  working with bytes, XOR is applied to the ASCII character codes.
                </p>
              </section>

              {/* Why Cryptanalysis Is Possible */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Why Cryptanalysis Is Possible
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The XOR operation has a crucial property: it is its own inverse. This means that if you know the 
                  ciphertext and the plaintext, you can recover the keystream.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Since C = P ⊕ K, we can rearrange to find:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    K = C ⊕ P
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  This mathematical relationship means that if an attacker knows even a small portion of the plaintext 
                  (perhaps from context, standard headers, or predictable content), they can compute the corresponding 
                  portion of the keystream.
                </p>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  If the keystream is reused (a critical security flaw), the recovered keystream can be applied to decrypt 
                  the entire ciphertext. This is why stream ciphers must use unique, non-repeating keystreams for each 
                  message, typically achieved through unique initialization vectors (IVs) or nonces combined with the secret key.
                </p>
              </section>

              {/* Cryptanalysis Steps */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Cryptanalysis Steps
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The known plaintext attack on stream ciphers follows these steps:
                </p>
                <ol className="theme-text-secondary space-y-3 text-sm sm:text-base theme-transition list-decimal list-inside ml-4">
                  <li>
                    <strong>Input ciphertext:</strong> The attacker has access to the encrypted message (C). This 
                    may be in raw binary form or encoded (e.g., base64).
                  </li>
                  <li>
                    <strong>Provide known plaintext:</strong> The attacker knows or can guess a portion of the 
                    original plaintext (P) from the beginning of the message. This could be from:
                    <ul className="list-disc list-inside ml-6 mt-2">
                      <li>Standard message headers or protocols</li>
                      <li>Predictable content (e.g., "Dear Sir," or file format headers)</li>
                      <li>Contextual information about the message</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Recover keystream:</strong> Using the formula K = C ⊕ P, the attacker computes the 
                    keystream bytes corresponding to the known plaintext portion. The keystream is typically displayed 
                    in hexadecimal format for clarity.
                  </li>
                  <li>
                    <strong>Decrypt full ciphertext:</strong> Assuming the keystream repeats (which is the vulnerability 
                    being exploited), the attacker applies the recovered keystream to the entire ciphertext. Since 
                    decryption uses the same XOR operation (P = C ⊕ K), the full plaintext is recovered.
                  </li>
                </ol>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  The recovered keystream is shown as hexadecimal bytes, making it easy to see the pattern. If the 
                  keystream is short and repeats, the attack is particularly effective.
                </p>
              </section>

              {/* Purpose of This Module */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Purpose of This Module
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  This educational module demonstrates a critical security principle: stream ciphers must never reuse 
                  keystreams. The attack shown here is not theoretical—it is a real vulnerability that has broken 
                  real-world systems.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Key lessons:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>Keystream reuse makes stream ciphers completely insecure</li>
                  <li>Known plaintext attacks are practical and dangerous</li>
                  <li>XOR's mathematical properties make it vulnerable if not used correctly</li>
                  <li>Proper stream cipher implementations require unique IVs/nonces for each message</li>
                  <li>Even a small amount of known plaintext can compromise the entire message</li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  Modern secure stream ciphers (like ChaCha20 or AES-CTR) prevent this attack by ensuring each 
                  message uses a unique keystream through proper initialization. This module serves as a warning 
                  about the consequences of improper implementation.
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

