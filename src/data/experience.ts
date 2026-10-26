export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  tags: string[];
  highlights: string[];
  type: 'work' | 'education';
}

// Every number here is traced to code, eval reports or git history (see the resume research notes).
// The current employer is deliberately not named on this site.
export const experiences: Experience[] = [
  {
    type: 'work',
    company: 'Fintech Startup',
    role: 'Software Development Engineer I (AI)',
    duration: 'Jun 2026 – Present',
    location: 'New Delhi, India',
    tags: ['LLM Agents', 'RAG', 'Evals', 'Voice AI', 'Python / FastAPI'],
    highlights: [
      'Top contributor to a Hinglish (Hindi-English) AI assistant for retail savers, live in production in the app’s chat.',
      'Raised intent-routing accuracy from 68% to 96% on a frozen 193-case held-out set by replacing a rule-based router with an LLM classifier, and cut model calls per reply from 3–8 to 1–2.',
      'Shipped a tool-calling RAG agent to production through a percentage A/B rollout with a kill switch; consolidating 43 narrow tools into 19 lifted first-tool accuracy from 73% to ~80% on 314 labeled turns.',
      'Built the safety layer for regulated finance: a money guard that keeps the model off transaction APIs, PAN and phone masking on model calls, and a scope rule that cut answered off-topic probes from 15 to 0 in live tests.',
      'Built in-chat money actions (SIP changes, investments, withdrawals) behind consent, OTP and UPI steps, with at-most-once writes, fail-closed behaviour when Redis is down, and 254 tests.',
      'Built the eval harnesses: a blind routing gate with paired significance tests, LLM-judge replay of production chats, p50/p95 latency evals and per-call cost tracking.',
      'Hardened real-time voice over WebSockets (co-built): fixed barge-in across pods via Redis and cut TTS failover delay after a hung connection from 10 s to 0.5 s.',
    ],
  },
  {
    type: 'work',
    company: 'IndiaMART InterMESH Ltd',
    role: 'Associate SWE Intern — AI Engineer',
    duration: 'Jan 2026 – Jun 2026',
    location: 'Noida, India',
    tags: ['LangGraph', 'Agentic AI', 'Gemini 2.5 Pro', 'Langfuse', 'GCP'],
    highlights: [
      'Built SARA, an autonomous spec-auditing agent run on IndiaMART’s live catalog: a LangGraph state machine with 10 on-demand skills (domain expert, critic, validator) and a validation gate that loops failed output back for correction.',
      'Built a knowledge compiler used by catalog teams that turns buyer calls, seller PDFs and web search into 14-section category wikis, updating only changed sources, rolling back score regressions and flagging open doubts for human review.',
      'Built a LangGraph spec-correction pipeline merging 6 data sources through rule-based quality gates, plus a serverless Google Cloud Function that pushes normalized specs to Kafka through a publish API, with GCS audit snapshots.',
    ],
  },
  {
    type: 'education',
    company: 'Delhi Technological University (DTU)',
    role: 'B.Tech, Software Engineering',
    duration: '2022 – 2026',
    location: 'New Delhi, India',
    tags: ['CGPA 7.71 / 10', 'JEE Main AIR 15,233', 'LeetCode 400+'],
    highlights: [
      '400+ LeetCode problems solved, 1600+ contest rating.',
      'Class XII (Sachdeva Public School, 2022): 88.8%.',
      'Silver medal, Kabaddi (DTU inter-department).',
    ],
  },
];
