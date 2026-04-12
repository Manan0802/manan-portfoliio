import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiGithub, FiExternalLink, FiShare2 } from 'react-icons/fi';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { projects } from '../../data/projects';

// ─── Architecture configs per project ───────────────────────────────────────

const architectureData: Record<string, { nodes: Node[]; edges: Edge[] }> = {
  neofin: {
    nodes: [
      { id: '1', position: { x: 250, y: 0 },   data: { label: '🎙️ Voice / Text Input' }, type: 'input' },
      { id: '2', position: { x: 250, y: 100 },  data: { label: '⚛️ React + Tailwind Frontend' } },
      { id: '3', position: { x: 250, y: 200 },  data: { label: '🔗 Node.js API Gateway' } },
      { id: '4', position: { x: 60,  y: 310 },  data: { label: '🤖 Gemini 2.5 Flash (Parser)' } },
      { id: '5', position: { x: 440, y: 310 },  data: { label: '🔐 Auth & Validation' } },
      { id: '6', position: { x: 250, y: 420 },  data: { label: '📦 Structured JSON Generator' } },
      { id: '7', position: { x: 250, y: 530 },  data: { label: '🗄️ MongoDB Atlas' }, type: 'output' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', animated: true },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6', animated: true },
      { id: 'e5-6', source: '5', target: '6' },
      { id: 'e6-7', source: '6', target: '7', animated: true },
    ],
  },
  shoplens: {
    nodes: [
      { id: '1', position: { x: 250, y: 0 },   data: { label: '🔎 Text / Image Query' }, type: 'input' },
      { id: '2', position: { x: 250, y: 110 },  data: { label: '🖥️ Streamlit Interface' } },
      { id: '3', position: { x: 250, y: 220 },  data: { label: '🧠 CLIP Model (Embedding)' } },
      { id: '4', position: { x: 60,  y: 330 },  data: { label: '📐 Feature Normalization' } },
      { id: '5', position: { x: 440, y: 330 },  data: { label: '⚡ FAISS Index (40k+ items)' } },
      { id: '6', position: { x: 250, y: 440 },  data: { label: '📊 Similarity Search (<50ms)' } },
      { id: '7', position: { x: 250, y: 550 },  data: { label: '🛍️ Ranked Results' }, type: 'output' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4', animated: true },
      { id: 'e3-5', source: '3', target: '5' },
      { id: 'e4-6', source: '4', target: '6', animated: true },
      { id: 'e5-6', source: '5', target: '6', animated: true },
      { id: 'e6-7', source: '6', target: '7' },
    ],
  },
};

const defaultArchitecture = (title: string): { nodes: Node[]; edges: Edge[] } => ({
  nodes: [
    { id: '1', position: { x: 250, y: 0 },   data: { label: `🖥️ ${title} — Client` }, type: 'input' },
    { id: '2', position: { x: 250, y: 120 },  data: { label: '🔗 API Gateway' } },
    { id: '3', position: { x: 60,  y: 240 },  data: { label: '🔐 Auth Service' } },
    { id: '4', position: { x: 440, y: 240 },  data: { label: '⚙️ Core Logic Service' } },
    { id: '5', position: { x: 250, y: 360 },  data: { label: '🗄️ Persistence Layer' }, type: 'output' },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e2-4', source: '2', target: '4', animated: true },
    { id: 'e3-5', source: '3', target: '5' },
    { id: 'e4-5', source: '4', target: '5', animated: true },
  ],
});

// ─── Problem / Solution copy ─────────────────────────────────────────────────

const problemMap: Record<string, string> = {
  neofin:
    'Manual expense tracking is error-prone and tedious. Users abandon most finance apps within weeks because data entry friction is too high — especially for unstructured inputs like voice memos or natural-language descriptions.',
  shoplens:
    'Traditional keyword-based fashion search fails when shoppers cannot articulate what they want. Browsing 40,000+ items with text filters alone creates discovery dead-ends and poor conversion.',
  'skill-dashboard':
    'Managing 1,300+ AI skill documentation files is impossible manually. There was no structured way to browse, categorize, or search the documentation library at scale.',
  investmate:
    'Investors struggle to consolidate portfolio data across multiple asset classes. Manual analysis is slow and misses key insights that could inform better decisions.',
  'crop-yield':
    'Smallholder farmers lack access to data-driven yield forecasts and fertilizer guidance, leading to wasted resources and lower productivity.',
  'travel-app':
    'Most travel discovery apps suffer from slow load times, poor mobile UX, and fragmented destination data that creates a frustrating planning experience.',
};

const solutionMap: Record<string, string> = {
  neofin:
    'Built a full-stack PWA that feeds natural-language voice & text input through Gemini 2.5 Flash in real time, returning structured financial JSON in under 200ms. Zero manual form-fill required.',
  shoplens:
    'Combined OpenAI CLIP embeddings with a FAISS vector index to enable sub-50ms hybrid text+image similarity search over 40,000+ fashion items — 10× faster than traditional SQL lookups.',
  'skill-dashboard':
    'Built a React dashboard that dynamically indexes 1,300+ skill nodes at startup with zero server round-trips, enabling instant search and category filtering.',
  investmate:
    'Integrated Gemini AI with a FastAPI backend and real-time market data feeds to surface personalized investment recommendations and portfolio risk signals.',
  'crop-yield':
    'Trained a PyTorch regression model (R²=0.91) on soil and weather datasets, then wrapped it in an explainable Streamlit app with actionable fertilizer recommendations.',
  'travel-app':
    'Designed a React UI with 30+ hand-curated destinations, lazy-loaded images, and mobile-first layouts, achieving 90+ Lighthouse performance scores.',
};

// ─── Key Engineering Decisions ───────────────────────────────────────────────

const engineeringDecisions: Record<string, string[]> = {
  neofin: [
    '🔵 Chose Gemini 2.5 Flash over GPT-4o — 3× lower cost with comparable JSON extraction accuracy at scale.',
    '🟣 MongoDB over PostgreSQL — unstructured expense descriptions benefit from schema-flexible documents; no migrations on schema evolution.',
    '🟢 PWA over native app — single codebase, offline support, and installable UX without App Store latency.',
  ],
  shoplens: [
    '🔵 FAISS over Pinecone — 10× cheaper at 40k vectors, self-hosted for zero network round-trip latency.',
    '🟣 CLIP over BERT — natively multimodal; handles text AND image queries in one embedding space without two separate models.',
    '🟢 Streamlit over FastAPI+React — faster iteration for ML prototype with built-in file upload and layout primitives.',
  ],
  'skill-dashboard': [
    '🔵 Client-side indexing over server search API — eliminates roundtrip latency for 1,300+ items; instant filter with zero backend.',
    '🟣 React over Next.js — purely client-rendered dashboard; SSR overhead adds no value for authenticated internal tools.',
    '🟢 Flat JSON over DB — skill metadata is read-only, structured, and small enough to bundle at build time.',
  ],
  investmate: [
    '🔵 FastAPI over Django REST — async-first, 3× faster response at low latency for real-time market data polling.',
    '🟣 Gemini API over a local LLM — consistent quality for financial summarization; no GPU cost for inference.',
    '🟢 PostgreSQL over NoSQL — portfolio data is relational by nature; joins across assets/holdings are cleaner in SQL.',
  ],
  'crop-yield': [
    '🔵 PyTorch over scikit-learn — custom loss function for asymmetric error (over-fertilizing is worse than under-fertilizing).',
    '🟣 R²=0.91 achieved via feature engineering — soil NPK ratio and rainfall*temp interactions added beyond raw sensor data.',
    '🟢 Streamlit for explainability — SHAP feature importance rendered inline, helping non-technical farmers trust the model.',
  ],
  'travel-app': [
    '🔵 React + lazy-loading over static HTML — component-level code splitting cuts initial bundle by 60%.',
    '🟣 Tailwind CSS over SCSS — utility-first eliminates dead CSS in production; critical CSS inlined automatically.',
    '🟢 Mobile-first layout — 80%+ of travel browsing is on phones; desktop is an expansion, not the baseline.',
  ],
};

// ─── Component ───────────────────────────────────────────────────────────────

export const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project] = useState(() => projects.find((p) => p.id === id));
  const [shareClicked, setShareClicked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!project) {
      navigate('/projects', { replace: true });
    }
  }, [id, project, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Loading…
      </div>
    );
  }

  const { nodes, edges } =
    architectureData[project.id] ?? defaultArchitecture(project.title);

  const problem = problemMap[project.id] ?? 'This project addresses a real-world problem through innovative engineering.';
  const solution = solutionMap[project.id] ?? 'Built a scalable solution using modern technologies to solve the core problem efficiently.';
  const decisions = engineeringDecisions[project.id] ?? [];

  const canonicalUrl = `https://manankumar.dev/case-study/${project.id}`;
  const metaDescription = `${project.description} — Full system architecture, engineering decisions & results by Manan Kumar.`;

  const handleLinkedInShare = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setShareClicked(true);
    setTimeout(() => setShareClicked(false), 2000);
  };

  return (
    <>
      {/* ─── Per-page SEO head ───────────────────────────────────────────── */}
      <Helmet>
        <title>{project.title} | Case Study — Manan Kumar</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${project.title} — Case Study`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={`${project.title} — Case Study`} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>

      <div className="min-h-screen bg-black pt-32 pb-24 px-6 sm:px-12 md:px-20 lg:px-32 text-white selection:bg-primary/30">
        {/* Back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-10 group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>

        {/* Hero header */}
        <div className="mb-14">
          <span className="text-primary text-xs font-mono tracking-[0.3em] mb-4 block uppercase">
            Case Study
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-secondary max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Main layout: diagram + sidebar */}
        <div className="grid lg:grid-cols-3 gap-10 mb-16">
          {/* Architecture diagram */}
          <div className="lg:col-span-2 glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold mb-6 font-space-grotesk">System Architecture</h2>
            <div
              className="rounded-xl overflow-hidden border border-white/5"
              style={{ height: 480 }}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                colorMode="dark"
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
              >
                <Background gap={16} size={1} color="#1f2937" />
                <Controls showInteractive={false} />
                <MiniMap zoomable pannable />
              </ReactFlow>
            </div>
            <p className="text-xs text-secondary mt-3 text-center tracking-wider uppercase">
              Interactive — drag &amp; zoom enabled
            </p>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Specs */}
            <div className="glass p-6 rounded-2xl border border-white/5">
              <h3 className="text-base font-bold mb-4 font-space-grotesk">Project Specs</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-secondary text-xs block mb-1 uppercase tracking-wider">Category</span>
                  <span className="text-white font-medium">{project.category}</span>
                </div>
                <div className="h-px w-full bg-white/10" />
                <div>
                  <span className="text-secondary text-xs block mb-2 uppercase tracking-wider">Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col gap-3">
              <h3 className="text-base font-bold font-space-grotesk mb-1">Links</h3>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-sm min-h-[44px]"
                >
                  <FiGithub /> View on GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 text-sm min-h-[44px]"
                >
                  <FiExternalLink /> Live Application
                </a>
              )}
              {/* LinkedIn Share */}
              <button
                onClick={handleLinkedInShare}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#0A66C2]/30 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] transition-colors text-sm min-h-[44px] cursor-pointer"
                aria-label="Share this case study on LinkedIn"
              >
                <FiShare2 />
                {shareClicked ? 'Opening LinkedIn…' : 'Share on LinkedIn'}
              </button>
            </div>

            {/* Metrics */}
            {project.metrics && (
              <div className="glass p-6 rounded-2xl border border-white/5">
                <h3 className="text-base font-bold mb-4 font-space-grotesk">Key Results</h3>
                <ul className="space-y-3">
                  {project.metrics.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-secondary text-sm">
                      <span className="text-primary mt-0.5">▹</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold font-space-grotesk mb-4 text-red-400">🔴 The Problem</h2>
            <p className="text-secondary leading-relaxed">{problem}</p>
          </div>
          <div className="glass p-8 rounded-2xl border border-white/5">
            <h2 className="text-xl font-bold font-space-grotesk mb-4 text-green-400">🟢 The Solution</h2>
            <p className="text-secondary leading-relaxed">{solution}</p>
          </div>
        </div>

        {/* Engineering Decisions — Karpathy depth */}
        {decisions.length > 0 && (
          <div className="glass p-8 rounded-2xl border border-white/5 mb-16">
            <h2 className="text-xl font-bold font-space-grotesk mb-6">
              ⚙️ Key Engineering Decisions
            </h2>
            <p className="text-secondary text-sm mb-6 leading-relaxed">
              Every major choice in this system had a concrete reason — cost, latency, maintainability, or accuracy trade-off.
            </p>
            <ul className="space-y-4">
              {decisions.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5"
                >
                  <span className="text-secondary text-sm leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA — specific & confident */}
        <div className="text-center glass p-10 rounded-2xl border border-white/5">
          <p className="text-2xl font-bold font-space-grotesk mb-3">
            Want a system like this?
          </p>
          <p className="text-secondary mb-8 max-w-md mx-auto leading-relaxed">
            I scope, architect, and ship — in sprints, not months. Book a free 30-min architecture call and let's outline your system.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-white font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 min-h-[52px]"
            data-cursor="hover"
          >
            Book a Free Architecture Call →
          </Link>
        </div>
      </div>
    </>
  );
};
