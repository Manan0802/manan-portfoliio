// Source of truth for project cards AND case-study pages.
// Every claim and number is traced to code, eval reports or git history
// (docs/audit/2026-10-26/true-architecture.md). Do not add a number without a source.
// The current employer is not named on this site.

export interface ArchNode {
  id: string;
  label: string;
}

export interface ArchEdge {
  source: string;
  target: string;
  label?: string;
}

export interface ResultRow {
  metric: string;
  before?: string;
  after: string;
  how: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI/LLM' | 'ML/Data' | 'Full Stack';
  kind: 'work' | 'project';
  org?: string;
  period?: string;
  stack: string[];
  github?: string;
  live?: string;
  colab?: string;
  image: string;
  featured?: boolean;
  metrics?: string[];
  // Case-study page
  summary: string;
  problem: string;
  approach: string[];
  architecture: { nodes: ArchNode[]; edges: ArchEdge[] };
  results?: ResultRow[];
  role: string;
  limits?: string[];
}

export const projects: Project[] = [
  {
    id: 'hinglish-assistant',
    title: 'Hinglish AI Assistant for Retail Savers',
    description:
      'A production AI assistant that answers money questions in a Hindi-English mix: an LLM intent classifier, a tool-calling RAG agent, a safety layer, in-chat money actions and real-time voice.',
    category: 'AI/LLM',
    kind: 'work',
    org: 'Fintech startup · current role',
    period: 'Jun 2026 – Present',
    stack: ['Python', 'FastAPI', 'PostgreSQL + pgvector', 'Redis', 'Gemini', 'AWS Bedrock', 'Langfuse', 'WebSockets'],
    image: '/images/projects/hinglish-assistant.webp',
    featured: true,
    metrics: ['Intent accuracy 68% → 96%', 'Model calls per reply 3–8 → 1–2', 'Off-topic answers 15 → 0', '254 tests on money actions'],
    summary: 'Raised intent accuracy from 68% to 96% and cut model calls per reply from 3–8 to 1–2 — in production, with real users.',
    problem:
      'Retail savers ask about their money in a Hindi-English mix. A rule-based router misread many of these messages and spent 3–8 model calls on every reply. The assistant also had to stay inside strict lines: no unsafe advice, no identity numbers sent to the model, and no money moved without the user’s clear consent.',
    approach: [
      'Replaced the rule-based router with a single LLM classifier call over a governed intent table, and gated the switch on a frozen, blind test set with a paired significance test.',
      'Shipped a tool-calling agent with retrieval (RAG) over a curated knowledge base, consolidating 43 narrow tools into 19 (13 data + 6 control), behind a percentage A/B rollout with an off switch.',
      'Built a safety layer: a money guard keeps transaction APIs out of the model’s reach, PAN and phone numbers are masked before model calls, and a scope rule keeps answers on money topics.',
      'Built in-chat money actions (SIP changes, investments, withdrawals) behind consent, OTP and UPI steps, with at-most-once writes through an atomic Redis claim and fail-closed behaviour when Redis is down.',
      'Built the eval harnesses that make every change measurable: tool-choice evals on 314 labeled turns, LLM-judge replay of production chats, p50/p95 latency evals and per-call cost tracking.',
      'Co-built real-time voice over WebSockets: fixed barge-in across pods with shared voice profiles in Redis, and cut the failover delay after a hung TTS connection from 10 s to 0.5 s.',
    ],
    architecture: {
      nodes: [
        { id: 'w1', label: '📱 App chat (typed + voice)' },
        { id: 'w2', label: '⚡ Streaming chat API (FastAPI)' },
        { id: 'w3', label: '🧭 A/B arm selector + LLM intent classifier' },
        { id: 'w4', label: '🤖 Tool-calling agent (19 tools) + in-chat actions' },
        { id: 'w5', label: '🗄️ PostgreSQL + pgvector (RAG)' },
        { id: 'w6', label: '🛡️ Safety layer: money guard, PII masking, scope rule' },
        { id: 'w7', label: '🧠 LLMs: Gemini · AWS Bedrock' },
        { id: 'w8', label: '🚀 Redis: sessions, locks, at-most-once claims' },
        { id: 'w9', label: '🎙️ Voice: streaming STT / TTS with failover' },
        { id: 'w10', label: '📊 Langfuse: traces + per-call cost' },
      ],
      edges: [
        { source: 'w1', target: 'w2', label: 'chat turn' },
        { source: 'w2', target: 'w3' },
        { source: 'w3', target: 'w4', label: 'agent arm' },
        { source: 'w3', target: 'w7', label: 'classifier' },
        { source: 'w4', target: 'w5', label: 'retrieval' },
        { source: 'w4', target: 'w7', label: 'tool loop' },
        { source: 'w4', target: 'w6' },
        { source: 'w6', target: 'w2', label: 'safe reply + cards' },
        { source: 'w4', target: 'w8', label: 'claim before write' },
        { source: 'w1', target: 'w9', label: 'voice' },
        { source: 'w9', target: 'w2' },
        { source: 'w2', target: 'w10' },
      ],
    },
    results: [
      { metric: 'Intent accuracy', before: '68%', after: '96%', how: 'Frozen, blind 193-case held-out Hinglish set; 3 live runs, zero flake' },
      { metric: 'Model calls per reply', before: '3–8', after: '1–2', how: 'The same 193 questions on both paths (offline harness)' },
      { metric: 'First-tool accuracy', before: '73%', after: '~80%', how: '314 labeled turns, two runs (81.2% and 79.3%)' },
      { metric: 'Off-topic answers', before: '15', after: '0', how: '16 off-topic prompts × 3 live runs' },
      { metric: 'TTS failover delay', before: '10 s', after: '0.5 s', how: 'Failover drill with a hung provider connection' },
    ],
    role:
      'Top contributor to the codebase. I built the intent routing and its release gate, the tool consolidation and tool-choice evals, the safety-layer wiring, the in-chat money actions, the eval and cost harnesses, and most of the server-driven card UI (40+ card types). Voice was co-built with teammates.',
    limits: [
      'First-tool accuracy (~80%) is still below the team’s 90% target, and argument accuracy dipped as tool choice improved — the next thing being worked on.',
      'The 96% is classifier accuracy on a fixed test set, not end-to-end answer quality.',
      'The code is private and the company is not named here; I’m happy to go deeper in an interview.',
    ],
  },
  {
    id: 'sara',
    title: 'SARA — Autonomous Spec-Auditing Agent',
    description:
      'A LangGraph agent that audits a B2B product category’s specification sheet, pulling data and reasoning skills on demand, and refusing to finish until its report passes validation gates.',
    category: 'AI/LLM',
    kind: 'work',
    org: 'IndiaMART · internship',
    period: 'Jan – Jun 2026',
    stack: ['Python', 'LangGraph', 'Gemini 2.5 Pro', 'Parallel AI', 'Langfuse', 'Streamlit', 'GCS'],
    image: '/images/projects/sara.webp',
    featured: false,
    metrics: ['10 on-demand reasoning skills', '6 data sources, loaded lazily', '5-check validation gate', 'Run on IndiaMART’s live catalog'],
    summary: 'A self-correcting audit agent: 10 on-demand skills, 6 data sources and a 5-check validation gate, run on IndiaMART’s live catalog.',
    problem:
      'Spec sheets are what B2B buyers filter by, but they drift and are slow to curate by hand. A naive LLM pipeline that stuffs every data source into one prompt is expensive and makes things up.',
    approach: [
      'Wrapped a Gemini 2.5 Pro “master” agent in a LangGraph state machine (8 nodes, 30-turn cap) that starts with only the current spec sheet.',
      'The agent pulls the other 5 data sources, 10 markdown reasoning skills (domain expert, critic, validator and more) and web search on demand, so prompts stay small.',
      'A validation gate checks the final report in code: cited skills must have been read, cited web sources searched, and tiering or option changes backed by the right data. Failures loop back as a correction prompt.',
      'Every step is traced in Langfuse; a Streamlit dashboard and a batch runner drive it, and output is converted to upload-ready JSON.',
    ],
    architecture: {
      nodes: [
        { id: 'a1', label: '👤 Catalog team (dashboard, CLI, batch)' },
        { id: 'a2', label: '🔁 LangGraph state machine (8 nodes)' },
        { id: 'a3', label: '🧠 Master agent: Gemini 2.5 Pro' },
        { id: 'a4', label: '✅ Validation gate (5 checks)' },
        { id: 'a5', label: '📚 Skill library (10 skills, on demand)' },
        { id: 'a6', label: '🗂️ Data sources DS0–DS5 (lazy, cached)' },
        { id: 'a7', label: '🌐 Web search (Parallel AI)' },
        { id: 'a8', label: '📦 Upload-ready JSON' },
        { id: 'a9', label: '📊 Langfuse tracing' },
      ],
      edges: [
        { source: 'a1', target: 'a2' },
        { source: 'a2', target: 'a3' },
        { source: 'a3', target: 'a5', label: 'read skill' },
        { source: 'a3', target: 'a6', label: 'fetch' },
        { source: 'a3', target: 'a7', label: 'search' },
        { source: 'a3', target: 'a4' },
        { source: 'a4', target: 'a3', label: 'violation → fix' },
        { source: 'a4', target: 'a8', label: 'valid report' },
        { source: 'a2', target: 'a9' },
      ],
    },
    results: [
      { metric: 'Categories audited', after: '36', how: 'Committed outputs, raw logs and skill logs' },
      { metric: 'Upload-ready outputs', after: '25', how: 'Converted JSON files' },
      { metric: 'Validation checks', after: '5', how: 'Enforced in code before the agent may finish' },
    ],
    role: 'Solo: designed and built it during my internship.',
    limits: [
      'Uploads to the ingestion API are off by default, so changes go through human review.',
      'There is no accuracy benchmark for the audits themselves yet.',
    ],
  },
  {
    id: 'category-wiki',
    title: 'Category Knowledge Compiler',
    description:
      'A LangGraph loop that turns buyer calls, seller PDFs and web search into one versioned wiki per product category, improving it round by round under an LLM auditor.',
    category: 'AI/LLM',
    kind: 'work',
    org: 'IndiaMART · internship',
    period: 'Jan – Jun 2026',
    stack: ['Python', 'LangGraph', 'Gemini 2.5 Pro', 'Parallel AI', 'Langfuse'],
    image: '/images/projects/category-wiki.webp',
    featured: false,
    metrics: ['12 category wikis compiled', 'Auditor scores 8.6–8.9 / 10', 'Delta updates via a file-hash manifest', 'Used by catalog teams'],
    summary: 'Knowledge that compounds instead of being re-retrieved: delta updates, rollback on score drops, and open doubts flagged for humans. Used by catalog teams.',
    problem:
      'Category knowledge is scattered across call transcripts, brochures and spec sheets. Plain retrieve-and-forget RAG rebuilds it on every question and loses what it learned.',
    approach: [
      'A librarian picks a starter pack (10 calls + 5 PDFs), a writer builds the wiki with citations, and an auditor scores it on a 14-section scorecard.',
      'Below a 9.0 score, the loop pulls a delta pack and updates in batches of 3 (up to 3 rounds), then enriches with web search.',
      'A manifest of file hashes means reruns only process new or changed sources, and any round that lowers the score is rolled back.',
      'Open questions go to a doubts file for a human; every version, diff, citation and token count is saved.',
    ],
    architecture: {
      nodes: [
        { id: 'k1', label: '📞 Buyer calls + 📄 seller PDFs' },
        { id: 'k2', label: '🧾 Manifest (new / changed only)' },
        { id: 'k3', label: '📚 Librarian: starter + delta packs' },
        { id: 'k4', label: '✍️ Writer: update in batches, cite' },
        { id: 'k5', label: '🧑‍⚖️ Auditor: 14-section scorecard' },
        { id: 'k6', label: '↩️ Rollback on score drop' },
        { id: 'k7', label: '🌐 Enricher + web search' },
        { id: 'k8', label: '🗃️ Versioned wiki, diffs, doubts' },
        { id: 'k9', label: '📊 Langfuse' },
      ],
      edges: [
        { source: 'k1', target: 'k2' },
        { source: 'k2', target: 'k3' },
        { source: 'k3', target: 'k4' },
        { source: 'k4', target: 'k5' },
        { source: 'k5', target: 'k3', label: 'gap → delta' },
        { source: 'k5', target: 'k6' },
        { source: 'k6', target: 'k4', label: 'revert' },
        { source: 'k5', target: 'k7', label: 'target reached' },
        { source: 'k7', target: 'k8' },
        { source: 'k4', target: 'k9' },
      ],
    },
    results: [
      { metric: 'Wikis compiled', after: '12', how: 'Committed category outputs' },
      { metric: 'Auditor score', after: '8.6–8.9 / 10', how: '4 recorded evaluations (target 9.0)' },
      { metric: 'Tokens per wiki', after: '70K – 1.0M', how: 'Token logs, 10–45 calls per category' },
    ],
    role: 'Solo: designed and built it during my internship.',
    limits: [
      'None of the recorded wikis reached the 9.0 target score.',
      'The 14-section structure is the design target; some outputs merge sections.',
    ],
  },
  {
    id: 'shoplens',
    title: 'ShopLens — Visual Fashion Search',
    description:
      'Upload a photo (and optionally some text) and get similar products from 45,000+ items, re-ranked by category, colour and gender, with outfit suggestions.',
    category: 'ML/Data',
    kind: 'project',
    stack: ['Python', 'CLIP (ViT-B/32)', 'FAISS', 'YOLOv8', 'scikit-learn', 'Streamlit'],
    github: 'https://github.com/Manan0802/shoplens-updated',
    image: '/images/projects/shoplens.webp',
    featured: false,
    metrics: ['45,441 CLIP vectors (512-d)', '~2 ms FAISS lookup (p50)', '6-signal re-ranker', 'Search by body region'],
    summary: '~2 ms exact vector search over 45,441 CLIP embeddings, with metadata re-ranking and “complete the look” outfits.',
    problem:
      'Keyword search fails for fashion: shoppers want “something like this photo”, and pure embedding similarity ignores colour, category and gender cues.',
    approach: [
      'Embedded every product image with CLIP (512-d) and built an exact FAISS cosine index of 45,441 vectors.',
      'Queries blend image and text embeddings; a YOLOv8 person detector splits full-body photos into three bands so you can search just the shirt or just the shoes.',
      'The top 200 candidates are re-ranked with fixed weights: CLIP 0.40, category 0.20, colour 0.15, gender 0.10, usage 0.10, season 0.05.',
      '“Complete the look” builds outfits from a larger candidate pool and links out to shopping sites.',
    ],
    architecture: {
      nodes: [
        { id: 's1', label: '🖼️ Streamlit UI (photo + text)' },
        { id: 's2', label: '🧍 YOLOv8 person → 3 body bands' },
        { id: 's3', label: '🧠 CLIP ViT-B/32 embeddings' },
        { id: 's4', label: '🎨 K-Means dominant colour' },
        { id: 's5', label: '⚡ FAISS exact index (45,441 × 512)' },
        { id: 's6', label: '📊 Metadata re-ranker (6 signals)' },
        { id: 's7', label: '👗 Complete-the-look + shop links' },
      ],
      edges: [
        { source: 's1', target: 's2', label: 'photo' },
        { source: 's2', target: 's3', label: 'crops' },
        { source: 's1', target: 's3', label: 'text' },
        { source: 's1', target: 's4' },
        { source: 's3', target: 's5', label: 'query vector' },
        { source: 's5', target: 's6', label: 'top 200' },
        { source: 's4', target: 's6' },
        { source: 's6', target: 's7' },
        { source: 's6', target: 's1', label: 'ranked results' },
      ],
    },
    results: [
      { metric: 'Index size', after: '45,441 vectors', how: 'FAISS exact inner-product index, 512-d' },
      { metric: 'Lookup latency', after: '~1.8 ms p50', how: 'index.search only, k = 5, laptop CPU (Oct 2026)' },
    ],
    role: 'Solo project.',
    limits: [
      'No relevance evaluation set yet; the ranker weights are hand-set.',
      'Runs locally in Streamlit; there is no hosted demo.',
    ],
  },
  {
    id: 'neofin',
    title: 'NeoFin — AI Personal Finance App',
    description:
      'A full-stack personal-finance app: type a spend in plain words and an LLM turns it into a categorized transaction. Budgets, goals, split tracking and an AI “finance buddy”.',
    category: 'Full Stack',
    kind: 'project',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OpenRouter', 'PWA'],
    github: 'https://github.com/Manan0802/neofin',
    live: 'https://neofin-five.vercel.app/',
    image: '/images/projects/neofin.webp',
    featured: false,
    metrics: ['Plain words → categorized transaction', 'LLM subscription detection', 'Per-user data isolation', 'Live on Vercel'],
    summary: 'A MERN app with per-user data isolation and an LLM “finance buddy” that parses spends, finds subscriptions and answers questions.',
    problem: 'Logging expenses by hand is tedious, so most people stop doing it.',
    approach: [
      'One parse endpoint wraps text (or a voice note or receipt upload) in a strict-JSON prompt, calls the model and validates the result, falling back to manual entry if parsing fails.',
      'Recurring subscriptions are found by an LLM pass over expense history; a chat answers questions using the last 50 transactions as context.',
      'Every query is scoped to the signed-in user, with ownership checks on updates and deletes.',
      'Started on Gemini 2.5 Flash with a dual-SDK fallback, then moved to OpenRouter’s free model router after hitting credit limits.',
    ],
    architecture: {
      nodes: [
        { id: 'n1', label: '📱 React client (Vercel)' },
        { id: 'n2', label: '📦 Service worker (app shell)' },
        { id: 'n3', label: '🎙️ Voice note / receipt upload' },
        { id: 'n4', label: '⚡ Express API' },
        { id: 'n5', label: '🔐 JWT auth (per-user scope)' },
        { id: 'n6', label: '🤖 AI routes: parse, subscriptions, chat' },
        { id: 'n7', label: '🧠 OpenRouter free model router' },
        { id: 'n8', label: '🗄️ MongoDB' },
      ],
      edges: [
        { source: 'n1', target: 'n2' },
        { source: 'n1', target: 'n3' },
        { source: 'n3', target: 'n4', label: 'upload' },
        { source: 'n1', target: 'n4', label: 'Bearer JWT' },
        { source: 'n4', target: 'n5' },
        { source: 'n5', target: 'n6' },
        { source: 'n6', target: 'n7', label: 'strict-JSON prompt' },
        { source: 'n4', target: 'n8' },
        { source: 'n6', target: 'n1', label: 'parsed transaction' },
      ],
    },
    role: 'Solo project.',
    limits: [
      'No usage or accuracy metrics were collected.',
      'The PWA caches the app shell only; your data needs a connection.',
    ],
  },
  {
    id: 'investmate',
    title: 'InvestMate — AI Portfolio Tracker',
    description:
      'Track stocks, crypto and other assets in one place, with live quotes on request and a Gemini-generated risk summary of your portfolio.',
    category: 'Full Stack',
    kind: 'project',
    stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Gemini 2.5 Flash'],
    github: 'https://github.com/Manan0802/investmate',
    image: '/images/projects/investmate.webp',
    featured: false,
    metrics: ['3 market-data APIs + FX conversion', 'Gemini JSON risk analysis', 'Buy / sell tracking with partial sales'],
    summary: 'A MERN tracker that pulls quotes from Yahoo Finance, Twelve Data and CoinCap and asks Gemini 2.5 Flash for a structured risk summary.',
    problem: 'Investors with stocks, crypto and other assets want one place to log buys and sells, see their value and P/L, and get quick commentary.',
    approach: [
      'An Express API with route groups for users, investments, market data, crypto, news and AI; each investment stores its partial sales.',
      'Prices come from Yahoo Finance with a Twelve Data fallback and crypto from CoinCap, converted to INR with FX-rate APIs; news comes from Google News RSS.',
      'A Gemini 2.5 Flash route returns a strict-JSON risk summary and answers questions about the portfolio.',
    ],
    architecture: {
      nodes: [
        { id: 'i1', label: '📈 React + Redux SPA' },
        { id: 'i2', label: '⚡ Express API' },
        { id: 'i3', label: '🔐 JWT auth' },
        { id: 'i4', label: '🗄️ MongoDB (investments + sales)' },
        { id: 'i5', label: '💹 Yahoo Finance → Twelve Data' },
        { id: 'i6', label: '🪙 CoinCap (crypto)' },
        { id: 'i7', label: '💱 FX rates (USD → INR)' },
        { id: 'i8', label: '📰 Google News RSS' },
        { id: 'i9', label: '🧠 Gemini 2.5 Flash (JSON)' },
      ],
      edges: [
        { source: 'i1', target: 'i2', label: 'Bearer JWT' },
        { source: 'i2', target: 'i3' },
        { source: 'i2', target: 'i4' },
        { source: 'i2', target: 'i5' },
        { source: 'i2', target: 'i6' },
        { source: 'i5', target: 'i7' },
        { source: 'i6', target: 'i7' },
        { source: 'i2', target: 'i8' },
        { source: 'i2', target: 'i9', label: 'portfolio prompt' },
      ],
    },
    role: 'Solo project.',
    limits: [
      'Quotes are fetched when a page loads; nothing streams.',
      'An early project, with no tests or usage metrics.',
    ],
  },
];

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'All') return projects;
  return projects.filter(p => p.category === category);
};
