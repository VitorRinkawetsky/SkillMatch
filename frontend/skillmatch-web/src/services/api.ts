// src/services/api.ts
import type { Project } from '../types';

// Mock de dados baseado na imagem
let mockProjects: Project[] = [
  {
    id: '1',
    category: 'Engineering',
    title: 'AI-Powered Wildlife Monitoring',
    description: 'AI-Powered wildlife monitoring miribot monitoring and avtranreo-nane ceaes and monitoring misstors.',
    skills: ['Python', 'Machine Learning'],
  },
  {
    id: '2',
    category: 'Research',
    title: 'Community-Led Urban Farming App',
    description: 'Community-Led urban farming app is a community imominging, app sots, and community platforms.',
    skills: ['Python', 'Machine Learning', 'SkillTag'],
  },
  {
    id: '3',
    category: 'Data Science',
    title: 'Data Science Project',
    description: 'Data science is sexually to data data science and expane path and anniture anatysies of containm-puxcommunities.',
    skills: ['Python', 'Data Science'],
  },
  {
    id: '4',
    category: 'Engineering',
    title: 'AI-Powered Data Project',
    description: 'AI-Powered Wildlife Monitoring on sighest dollars re-used to the slakes enoiments.',
    skills: ['Python', 'Machine Learning'],
  },
  {
    id: '5',
    category: 'Research',
    title: 'Community-Lew App Project',
    description: 'Creates a bio banking opportunities and annoying and anlee s-actate platform.',
    skills: ['Python', 'Computer Vision'],
  },
  {
    id: '6',
    category: 'Engineering',
    title: 'Computer: Wildlife Liarning',
    description: 'Uraane development with snternanional community emerges cont into ther-oy needs.',
    skills: ['Data Science', 'Computer Vision'],
  }
];

export const fetchProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProjects);
    }, 500);
  });
};

export const createProject = async (project: Project): Promise<Project> => {
  // Simulando delay de rede
  return new Promise((resolve) => {
    setTimeout(() => {
      mockProjects = [project, ...mockProjects];
      resolve(project);
    }, 500);
  });
};