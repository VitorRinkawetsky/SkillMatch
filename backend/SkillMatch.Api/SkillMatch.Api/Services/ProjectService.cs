using SkillMatch.Api.DTOs;
using SkillMatch.Api.Entities;
using SkillMatch.Api.Interfaces;

namespace SkillMatch.Api.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly ISkillRepository _skillRepository;

        // Injeção de Dependência
        public ProjectService(IProjectRepository projectRepository, ISkillRepository skillRepository)
        {
            _projectRepository = projectRepository;
            _skillRepository = skillRepository;
        }
        public async Task<Project> CreateProjectAsync(CreateProjectRequest request)
        {
            var project = new Project
            {
                Title = request.Title,
                Description = request.Description
            };

            var existingSkills = await _skillRepository.GetByNamesAsync(request.Skills);

            foreach (var skillName in request.Skills)
            {
                var skill = existingSkills.FirstOrDefault(s =>
                    s.Name.Equals(skillName, StringComparison.OrdinalIgnoreCase));

                if (skill != null)
                {
                    project.Skills.Add(skill!);
                }
                else
                {
                    var newSkill = GetNewSkill(skillName);
                    project.Skills.Add(newSkill);
                }
            }

            await _projectRepository.AddAsync(project);
            await _projectRepository.SaveChangesAsync();

            return project;
        }

        private string Tratar

        private Skill GetNewSkill(string skillName)
        {
            var newSkill = new Skill
            {
                Name = skillName,
                IsVerified = false,
            };
            var newSkillAlias = new SkillAlias
            {
                Name = skillName
            };

            return newSkill;
        }
    }
}

