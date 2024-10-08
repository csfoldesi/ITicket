using API.Extensions;
using Application;
using Infrastructure;
using Persistence;

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
    try
    {
        var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
        await PersistenceHelper.MigrateAsync(dataContext);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured durign migration");
    }
}

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
