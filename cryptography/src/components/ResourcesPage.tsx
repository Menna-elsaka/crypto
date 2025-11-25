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
      className="min-h-screen pt-32 pb-20 px-6"
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
          className="text-center mb-16"
        >
          <h1 
            className="text-purple-400 mb-4 tracking-wider"
            style={{ textShadow: '0 0 20px rgba(138, 43, 226, 0.8)' }}
          >
            LEARNING RESOURCES
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
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
                y: -5,
                boxShadow: '0 0 40px rgba(138, 43, 226, 0.4)'
              }}
            >
              <Card 
                className="bg-gradient-to-br from-[#0A0F3C]/60 to-[#1a0f4d]/40 border-purple-500/30 p-8"
                style={{ boxShadow: '0 0 20px rgba(138, 43, 226, 0.2)' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-purple-300 mb-2" style={{ textShadow: '0 0 10px rgba(138, 43, 226, 0.5)' }}>{algorithm.name}</h2>
                    <p className="text-gray-400">{algorithm.description}</p>
                    <div className="flex gap-3 mt-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                        {algorithm.type}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs border border-purple-500/30">
                        Security: {algorithm.security}/10
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Documentation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400">
                      <BookOpen className="w-5 h-5" />
                      <h3>Documentation</h3>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-500/20 justify-between"
                        onClick={() => window.open(algorithm.resources.documentation, '_blank')}
                      >
                        Official Docs
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Research Papers */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400">
                      <FileText className="w-5 h-5" />
                      <h3>Research Papers</h3>
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
                            x: 5,
                            backgroundColor: 'rgba(138, 43, 226, 0.15)',
                            borderColor: 'rgba(138, 43, 226, 0.5)'
                          }}
                          className="flex items-center justify-between p-3 rounded bg-purple-500/10 border border-purple-500/30 text-gray-300 text-sm cursor-pointer group"
                        >
                          <span>{paper.title}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Tutorials */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-400">
                      <GraduationCap className="w-5 h-5" />
                      <h3>Tutorials</h3>
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
                            x: 5,
                            backgroundColor: 'rgba(138, 43, 226, 0.15)',
                            borderColor: 'rgba(138, 43, 226, 0.5)'
                          }}
                          className="flex items-center justify-between p-3 rounded bg-purple-500/10 border border-purple-500/30 text-gray-300 text-sm cursor-pointer group"
                        >
                          <span>{tutorial.title}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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
