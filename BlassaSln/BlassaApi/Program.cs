using BlassaApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_blassaOrigins";

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//                      policy =>
//                      {
//                          policy.WithOrigins(
//                                                "https://kind-water-0666b6e03.4.azurestaticapps.net",
//                                                "https://blassa-cov.tn",
//                                                "http://localhost:8100",
//                                                "http://localhost:8101")
//                          .SetIsOriginAllowedToAllowWildcardSubdomains()
//                          .AllowAnyHeader()
//                          .AllowCredentials()
//                          .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS")
//                          .SetPreflightMaxAge(TimeSpan.FromSeconds(3600));
//                      });
//});

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

//app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseSwagger();
app.UseSwaggerUI();

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
