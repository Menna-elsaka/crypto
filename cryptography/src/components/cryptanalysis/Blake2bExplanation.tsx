import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface Blake2bExplanationProps {
  onNavigate: (page: string) => void;
}

export function Blake2bExplanation({ onNavigate }: Blake2bExplanationProps) {
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
              Complete Mathematical Structure of BLAKE2b
            </h1>

            <div className="space-y-6 sm:space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Introduction
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  BLAKE2b is based on an ARX design that combines modular addition, bit rotations and XOR. The interaction of these operations produces strong non linearity, widespread diffusion and resistance to classical forms of cryptanalysis.
                </p>
              </section>

              {/* Internal State Representation */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Internal State Representation
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The algorithm uses a 1024 bit internal state composed of sixteen 64 bit words. Message blocks, constants and counters mix into this state, ensuring that even a single bit difference spreads unpredictably across the entire structure.
                </p>
              </section>

              {/* Message Blocks */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Message Blocks
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The message is processed in 128 byte blocks. Each block contains sixteen 64 bit message words which are permuted according to the sigma schedule before being injected into the mixing process.
                </p>
              </section>

              {/* Sigma Permutation Schedule */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Sigma Permutation Schedule
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The sigma permutation determines the order in which message words are used in each round. The permutation changes every round to avoid structural repetition and enforce unpredictable mixing behaviour.
                </p>
              </section>

              {/* Core Mathematical Operations */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Core Mathematical Operations (ARX)
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The ARX structure uses three core operations that together provide cryptographic strength: modular addition, XOR and rotation.
                </p>

                <h3 className="theme-accent mb-3 text-lg sm:text-xl font-semibold theme-transition">
                  Modular Addition (mod 2^64)
                </h3>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  Modular addition wraps around at 2^64. The wrap around behaviour breaks linear structure and makes equations involving this operation extremely difficult to invert or model.
                </p>

                <h3 className="theme-accent mb-3 text-lg sm:text-xl font-semibold theme-transition">
                  XOR Operation
                </h3>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  XOR mixes bits from different words. It eliminates predictable patterns and behaves non linearly when combined with addition.
                </p>

                <h3 className="theme-accent mb-3 text-lg sm:text-xl font-semibold theme-transition">
                  Bitwise Rotations
                </h3>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  Rotations shift bits within a 64 bit word. BLAKE2b uses rotation amounts of 32, 24, 16 and 63 bits. These values maximise diffusion and prevent structural symmetry.
                </p>
              </section>

              {/* Detailed Mathematical Steps of the G Function */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Detailed Mathematical Steps of the G Function
                </h2>
                <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                  The G function mixes four state words a, b, c and d together with two message words x and y through eight structured operations.
                </p>
                <div className="space-y-3">
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 1</span>
                      <br />
                      a = (a + b + x) mod 2^64
                    </p>
                  </div>
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 2</span>
                      <br />
                      d = (d XOR a) rotated right by 32
                    </p>
                  </div>
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 3</span>
                      <br />
                      c = (c + d) mod 2^64
                    </p>
                  </div>
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 4</span>
                      <br />
                      b = (b XOR c) rotated right by 24
                    </p>
                  </div>
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 5</span>
                      <br />
                      a = (a + b + y) mod 2^64
                    </p>
                  </div>
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 6</span>
                      <br />
                      d = (d XOR a) rotated right by 16
                    </p>
                  </div>
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 7</span>
                      <br />
                      c = (c + d) mod 2^64
                    </p>
                  </div>
                  <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                    <p className="theme-text font-mono text-sm sm:text-base">
                      <span className="theme-accent font-semibold">Step 8</span>
                      <br />
                      b = (b XOR c) rotated right by 63
                    </p>
                  </div>
                </div>
              </section>

              {/* Round Structure */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Round Structure
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  Each round applies eight G functions. BLAKE2b performs twelve rounds, producing a total of ninety six G operations per message block. This depth of mixing ensures strong avalanche behaviour.
                </p>
              </section>

              {/* Compression Function */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Compression Function
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The compression function updates the internal state using h(i+1) = F(h(i), m(i)). After all G functions complete, the updated state is combined with the previous state through XOR operations.
                </p>
              </section>

              {/* Finalization */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Finalization
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  Flags and counters are applied after all message blocks are processed. The final digest is extracted from the updated state to produce the 512 bit hash.
                </p>
              </section>

              {/* Cryptanalytic Strength */}
              <section>
                <h2 className="theme-accent mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                  Cryptanalytic Strength
                </h2>
                <p className="theme-text-secondary leading-relaxed text-sm sm:text-base theme-transition">
                  The ARX construction resists differential, linear and algebraic attacks. The sigma schedule, rotation constants and deep mixing rounds ensure that the full twelve round BLAKE2b remains secure.
                </p>
              </section>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

