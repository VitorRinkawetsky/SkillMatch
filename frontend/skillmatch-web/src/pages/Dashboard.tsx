import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Folder,
  Target,
  Users,
  ArrowLeft,
  Eye,
  Edit2,
  XCircle,
} from "lucide-react";

// ==============================
// 1. Interfaces (Tipagens)
// ==============================
interface DashboardStat {
  id: string;
  label: string;
  value: string | number;
  icon: React.ElementType;
  colorClass: string;
}

interface MyProject {
  id: string;
  title: string;
  status: "Ativo" | "Fechado";
  interestedCount: number;
}

interface MyApplication {
  id: string;
  projectTitle: string;
  category: string;
  creatorName: string;
}

// ==============================
// 2. Mock Data (Dados Fictícios)
// ==============================
const MOCK_STATS: DashboardStat[] = [
  {
    id: "stat-1",
    label: "Projetos Criados",
    value: 3,
    icon: Folder,
    colorClass: "text-blue-600 bg-blue-100",
  },
  {
    id: "stat-2",
    label: "Candidaturas",
    value: 5,
    icon: Target,
    colorClass: "text-purple-600 bg-purple-100",
  },
  {
    id: "stat-3",
    label: "Novos Interessados",
    value: 12,
    icon: Users,
    colorClass: "text-emerald-600 bg-emerald-100", // Destaque diferente conforme solicitado
  },
];

const MOCK_MY_PROJECTS: MyProject[] = [
  {
    id: "proj-1",
    title: "AI-Powered Wildlife Monitoring",
    status: "Ativo",
    interestedCount: 8,
  },
  {
    id: "proj-2",
    title: "Quantum Computing Simulator",
    status: "Fechado",
    interestedCount: 15,
  },
];

const MOCK_MY_APPLICATIONS: MyApplication[] = [
  {
    id: "app-1",
    projectTitle: "Sustainable Urban Farming",
    category: "Engineering",
    creatorName: "Dr. Sarah Jenkins",
  },
  {
    id: "app-2",
    projectTitle: "Deep Learning for NLP",
    category: "Data Science",
    creatorName: "Prof. Alan Turing",
  },
];

// ==============================
// 3. Sub-componentes
// ==============================
const StatCard = ({ stat }: { stat: DashboardStat }) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
      <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${stat.colorClass}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
        <p className="text-3xl font-bold text-gray-900 leading-none">{stat.value}</p>
      </div>
    </div>
  );
};

const ProjectListCard = ({ project }: { project: MyProject }) => {
  const navigate = useNavigate();
  const isActive = project.status === "Ativo";
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-200 hover:shadow-md transition-all duration-200">
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-gray-900">{project.title}</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
            {project.status}
          </span>
          <span className="text-gray-500 flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {project.interestedCount} interessados
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button 
          onClick={() => navigate(`/project/${project.id}/applicants`)}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          Ver interessados
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-transparent hover:border-gray-200">
          <Edit2 className="w-4 h-4" />
          Editar
        </button>
      </div>
    </div>
  );
};

const ApplicationListCard = ({ application }: { application: MyApplication }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-200 hover:shadow-md transition-all duration-200">
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-gray-900">{application.projectTitle}</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
            <Folder className="w-3.5 h-3.5 text-blue-500" />
            {application.category}
          </span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span>Criado por <span className="font-medium text-gray-700">{application.creatorName}</span></span>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
          <Eye className="w-4 h-4" />
          Ver Detalhes
        </button>
        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors">
          <XCircle className="w-4 h-4" />
          Retirar
        </button>
      </div>
    </div>
  );
};

// ==============================
// 4. Componente Principal
// ==============================
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      {/* Header com navegação */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 mr-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Meu Dashboard</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Seção 1: Quick Stats */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Resumo de Atividades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </section>

        {/* Seção 2: Meus Projetos */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Projetos que Criei</h2>
          <div className="space-y-3">
            {MOCK_MY_PROJECTS.map((project) => (
              <ProjectListCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Seção 3: Minhas Candidaturas */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Projetos que Demonstrei Interesse</h2>
          <div className="space-y-3">
            {MOCK_MY_APPLICATIONS.map((app) => (
              <ApplicationListCard key={app.id} application={app} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}