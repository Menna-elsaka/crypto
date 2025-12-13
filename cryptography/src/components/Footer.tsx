import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import logo from 'figma:asset/e74a85a657cb63546e0a553caf049b3afbacaa51.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Algorithms', page: 'algorithms' },
    { name: 'Comparison', page: 'comparison' },
    { name: 'History', page: 'history' },
    { name: 'Cryptanalysis', page: 'cryptanalysis' },
    { name: 'Resources', page: 'resources' },
    { name: 'About', page: 'about' },
  ];

  return (
    <footer 
      className="relative border-t py-12 overflow-hidden theme-transition theme-bg"
      style={{
        borderColor: 'var(--theme-card-border)'
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0 theme-transition"
          style={{
            backgroundImage: 'linear-gradient(var(--theme-accent) 1px, transparent 1px), linear-gradient(90deg, var(--theme-accent) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={logo}
                alt="FCAI Logo"
                className="w-12 h-12 object-cover rounded-full border-2 theme-transition"
                style={{
                  borderColor: 'var(--theme-accent)',
                  boxShadow: '0 0 20px var(--theme-shadow)',
                  filter: 'drop-shadow(0 0 10px var(--theme-glow))'
                }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 10px var(--theme-glow))',
                    'drop-shadow(0 0 20px var(--theme-glow))',
                    'drop-shadow(0 0 10px var(--theme-glow))',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span
                className="theme-accent tracking-wider text-lg theme-transition theme-glow"
              >
                CRYPTOGRAPHY
              </span>
            </motion.div>
            <p className="theme-text-secondary text-sm text-center md:text-left theme-transition">
              Empowering the future with advanced encryption and secure communication technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3
              className="theme-accent mb-4 theme-transition theme-glow"
            >
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="theme-text-secondary text-sm text-left theme-transition hover:theme-accent"
                  whileHover={{ x: 5, textShadow: '0 0 10px var(--theme-glow)' }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact and Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3
              className="theme-accent mb-4 theme-transition theme-glow"
            >
              Connect With Us
            </h3>
            
            <div className="flex items-center gap-2 theme-text-secondary mb-4 theme-transition">
              <Mail className="w-4 h-4" />
              <span className="text-sm">info@cryptography.edu</span>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border flex items-center justify-center theme-transition theme-text-secondary"
                    style={{
                      backgroundColor: 'var(--theme-card-bg)',
                      borderColor: 'var(--theme-card-border)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      borderColor: 'var(--theme-accent)',
                      boxShadow: '0 0 20px var(--theme-shadow)',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px theme-transition"
          style={{
            background: `linear-gradient(to right, transparent, var(--theme-accent), transparent)`,
            opacity: 0.5
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center theme-text-secondary text-sm mt-8 theme-transition"
        >
          <p>
            © {new Date().getFullYear()} Cryptography Platform. All rights reserved.
          </p>
          <motion.p
            className="theme-accent mt-2 theme-transition"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ textShadow: '0 0 10px var(--theme-glow)' }}
          >
            Built with passion for secure communication
          </motion.p>
        </motion.div>
      </div>

      {/* Animated corner accents */}
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full blur-2xl theme-transition"
        style={{
          backgroundColor: 'var(--theme-accent)',
          opacity: 0.1
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full blur-2xl theme-transition"
        style={{
          backgroundColor: 'var(--theme-accent-secondary)',
          opacity: 0.1
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />
    </footer>
  );
}
