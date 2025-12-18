using Cars.Application;
using Cars.Domain;
using Cars.Infrastructure;
using CarsWebApplication.Cars;
using CarsWebApplication.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// All controllers actions should be authorized
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CarValidator>();

// Ensure each endpoint is presented in lowercase
builder.Services.AddRouting(opt =>
{
    opt.LowercaseUrls = true;
});

// Adding db context
builder.Services.AddDbContext<DataContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Adding cors policy (to ensure that endpoints work properly with other services)
builder.Services.AddCors(opt =>
    opt.AddPolicy(
        "CorsPolicy",
        policy =>
            policy
                .AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins(["http://localhost:5105", "http://localhost:3000"])
    )
);

builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();

    // Creating the user manager
    var userManager = services.GetRequiredService<UserManager<AppUser>>();

    // Initializing all migrations
    await context.Database.MigrateAsync();

    // Seeding the database with proper parameters
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
}

app.Run();
