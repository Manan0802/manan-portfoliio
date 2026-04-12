export const skillCategories = [
  {
    name: "AI & Machine Learning",
    color: "border-purple-500/30 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20",
    skills: ["Machine Learning", "Deep Learning", "CNNs & RNNs", "Neural Networks", "LLMs & AI Agents", "PyTorch", "Prompt Engineering", "Transformers", "RAG Pipeline", "Vector DBs (Pinecone, Chroma)", "RLHF", "LangGraph", "LangChain", "OpenAI API", "Hugging Face"]
  },
  {
    name: "Languages",
    color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-200 hover:bg-yellow-500/20",
    skills: ["Python", "C++", "C", "JavaScript", "TypeScript", "SQL", "Go (Basic)"]
  },
  {
    name: "Frontend",
    color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20",
    skills: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion", "Three.js", "Vite"]
  },
  {
    name: "Backend & APIs",
    color: "border-green-500/30 bg-green-500/10 text-green-200 hover:bg-green-500/20",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "GraphQL", "FastAPI", "Microservices", "WebSockets"]
  },
  {
    name: "Databases & Cloud",
    color: "border-rose-500/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20",
    skills: ["MongoDB", "MySQL", "Redis", "Firebase", "PostgreSQL", "AWS (EC2, S3)", "Docker", "Vercel"]
  },
  {
    name: "Tools & Ecosystem",
    color: "border-slate-400/30 bg-slate-400/10 text-slate-200 hover:bg-slate-400/20",
    skills: ["Git", "GitHub", "n8n", "LLM Wiki", "Generative AI", "Power BI", "VS Code", "Bootstrap", "Postman", "Linux", "CI/CD Pipeline"]
  },
  {
    name: "Core Engineering",
    color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20",
    skills: ["DSA (C++)", "OOP", "OS", "DBMS", "Computer Networks", "Software Architecture", "System Design", "Leadership", "Team Collaboration"]
  }
];

export const flatSkills = skillCategories.flatMap(cat => 
  cat.skills.map(skill => ({
    text: skill,
    colorClass: cat.color
  }))
);
