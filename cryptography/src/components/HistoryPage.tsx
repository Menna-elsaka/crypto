import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Scroll, Key, Calculator, Cpu, Network, Shield } from 'lucide-react';

interface HistoryPageProps {}

const timelineEvents = [
  {
    era: '400 BCE',
    title: 'Ancient Cryptography',
    description: 'The Spartan scytale and Caesar cipher were among the earliest encryption methods used for military communications.',
    icon: Scroll,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30'
  },
  {
    era: '1467',
    title: 'Renaissance Era',
    description: 'Leon Battista Alberti invented the polyalphabetic cipher, introducing the concept of changing encryption keys.',
    icon: Key,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30'
  },
  {
    era: '1918',
    title: 'Mechanical Encryption',
    description: 'The Enigma machine was developed, using rotors to create complex substitution ciphers used extensively in WWII.',
    icon: Calculator,
    color: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30'
  },
  {
    era: '1976',
    title: 'Public-Key Cryptography',
    description: 'Diffie-Hellman key exchange revolutionized cryptography by enabling secure communication over insecure channels.',
    icon: Network,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30'
  },
  {
    era: '1977',
    title: 'RSA Algorithm',
    description: 'RSA encryption was invented, becoming the foundation of modern secure communications and digital signatures.',
    icon: Shield,
    color: 'from-purple-500/20 to-blue-500/20',
    borderColor: 'border-purple-500/30'
  },
  {
    era: '2001',
    title: 'Modern Era - AES',
    description: 'Advanced Encryption Standard (AES) was adopted as the U.S. federal standard, securing data worldwide.',
    icon: Cpu,
    color: 'from-purple-500/20 to-indigo-500/20',
    borderColor: 'border-purple-500/30'
  }
];

export function HistoryPage({}: HistoryPageProps) {
  return (
    <motion.div 
      className="min-h-screen pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6"
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
<<<<<<< HEAD
            className=" mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl  theme-accent theme-transition"
            style={{ textShadow: '0 0 20px var(--theme-glow)' }}
          >
            HISTORY OF ENCRYPTION
          </h1>
          <p className="theme-text-secondary theme-transition text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
=======
            className="text-purple-400 mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl"
            style={{ textShadow: '0 0 20px rgba(138, 43, 226, 0.8)' }}
          >
            HISTORY OF ENCRYPTION
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
>>>>>>> basmala_branch
            Journey through time to explore the evolution of cryptography from ancient ciphers to modern algorithms.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block" 
            style={{
<<<<<<< HEAD
              background: 'linear-gradient(to bottom, var(--theme-accent), var(--theme-accent-secondary), var(--theme-accent))',
              boxShadow: '0 0 10px var(--theme-shadow)'
=======
              background: 'linear-gradient(to bottom, rgba(138, 43, 226, 0.5), rgba(138, 43, 226, 0.3), rgba(138, 43, 226, 0.5))',
              boxShadow: '0 0 10px rgba(138, 43, 226, 0.5)'
>>>>>>> basmala_branch
            }}
          />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
<<<<<<< HEAD
                   <motion.div
  whileHover={{ 
    scale: 1.03,
    boxShadow: '0 0 30px var(--theme-glow)'
  }}
  transition={{ duration: 0.3 }}
>
                      <Card 
                        className="theme-card theme-transition border p-6 backdrop-blur-sm inline-block w-full md:w-auto"
style={{
  borderColor: 'var(--theme-card-border)',
  boxShadow: '0 0 15px var(--theme-shadow)'
}}
=======
                    <motion.div
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: '0 0 30px rgba(138, 43, 226, 0.5)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card 
                        className={`bg-gradient-to-br ${event.color} border ${event.borderColor} p-6 backdrop-blur-sm inline-block w-full md:w-auto`}
                        style={{ boxShadow: '0 0 15px rgba(138, 43, 226, 0.2)' }}
>>>>>>> basmala_branch
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} justify-center md:justify-start`}>
<<<<<<< HEAD
                          <div className="p-2 rounded-full theme-transition"  style={{
  backgroundColor: 'color-mix(in srgb, var(--theme-accent) 25%, transparent)',
  boxShadow: '0 0 12px var(--theme-shadow)'
}}
>
                            <Icon className="w-6 h-6  theme-accent theme-transition"  />
                          </div>
                          <span 
                            className=" tracking-wider theme-accent theme-transition"
                            
=======
                          <div className="p-2 rounded-full bg-purple-500/30" style={{ boxShadow: '0 0 10px rgba(138, 43, 226, 0.4)' }}>
                            <Icon className="w-6 h-6 text-purple-400" style={{ filter: 'drop-shadow(0 0 6px rgba(138, 43, 226, 0.8))' }} />
                          </div>
                          <span 
                            className="text-purple-400 tracking-wider"
                            style={{ textShadow: '0 0 10px rgba(138, 43, 226, 0.6)' }}
>>>>>>> basmala_branch
                          >
                            {event.era}
                          </span>
                        </div>
<<<<<<< HEAD
                        <h3 className=" mb-2 theme-accent theme-transition" >{event.title}</h3>
                        <p className="theme-text-secondary theme-transition">{event.description}</p>
=======
                        <h3 className="text-purple-300 mb-2" style={{ textShadow: '0 0 8px rgba(138, 43, 226, 0.4)' }}>{event.title}</h3>
                        <p className="text-gray-400">{event.description}</p>
>>>>>>> basmala_branch
                      </motion.div>
                    </Card>
                    </motion.div>
                  </div>

                  <div className="relative z-10 flex-shrink-0 hidden md:block">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
<<<<<<< HEAD
                      className="w-4 h-4 rounded-full"
style={{
  backgroundColor: 'var(--theme-accent)',
  boxShadow: '0 0 20px var(--theme-glow)',
  border: '2px solid var(--theme-card-border)'
}}
=======
                      className="w-4 h-4 rounded-full bg-purple-500 ring-4 ring-black"
                      style={{ boxShadow: '0 0 15px rgba(138, 43, 226, 0.8)' }}
>>>>>>> basmala_branch
                    />
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Future Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card 
<<<<<<< HEAD
            className="theme-card theme-transition p-8 text-center"
            style={{
  border: '1px solid var(--theme-card-border)',
  boxShadow: '0 0 25px var(--theme-shadow)'
}}
          >
            <h2 
              className="theme-accent theme-transition mb-4"
              
            >
              The Future: Quantum Cryptography
            </h2>
            <p className="theme-text-secondary theme-transition max-w-3xl mx-auto">
=======
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/10 border-purple-500/40 p-8 text-center"
            style={{ boxShadow: '0 0 30px rgba(138, 43, 226, 0.3)' }}
          >
            <h2 
              className="text-purple-300 mb-4"
              style={{ textShadow: '0 0 15px rgba(138, 43, 226, 0.6)' }}
            >
              The Future: Quantum Cryptography
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
>>>>>>> basmala_branch
              As quantum computers emerge, traditional encryption methods face new challenges. 
              Quantum cryptography and post-quantum algorithms are being developed to secure 
              our digital future against quantum threats, ensuring that encrypted data remains 
              protected in the quantum era.
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
