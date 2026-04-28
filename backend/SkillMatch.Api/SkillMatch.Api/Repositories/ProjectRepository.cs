using SkillMatch.Api.Data;
using SkillMatch.Api.Entities;
using SkillMatch.Api.Interfaces;

namespace SkillMatch.Api.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _context;
        public ProjectRepository(AppDbContext context) 
        {
            _context = context;
        }

        public async Task AddAsync(Project project)
        {
            await _context.AddAsync(project);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
