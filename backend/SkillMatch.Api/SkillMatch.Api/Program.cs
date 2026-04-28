using Microsoft.EntityFrameworkCore;
using SkillMatch.Api.Data;
using SkillMatch.Api.Interfaces;
using SkillMatch.Api.Repositories;
using SkillMatch.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

//Repository
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();

//Service
builder.Services.AddScoped<IProjectService, ProjectService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
