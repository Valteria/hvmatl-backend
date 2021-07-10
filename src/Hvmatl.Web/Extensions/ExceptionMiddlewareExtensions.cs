using Hvmatl.Core.Entities;
using Hvmatl.Core.Helper;
using Hvmatl.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Hvmatl.Web.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app, ILogger logger)
        {
            app.UseExceptionHandler(appError => 
            { 
                appError.Run(async context => 
                { 
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; 
                    context.Response.ContentType = "application/json"; 
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>(); 
                    if (contextFeature != null) 
                    { 
                        logger.Error($"Something went wrong: {contextFeature.Error}"); 
                        await context.Response.WriteAsync(new 
                        { 
                            StatusCode = context.Response.StatusCode, 
                            Message = "Internal Server Error." 
                        }.ToString()); 
                    } 
                }); 
            });
        }
    }
}
