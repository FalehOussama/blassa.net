using BlassaApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins(
                                                "https://kind-water-0666b6e03.4.azurestaticapps.net",
                                                "https://blassa-cov.tn",
                                                "http://localhost:8100",
                                                "http://localhost:8101")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      });
});

// Add services to the container.
builder.Services.AddDbContext<BlassaContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString(
        builder.Environment.IsDevelopment() ? "BlassaContextDev" : "BlassaContextProd")));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

try
{
    using (var serviceScope = app.Services?.GetService<IServiceScopeFactory>()?.CreateScope())
    {
        var context = serviceScope?.ServiceProvider.GetRequiredService<BlassaContext>();
        context?.Database.Migrate();
    }
}
catch (Exception ex)
{ 
}



app.Run();
