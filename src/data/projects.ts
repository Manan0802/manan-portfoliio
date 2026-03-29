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
    id: 'investmate',
    title: 'InvestMate — AI-Powered Portfolio Tracker',
    description: 'AI-powered investment portfolio tracker with Gemini AI recommendations for smarter financial decisions.',
    category: 'AI/LLM',
    stack: ['React.js', 'Gemini API', 'Python', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/Manan0802/investmate',
    live: 'https://investmate.app',
    image: '/images/projects/investmate.png',
    featured: true,
    metrics: ['100+ Users', '<70ms Updates', '1000+ Assets', '80% Better Decisions'],
  },
  {
    id: 'crop-yield',
    title: 'Crop Yield Prediction & Fertilizer Recommender',
    description: 'ML regression model (R²=0.91) predicting crop yield plus explainable fertilizer advisor for farmers.',
    category: 'ML/Data',
    stack: ['Python', 'Streamlit', 'PyTorch', 'Pandas', 'NumPy'],
    github: 'https://github.com/Manan0802/crop-yield-prediction',
    colab: 'https://colab.research.google.com/',
    image: '/images/projects/crop-yield.png',
  },
  {
    id: 'travel-app',
    title: 'Tour & Travel App UI',
    description: 'Responsive React UI with 30+ destinations, 90%+ Lighthouse score, mobile-first design.',
    category: 'Full Stack',
    stack: ['React.js', 'Tailwind CSS', 'HTML5'],
    github: 'https://github.com/Manan0802/travel-app',
    image: '/images/projects/travel-app.png',
  },
];

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'All') return projects;
  return projects.filter(p => p.category === category);
};
