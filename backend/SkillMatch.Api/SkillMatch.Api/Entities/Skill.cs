using System.ComponentModel.DataAnnotations;

namespace SkillMatch.Api.Entities
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public bool IsVerified { get; set; } = false;

        public ICollection<SkillAlias> Aliases { get; set; } = new List<SkillAlias>();
    }
}
