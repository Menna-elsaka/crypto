import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { algorithms } from '../lib/algorithms';

interface ExplanationDetailPageProps {
  algorithmId: string;
  onNavigate: (page: string) => void;
}

export function ExplanationDetailPage({ algorithmId, onNavigate }: ExplanationDetailPageProps) {
  const algorithm = algorithms.find(a => a.id === algorithmId);

  if (!algorithm) {
    return (
      <motion.div 
        className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 theme-transition theme-bg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-6xl">
          <Card className="theme-card p-8 text-center theme-transition">
            <p className="theme-text-secondary">Algorithm not found</p>
            <Button
              onClick={() => onNavigate('cryptanalysis')}
              className="mt-4 theme-accent-bg"
            >
              Back to Cryptanalysis
            </Button>
          </Card>
        </div>
      </motion.div>
    );
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
            onClick={() => onNavigate('cryptanalysis')}
            variant="outline"
            className="mb-6 theme-transition"
            style={{
              borderColor: 'var(--theme-card-border)',
              backgroundColor: 'transparent'
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
            {algorithm.name} - Explanation
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Detailed explanation of {algorithm.name} and its cryptanalysis.
          </p>
        </motion.div>

        {/* Explanation Content */}
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
            {algorithmId === 'blake2b' ? (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    These properties make it computationally infeasible to find two messages with the same output, determine a message from a given hash, or generate an alternative message that hashes to the same value as a known one. The design choices contribute to a secure and stable hashing function suitable for modern cryptographic applications.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Mathematical Structure Overview
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    The mathematical foundation of BLAKE2b is based on operations applied to 64-bit words. These operations provide high levels of non-linearity and diffusion, making the internal state difficult to analyze or predict. BLAKE2b uses a combination of modular arithmetic, bitwise operations, and structured mixing to produce strong cryptographic behavior.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Internal State Representation
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    BLAKE2b uses a 1024-bit internal state divided into sixteen 64-bit words. During the compression process, this state is modified by combining it with message blocks and constants. The large state size provides a broad space for mixing and significantly increases resistance to structural cryptanalysis.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Modular Addition
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    A major component of BLAKE2b is modular addition performed as (a + b) modulo 2^64. The wrap around behaviour breaks linear structure and makes equations involving this operation extremely difficult to invert or model.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    XOR Operation
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    XOR mixes bits from different words. It eliminates predictable patterns and behaves non-linearly when combined with addition.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Bitwise Rotations
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    Rotations shift bits within a 64-bit word. BLAKE2b uses rotation amounts of 32, 24, 16, and 63 bits. These values maximise diffusion and prevent structural symmetry.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Permutation Schedule
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    A fixed permutation, known as sigma, determines the order in which message words are used in each round of the compression function. This reordering prevents structural patterns from appearing during hashing and provides unpredictability in how message blocks affect the internal state.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Detailed Mathematical Steps of the G Function
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    The G function mixes four state words a, b, c and d together with two message words x and y through eight structured operations.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 1:</span> a = (a + b + x) mod 2^64</p>
                    </div>
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 2:</span> d = (d XOR a) rotated right by 32</p>
                    </div>
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 3:</span> c = (c + d) mod 2^64</p>
                    </div>
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 4:</span> b = (b XOR c) rotated right by 24</p>
                    </div>
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 5:</span> a = (a + b + y) mod 2^64</p>
                    </div>
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 6:</span> d = (d XOR a) rotated right by 16</p>
                    </div>
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 7:</span> c = (c + d) mod 2^64</p>
                    </div>
                    <div className="theme-card p-4 rounded-lg theme-transition" style={{ borderColor: 'var(--theme-card-border)', border: '1px solid var(--theme-card-border)' }}>
                      <p className="theme-text font-mono text-sm sm:text-base mb-1"><span className="theme-accent font-semibold">Step 8:</span> b = (b XOR c) rotated right by 63</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Round Structure
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    Each round applies eight G functions. BLAKE2b performs twelve rounds, producing a total of ninety-six G operations per message block. This depth of mixing ensures strong avalanche behaviour.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Compression Function
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    The compression function updates the internal state using h(i+1) = F(h(i), m(i)). After all G functions complete, the updated state is combined with the previous state through XOR operations.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Finalization
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    Flags and counters are applied after all message blocks are processed. The final digest is extracted from the updated state to produce the 512-bit hash.
                  </p>
                </div>

                <div>
                  <h2 className="theme-accent mb-4 text-xl sm:text-2xl font-semibold theme-transition theme-glow">
                    Cryptanalytic Strength
                  </h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    The ARX construction resists differential, linear and algebraic attacks. The sigma schedule, rotation constants and deep mixing rounds ensure that the full twelve-round BLAKE2b remains secure.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="theme-text mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-semibold theme-transition">
                  Explanation
                </h2>
                <div 
                  className="w-full min-h-[400px] theme-transition"
                  style={{
                    backgroundColor: 'var(--theme-card-bg)',
                    border: '1px solid var(--theme-card-border)',
                    borderRadius: '8px',
                    padding: '20px'
                  }}
                >
                  {/* Placeholder for explanation content */}
                  <div className="prose prose-invert max-w-none">
                    <p className="theme-text-secondary leading-relaxed theme-transition">
                      Placeholder for {algorithm.name} explanation content.
                      <br />
                      Detailed explanation text will be provided here.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

