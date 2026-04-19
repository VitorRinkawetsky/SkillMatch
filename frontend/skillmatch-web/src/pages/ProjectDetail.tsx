import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, ExternalLink, Cpu, BookOpen, Database } from "lucide-react";
import { fetchProjects } from "../services/api";
import type { Project } from "../types";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const projects = await fetchProjects();
        const found = projects.find((p) => p.id === id);
        setProject(found || null);
      } catch (error) {
        console.error("Erro ao buscar projeto", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Engineering":
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case "Research":
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case "Data Science":
        return <Database className="w-5 h-5 text-blue-600" />;
      default:
        return <Cpu className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleInterest = () => {
    alert("Interesse demonstrado! Entre em contato com o criador do projeto via e-mail ou LinkedIn.");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <p className="text-gray-500">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Project not found</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header com navegação */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Projects</span>
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Categoria */}
        <div className="flex items-center gap-2 mb-4">
          {getCategoryIcon(project.category)}
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            {project.category}
          </span>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
          {project.title}
        </h1>

        {/* Descrição */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Project Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            Skills Needed
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-sm font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleInterest}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Mail className="w-5 h-5" />
            I'm Interested
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors">
            <ExternalLink className="w-5 h-5" />
            View Creator Profile
          </button>
        </div>
      </main>
    </div>
  );
}
