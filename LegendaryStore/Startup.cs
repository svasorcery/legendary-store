using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace LegendaryStore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                    .AddAuthentication(DevelopmentAuthentication.DevelopmentAuthenticationDefaults.AuthenticationScheme)
                    .AddDevelopment(
                        new DevelopmentUser
                        {
                            Username = "developer",
                            Password = "zxasqw12",
                            Roles = new string[] { "Developer", "Admin" },
                            Subject = "S-0-0-00-0000000000-0000000000-0000000000-0000"
                        },
                        new DevelopmentUser
                        {
                            Username = "customer",
                            Password = "cvdfer34",
                            Roles = new string[] { },
                            Subject = "S-0-0-00-0000000000-0000000000-0000000000-0000"
                        }
                    );

            services.AddAuthorization(options =>
            {
                options.AddPolicy("FullAccess", policy => policy.RequireRole("Developer"));
            });

            services.AddMvc();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddDbContext<DbContexts.StoreDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("LegendaryStoreDatabase")));

            services.AddScoped<Services.StoreDbService>();
            services.AddSingleton<Abstractions.IUserService, Services.DevelopmentUserService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
