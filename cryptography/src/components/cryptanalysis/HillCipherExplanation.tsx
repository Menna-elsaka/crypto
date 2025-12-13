import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface HillCipherExplanationProps {
  onNavigate: (page: string) => void;
}

export function HillCipherExplanation({ onNavigate }: HillCipherExplanationProps) {
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
              Hill Cipher — Mathematical and Cryptographic Explanation
            </h1>

            <div className="space-y-6 sm:space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Introduction
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The Hill Cipher is a polygraphic substitution cipher invented by Lester S. Hill in 1929. Unlike 
                  monoalphabetic ciphers that encrypt one letter at a time, the Hill Cipher encrypts blocks of letters 
                  simultaneously using matrix multiplication. This makes it resistant to simple frequency analysis 
                  attacks, as the same letter can map to different ciphertext letters depending on its position in the block.
                </p>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  The cipher is based on linear algebra and requires the key matrix to be invertible modulo 26. This 
                  mathematical foundation allows for both encryption and decryption operations, but also creates 
                  vulnerabilities that can be exploited through cryptanalysis.
                </p>
              </section>

              {/* Plaintext and Ciphertext Representation */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Plaintext and Ciphertext Representation
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Before encryption, letters are converted to numbers using a simple mapping:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    A = 0, B = 1, C = 2, ..., Z = 25
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The plaintext is then divided into blocks of n letters (where n is the size of the key matrix). 
                  Each block is represented as a column vector. For a 2×2 key matrix, blocks of 2 letters are used. 
                  If the plaintext length is not a multiple of the block size, padding (typically with 'X') is added.
                </p>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  For example, the plaintext "HELLO" would be divided into blocks: "HE", "LL", "OX" (with padding), 
                  and converted to vectors: [7, 4], [11, 11], [14, 23].
                </p>
              </section>

              {/* Key Matrix */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Key Matrix
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The key in the Hill Cipher is an n×n square matrix with integer entries. For the 2×2 case, the key 
                  matrix K has the form:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    K = [k₁₁, k₁₂]<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;[k₂₁, k₂₂]
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The key matrix must be invertible modulo 26. This means its determinant must be coprime with 26 
                  (i.e., gcd(det(K), 26) = 1). If the determinant shares a common factor with 26, the matrix cannot 
                  be inverted, and decryption becomes impossible.
                </p>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  This requirement ensures that for every possible ciphertext block, there exists exactly one 
                  corresponding plaintext block, maintaining the one-to-one mapping essential for decryption.
                </p>
              </section>

              {/* Encryption and Decryption */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Encryption and Decryption
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Encryption is performed by multiplying the key matrix by the plaintext vector, with all operations 
                  performed modulo 26:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    C = K × P (mod 26)
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Where C is the ciphertext vector, K is the key matrix, and P is the plaintext vector. All arithmetic 
                  is performed modulo 26, ensuring that results remain within the valid range of 0–25.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Decryption requires the inverse of the key matrix, denoted K⁻¹:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    P = K⁻¹ × C (mod 26)
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The inverse matrix K⁻¹ is computed using the modular inverse of the determinant and the adjugate 
                  (adjoint) matrix. This ensures that K × K⁻¹ = I (the identity matrix) modulo 26.
                </p>
              </section>

              {/* Why Cryptanalysis Works */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Why Cryptanalysis Works
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The Hill Cipher is vulnerable to a known plaintext attack. If an attacker knows both a plaintext 
                  block and its corresponding ciphertext block, they can recover the key matrix.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Starting from the encryption equation C = K × P, we can rearrange to solve for K:
                </p>
                <div className="theme-card p-4 rounded-lg mb-4 theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                  <p className="theme-text font-mono text-sm sm:text-base text-center">
                    K = C × P⁻¹ (mod 26)
                  </p>
                </div>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  This requires computing the inverse of the plaintext matrix P. If P is not invertible (its 
                  determinant is not coprime with 26), the attack fails. However, with sufficient plaintext–ciphertext 
                  pairs, an attacker can construct an invertible plaintext matrix and recover the key.
                </p>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  For a 2×2 key matrix, knowing just 4 letters (2 blocks of 2 letters each) is sufficient to recover 
                  the key, provided the plaintext matrix is invertible.
                </p>
              </section>

              {/* Key Recovery Process */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Key Recovery Process
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The known plaintext attack on Hill Cipher follows these steps:
                </p>
                <ol className="theme-text-secondary space-y-3 text-sm sm:text-base theme-transition list-decimal list-inside ml-4">
                  <li>
                    <strong>Build plaintext matrix P:</strong> Convert known plaintext letters to numbers and arrange 
                    them into a square matrix. For a 2×2 key, use the first 4 plaintext letters to form a 2×2 matrix.
                  </li>
                  <li>
                    <strong>Build ciphertext matrix C:</strong> Convert corresponding ciphertext letters to numbers 
                    and arrange them into a square matrix of the same size.
                  </li>
                  <li>
                    <strong>Check invertibility:</strong> Calculate the determinant of P modulo 26. If gcd(det(P), 26) ≠ 1, 
                    the matrix is not invertible and the attack cannot proceed with this plaintext.
                  </li>
                  <li>
                    <strong>Compute P⁻¹:</strong> Calculate the modular inverse of the determinant, then compute the 
                    adjugate matrix. Multiply the adjugate by the modular inverse of the determinant to get P⁻¹ mod 26.
                  </li>
                  <li>
                    <strong>Recover key:</strong> Multiply the ciphertext matrix by the inverse plaintext matrix: 
                    K = C × P⁻¹ mod 26. The result is the recovered key matrix.
                  </li>
                </ol>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  Once the key matrix is recovered, the attacker can decrypt any ciphertext encrypted with that key, 
                  demonstrating the vulnerability of the Hill Cipher to known plaintext attacks.
                </p>
              </section>

              {/* Purpose of This Module */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Purpose of This Module
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  This educational module demonstrates both the mathematical elegance and the cryptographic weaknesses 
                  of the Hill Cipher. While the cipher represents an important advancement in cryptographic design by 
                  introducing polygraphic substitution, it has significant vulnerabilities.
                </p>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Key weaknesses include:
                </p>
                <ul className="theme-text-secondary space-y-2 text-sm sm:text-base theme-transition list-disc list-inside ml-4">
                  <li>Vulnerability to known plaintext attacks with relatively few plaintext–ciphertext pairs</li>
                  <li>Requirement that the key matrix be invertible, which limits key space</li>
                  <li>Susceptibility to chosen plaintext attacks</li>
                  <li>Difficulty in key management for larger matrices</li>
                </ul>
                <p className="theme-text-secondary leading-relaxed mt-4 text-sm sm:text-base theme-transition">
                  Modern cryptography has moved beyond classical ciphers like Hill Cipher, but understanding these 
                  historical methods provides valuable insights into cryptographic principles, linear algebra applications, 
                  and the evolution of cryptographic security. This module serves as both a mathematical exercise and a 
                  lesson in why modern ciphers require more sophisticated design principles.
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

