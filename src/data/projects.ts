export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI/LLM' | 'ML/Data' | 'Full Stack';
  stack: string[];
  github?: string;
  live?: string;
  colab?: string;
  image: string;
  featured?: boolean;
  metrics?: string[];
}

export const projects: Project[] = [
  {
    id: 'neofin',
    title: 'NeoFin — AI-Powered Personal Finance Tracker',
    description: 'A full-stack Progressive Web App (PWA) eliminating manual entry by utilizing Gemini 2.5 Flash to automatically parse unstructured voice & text commands into categorized financial JSON data.',
    category: 'Full Stack',
    stack: ['MERN Stack', 'Gemini 2.5 Flash', 'OpenRouter API', 'PWA', 'Tailwind CSS'],
    github: 'https://github.com/Manan0802/neofin',
    live: 'https://neofin-five.vercel.app/',
    image: '/images/projects/neofin.jpeg',
    featured: true,
    metrics: ['Reduced manual entry by 98%', 'Sub-200ms Gemini parsing latency', 'Zero-Downtime PWA Engine', 'Processed 500+ unstructured inputs'],
  },
  {
    id: 'shoplens',
    title: 'ShopLens — AI Fashion Search & Recommendation',
    description: 'Intelligent multi-modal fashion discovery engine leveraging deep CLIP embeddings and FAISS vector indexing for high-speed hybrid text-image searches over a 40,000+ item dataset.',
    category: 'ML/Data',
    stack: ['Python', 'Streamlit', 'CLIP', 'FAISS Vector Search', 'Machine Learning'],
    github: 'https://github.com/Manan0802/shoplens',
    image: '/images/projects/shoplens.jpeg',
    featured: false,
    metrics: ['Sub-50ms FAISS traversal', 'Indexed 40,000+ fashion vectors', 'Improved lookup speed 10x', 'Multi-modal CLIP accuracy'],
  },
  {
    id: 'skill-dashboard',
    title: 'Agentic Skills Command Center',
    description: 'Dynamically rendered enterprise dashboard orchestrating over 1,300+ advanced persona-based AI skill documentation files, enabling intelligent categorization for LLM agents.',
    category: 'AI/LLM',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Agentic Workflows', 'Dashboard Analytics'],
    live: 'https://skill-dashboard-dux336ecu-manan-kumars-projects-51531793.vercel.app/',
    image: '/images/projects/skilldashbord.jpeg',
    featured: false,
    metrics: ['Zero-latency local indexing', 'Orchestrates 1,300+ nodes', 'Enterprise-grade architecture'],
  },
  {
    id: 'investmate',
    title: 'InvestMate — AI-Powered Portfolio Tracker',
    description: 'AI-powered investment portfolio tracker with Gemini AI recommendations for smarter financial decisions.',
    category: 'AI/LLM',
    stack: ['React.js', 'Gemini API', 'Python', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/Manan0802/investmate',
    live: 'https://investmate.app',
    image: '/images/projects/investamte.jpeg',
    featured: false,
  },
  {
    id: 'crop-yield',
    title: 'Crop Yield Prediction & Fertilizer Recommender',
    description: 'ML regression model (R²=0.91) predicting crop yield plus explainable fertilizer advisor for farmers.',
    category: 'ML/Data',
    stack: ['Python', 'Streamlit', 'PyTorch', 'Pandas', 'NumPy'],
    github: 'https://github.com/Manan0802/crop-yield-prediction',
    colab: 'https://colab.research.google.com/',
    image: '/images/projects/crop-prdn.jpeg',
    featured: false,
  },
  {
    id: 'travel-app',
    title: 'Tour & Travel App UI',
    description: 'Responsive React UI with 30+ destinations, 90%+ Lighthouse score, mobile-first design.',
    category: 'Full Stack',
    stack: ['React.js', 'Tailwind CSS', 'HTML5'],
    github: 'https://github.com/Manan0802/travel-app',
    image: '/images/projects/tourtravel.png',
    featured: false,
  },
];

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'All') return projects;
  return projects.filter(p => p.category === category);
};
