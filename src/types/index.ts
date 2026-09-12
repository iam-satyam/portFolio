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
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Analytics' | 'DevOps' | 'Database' | 'Tools';
  icon?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  twitter?: string;
  website?: string;
}

export type ProjectGroup = 'Commerce' | 'Travel' | 'Enterprise';

export interface StoreLinks {
  android?: string;
  ios?: string;
  demo?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface CaseStudyProject {
  id: string;
  title: string;
  client: string;
  category: string;
  group: ProjectGroup;
  role: string;
  duration: string;
  overview: string;
  businessProblem: string;
  features: string[];
  contributions: string[];
  technologies: string[];
  challenges: string[];
  solutions: string[];
  performance: string[];
  storeLinks: StoreLinks;
  image: string;
  visual: 'commerce' | 'loyalty' | 'maritime' | 'crm' | 'kiosk' | 'visitor';
  metrics: ProjectMetric[];
  featured?: boolean;
  accent: string;
  deepAccent: string;
}
