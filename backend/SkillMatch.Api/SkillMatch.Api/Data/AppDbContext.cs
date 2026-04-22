using Microsoft.EntityFrameworkCore;
using SkillMatch.Api.Entities;

namespace SkillMatch.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { 
        }

        public DbSet<Project> Projects { get; set; }
    }
}
