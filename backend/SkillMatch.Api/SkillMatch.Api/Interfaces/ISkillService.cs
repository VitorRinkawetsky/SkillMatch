using SkillMatch.Api.DTOs;
using SkillMatch.Api.Entities;

namespace SkillMatch.Api.Interfaces
{
    public interface ISkillService
    {
        Task<Skill> CreateProjectAsync(CreateSkillRequest request);
    }
}
