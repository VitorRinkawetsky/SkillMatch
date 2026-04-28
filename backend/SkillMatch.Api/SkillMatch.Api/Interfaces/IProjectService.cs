using SkillMatch.Api.DTOs;
using SkillMatch.Api.Entities;

namespace SkillMatch.Api.Interfaces
{
    public interface IProjectService
    {
        Task<Project> CreateProjectAsync(CreateProjectRequest request);
    }
}
