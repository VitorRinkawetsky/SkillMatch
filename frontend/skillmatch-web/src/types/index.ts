export interface Project {
  id: string;
  category: 'Engineering' | 'Research' | 'Data Science';
  title: string;
  description: string;
  skills: string[];
}

export interface User {
  id: string;
  name: string;
  avatarInitials: string;
}