export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  impact: string;
  timeline: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'Database' | 'Tools';
  proficiency: number; // 1-100
  icon?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}
