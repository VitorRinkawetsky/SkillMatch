import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { createProject } from "../services/api";

const AVAILABLE_SKILLS = [
  "Python",
  "Machine Learning",
  "Data Science",
  "Computer Vision",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "UI/UX Design",
  "Mobile Development",
  "DevOps",
  "NLP",
  "Deep Learning",
];

const CATEGORIES = ["Engineering", "Research", "Data Science"] as const;

// Mapeamento para exibir em português sem quebrar a tipagem/API
const CATEGORY_LABELS = {
  "Engineering": "Engenharia",
  "Research": "Pesquisa",
  "Data Science": "Data Science",
};

export default function CreateProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number] | "">("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredSkills = AVAILABLE_SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(skillInput.toLowerCase()) &&
      !skills.includes(skill)
  );

  const handleAddSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkillInput("");
    setShowSuggestions(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const exactMatch = AVAILABLE_SKILLS.find(
        (s) => s.toLowerCase() === skillInput.trim().toLowerCase()
      );
      if (exactMatch && !skills.includes(exactMatch)) {
        handleAddSkill(exactMatch);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || skills.length === 0) {
      alert("Preencha todos os campos e adicione pelo menos uma skill.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createProject({
        id: `project-${Date.now()}`,
        title,
        description,
        category: category as (typeof CATEGORIES)[number],
        skills,
      });
      alert("Projeto criado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar projeto", error);
      alert("Erro ao criar projeto. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header com navegação */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Voltar para Projetos</span>
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Criar Novo Projeto
        </h1>
        <p className="text-gray-600 mb-8">
          Preencha os detalhes abaixo para criar seu projeto e encontrar colaboradores.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Título do Projeto
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ex: Monitoramento de Vida Selvagem com IA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
              required
            />
          </div>

          {/* Categoria */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Categoria
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number] | "")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 bg-white cursor-pointer"
              required
            >
              <option value="">Selecione uma categoria</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          {/* Descrição */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Descrição do Projeto
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva seu projeto, objetivos e o que você busca em colaboradores..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 resize-none"
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Skills Necessárias
            </label>
            <div className="relative">
              {/* Skills selecionadas */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-md"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Input de skill */}
              <div className="relative">
                <input
                  id="skills"
                  type="text"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  placeholder="Digite para buscar skills (ex: Python, React)..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
                />

                {/* Sugestões */}
                {showSuggestions && filteredSkills.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {filteredSkills.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => handleAddSkill(skill)}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Pressione Enter ou clique para adicionar skills
            </p>
          </div>

          {/* Botão de submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            {isSubmitting ? "Criando..." : "Criar Projeto"}
          </button>
        </form>
      </main>
    </div>
  );
}