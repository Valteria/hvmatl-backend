using Hvmatl.Core.Entities;
using Hvmatl.Core.Helper;
using Hvmatl.Web.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hvmatl.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;
        private readonly SignInManager<User> _signManager;
        private readonly UserManager<User> _userManager;

        public AuthenticationController(IOptions<JwtSettings> jwtSettings, SignInManager<User> signManager, UserManager<User> userManager)
        {
            _jwtSettings = jwtSettings.Value;
            _signManager = signManager;
            _userManager = userManager;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromForm] AuthenticationLoginVM formdata)
        {

            // Get The User
            var user = await _userManager.FindByNameAsync(formdata.Username);

            // Get The User Role
            //var roles = await _userManager.GetRolesAsync(user);

            // Generate Key Token
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtSettings.Secret));

            // Generate Expiration Time For Token
            double tokenExpiryTime = Convert.ToDouble(_jwtSettings.ExpireTime);

            // Check Login Status
            if (user != null && await _userManager.CheckPasswordAsync(user, formdata.Password))
            {
                // Create JWT Token Handler
                var tokenHandler = new JwtSecurityTokenHandler();

                // Create Token Descriptor
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, formdata.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        //new Claim(ClaimTypes.Role, roles.FirstOrDefault()),
                        new Claim("LoggedOn", DateTime.Now.ToString())
                    }),

                    SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature),
                    Issuer = _jwtSettings.Issuer,
                    Audience = _jwtSettings.Audience,
                    Expires = DateTime.UtcNow.AddMinutes(tokenExpiryTime)
                };

                // Create Token
                var token = tokenHandler.CreateToken(tokenDescriptor);

                // Return OK Request
                return Ok(new
                {
                    result = user,
                    token = tokenHandler.WriteToken(token),
                    expiration = token.ValidTo,
                    message = "Login Successful"
                });

            }
            else
            {

                ModelState.AddModelError("", "Username/Password was not found");

                // Return Unauthorized Status If Unable To Login
                return Unauthorized(new
                {
                    LoginError = "Please Check the Login Creddentials - Invalid Username/Password was entered"
                });
            }
        }
    }
}
