import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Lock, Unlock, Copy, Check, Video, Zap, RotateCcw } from 'lucide-react';
import { algorithms, encryptSimple, decryptSimple, hashText } from '../lib/algorithms';

// YouTube tutorial links for each algorithm
const algorithmLinks: Record<string, string> = {
  'blake2b': 'https://youtu.be/uey_HFs-oVs?si=VnAGnz8nCuFJZ6_k',
  'caesar': 'https://youtu.be/DdGyJjMb0i8?si=NK-3QhTsd6QwONIi',
  'vigenere': 'https://youtu.be/bBnRIt-cWUw?si=5uU7jFgCzVTnAD2M',
  'substitution': 'https://youtu.be/9bZHlv_d-eI?si=pl1Oyp_eXDcuPdVF',
  'hill': 'https://youtu.be/kzRvGceSO2E?si=YcluauDboj8B8rM6',
  'otp': 'https://youtu.be/kDr-vLAwWOM?si=LTu0N-KLC7s_n6DL',
};

interface AlgorithmVisualizationProps {
  algorithmId: string | null;
  onClose: () => void;
}

export function AlgorithmVisualization({ algorithmId, onClose }: AlgorithmVisualizationProps) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedChars, setAnimatedChars] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  const encodeAudioRef = useRef<HTMLAudioElement | null>(null);
  const decodeAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio elements for sound effects
    encodeAudioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLTgjMGHm7A7+OZSA0PVqzn7bdnGwU7k9n0vHcpBSh+y/DdkT8KFFy08O6nWBELR5/h9cBwIwUrgtDz1IU1Bx9vwvDjnEYND1ap5+u2aBsFO5TZ9L13KgUofsvw3ZE/ChRctPDvp1gRC0ef4fS/cCMFK4PQ89SFNQcfb8Lw45xGDQ9Wqefrtn8');
    decodeAudioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLTgjMGHm7A7+OZSA0PVqzn7bdnGwU7k9n0vHcpBSh+y/DdkT8KFFy08O6nWBELR5/h9cBwIwUrgtDz1IU1Bx9vwvDjnEYND1ap5+u2aBsFO5TZ9L13KgUofsvw3ZE/ChRctPDvp1gRC0ef4fS/cCMFK4PQ89SFNQcfb8Lw45xGDQ9Wqefrtn8');
  }, []);

  const algorithm = algorithms.find(a => a.id === algorithmId);

  const playSound = (type: 'encode' | 'decode') => {
    const audio = type === 'encode' ? encodeAudioRef.current : decodeAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Silently handle if audio play fails
      });
    }
  };

  const handleEncrypt = () => {
    if (!inputText || !algorithm) return;
    
    setIsAnimating(true);
    setCurrentStep(0);
    playSound('encode');

    // Animate character by character
    const chars = inputText.split('');
    let result = '';
    
    if (algorithm.type === 'hash') {
      result = hashText(inputText);
    } else {
      result = encryptSimple(inputText, algorithm.id);
    }
    
    const resultChars = result.split('');
    setAnimatedChars([]);
    
    // Show encryption process step by step - SLOWER for better understanding
    const ANIMATION_DELAY = 150; // Increased from 50ms to 150ms per character
    
    resultChars.forEach((char, index) => {
      setTimeout(() => {
        setAnimatedChars(prev => [...prev, char]);
        setCurrentStep(index + 1);
        
        if (index === resultChars.length - 1) {
          setTimeout(() => {
            setOutputText(result);
            setIsEncrypted(true);
            setIsAnimating(false);
          }, 500); // Increased pause at end
        }
      }, index * ANIMATION_DELAY);
    });
  };

  const handleDecrypt = () => {
    if (!inputText || !algorithm || algorithm.type === 'hash') return;
    
    setIsAnimating(true);
    setCurrentStep(0);
    playSound('decode');

    // Animate decryption step by step
    const decrypted = decryptSimple(inputText, algorithm.id);
    const decryptedChars = decrypted.split('');
    setAnimatedChars([]);
    
    const ANIMATION_DELAY = 150; // Same slower speed
    
    decryptedChars.forEach((char, index) => {
      setTimeout(() => {
        setAnimatedChars(prev => [...prev, char]);
        setCurrentStep(index + 1);
        
        if (index === decryptedChars.length - 1) {
          setTimeout(() => {
            setOutputText(decrypted);
            setIsEncrypted(false);
            setIsAnimating(false);
          }, 500);
        }
      }, index * ANIMATION_DELAY);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setIsEncrypted(false);
    setAnimatedChars([]);
    setCurrentStep(0);
    setMode('encrypt');
  };

  if (!algorithm) return null;

  return (
    <Dialog open={!!algorithmId} onOpenChange={onClose}>
      <DialogContent 
        className="bg-gradient-to-br from-[#0A0F3C] to-[#1a0f4d] border-purple-500/40 text-white max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 0 40px rgba(138, 43, 226, 0.3)' }}
      >
        <DialogHeader>
          <DialogTitle 
            className="text-purple-400 tracking-wider"
            style={{ textShadow: '0 0 15px rgba(138, 43, 226, 0.8)' }}
          >
            {algorithm.name} Visualization
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Interactive visualization tool for {algorithm.name}. Enter text to see encryption and decryption in action.
          </DialogDescription>
        </DialogHeader>

        {/* Watch Video Button - Above the main content */}
        {algorithmLinks[algorithm.id] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center -mt-2 mb-4"
          >
            <motion.a
              href={algorithmLinks[algorithm.id]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border border-purple-400/50 rounded-xl text-white transition-all group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(138, 43, 226, 0.6), 0 0 50px rgba(59, 130, 246, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                boxShadow: '0 0 20px rgba(138, 43, 226, 0.4)',
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Video className="w-5 h-5" />
                <motion.div
                  className="absolute -inset-1 bg-white/20 rounded-full blur-md -z-10"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="tracking-wide">Watch Tutorial Video</span>
              <motion.div
                className="w-1.5 h-1.5 bg-green-400 rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.a>
          </motion.div>
        )}

        <div className="space-y-6 py-4">
          {/* Algorithm Info Card */}
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <p className="text-gray-300">{algorithm.description}</p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-3">
              <span className="text-xs text-purple-300">Type: {algorithm.type}</span>
              <span className="text-xs text-purple-300">Speed: {algorithm.speed}/10</span>
              <span className="text-xs text-purple-300">Security: {algorithm.security}/10</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Mode Toggle */}
            {algorithm.type !== 'hash' && (
              <div className="flex justify-center gap-2 p-1 bg-black/40 rounded-lg border border-purple-500/30 w-fit mx-auto">
                <motion.button
                  onClick={() => setMode('encrypt')}
                  className={`px-6 py-2 rounded-md transition-all ${
                    mode === 'encrypt'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={
                    mode === 'encrypt'
                      ? { boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)' }
                      : {}
                  }
                >
                  <Lock className="w-4 h-4 inline mr-2" />
                  Encrypt Mode
                </motion.button>
                <motion.button
                  onClick={() => setMode('decrypt')}
                  className={`px-6 py-2 rounded-md transition-all ${
                    mode === 'decrypt'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={
                    mode === 'decrypt'
                      ? { boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }
                      : {}
                  }
                >
                  <Unlock className="w-4 h-4 inline mr-2" />
                  Decrypt Mode
                </motion.button>
              </div>
            )}

            <div>
              <label className="text-purple-300 mb-2 block">
                {mode === 'encrypt' || algorithm.type === 'hash' ? 'Input Text' : 'Encrypted Text to Decrypt'}
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === 'encrypt' || algorithm.type === 'hash'
                    ? 'Enter text to encrypt...'
                    : 'Enter encrypted text to decrypt...'
                }
                className="bg-black/60 border-purple-500/40 text-white placeholder:text-gray-500 min-h-[100px]"
              />
            </div>

            {/* Algorithm-specific visualization */}
            {inputText && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-lg bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30"
                style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)' }}
              >
                <h4 className="text-blue-300 mb-3 flex items-center gap-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                  How {algorithm.name} Works:
                </h4>
                {algorithm.id === 'caesar' && (
                  <div className="text-sm text-gray-300 space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Each letter is shifted by a fixed number (e.g., 3 positions)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Example: A → D, B → E, C → F
                    </p>
                    <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-400/30 mt-3">
                      <p className="text-xs text-blue-300 mb-2">Live Preview:</p>
                      <div className="flex flex-wrap gap-2 items-center font-mono text-xs">
                        <span className="px-3 py-1.5 bg-blue-500/30 rounded-lg border border-blue-400/50 text-blue-200">
                          Plain: {inputText.slice(0, 3)}
                        </span>
                        <motion.span 
                          className="text-purple-400 text-lg"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                        <span className="px-3 py-1.5 bg-purple-500/30 rounded-lg border border-purple-400/50 text-purple-200">
                          Cipher: {encryptSimple(inputText.slice(0, 3), 'caesar')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {algorithm.id === 'vigenere' && (
                  <div className="text-sm text-gray-300 space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Uses a keyword to shift different letters by different amounts
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Each letter in the key determines the shift for plaintext
                    </p>
                    <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-400/30">
                      <p className="text-purple-300 flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4" />
                        <span>Key: SECRET (repeating pattern)</span>
                      </p>
                      <div className="flex gap-1 text-xs font-mono">
                        {['S', 'E', 'C', 'R', 'E', 'T'].map((char, i) => (
                          <motion.span
                            key={i}
                            className="px-2 py-1 bg-purple-500/20 rounded border border-purple-400/40"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                          >
                            {char}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {algorithm.id === 'substitution' && (
                  <div className="text-sm text-gray-300 space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Each letter is replaced with another fixed letter
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      One-to-one letter substitution mapping
                    </p>
                    <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-400/30">
                      <p className="text-xs text-green-300 mb-2">Example Mapping:</p>
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                        {[['A', 'Z'], ['B', 'Y'], ['C', 'X']].map(([from, to], i) => (
                          <div key={i} className="flex items-center gap-1 bg-green-500/20 rounded px-2 py-1 border border-green-400/40">
                            <span className="text-green-200">{from}</span>
                            <span className="text-yellow-300">↔</span>
                            <span className="text-green-200">{to}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {algorithm.id === 'hill' && (
                  <div className="text-sm text-gray-300 space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Uses matrix multiplication with a key matrix
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Encrypts blocks of letters at once
                    </p>
                    <div className="p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-400/30">
                      <p className="text-purple-300 flex items-center gap-2 mb-2">
                        <span className="text-xl">🔢</span>
                        <span>Based on Linear Algebra</span>
                      </p>
                      <div className="text-xs font-mono text-center text-purple-200">
                        <span className="px-2 py-1 bg-purple-500/20 rounded border border-purple-400/40">
                          [Text Block] × [Key Matrix] = [Cipher]
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {algorithm.id === 'otp' && (
                  <div className="text-sm text-gray-300 space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Uses a random key as long as the message
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      XOR operation: each bit combined with key bit
                    </p>
                    <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-400/30">
                      <p className="text-green-300 flex items-center gap-2 mb-2">
                        <span className="text-xl">✅</span>
                        <span>Mathematically Unbreakable!</span>
                      </p>
                      <div className="text-xs font-mono text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-2 py-1 bg-blue-500/20 rounded border border-blue-400/40 text-blue-200">
                            Message
                          </span>
                          <span className="text-green-300">⊕</span>
                          <span className="px-2 py-1 bg-purple-500/20 rounded border border-purple-400/40 text-purple-200">
                            Random Key
                          </span>
                          <span className="text-yellow-300">=</span>
                          <span className="px-2 py-1 bg-green-500/20 rounded border border-green-400/40 text-green-200">
                            Cipher
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {algorithm.id === 'blake2b' && (
                  <div className="text-sm text-gray-300 space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Cryptographic hash function (one-way only)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-blue-400">➤</span>
                      Creates unique fixed-size fingerprint of any input
                    </p>
                    <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-400/30">
                      <p className="text-yellow-300 flex items-center gap-2 mb-2">
                        <span className="text-xl">⚠️</span>
                        <span>Cannot Be Decrypted!</span>
                      </p>
                      <div className="text-xs font-mono text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-2 py-1 bg-blue-500/20 rounded border border-blue-400/40 text-blue-200">
                            Any Input
                          </span>
                          <motion.span 
                            className="text-yellow-300 text-lg"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                          <span className="px-2 py-1 bg-purple-500/20 rounded border border-purple-400/40 text-purple-200">
                            Fixed Hash
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {algorithm.id === 'stream' && (
                  <div className="text-sm text-gray-300 space-y-2">
                    <p>• Encrypts data one bit or byte at a time</p>
                    <p>• Uses a pseudorandom keystream</p>
                    <p className="text-blue-300">⚡ Very fast encryption</p>
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex gap-4 justify-center">
              {(mode === 'encrypt' || algorithm.type === 'hash') && (
                <Button
                  onClick={handleEncrypt}
                  disabled={!inputText || isAnimating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 relative overflow-hidden group"
                  style={{ boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)' }}
                >
                  <AnimatePresence>
                    {isAnimating && (mode === 'encrypt' || algorithm.type === 'hash') && (
                      <motion.div
                        className="absolute inset-0 bg-purple-400"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                  </AnimatePresence>
                  <Lock className="w-4 h-4 mr-2" />
                  {algorithm.type === 'hash' ? 'Generate Hash' : 'Encrypt Text'}
                </Button>
              )}

              {mode === 'decrypt' && algorithm.type !== 'hash' && (
                <Button
                  onClick={handleDecrypt}
                  disabled={!inputText || isAnimating}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border-0 relative overflow-hidden"
                  style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
                >
                  <AnimatePresence>
                    {isAnimating && mode === 'decrypt' && (
                      <motion.div
                        className="absolute inset-0 bg-green-400"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      />
                    )}
                  </AnimatePresence>
                  <Unlock className="w-4 h-4 mr-2" />
                  Decrypt Text
                </Button>
              )}

              {/* Clear Button */}
              {(inputText || outputText) && (
                <Button
                  onClick={handleClear}
                  disabled={isAnimating}
                  variant="outline"
                  className="border-red-500/40 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Step-by-step visualization - ENHANCED */}
            <AnimatePresence>
              {isAnimating && animatedChars.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-600/20 border-2 border-purple-500/50 overflow-hidden relative"
                  style={{ boxShadow: '0 0 30px rgba(138, 43, 226, 0.4), inset 0 0 20px rgba(138, 43, 226, 0.1)' }}
                >
                  {/* Multiple animated background effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                    animate={{ 
                      x: ['-100%', '100%']
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-l from-blue-500/5 to-purple-500/5"
                    animate={{ 
                      x: ['100%', '-100%']
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: 'linear'
                    }}
                  />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-purple-300 flex items-center gap-3">
                        <motion.span
                          className="text-2xl"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          🔄
                        </motion.span>
                        <span className="tracking-wide">
                          {mode === 'decrypt' ? 'Decrypting' : (algorithm.type === 'hash' ? 'Hashing' : 'Encrypting')} Step-by-Step
                        </span>
                      </p>
                      <div className="px-3 py-1 bg-purple-500/30 rounded-full border border-purple-400/50">
                        <span className="text-sm text-purple-200">
                          {currentStep} / {inputText.length}
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / inputText.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                        style={{ boxShadow: '0 0 10px rgba(138, 43, 226, 0.8)' }}
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 font-mono text-sm min-h-[3rem]">
                      {animatedChars.map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0, rotateY: 180, y: -20 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            rotateY: 0,
                            y: 0
                          }}
                          transition={{ 
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 200
                          }}
                          className="px-3 py-2 bg-gradient-to-br from-purple-500/40 to-blue-500/40 rounded-lg text-white border-2 border-purple-400/60 relative"
                          style={{
                            boxShadow: '0 0 15px rgba(138, 43, 226, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {char}
                          <motion.div
                            className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg -z-10 blur-sm"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </motion.span>
                      ))}
                    </div>
                    
                    <p className="text-xs text-center text-gray-400 italic">
                      Watch each character transform in real-time...
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {outputText && !isAnimating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <label className="text-purple-300 mb-2 block">
                    {mode === 'decrypt' 
                      ? 'Decrypted Text' 
                      : (algorithm.type === 'hash' ? 'Hash Output' : 'Encrypted Text')}
                  </label>
                  <div className="relative">
                    <Textarea
                      value={outputText}
                      readOnly
                      className="bg-black/60 border-purple-500/40 text-purple-300 min-h-[100px] font-mono pr-12"
                    />
                    <Button
                      onClick={copyToClipboard}
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-purple-400 hover:text-purple-300"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <p className="text-yellow-300 text-sm">
              <strong>Note:</strong> This is a simplified visualization for educational purposes. 
              Real implementations use complex mathematical operations and proper key management.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
