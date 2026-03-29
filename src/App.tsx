import { useEffect } from 'react';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { Loader } from './components/Loader/Loader';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Story } from './components/About/Story';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Services } from './components/Services/Services';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Contact/Footer';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';
import './App.css';

function AppContent() {
  const { isLoading, completeLoading } = useLoading();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Complete loading after a minimum time (for demo purposes)
    const timeout = setTimeout(() => {
      completeLoading();
    }, 3000);

    return () => {
      lenisInstance.destroy();
      clearTimeout(timeout);
    };
  }, [completeLoading]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <Loader />}

      {/* Custom Cursor */}
      {!isLoading && <CustomCursor />}

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Story />
          <Experience />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Analytics */}
      <Analytics />
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
