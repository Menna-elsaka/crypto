import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, Key, ArrowRight, BarChart3, FileText, Users, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { algorithms } from '../lib/algorithms';
import { TypingAnimation } from './TypingAnimation';
import { FloatingParticles } from './FloatingParticles';
import { ScrollIndicator } from './ScrollIndicator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import robotImage from 'figma:asset/123d91143343ea953e49132a57ab96e260475a33.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [showStats, setShowStats] = useState(false);

  return (
    <motion.div 
      className="min-h-screen pt-20 theme-transition"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Floating Particles Background */}
        <FloatingParticles count={40} />
        {/* Animated Background Grid */}
        <div 
          className="absolute inset-0 opacity-20 theme-transition" 
          style={{
            backgroundImage: 'linear-gradient(to right, var(--theme-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--theme-accent) 1px, transparent 1px)',
            backgroundSize: '4rem 4rem'
          }}
        />
        
        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] theme-transition"
          style={{
            background: 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)',
            opacity: 0.3
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] theme-transition"
          style={{
            background: 'radial-gradient(circle, var(--theme-accent-secondary) 0%, transparent 70%)',
            opacity: 0.2
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[90px] theme-transition"
          style={{
            background: 'radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)',
            opacity: 0.2
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center">
            {/* Hero Text - Centered */}
            <div className="text-center max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6 lg:mb-8"
              >
                <TypingAnimation
                  text="CRYPTOGRAPHY"
                  className="theme-accent theme-glow mb-4 lg:mb-6 tracking-wider text-4xl sm:text-5xl lg:text-6xl xl:text-7xl block theme-transition"
                  speed={150}
                />
                <motion.p 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, duration: 0.6 }}
                  className="theme-accent tracking-[0.2em] sm:tracking-[0.3em] mb-4 text-lg sm:text-xl lg:text-2xl theme-transition" 
                  style={{ 
                    textShadow: '0 0 15px var(--theme-glow)',
                    opacity: 0.7
                  }}
                >
                  BLAKE2b
                </motion.p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="theme-text-secondary mb-8 lg:mb-12 leading-relaxed text-base sm:text-lg lg:text-xl px-4 lg:px-0 theme-transition"
              >
                Discover the world of encryption and secure communication. 
                Explore algorithms that protect digital information in our modern age.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6"
              >
                <Button
                  onClick={() => onNavigate('algorithms')}
                  className="theme-accent-bg hover:opacity-90 border-0 text-base sm:text-lg theme-transition px-6 sm:px-8 py-5 sm:py-6 group relative overflow-hidden"
                  style={{ 
                    boxShadow: '0 0 20px var(--theme-shadow), 0 0 40px var(--theme-shadow)',
                    background: `linear-gradient(to right, var(--theme-accent), var(--theme-accent-secondary))`
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 theme-text">
                    Get Started
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <Button
                  onClick={() => setShowStats(!showStats)}
                  className="theme-accent-bg hover:opacity-90 border-0 text-base sm:text-lg theme-transition px-6 sm:px-8 py-5 sm:py-6 group relative overflow-hidden"
                  style={{ 
                    boxShadow: '0 0 20px var(--theme-shadow), 0 0 40px var(--theme-shadow)',
                    background: `linear-gradient(to right, var(--theme-accent-secondary), var(--theme-accent))`
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 theme-text">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                    {showStats ? 'Hide Stats' : 'Get Stats'}
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </motion.section>

      {/* Stats Section - Appears when "Get Stats" is clicked */}
      <AnimatePresence>
        {showStats && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8 }}
            className="py-16 px-6 relative overflow-hidden"
          >
            <div className="container mx-auto max-w-6xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="theme-accent text-center mb-8 sm:mb-12 text-2xl sm:text-3xl lg:text-4xl theme-transition theme-glow"
              >
                Platform Statistics
              </motion.h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 50px var(--theme-shadow)'
                  }}
                  className="theme-card p-4 sm:p-6 lg:p-8 rounded-xl border backdrop-blur-sm text-center theme-transition theme-shadow"
                  style={{
                    borderColor: 'var(--theme-card-border)'
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 theme-accent mx-auto mb-3 sm:mb-4 theme-transition" />
                  </motion.div>
                  <div className="theme-accent mb-1 sm:mb-2 text-3xl sm:text-4xl lg:text-5xl theme-transition">{algorithms.length}</div>
                  <div className="theme-text-secondary text-xs sm:text-sm lg:text-base theme-transition">Algorithms</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 50px var(--theme-shadow)'
                  }}
                  className="theme-card p-4 sm:p-6 lg:p-8 rounded-xl border backdrop-blur-sm text-center theme-transition theme-shadow"
                  style={{
                    borderColor: 'var(--theme-card-border)'
                  }}
                >
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      filter: 'drop-shadow(0 0 8px var(--theme-glow))'
                    }}
                  >
                    <Lock className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 theme-accent mx-auto mb-3 sm:mb-4 theme-transition" />
                  </motion.div>
                  <div className="theme-accent mb-1 sm:mb-2 text-3xl sm:text-4xl lg:text-5xl theme-transition">256</div>
                  <div className="theme-text-secondary text-xs sm:text-sm lg:text-base theme-transition">Bit Encryption</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 50px var(--theme-shadow)'
                  }}
                  className="theme-card p-4 sm:p-6 lg:p-8 rounded-xl border backdrop-blur-sm text-center theme-transition theme-shadow"
                  style={{
                    borderColor: 'var(--theme-card-border)'
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{
                      filter: 'drop-shadow(0 0 8px var(--theme-glow))'
                    }}
                  >
                    <FileText className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 theme-accent mx-auto mb-3 sm:mb-4 theme-transition" />
                  </motion.div>
                  <div className="theme-accent mb-1 sm:mb-2 text-3xl sm:text-4xl lg:text-5xl theme-transition">50+</div>
                  <div className="theme-text-secondary text-xs sm:text-sm lg:text-base theme-transition">Resources</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 50px var(--theme-shadow)'
                  }}
                  className="theme-card p-4 sm:p-6 lg:p-8 rounded-xl border backdrop-blur-sm text-center theme-transition theme-shadow"
                  style={{
                    borderColor: 'var(--theme-card-border)'
                  }}
                >
                  <motion.div
                    animate={{ 
                      rotateY: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      filter: 'drop-shadow(0 0 8px var(--theme-glow))'
                    }}
                  >
                    <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 theme-accent mx-auto mb-3 sm:mb-4 theme-transition" />
                  </motion.div>
                  <div className="theme-accent mb-1 sm:mb-2 text-3xl sm:text-4xl lg:text-5xl theme-transition">6</div>
                  <div className="theme-text-secondary text-xs sm:text-sm lg:text-base theme-transition">Team Members</div>
                </motion.div>
              </div>
            </div>

            {/* Animated Cybersecurity Visual */}
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -15, 0]
              }}
              transition={{
                x: { duration: 1.2, type: "spring" },
                y: { duration: 2, repeat: Infinity }
              }}
              className="absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 hidden md:block"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761497194591-9c8fb8a1fffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZW5jcnlwdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyMTEwMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Encryption Technology"
                  className="w-32 sm:w-40 lg:w-48 rounded-xl"
                  style={{
                    filter: 'drop-shadow(0 0 30px var(--theme-glow))',
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* What is Cryptography Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 relative"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: '0 0 40px var(--theme-shadow)'
              }}
              className="theme-card p-6 sm:p-8 rounded-lg border backdrop-blur-sm theme-transition theme-shadow"
              style={{
                borderColor: 'var(--theme-card-border)'
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  filter: 'drop-shadow(0 0 8px var(--theme-glow))'
                }}
              >
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 theme-accent mb-3 sm:mb-4 theme-transition" />
              </motion.div>
              <h3 className="theme-accent mb-2 sm:mb-3 text-lg sm:text-xl theme-transition theme-glow">Security</h3>
              <p className="theme-text-secondary text-sm sm:text-base theme-transition">
                Protecting sensitive information from unauthorized access through advanced mathematical algorithms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: '0 0 40px var(--theme-shadow)'
              }}
              className="theme-card p-6 sm:p-8 rounded-lg border backdrop-blur-sm theme-transition theme-shadow"
              style={{
                borderColor: 'var(--theme-card-border)'
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                style={{
                  filter: 'drop-shadow(0 0 8px var(--theme-glow))'
                }}
              >
                <Lock className="w-10 h-10 sm:w-12 sm:h-12 theme-accent mb-3 sm:mb-4 theme-transition" />
              </motion.div>
              <h3 className="theme-accent mb-2 sm:mb-3 text-lg sm:text-xl theme-transition theme-glow">Encryption</h3>
              <p className="theme-text-secondary text-sm sm:text-base theme-transition">
                Converting readable data into coded format to prevent unauthorized interpretation of transmitted data.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: '0 0 40px var(--theme-shadow)'
              }}
              className="theme-card p-6 sm:p-8 rounded-lg border backdrop-blur-sm sm:col-span-2 lg:col-span-1 theme-transition theme-shadow"
              style={{
                borderColor: 'var(--theme-card-border)'
              }}
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                style={{
                  filter: 'drop-shadow(0 0 8px var(--theme-glow))'
                }}
              >
                <Key className="w-10 h-10 sm:w-12 sm:h-12 theme-accent mb-3 sm:mb-4 theme-transition" />
              </motion.div>
              <h3 className="theme-accent mb-2 sm:mb-3 text-lg sm:text-xl theme-transition theme-glow">Authentication</h3>
              <p className="theme-text-secondary text-sm sm:text-base theme-transition">
                Verifying the identity of users and ensuring data integrity through cryptographic techniques.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="theme-card mt-12 sm:mt-16 p-6 sm:p-10 lg:p-12 rounded-lg border theme-transition theme-shadow"
            style={{
              borderColor: 'var(--theme-card-border)'
            }}
          >
            <h2 className="theme-accent mb-4 sm:mb-6 text-center text-2xl sm:text-3xl lg:text-4xl theme-transition theme-glow">What is Cryptography?</h2>
            <p className="theme-text leading-relaxed max-w-4xl mx-auto text-center text-sm sm:text-base lg:text-lg theme-transition">
              Cryptography is the practice and study of techniques for secure communication in the presence 
              of adversarial behavior. It encompasses everything from ancient cipher methods to modern 
              encryption algorithms that protect our digital world. Through mathematical complexity and 
              computational security, cryptography ensures confidentiality, integrity, authentication, and 
              non-repudiation of information across networks worldwide.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
