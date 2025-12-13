import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { algorithms } from '../lib/algorithms';
import { BookOpen, FileText, GraduationCap, ExternalLink } from 'lucide-react';

interface ResourcesPageProps {
  selectedAlgorithmId?: string;
}

export function ResourcesPage({ selectedAlgorithmId }: ResourcesPageProps) {
  const displayAlgorithms = selectedAlgorithmId
    ? algorithms.filter(a => a.id === selectedAlgorithmId)
    : algorithms;

  return (
    <motion.div 
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 theme-transition theme-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h1 
            className="theme-accent mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl font-semibold theme-transition theme-glow"
          >
            LEARNING RESOURCES
          </h1>
          <p className="theme-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-4 theme-transition">
            Comprehensive documentation, research papers, and tutorials for each encryption algorithm.
          </p>
        </motion.div>

        <div className="space-y-8">
          {displayAlgorithms.map((algorithm, index) => (
            <motion.div
              key={algorithm.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ 
                scale: 1.01,
              }}
            >
              <Card 
                className="theme-card p-6 sm:p-8 theme-transition dark:!bg-[#111827] dark:!border-[#1f2937]"
                style={{ 
                  borderColor: 'var(--theme-card-border)',
                  boxShadow: 'var(--theme-shadow)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <h2 className="theme-text mb-2 font-semibold text-xl sm:text-2xl theme-transition">{algorithm.name}</h2>
                    <p className="theme-text-secondary mb-4 theme-transition">{algorithm.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium theme-transition"
                        style={{ 
                          backgroundColor: 'var(--theme-card-bg)',
                          borderColor: 'var(--theme-card-border)',
                          border: '1px solid var(--theme-card-border)',
                          color: 'var(--theme-text)'
                        }}
                      >
                        {algorithm.type}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium theme-transition"
                        style={{ 
                          backgroundColor: 'var(--theme-card-bg)',
                          borderColor: 'var(--theme-card-border)',
                          border: '1px solid var(--theme-card-border)',
                          color: 'var(--theme-text)'
                        }}
                      >
                        Security: {algorithm.security}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Documentation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 theme-accent theme-transition" />
                      <h3 className="font-semibold theme-accent theme-transition">Documentation</h3>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full justify-between theme-accent-bg theme-transition"
                        style={{
                          background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`,
                          borderColor: 'var(--theme-card-border)',
                          boxShadow: '0 0 10px var(--theme-shadow)'
                        }}
                        onClick={() => window.open(algorithm.resources.documentation, '_blank')}
                      >
                        Official Docs
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Research Papers */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 theme-accent theme-transition" />
                      <h3 className="font-semibold theme-accent theme-transition">Research Papers</h3>
                    </div>
                    <div className="space-y-2">
                      {algorithm.resources.papers.map((paper, i) => (
                        <motion.a
                          key={i}
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ 
                            scale: 1.02,
                          }}
                          className="flex items-center justify-between p-3 rounded-lg cursor-pointer group theme-transition"
                          style={{
                            backgroundColor: 'var(--theme-card-bg)',
                            border: '1px solid var(--theme-card-border)',
                            color: 'var(--theme-text)',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--theme-accent)';
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--theme-card-border)';
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          <span className="text-sm theme-text theme-transition">{paper.title}</span>
                          <ExternalLink className="w-4 h-4 theme-accent theme-transition" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Tutorials */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-5 h-5 theme-accent theme-transition" />
                      <h3 className="font-semibold theme-accent theme-transition">Tutorials</h3>
                    </div>
                    <div className="space-y-2">
                      {algorithm.resources.tutorials.map((tutorial, i) => (
                        <motion.a
                          key={i}
                          href={tutorial.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ 
                            scale: 1.02,
                          }}
                          className="flex items-center justify-between p-3 rounded-lg cursor-pointer group theme-transition"
                          style={{
                            backgroundColor: 'var(--theme-card-bg)',
                            border: '1px solid var(--theme-card-border)',
                            color: 'var(--theme-text)',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--theme-accent)';
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--theme-card-border)';
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          <span className="text-sm theme-text theme-transition">{tutorial.title}</span>
                          <ExternalLink className="w-4 h-4 theme-accent theme-transition" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
