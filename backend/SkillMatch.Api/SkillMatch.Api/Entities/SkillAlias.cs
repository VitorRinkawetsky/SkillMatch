using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillMatch.Api.Entities
{
    public class SkillAlias
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } 

        public int SkillId { get; set; }

        [ForeignKey(nameof(SkillId))]
        public Skill Skill { get; set; }
    }
}
