import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, UserCircle } from "lucide-react";

// ==============================
// 1. Interface (Tipagem)
// ==============================
interface Candidate {
  id: string;
  name: string;
  avatarInitials: string;
  course: string;
  skills: string[];
  email: string;
  bio: string;
}

// ==============================
// 2. Mock Data (Dados Fictícios)
// ==============================
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Carlos Eduardo",
    avatarInitials: "CE",
    course: "Ciência da Computação - 6º Semestre",
    skills: ["Python", "Machine Learning", "Data Science"],
    email: "carlos.eduardo@universidade.edu.br",
    bio: "Tenho muito interesse na área de IA aplicada à preservação ambiental. Já trabalhei com modelos de visão computacional em um projeto de iniciação científica.",
  },
  {
    id: "cand-2",
    name: "Mariana Souza",
    avatarInitials: "MS",
    course: "Engenharia de Software - 4º Semestre",
    skills: ["Python", "React", "Node.js"],
    email: "mariana.souza@universidade.edu.br",
    bio: "Desenvolvedora full-stack com foco em Python no back-end. Gostaria de aplicar meus conhecimentos na construção de dashboards para monitoramento de dados.",
  },
  {
    id: "cand-3",
    name: "Roberto Lima",
    avatarInitials: "RL",
    course: "Engenharia de Computação - 8º Semestre",
    skills: ["Computer Vision", "C++", "Python"],
    email: "roberto.lima@universidade.edu.br",
    bio: "Experiência prévia com OpenCV e detecção de objetos. Procuro projetos práticos para compor meu TCC na área de sustentabilidade.",
  },
];

// ==============================
// 3. Sub-componente (Card)
// ==============================
const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(candidate.email);
    alert(`E-mail de ${candidate.name} copiado para a área de transferência!`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      {/* Cabeçalho do Card */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
          {candidate.avatarInitials}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{candidate.name}</h3>
          <p className="text-sm text-gray-500 font-medium line-clamp-1">{candidate.course}</p>
        </div>
      </div>

      {/* Biografia */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-grow">
        "{candidate.bio}"
      </p>

      {/* Skills (Tags) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {candidate.skills.map((skill, index) => (
          <span key={index} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-100">
            {skill}
          </span>
        ))}
      </div>

      {/* Rodapé (Ações) */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors">
          <UserCircle className="w-4 h-4" />
          Ver Perfil
        </button>
        <button
          onClick={handleCopyEmail}
          className="flex-[1.2] flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copiar E-mail
        </button>
      </div>
    </div>
  );
};

// ==============================
// 4. Componente Principal
// ==============================
export default function ProjectApplicants() {
  const navigate = useNavigate();
  // O `id` do projeto virá da URL, pode ser usado para buscar dados dinâmicos da API no futuro:
  const { id } = useParams<{ id: string }>(); 
  
  const totalApplicants = MOCK_CANDIDATES.length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      {/* Cabeçalho da Página */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors flex-shrink-0"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 truncate">
              Candidatos para: <span className="font-semibold text-gray-700">Monitoramento de Vida Selvagem com IA</span>
            </h1>
          </div>
          <div className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-50 text-blue-700 font-medium text-sm rounded-full border border-blue-100 flex-shrink-0">
            {totalApplicants} {totalApplicants === 1 ? "estudante interessado" : "estudantes interessados"}
          </div>
        </div>
      </header>

      {/* Lista de Candidatos */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CANDIDATES.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </main>
    </div>
  );
}