export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  tags: string[];
  highlights: string[];
  type: 'work' | 'education';
}

export const experiences: Experience[] = [
  {
    type: 'work',
    company: 'IndiaMART InterMESH Ltd',
    role: 'Associate SWE Intern — AI Engineer',
    duration: 'Jan 2026 – Present',
    location: 'Noida, India',
    tags: ['LangGraph', 'Agentic AI', 'RAG', 'Vector Search', 'Python'],
    highlights: [
      'Architected a LangGraph Master Orchestrator managing 8-10 specialized sub-agents, enabling dynamic, prompt-based routing to auto-execute isolated agents (e.g., triggering A & C while skipping B) for highly conditional workflows.',
      'Designed a Recursive Skill-Based Agent System traversing dynamic `.md` instruction files, routing intermediate outputs back to the orchestrator to determine the next procedural skill until the final success state is reached.',
      'Built an Autonomous LLM Wiki (Dynamic RAG) that actively analyzes shifting input structures and auto-generates category documentation. As streaming data mutates, retrieval logic updates live to ensure 100% contextual accuracy for end-user queries.',
      'Engineered an AI normalization agent scaling across 17,000+ internal MCAT structures, achieving 98% consistent data taxonomy and completely replacing legacy manual cataloging procedures.'
    ],
  },
  {
    type: 'education',
    company: 'Delhi Technological University (DTU)',
    role: 'B.Tech in Software Engineering',
    duration: '2022-2026',
    location: 'Delhi, India',
    tags: ['CGPA: 7.75', 'System Design', 'Algorithms', 'Full-Stack'],
    highlights: [
      'Mastered advanced Computer Science architecture, moving beyond theoretical data structures into deploying scalable, real-world full-stack infrastructure.',
      'Continuously engineered high-impact projects, blending predictive machine learning models with accessible, responsive React/Next.js frontend systems.',
      'Optimized algorithmic problem-solving by clearing 400+ complex DSA constraints, applying raw computational theory directly to application bottlenecks.',
      'Fostered deep collaborative engineering by leading technical initiatives and participating actively in university-level hackathons and technical societies.'
    ],
  },
  {
    type: 'education',
    company: 'Academic & Competitive Foundations',
    role: 'JEE Advanced Prep & Class XII',
    duration: 'Grad. 2022',
    location: 'Sachdeva Public School, Delhi',
    tags: ['AIR 15,233', 'Physics: 94', 'Math: 98', 'Class XII: 88.8%'],
    highlights: [
      'Secured All India Rank (AIR) 15,233 in JEE Mains, competing among over a million candidates—proving a high-stress analytical baseline.',
      'Achieved elite percentiles in core analytical subjects (98 in Mathematics, 94 in Physics), solidifying the first-principles thinking required for complex system design.',
      'Graduated Class XII from Sachdeva Public School with 88.8%, maintaining rigorous academic discipline concurrent with competitive engineering preparation.',
      'This foundation engineered a relentless problem-solving stamina that seamlessly translated into tackling complex modern computing and algorithmic limits.'
    ],
  }
];
