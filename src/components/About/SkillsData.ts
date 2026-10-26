// Only skills backed by real work (resume, repos) — keep in sync with the resume.
export const skillCategories = [
  {
    name: "AI & LLM Systems",
    color: "border-purple-500/30 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20",
    skills: ["LLM Agents", "Tool Calling", "RAG", "LangGraph", "Multi-Agent Systems", "Evals (LLM-as-Judge)", "Guardrails", "Prompt & Context Engineering", "Prompt Caching", "Structured Outputs", "Embeddings", "Vector Search (pgvector, FAISS)", "Machine Learning", "Deep Learning", "CLIP"]
  },
  {
    name: "Models & Voice",
    color: "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200 hover:bg-fuchsia-500/20",
    skills: ["Gemini", "AWS Bedrock", "OpenAI", "Sarvam AI", "Streaming STT / TTS"]
  },
  {
    name: "Languages",
    color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-200 hover:bg-yellow-500/20",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "Kotlin", "C++"]
  },
  {
    name: "Backend & APIs",
    color: "border-green-500/30 bg-green-500/10 text-green-200 hover:bg-green-500/20",
    skills: ["FastAPI", "asyncio", "Pydantic", "SQLAlchemy", "REST APIs", "WebSockets", "Node.js", "Express.js", "Spring Boot", "JWT Auth"]
  },
  {
    name: "Data & Cloud",
    color: "border-rose-500/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20",
    skills: ["PostgreSQL + pgvector", "Redis", "MongoDB", "MySQL", "BigQuery", "GCP (Cloud Functions, GCS)", "Vercel"]
  },
  {
    name: "Frontend",
    color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20",
    skills: ["React", "Tailwind CSS", "Three.js", "Framer Motion", "Vite", "Streamlit"]
  },
  {
    name: "Tools & Core",
    color: "border-slate-400/30 bg-slate-400/10 text-slate-200 hover:bg-slate-400/20",
    skills: ["Git", "pytest", "Langfuse", "Claude Code", "n8n", "Postman", "Linux", "DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "System Design"]
  }
];

export const flatSkills = skillCategories.flatMap(cat =>
  cat.skills.map(skill => ({
    text: skill,
    colorClass: cat.color
  }))
);
