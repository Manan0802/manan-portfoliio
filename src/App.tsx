import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import type Lenis from 'lenis';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { useReducedMotion } from './hooks/useReducedMotion';import { Loader } from './components/Loader/Loader';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './components/Home/HomePage';
import { Footer } from './components/Contact/Footer';
import { NotFound } from './components/shared/NotFound';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

// Every non-home page is its own chunk, so three.js / Spline / matter-js / react-flow
// only download on the routes that actually use them.
const Experience = React.lazy(() => import('./components/Experience/Experience').then(m => ({ default: m.Experience })));
const Projects = React.lazy(() => import('./components/Projects/Projects').then(m => ({ default: m.Projects })));
const CaseStudy = React.lazy(() => import('./components/CaseStudy/CaseStudy').then(m => ({ default: m.CaseStudy })));
const Contact = React.lazy(() => import('./components/Contact/Contact').then(m => ({ default: m.Contact })));
const ServicesRoute = React.lazy(() => import('./components/shared/ServicesRoute'));

// Hard ceiling on the splash. It never waits for the 3D scene.
const LOADER_MAX_WAIT_MS = 2000;

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

const useFinePointer = () => {
  const [fine, setFine] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onChange = () => setFine(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return fine;
};

const RouteFallback: React.FC = () => <div className="min-h-screen" aria-hidden="true" />;

function AppContent() {
  const { isLoading, completeLoading } = useLoading();
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Smooth scroll only for mouse users who have not asked for reduced motion.
  // Loaded on demand so it stays out of the entry bundle.
  useEffect(() => {
    if (reducedMotion || !finePointer) return;

    let cancelled = false;
    let raf = 0;
    let lenis: Lenis | null = null;

    import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reducedMotion, finePointer]);

  // Safety net: the splash can never block the page for longer than LOADER_MAX_WAIT_MS
  // (covers background tabs where animation frames are paused).
  useEffect(() => {
    if (!isLoading) return;
    const timeout = setTimeout(completeLoading, LOADER_MAX_WAIT_MS);
    return () => clearTimeout(timeout);
  }, [isLoading, completeLoading]);

  const skipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.getElementById('main');
    main?.focus();
    main?.scrollIntoView({ block: 'start' });
  };

  return (
    <>
      <a href="#main" className="skip-link" onClick={skipToContent}>
        Skip to content
      </a>

      {/* Loading Screen */}
      {isLoading && <Loader />}

      {/* Custom Cursor: mouse users only, never with reduced motion */}
      {!isLoading && finePointer && !reducedMotion && <CustomCursor />}

      {/* Main Content. Inert (not focusable) while the splash covers it. */}
      <div inert={isLoading}>
        <Navbar />
        <main id="main" tabIndex={-1} className="min-h-screen outline-none">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
              <Route path="/experience" element={<ErrorBoundary><Experience /></ErrorBoundary>} />
              <Route path="/projects" element={<ErrorBoundary><Projects /></ErrorBoundary>} />
              <Route path="/case-study/:id" element={<ErrorBoundary><CaseStudy /></ErrorBoundary>} />
              <Route path="/services" element={<ErrorBoundary><ServicesRoute /></ErrorBoundary>} />
              <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
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
