import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { algorithms } from '../lib/algorithms';

interface CryptanalysisDetailPageProps {
  algorithmId: string;
  onNavigate: (page: string) => void;
}

export function CryptanalysisDetailPage({ algorithmId, onNavigate }: CryptanalysisDetailPageProps) {
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
            {algorithm.name} - Cryptanalysis
          </h1>
          <p className="theme-text-secondary max-w-2xl text-sm sm:text-base theme-transition">
            Interactive cryptanalysis tools and demonstrations for {algorithm.name}.
          </p>
        </motion.div>

        {/* Placeholder Container for HTML/JS Code */}
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
              Cryptanalysis Interactive Tool
            </h2>
            <div 
              id={`cryptanalysis-container-${algorithmId}`}
              className="w-full min-h-[400px] theme-transition"
              style={{
                backgroundColor: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-card-border)',
                borderRadius: '8px',
                padding: '20px'
              }}
            >
              {/* Placeholder for HTML/JS code */}
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <p className="theme-text-secondary text-center theme-transition">
                  Placeholder container for {algorithm.name} cryptanalysis code.
                  <br />
                  HTML and JavaScript code will be inserted here.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

