import type { Project } from "../types/Project";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginTop: "10px"
      }}
    >
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <small>{project.skills.join(", ")}</small>
    </div>
  );
}