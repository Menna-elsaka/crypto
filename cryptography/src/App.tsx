import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { IntroAnimation } from './components/IntroAnimation';
import { Preloader } from './components/Preloader';
import { HomePage } from './components/HomePage';
import { AlgorithmsPage } from './components/AlgorithmsPage';
import { AlgorithmVisualization } from './components/AlgorithmVisualization';
import { ComparisonPage } from './components/ComparisonPage';
import { ResourcesPage } from './components/ResourcesPage';
import { HistoryPage } from './components/HistoryPage';
import { AboutPage } from './components/AboutPage';
import { Blake2bPage } from './components/Blake2bPage';
import { FloatingElements } from './components/FloatingElements';
import { Footer } from './components/Footer';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [selectedResourceAlgorithm, setSelectedResourceAlgorithm] = useState<string | undefined>();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check if intro and preloader have been shown in this session
    const introShown = sessionStorage.getItem('introShown');
    const preloaderShown = sessionStorage.getItem('preloaderShown');
    
    if (preloaderShown) {
      setShowPreloader(false);
    }
    if (introShown) {
      setShowIntro(false);
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    sessionStorage.setItem('preloaderShown', 'true');
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('introShown', 'true');
  };

  const handleNavigate = (page: string, algorithmId?: string) => {
    setCurrentPage(page);
    if (page === 'resources' && algorithmId) {
      setSelectedResourceAlgorithm(algorithmId);
    } else if (page !== 'resources') {
      setSelectedResourceAlgorithm(undefined);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVisualization = (algorithmId: string) => {
    setSelectedAlgorithm(algorithmId);
  };

  const handleCloseVisualization = () => {
    setSelectedAlgorithm(null);
  };

  return (
    <div className="min-h-screen theme-transition theme-bg theme-text">
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showPreloader && showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {!showPreloader && !showIntro && (
        <>
          <FloatingElements />
          <Navigation 
            currentPage={currentPage} 
            onNavigate={handleNavigate} 
            theme={theme}
            onToggleTheme={toggleTheme}
          />
          
          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <HomePage key="home" onNavigate={handleNavigate} />
            )}
            {currentPage === 'algorithms' && (
              <AlgorithmsPage
                key="algorithms"
                onNavigate={handleNavigate}
                onOpenVisualization={handleOpenVisualization}
              />
            )}
            {currentPage === 'comparison' && (
              <ComparisonPage key="comparison" />
            )}
            {currentPage === 'history' && (
              <HistoryPage key="history" />
            )}
            {currentPage === 'resources' && (
              <ResourcesPage 
                key="resources" 
                selectedAlgorithmId={selectedResourceAlgorithm}
              />
            )}
            {currentPage === 'about' && (
              <AboutPage key="about" />
            )}
            {currentPage === 'blake2b' && (
              <Blake2bPage key="blake2b" />
            )}
          </AnimatePresence>

          <AlgorithmVisualization
            algorithmId={selectedAlgorithm}
            onClose={handleCloseVisualization}
          />

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none z-[-1] theme-transition">
            {theme === 'dark' ? (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-200/15 via-transparent to-transparent" />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
