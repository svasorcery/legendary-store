using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
                    .AddDevelopment(new DevelopmentUser
                    {
                        Username = "developer",
                        Password = "zxasqw12",
                        Roles = new string[] { "IT" },
                        Subject = "S-0-0-00-0000000000-0000000000-0000000000-0000"
                    });

            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("DevelopmentAccess", policy => policy.RequireRole("Developer"));
            //});

            services.AddMvc();
            
            services.AddDbContext<DbContexts.StoreDbContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("LegendaryStoreDatabase")));

            services.AddScoped<Services.StoreDbService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
