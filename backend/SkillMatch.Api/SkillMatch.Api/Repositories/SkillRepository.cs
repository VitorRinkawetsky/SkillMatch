using Microsoft.EntityFrameworkCore;
using SkillMatch.Api.Data;
using SkillMatch.Api.Entities;
using SkillMatch.Api.Interfaces;

namespace SkillMatch.Api.Repositories
{
    public class SkillRepository : ISkillRepository
    {
        private readonly AppDbContext _context;
        public SkillRepository(AppDbContext context) 
        {
            _context = context;
        }

        public async Task<List<Skill>> GetByNamesAsync(IEnumerable<string> names)
        {
            return await _context.Skills
                .Where(s => names.Contains(s.Name))
                .ToListAsync();
        }
    }
}
