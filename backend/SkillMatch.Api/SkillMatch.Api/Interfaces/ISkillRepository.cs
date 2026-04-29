using SkillMatch.Api.Entities;

namespace SkillMatch.Api.Interfaces
{
    public interface ISkillRepository
    {
        Task<List<Skill>> GetByNamesAsync(IEnumerable<string> names);
    }
}
