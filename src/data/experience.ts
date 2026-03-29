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
    tags: ['LLM Agents', 'Redis', 'Prompt Engineering', 'Python', 'AI Pipelines'],
    highlights: [
      'AI normalization agent across 17,000+ MCATs — 98% data consistency',
      'LLM pipeline extracting specs from 1000s of PDFs — 3 hierarchical tiers',
      'Redis workflow processing 10 Lakh+ (1M+) MCAT IDs at scale',
      'Transitioned manual cataloging → automated AI-enabled solutions',
    ],
  },
  {
    type: 'education',
    company: 'Delhi Technological University (DTU)',
    role: 'B.Tech Software Engineering',
    duration: '2022-2026',
    location: 'Delhi, India',
    tags: ['CGPA: 7.75', 'Applied AI', 'Software Engineering'],
    highlights: [],
  },
  {
    type: 'education',
    company: 'Sachdeva Public School',
    role: 'Class XII',
    duration: '2022',
    location: 'Delhi, India',
    tags: ['88.8%'],
    highlights: [],
  },
  {
    type: 'education',
    company: 'JEE Mains',
    role: 'All India Rank',
    duration: '2022',
    location: 'India',
    tags: ['AIR 15,233', 'Math: 98', 'Physics: 94'],
    highlights: [],
  },
];
