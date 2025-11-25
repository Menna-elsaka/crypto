import { motion } from 'motion/react';
import { Card } from './ui/card';
import { GraduationCap, Users, Award, Mail, Crown } from 'lucide-react';
import supervisorImage from 'figma:asset/29cc0e24ef7cbb440a16eda48bd376dc1e3eb57b.png';
import deanImage from 'figma:asset/62d15f6c3aa852d22d4e3ba5aa94d005c874699e.png';

interface AboutPageProps {}

export function AboutPage({}: AboutPageProps) {
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
            className="theme-accent mb-3 sm:mb-4 tracking-wider text-2xl sm:text-3xl lg:text-4xl font-semibold theme-transition"
            style={{ 
              textShadow: 'var(--theme-glow)',
            }}
          >
            ABOUT THE PROJECT
          </h1>
          <p className="theme-text-secondary max-w-2xl mx-auto text-sm sm:text-base px-4 theme-transition">
            This educational platform was created to make cryptography accessible and engaging for everyone.
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {/* College Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ 
              y: -5,
            }}
            className="theme-transition"
          >
            <Card 
              className="theme-card p-6 sm:p-8 theme-transition"
              style={{ 
                boxShadow: 'var(--theme-shadow)',
              }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="p-3 sm:p-4 rounded-full theme-accent-bg/20 theme-transition" style={{ 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}>
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 theme-accent theme-transition" />
                </div>
                <div className="flex-1">
                  <h2 className="theme-text mb-3 text-lg sm:text-xl lg:text-2xl font-semibold theme-transition">Our Institution</h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 text-sm sm:text-base theme-transition">
                    This project is developed at our esteemed college, dedicated to advancing 
                    computer science education and fostering innovation in cybersecurity. Our 
                    institution has a long-standing commitment to excellence in technology education 
                    and research.
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                    <span className="px-3 py-1 theme-accent-bg/10 rounded-full border theme-card-border theme-text theme-transition">Computer Science</span>
                    <span className="px-3 py-1 theme-accent-bg/10 rounded-full border theme-card-border theme-text theme-transition">Cryptography</span>
                    <span className="px-3 py-1 theme-accent-bg/10 rounded-full border theme-card-border theme-text theme-transition">Research</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Faculty Section */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ 
                y: -8,
                rotateY: 5,
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="theme-transition"
            >
              <Card 
                className="theme-card p-6 sm:p-8 h-full overflow-hidden theme-transition"
                style={{ 
                  boxShadow: 'var(--theme-shadow)',
                }}
              >
                {/* Photo Section */}
                <motion.div 
                  className="mb-6 flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 theme-accent-bg/10 rounded-2xl blur-xl glow-effect-dark"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.img 
                      src={deanImage} 
                      alt="Dr. Wael Abdelkader"
                      className="relative w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-2xl border-2 theme-card-border theme-transition"
                      style={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                      whileHover={{
                        filter: 'brightness(1.05)',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Info Section */}
                <div className="text-center mb-4">
                  <h3 
                    className="theme-text mb-2 text-xl sm:text-2xl font-semibold theme-transition"
                  >
                    Dr. Wael Abdelkader
                  </h3>
                  <div className="inline-block px-4 py-1.5 theme-accent-bg/10 rounded-full border theme-card-border mb-4 theme-transition">
                    <p className="theme-text text-sm sm:text-base">Dean of Faculty of Computers & Information</p>
                  </div>
                </div>

                <p className="theme-text-secondary leading-relaxed text-center text-sm sm:text-base theme-transition">
                  Dr. Wael has been instrumental in fostering a culture of innovation and academic 
                  excellence. Under his leadership, the faculty has achieved remarkable growth 
                  in research output and student success, particularly in the fields of cybersecurity 
                  and cryptographic systems.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ 
                y: -8,
                rotateY: -5,
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="theme-transition"
            >
              <Card 
                className="theme-card p-6 sm:p-8 h-full overflow-hidden theme-transition"
                style={{ 
                  boxShadow: 'var(--theme-shadow)',
                }}
              >
                {/* Photo Section */}
                <motion.div 
                  className="mb-6 flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6, type: 'spring' }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 theme-accent-bg/10 rounded-2xl blur-xl glow-effect-dark"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.img 
                      src={supervisorImage} 
                      alt="Eng. Ibrahim Elgazar"
                      className="relative w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-2xl border-2 theme-card-border theme-transition"
                      style={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                      whileHover={{
                        filter: 'brightness(1.05)',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Info Section */}
                <div className="text-center mb-4">
                  <h3 
                    className="theme-text mb-2 text-xl sm:text-2xl font-semibold theme-transition"
                  >
                    Eng. Ibrahim Elgazar
                  </h3>
                  <div className="inline-block px-4 py-1.5 theme-accent-bg/10 rounded-full border theme-card-border mb-4 theme-transition">
                    <p className="theme-text text-sm sm:text-base">Project Supervisor</p>
                  </div>
                </div>

                <p className="theme-text-secondary leading-relaxed text-center text-sm sm:text-base theme-transition">
                  Eng. Ibrahim is a distinguished engineer specializing in cryptography and 
                  information security. With extensive experience in the field, he has 
                  guided numerous research projects and fostered innovation in modern encryption 
                  techniques and their applications.
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ 
              y: -5,
            }}
            className="theme-transition"
          >
            <Card 
              className="theme-card p-6 sm:p-8 theme-transition"
              style={{ 
                boxShadow: 'var(--theme-shadow)',
              }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="p-3 sm:p-4 rounded-full theme-accent-bg/20 theme-transition" style={{ 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 theme-accent theme-transition" />
                </div>
                <div className="flex-1">
                  <h2 className="theme-text mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl font-semibold theme-transition">Development Team</h2>
                  <p className="theme-text-secondary leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base theme-transition">
                    This project was brought to life by a dedicated team of computer science students 
                    passionate about cryptography and web development. We worked collaboratively to 
                    create an engaging and educational platform that makes complex cryptographic 
                    concepts accessible to everyone.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {[
                      { name: 'Alaa Elgamal',  gradient: 'from-indigo-600/20 to-purple-600/20', isLeader: true },
                      { name: 'Mohammed Abueldhb', gradient: 'from-purple-600/20 to-blue-600/20' },
                      { name: 'Helmy Mohamed',  gradient: 'from-blue-600/20 to-cyan-600/20' },
                      { name: 'Basmala Elshobky', gradient: 'from-pink-600/20 to-purple-600/20' },
                      { name: 'Menna Elsaka', gradient: 'from-green-600/20 to-emerald-600/20' },
                      { name: 'Mary Alaa', gradient: 'from-orange-600/20 to-red-600/20' },
                    ].map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: -20 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: 0.6 + index * 0.15,
                          duration: 0.6,
                          type: 'spring',
                          stiffness: 100
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5,
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-5 rounded-xl bg-gradient-to-br ${member.gradient} border theme-card-border cursor-pointer backdrop-blur-sm relative overflow-hidden group theme-transition team-member-card`}
                        style={{ 
                          boxShadow: 'var(--theme-shadow)',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 200ms ease, opacity 150ms ease'
                        }}
                      >
                        {/* Animated background effect - only in dark mode */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 glow-effect-dark"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: index * 0.5
                          }}
                        />
                        
                        {/* Glowing orb effect - only in dark mode */}
                        <motion.div
                          className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl glow-effect-dark"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                        
                        <div className="relative z-10">
                          {/* Icon with animation */}
                          <motion.div
                            className="text-3xl mb-3"
                            animate={{
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          >
                           
                          </motion.div>
                          
                          {/* Name with gradient text */}
                          <motion.div 
                            className="flex items-center justify-center gap-1.5 mb-1"
                          >
                            <motion.span 
                              className="text-sm sm:text-base theme-text font-medium theme-transition"
                            >
                              {member.name}
                            </motion.span>
                            {member.isLeader && (
                              <Crown 
                                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 theme-transition" 
                                style={{ 
                                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                                }} 
                              />
                            )}
                          </motion.div>
                          
                          {/* Role badge */}
                         
                          
                          {/* Decorative corner - only in dark mode */}
                          <motion.div
                            className="absolute top-2 right-2 w-2 h-2 theme-accent-bg rounded-full glow-effect-dark"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [1, 0.5, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.1
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
            }}
            className="theme-transition"
          >
            <Card 
              className="theme-card p-6 sm:p-8 text-center theme-transition"
              style={{ 
                boxShadow: 'var(--theme-shadow)',
              }}
            >
              <h2 
                className="theme-text mb-3 sm:mb-4 text-lg sm:text-xl lg:text-2xl font-semibold theme-transition"
              >
                Project Mission
              </h2>
              <p className="theme-text-secondary max-w-3xl mx-auto leading-relaxed text-sm sm:text-base theme-transition">
                Our mission is to demystify cryptography and make it accessible to students, 
                educators, and enthusiasts. Through interactive visualizations and comprehensive 
                resources, we aim to inspire the next generation of cybersecurity professionals 
                and promote awareness of digital security in our increasingly connected world.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
