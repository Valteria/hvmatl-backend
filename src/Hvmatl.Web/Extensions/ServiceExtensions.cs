using AutoMapper;
using Hvmatl.Core.Entities;
using Hvmatl.Core.Helper;
using Hvmatl.Core.Interfaces;
using Hvmatl.Core.Services;
using Hvmatl.Infrastructure.Data;
using Hvmatl.Web.Profiles;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Hvmatl.Web.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureSPA(this IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "WebApp/build";
            });
        }

        public static void ConfigureDatabase(this IServiceCollection services, string dbConnectionString)
        {
            services.AddEntityFrameworkNpgsql()
                .AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(dbConnectionString,
            x => x.MigrationsAssembly("Hvmatl.Infrastructure")));
        }

        public static void ConfigureIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.User.RequireUniqueEmail = true;
                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireLoggedIn", policy => policy.RequireRole("Admin", "User").RequireAuthenticatedUser());
                options.AddPolicy("RequireAdministratorRole", policy => policy.RequireRole("Admin").RequireAuthenticatedUser());
            });

            services.AddAuthentication();
            
        }

        public static void ConfigureJWT(this IServiceCollection services, IConfigurationSection jwtConfiguration)
        {

            services.Configure<JwtSettings>(jwtConfiguration);

            // Authentication Middleware
            services.AddAuthentication(o =>
            {
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    //Validate Issuer is the actual server that created the token
                    ValidateIssuer = true,
                    //Validate the receiver of the token is a valid recipient
                    ValidateAudience = true,
                    //Validate the token has not expired
                    ValidateLifetime = true,
                    //Validate the signing key is valid and is trusted by the server
                    ValidateIssuerSigningKey = true,
                
                    ValidIssuer = jwtConfiguration.GetSection("Issuer").Value,
                    ValidAudience = jwtConfiguration.GetSection("Audience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtConfiguration.GetSection("Secret").Value)
                    )
                };
            });
        }

        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                    builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });
        }

        public static void ConfigureLogger(this IServiceCollection services)
        {
            services.AddSingleton(Log.Logger);
        }

        public static void ConfigureMailService(this IServiceCollection services, IConfiguration emailConfiguration)
        {
            services.Configure<EmailSettings>(emailConfiguration);
            services.AddTransient<IMailNetService, MailNetService>();
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()
                .Where(x => x.FullName?
                    .Contains("Hvmatl.Web") ?? false)
                );
        }

        public static void ConfigureFtpService(this IServiceCollection services, IConfiguration ftpConfiguration) 
        {
            services.Configure<FtpSettings>(ftpConfiguration);
            services.AddTransient<IFtpService, FtpService>();
        }
    }
}
