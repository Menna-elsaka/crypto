import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Lock, Zap, Shield, Key, Hash, Network } from 'lucide-react';
import { algorithms } from '../lib/algorithms';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AlgorithmsPageProps {
  onNavigate: (page: string, algorithmId?: string) => void;
  onOpenVisualization: (algorithmId: string) => void;
}

const algorithmImages = {
  'blake2b': 'https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlciUyMHNlY3VyaXR5JTIwZW5jcnlwdGlvbnxlbnwxfHx8fDE3NjE4NTQ5NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'caesar': 'https://images.unsplash.com/photo-1615129162044-8287f97d3763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwY2lwaGVyJTIwc2Nyb2xsfGVufDF8fHx8MTc2MTk0MDAxMHww&ixlib=rb-4.1.0&q=80&w=1080',
  'vigenere': 'https://images.unsplash.com/photo-1716922694558-cc44abc8fa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9ncmFwaHklMjBjb2RlJTIwbGV0dGVyc3xlbnwxfHx8fDE3NjE5NDAwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'stream': 'https://images.unsplash.com/photo-1644325349124-d1756b79dd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwc3RyZWFtJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjE5NDAwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'hill': 'https://images.unsplash.com/photo-1746468659043-9eeda39bb2ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRyaXglMjBtYXRoZW1hdGljc3xlbnwxfHx8fDE3NjE5NDAwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'otp': 'https://images.unsplash.com/photo-1503792070985-b4147d061915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNyZXQlMjBrZXklMjBlbmNyeXB0aW9ufGVufDF8fHx8MTc2MTk0MDAxMnww&ixlib=rb-4.1.0&q=80&w=1080',
  'substitution': 'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBoYWJldCUyMGxldHRlcnMlMjBjb2RlfGVufDF8fHx8MTc2MTk0MDAxMnww&ixlib=rb-4.1.0&q=80&w=1080',
};

const iconMap: Record<string, any> = {
  'blake2b': Hash,
  'caesar': Key,
  'vigenere': Shield,
  'stream': Zap,
  'hill': Network,
  'otp': Lock,
  'substitution': Lock,
};

export function AlgorithmsPage({ onNavigate, onOpenVisualization }: AlgorithmsPageProps) {
  return (
    <motion.div 
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 theme-transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 
            className="theme-accent mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl theme-transition theme-glow"
          >
            ENCRYPTION ALGORITHMS
          </h1>
          <p className="theme-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-4 theme-transition">
            Explore different cryptographic algorithms, their strengths, and visualize how they encrypt and decrypt data.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {algorithms.map((algorithm, index) => {
            const Icon = iconMap[algorithm.id] || Lock;
            return (
              <motion.div
                key={algorithm.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  whileHover={{
                    boxShadow: '0 0 40px var(--theme-shadow), 0 0 60px var(--theme-shadow)'
                  }}
                  className="theme-transition"
                >
                  <Card 
                    className="theme-card border overflow-hidden group cursor-pointer h-full flex flex-col theme-transition hover:border-opacity-60"
                    onClick={() => onOpenVisualization(algorithm.id)}
                    style={{
                      borderColor: 'var(--theme-card-border)',
                      boxShadow: '0 0 20px var(--theme-shadow)'
                    }}
                  >
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ImageWithFallback
                        src={algorithmImages[algorithm.id as keyof typeof algorithmImages]}
                        alt={algorithm.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div 
                      className="absolute inset-0 theme-transition"
                      style={{
                        background: 'linear-gradient(to top, var(--theme-bg-from), transparent)'
                      }}
                      initial={{ opacity: 1 }}
                      whileHover={{ opacity: 0.7 }}
                    />
                    <motion.div 
                      className="absolute top-4 left-4 p-3 rounded-full backdrop-blur-sm theme-transition"
                      style={{
                        backgroundColor: 'var(--theme-card-bg)',
                        borderColor: 'var(--theme-card-border)'
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 360,
                        boxShadow: '0 0 20px var(--theme-glow)',
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon 
                        className="w-6 h-6 theme-accent theme-transition" 
                        style={{ filter: 'drop-shadow(0 0 6px var(--theme-glow))' }} 
                      />
                    </motion.div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 
                      className="theme-accent mb-2 theme-transition" 
                      style={{ textShadow: '0 0 10px var(--theme-glow)' }}
                    >
                      {algorithm.name}
                    </h3>
                    <p className="theme-text-secondary mb-4 flex-1 theme-transition">{algorithm.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span 
                        className="px-2 py-1 rounded text-xs border theme-accent theme-transition"
                        style={{
                          backgroundColor: 'var(--theme-card-bg)',
                          borderColor: 'var(--theme-card-border)'
                        }}
                      >
                        {algorithm.type}
                      </span>
                      <span 
                        className="px-2 py-1 rounded text-xs border theme-accent theme-transition"
                        style={{
                          backgroundColor: 'var(--theme-card-bg)',
                          borderColor: 'var(--theme-card-border)'
                        }}
                      >
                        Speed: {algorithm.speed}/10
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={(e : React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          if (algorithm.id === 'blake2b') {
                            onNavigate('blake2b');
                          } else {
                            onOpenVisualization(algorithm.id);
                          }
                        }}
                        className="flex-1 text-white border theme-transition hover:opacity-90"
                        style={{ 
                          background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                          borderColor: 'var(--theme-card-border)',
                          boxShadow: '0 0 10px var(--theme-shadow)' 
                        }}
                      >
                        {algorithm.id === 'blake2b' ? 'Full Visualizer' : 'Visualize'}
                      </Button>
                      <Button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          onNavigate('resources', algorithm.id);
                        }}
                        variant="outline"
                        className="flex-1 theme-accent theme-transition hover:opacity-90"
                        style={{
                          borderColor: 'var(--theme-card-border)',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Resources
                      </Button>
                    </div>
                  </div>
                </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
