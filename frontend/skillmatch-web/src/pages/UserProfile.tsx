import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Save, X, Mail, GraduationCap, Building } from "lucide-react";
import type { User } from "../types";

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

interface UserProfileProps {
  user: User;
  onSave: (user: User) => void;
}

export default function UserProfile({ user, onSave }: UserProfileProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user);
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSkills = AVAILABLE_SKILLS.filter(
    (skill) =>
      skill.toLowerCase().includes(skillInput.toLowerCase()) &&
      !editedUser.skills.includes(skill)
  );

  const handleAddSkill = (skill: string) => {
    if (!editedUser.skills.includes(skill)) {
      setEditedUser({ ...editedUser, skills: [...editedUser.skills, skill] });
    }
    setSkillInput("");
    setShowSuggestions(false);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedUser({
      ...editedUser,
      skills: editedUser.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSave = () => {
    onSave(editedUser);
    setIsEditing(false);
    alert("Perfil atualizado com sucesso!");
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header com navegação */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4">
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
      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Header do Perfil */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.avatarInitials || user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar Perfil
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Salvar
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Seções do Perfil */}
        <div className="space-y-6">
          {/* Curso e Universidade */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Informações Acadêmicas
            </h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  Curso
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.course || ""}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, course: e.target.value })
                    }
                    placeholder="ex: Engenharia de Software"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
                  />
                ) : (
                  <p className="text-gray-900">{user.course}</p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  Universidade
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.university || ""}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        university: e.target.value,
                      })
                    }
                    placeholder="ex: USP, UFSC"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
                  />
                ) : (
                  <p className="text-gray-900">{user.university}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Sobre mim
            </h2>
            {isEditing ? (
              <textarea
                value={editedUser.bio || ""}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, bio: e.target.value })
                }
                placeholder="Conte-nos sobre você, seus interesses e o que está buscando..."
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700 resize-none"
              />
            ) : (
              <p className="text-gray-700">
                {user.bio || "Nenhuma biografia adicionada ainda."}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Minhas Skills
            </h2>
            {isEditing ? (
              <div>
                {/* Skills selecionadas */}
                {editedUser.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {editedUser.skills.map((skill) => (
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
                    type="text"
                    value={skillInput}
                    onChange={(e) => {
                      setSkillInput(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && skillInput.trim()) {
                        e.preventDefault();
                        const exactMatch = AVAILABLE_SKILLS.find(
                          (s) => s.toLowerCase() === skillInput.trim().toLowerCase()
                        );
                        if (exactMatch && !editedUser.skills.includes(exactMatch)) {
                          handleAddSkill(exactMatch);
                        }
                      }
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Digite para buscar skills..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-700"
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
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.skills.length > 0 ? (
                  user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-md"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhuma skill adicionada ainda.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}