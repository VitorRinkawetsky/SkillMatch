import { useState } from "react";
import type { Project } from "../types/Project";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const projects: Project[] = [
    {
      id: 1,
      title: "Sistema de Gestão",
      description: "Projeto para gerenciar tarefas",
      skills: ["React", ".NET"]
    },
    {
      id: 2,
      title: "App Mobile",
      description: "Aplicativo para estudantes",
      skills: ["Flutter"]
    }
  ];

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
        <h1>SkillMatch</h1>

        <input
            type="text"
            placeholder="Buscar projetos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
}