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
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6"
      style={{ backgroundColor: '#EFECE3' }}
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
            className="mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl font-semibold"
            style={{ color: '#4A70A9' }}
          >
            LEARNING RESOURCES
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base px-4" style={{ color: '#000000' }}>
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
                className="p-6 sm:p-8"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid #8FABD4',
                  borderRadius: '20px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.07)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                  <div className="flex-1">
                    <h2 className="mb-2 font-semibold text-xl sm:text-2xl" style={{ color: '#4A70A9' }}>{algorithm.name}</h2>
                    <p className="mb-4" style={{ color: '#000000' }}>{algorithm.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: '#8FABD4',
                          color: '#000000'
                        }}
                      >
                        {algorithm.type}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: '#8FABD4',
                          color: '#000000'
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
                      <BookOpen className="w-5 h-5" style={{ color: '#4A70A9' }} />
                      <h3 className="font-semibold" style={{ color: '#4A70A9' }}>Documentation</h3>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full justify-between"
                        style={{
                          backgroundColor: '#4A70A9',
                          color: '#EFECE3',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '12px 16px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3B5B86';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#4A70A9';
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
                      <FileText className="w-5 h-5" style={{ color: '#4A70A9' }} />
                      <h3 className="font-semibold" style={{ color: '#4A70A9' }}>Research Papers</h3>
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
                          className="flex items-center justify-between p-3 rounded-lg cursor-pointer group"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #8FABD4',
                            color: '#000000',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#4A70A9';
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#8FABD4';
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          <span className="text-sm">{paper.title}</span>
                          <ExternalLink className="w-4 h-4" style={{ color: '#4A70A9' }} />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Tutorials */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-5 h-5" style={{ color: '#4A70A9' }} />
                      <h3 className="font-semibold" style={{ color: '#4A70A9' }}>Tutorials</h3>
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
                          className="flex items-center justify-between p-3 rounded-lg cursor-pointer group"
                          style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #8FABD4',
                            color: '#000000',
                            textDecoration: 'none'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#4A70A9';
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#8FABD4';
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          <span className="text-sm">{tutorial.title}</span>
                          <ExternalLink className="w-4 h-4" style={{ color: '#4A70A9' }} />
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
