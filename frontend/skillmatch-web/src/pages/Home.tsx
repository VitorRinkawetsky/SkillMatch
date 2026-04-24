// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { ProjectCard } from '../components/ProjectCard';
import { fetchProjects } from '../services/api';
import type { Project, User } from '../types';

interface HomeProps {
  currentUser: User;
}

export default function Home({ currentUser }: HomeProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Erro ao buscar projetos", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <Header user={currentUser} />

      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Encontre Seu Próximo Projeto Acadêmico. Conecte-se com Suas Skills.
          </h1>
          <p className="text-base text-gray-600">
            Explore diversas oportunidades e encontre colaboradores para a sua paixão.
          </p>
        </div>

        {/* Search & Filters */}
        <SearchBar />

        {/* Project Grid */}
        {isLoading ? (
          <div className="text-center text-gray-500 mt-10">Carregando projetos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}