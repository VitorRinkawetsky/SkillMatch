using Microsoft.EntityFrameworkCore;
using SkillMatch.Api.Entities;

namespace SkillMatch.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Project>()
                .HasMany(p => p.Skills)
                .WithMany(s => s.Projects)
                .UsingEntity(j => j.ToTable("ProjectSkills"));

            modelBuilder.Entity<SkillAlias>()
                .HasIndex(a => a.Name)
                .IsUnique();
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<SkillAlias> SkillAliases { get; set; }
    }
}
