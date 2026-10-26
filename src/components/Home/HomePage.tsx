import React, { Suspense } from 'react';
import { Hero } from '../Hero/Hero';
import { useAfterFirstPaint } from '../../hooks/useAfterFirstPaint';
import { PageMeta } from '../shared/PageMeta';

const HomeBody = React.lazy(() => import('./HomeBody'));

export const HomePage: React.FC = () => {
  // Everything under the hero is fetched only after the hero has painted and the browser is idle.
  const ready = useAfterFirstPaint(800);

  return (
    <>
      <PageMeta
        title="Manan Kumar | AI Engineer — LLM Agents, RAG, Voice AI"
        description="Manan Kumar is an AI Engineer in New Delhi building production LLM agents, RAG systems, evals and real-time voice AI in Python and FastAPI. Available for freelance AI projects."
        path="/"
      />
      <Hero />
      {ready && (
        <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-hidden="true" />}>
          <HomeBody />
        </Suspense>
      )}
    </>
  );
};
