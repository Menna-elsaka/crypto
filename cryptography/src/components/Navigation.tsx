import { Lock, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../assets/e74a85a657cb63546e0a553caf049b3afbacaa51.png';
import { useEffect, useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navigation({ currentPage, onNavigate, theme, onToggleTheme }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'Algorithms', path: 'algorithms' },
    { name: 'Comparison', path: 'comparison' },
    { name: 'History', path: 'history' },
    { name: 'Resources', path: 'resources' },
    { name: 'About', path: 'about' },
  ];


  const handleNavigate = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
  };
useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md theme-transition"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to right, rgba(10, 15, 60, 0.9), rgba(26, 15, 77, 0.9))'
          : 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(249, 232, 255, 0.8))',
        borderBottom: `1px solid var(--theme-card-border)`,
        boxShadow: `0 4px 20px var(--theme-shadow)`
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div
            className="flex items-center gap-2 sm:gap-4 cursor-pointer relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate('home')}
          >
            {/* Glowing background effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl theme-transition"
              style={{ backgroundColor: 'var(--theme-accent)', opacity: 0.2 }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.4 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.img 
              src={logo} 
              alt="FCAI Logo - Damietta University" 
              className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-cover rounded-full border-2 relative z-10 theme-transition"
              style={{
                borderColor: theme === 'dark' ? 'rgba(138, 43, 226, 0.5)' : 'rgba(194, 168, 255, 0.5)',
                filter: `drop-shadow(0 0 10px var(--theme-glow))`,
                boxShadow: `0 0 15px var(--theme-shadow)`
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
              whileHover={{ 
                filter: `drop-shadow(0 0 20px var(--theme-glow))`,
                scale: 1.1
              }}
            />
            <div className="flex items-center gap-1.5 sm:gap-2 relative z-10">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 theme-accent theme-transition" />
              </motion.div>
              <span 
                className="theme-accent tracking-wider text-sm sm:text-base lg:text-lg theme-transition theme-glow"
              >
                CRYPTOGRAPHY
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`relative px-2 xl:px-3 py-2 transition-colors text-sm xl:text-base theme-transition ${
                  currentPage === item.path
                    ? 'theme-accent'
                    : 'theme-text-secondary hover:theme-accent'
                }`}
                style={currentPage === item.path ? {
                  textShadow: '0 0 10px var(--theme-glow)'
                } : {}}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  textShadow: '0 0 15px var(--theme-glow)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {currentPage === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 theme-transition"
                    initial={false}
                    style={{
                      background: `linear-gradient(to right, ${theme === 'dark' ? '#8A2BE2' : '#7e63beff'}, ${theme === 'dark' ? '#5B8DEE' : '#9BE8D8'})`,
                      boxShadow: `0 0 10px var(--theme-glow)`
                    }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Theme Toggle Button */}
            <motion.button
              onClick={onToggleTheme}
              className=" overflow-hidden"
              style={{
                opacity: 0.7,
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: `0 0 20px var(--theme-glow)`
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
        key="moon"
        initial={{ rotate: 180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -180, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Moon className="w-5 h-5" color="#1e3a8a" />
      </motion.div>
    ) : (
      <motion.div
        key="sun"
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Sun className="w-5 h-5" color="#c1c3dbff" />
      </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              onClick={onToggleTheme}
              className="p-2 rounded-full theme-transition"
              style={{
                backgroundColor: 'var(--theme-accent)',
                opacity: 0.7,
                border: `1px solid var(--theme-accent)`
              }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun-mobile"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 theme-accent" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon-mobile"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5 theme-accent" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            
            <motion.button
              className="theme-accent p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`block w-full text-left px-4 py-3 rounded-lg theme-transition ${
                      currentPage === item.path
                        ? 'theme-accent'
                        : 'theme-text-secondary'
                    }`}
                    style={currentPage === item.path ? {
                      textShadow: '0 0 10px var(--theme-glow)',
                      backgroundColor: 'var(--theme-accent)',
                      opacity: 0.8
                    } : {
                      backgroundColor: 'transparent'
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{
                      backgroundColor: 'var(--theme-accent)',
                      opacity: 0.7
                    }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
