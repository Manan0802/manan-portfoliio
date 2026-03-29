export interface Skill {
  name: string;
  category: 'ai-ml' | 'frontend' | 'backend' | 'tools';
}

export const skills: Skill[] = [
  // AI/ML Skills (purple glow)
  { name: 'Python', category: 'ai-ml' },
  { name: 'PyTorch', category: 'ai-ml' },
  { name: 'LLMs', category: 'ai-ml' },
  { name: 'AI Agents', category: 'ai-ml' },
  { name: 'Prompt Engineering', category: 'ai-ml' },
  { name: 'Deep Learning', category: 'ai-ml' },
  { name: 'CNNs', category: 'ai-ml' },
  { name: 'RNNs', category: 'ai-ml' },
  { name: 'n8n', category: 'ai-ml' },
  { name: 'Gemini API', category: 'ai-ml' },

  // Frontend Skills (blue glow)
  { name: 'React.js', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Chart.js', category: 'frontend' },

  // Backend Skills (cyan glow)
  { name: 'Node.js', category: 'backend' },
  { name: 'Express.js', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  { name: 'MySQL', category: 'backend' },
  { name: 'Redis', category: 'backend' },
  { name: 'Firebase', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'JWT', category: 'backend' },

  // Languages & Tools (white)
  { name: 'C++', category: 'tools' },
  { name: 'JavaScript', category: 'tools' },
  { name: 'TypeScript', category: 'tools' },
  { name: 'Git', category: 'tools' },
  { name: 'Power BI', category: 'tools' },
  { name: 'VS Code', category: 'tools' },
];

export const getSkillsByCategory = (category: string): Skill[] => {
  return skills.filter(s => s.category === category);
};
