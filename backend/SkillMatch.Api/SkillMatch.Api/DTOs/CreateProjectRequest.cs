namespace SkillMatch.Api.DTOs
{
    public class CreateProjectRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public List<string> Skills { get; set; }
    }
}
