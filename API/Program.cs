using API.Extensions;
using API.Middleware;
using Application;
using Infrastructure.Identity;
using Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAPIServices(builder.Configuration);

//builder.Services.AddIdentityServices();
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddInfrastructureServices();
builder.Services.AddApplicationServices();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    /*try
    {
        var dataContext = services.GetRequiredService<DataContext>();
        await PersistenceHelper.MigrateAsync(dataContext);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured durign migration");
    }*/
    await services.GetRequiredService<DataContext>().Database.MigrateAsync();
    await DefaultData.SeedAsync(services.GetRequiredService<DataContext>());
    await Seeds.SeedRolesAsync(services.GetRequiredService<RoleManager<IdentityRole>>());
}

app.UseMiddleware<ErrorHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
