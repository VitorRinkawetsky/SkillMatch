import React from 'react';
import { Cpu, BookOpen, Database } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Define o ícone com base na categoria
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Engineering': return <Cpu className="w-4 h-4 text-blue-600" />;
      case 'Research': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'Data Science': return <Database className="w-4 h-4 text-blue-600" />;
      default: return <Cpu className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header do Card (Categoria) */}
      <div className="bg-blue-50 px-5 py-3 flex items-center gap-2 border-b border-gray-100">
        {getCategoryIcon(project.category)}
        <span className="text-sm font-medium text-gray-700">{project.category}</span>
      </div>
      
      {/* Corpo do Card */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>
        
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-800 mb-2">Skills Needed:</p>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-2.5 py-1 text-xs font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <button className="w-full mt-auto bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}