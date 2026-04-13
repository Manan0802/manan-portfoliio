import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { Loader } from './components/Loader/Loader';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Services } from './components/Services/Services';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Contact/Footer';
import { CaseStudy } from './components/CaseStudy/CaseStudy';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Lenis from 'lenis';
import './App.css';
import React from 'react';

// Error boundary to catch 3D / runtime crashes
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

function AppContent() {
  const { isLoading, completeLoading } = useLoading();

  // Initialize Lenis smooth scroll (desktop only — mobile native scroll is smoother)
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Skip Lenis on mobile — native scroll is faster and smoother on phones
    if (isTouchDevice) {
      completeLoading();
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Complete loading after a minimum time
    const timeout = setTimeout(() => {
      completeLoading();
    }, 1500);

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
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<><ErrorBoundary><Hero /></ErrorBoundary><ErrorBoundary><About /></ErrorBoundary></>} />
            <Route path="/experience" element={<ErrorBoundary><Experience /></ErrorBoundary>} />
            <Route path="/projects" element={<ErrorBoundary><Projects /></ErrorBoundary>} />
            <Route path="/case-study/:id" element={<ErrorBoundary><CaseStudy /></ErrorBoundary>} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </BrowserRouter>
  );
}

export default App;
