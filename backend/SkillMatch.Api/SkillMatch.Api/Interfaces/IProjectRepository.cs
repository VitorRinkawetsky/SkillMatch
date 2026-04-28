using SkillMatch.Api.Entities;

namespace SkillMatch.Api.Interfaces
{
    public interface IProjectRepository
    {
        Task AddAsync(Project project);
        Task SaveChangesAsync();
    }
}
