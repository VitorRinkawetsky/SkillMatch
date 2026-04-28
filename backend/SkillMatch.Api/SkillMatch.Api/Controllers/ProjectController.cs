using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkillMatch.Api.DTOs;
using SkillMatch.Api.Interfaces;

namespace SkillMatch.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var createdProject = await _projectService.CreateProjectAsync(request);

                return StatusCode(201, new
                {
                    Message = "Projeto criado com sucesso!",
                    ProjectId = createdProject.Id
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Ocorreu um erro interno ao criar o projeto." });
            }
        }
    }
}
