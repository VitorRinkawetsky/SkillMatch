using SkillMatch.Api.DTOs;
using SkillMatch.Api.Entities;
using SkillMatch.Api.Interfaces;

namespace SkillMatch.Api.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        // Injeção de Dependência
        public ProjectService(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }
        public async Task<Project> CreateProjectAsync(CreateProjectRequest request)
        {
            var project = new Project
            {
                Title = request.Title,
                Description = request.Description
            };

            await _projectRepository.AddAsync(project);
            await _projectRepository.SaveChangesAsync();

            return project;
        }
    }
}
}
