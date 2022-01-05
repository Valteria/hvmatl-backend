using AutoMapper;
using Hvmatl.Core.Entities;
using Hvmatl.Core.Helper;
using Hvmatl.Core.Interfaces;
using Hvmatl.Core.Models;
using Hvmatl.Infrastructure.Data;
using Hvmatl.Web.DateTransferObjects;
using Hvmatl.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Serilog;
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
    public class AccountController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _dbContext;
        private readonly IMailNetService _mailNetService;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;

        public AccountController(IOptions<JwtSettings> jwtSettings, UserManager<User> userManager, ApplicationDbContext dbContext, IMailNetService mailNetService, ILogger logger, IMapper mapper)
        {
            _jwtSettings = jwtSettings.Value;
            _userManager = userManager;
            _dbContext = dbContext;
            _mailNetService = mailNetService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost("[action]"), Authorize]
        public async Task<IActionResult> Create([FromForm] AccountCreateVM formdata)
        {

            // Hold Error List
            List<string> errorList = new List<string>();

            // Create User Object
            var user = new User
            {
                Email = formdata.EmailAddress,
                UserName = formdata.Username,
                DateCreated = DateTimeOffset.UtcNow,
                SecurityStamp = Guid.NewGuid().ToString(),
                AccountApproved = true,
                AccountEnabled = true
            };

            // Generate Key Token
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_jwtSettings.Secret));

            // Generate Expiration Time For Token
            double tokenExpiryTime = Convert.ToDouble(_jwtSettings.ExpireTime);

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
            

            var token2 = tokenHandler.WriteToken(token);

            // Add User To Database
            var result = await _userManager.CreateAsync(user, token2);

            // If Successfully Created
            if (result.Succeeded)
            {
                // Add Role To User
                await _userManager.AddToRoleAsync(user, "User");

                var userDto = _mapper.Map<UserDto>(user);
                _logger.Information("Account Created: " + userDto.ToString());

                MailRequest mailRequest = new MailRequest
                {
                    RecipientEmail = user.Email,
                    RecipientName = user.UserName,
                    Subject = "Registration Successful",
                    Body = "An account has been created for you, to fully activated it click the link below to activate your account and create a new password for your account \n" + 
                    "https://localhost:5001/activate?token=" + token2 + "&username=" + formdata.Username,

                };

                await _mailNetService.SendEmail(mailRequest);

                // Return Ok Request
                return Ok(new
                {
                    result = userDto,
                    message = "Account Created, Registration Pending"
                });
            }
            else
            {
                // Add Error To ErrorList
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                    errorList.Add(error.Description);
                }
            }

            // Return Bad Request Status With ErrorList
            return BadRequest(new { message = errorList });
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdatePassword([FromForm] AccountUpdatePasswordVM formdata)
        {

            // Get The User
            var user = await _userManager.FindByNameAsync(formdata.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, formdata.Token))
            {
                var newPassword = _userManager.PasswordHasher.HashPassword(user,formdata.Password);
                user.PasswordHash = newPassword;

                var res = await _userManager.UpdateAsync(user);

                // Return OK Request
                return Ok(new
                {
                    result = user,
                    message = "Password Update Successfully"
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

        [HttpPost("[action]")]
        public async Task<IActionResult> Register([FromForm] AccountRegisterVM formdata)
        {

            // Hold Error List
            List<string> errorList = new List<string>();

            // Create User Object
            var user = new User
            {
                Email = formdata.EmailAddress,
                UserName = formdata.Username,
                DateCreated = DateTimeOffset.UtcNow,
                SecurityStamp = Guid.NewGuid().ToString(),
                AccountApproved = false,
                AccountEnabled = false
            };

            // Add User To Database
            var result = await _userManager.CreateAsync(user, formdata.Password);

            // If Successfully Created
            if (result.Succeeded)
            {
                // Add Role To User
                await _userManager.AddToRoleAsync(user, "User");

                var userDto = _mapper.Map<UserDto>(user);
                _logger.Information("Account Created: " + userDto.ToString());

                MailRequest mailRequest = new MailRequest
                {
                    RecipientEmail = user.Email,
                    RecipientName = user.UserName,
                    Subject = "Registration Successful",
                    Body = "Your account has been successfully registered. Before you can access " +
                    "this account you account needs to be approved. Please wait up to 24 hours or call this number xxx-xxxx-xxxx",

                };

                await _mailNetService.SendEmail(mailRequest);

                // Return Ok Request
                return Ok(new
                {
                    result = userDto,
                    message = "Registration Successful, Approval Pending"
                });
            }
            else
            {
                // Add Error To ErrorList
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                    errorList.Add(error.Description);
                }
            }

            // Return Bad Request Status With ErrorList
            return BadRequest(new { message = errorList });
        }


        [HttpPut("[action]")]
        public IActionResult Approve([FromForm] AccountEnableVM formdata)
        {

            // Find User
            var user = _dbContext.Users
                .SingleOrDefault(u => u.Id == formdata.AccountID);

            if (user == null) return NotFound(new { message = "User Not Found" });


            user.AccountApproved = true;

            var userDto = _mapper.Map<UserDto>(user);
            _logger.Information("Updated Account: " + userDto.ToString());

            MailRequest mailRequest = new MailRequest
            {
                RecipientEmail = user.Email,
                RecipientName = user.UserName,
                Subject = "Account Approved",
                Body = "Your account has approved",
            };

            _mailNetService.SendEmail(mailRequest);


            // Return Bad Request Status With ErrorList
            return Ok(new
            {
                result = userDto,
                message = "Account Approved"
            });
        }

        [HttpPut("[action]")]
        public IActionResult Enable([FromForm] AccountEnableVM formdata)
        {

            // Find User
            var user = _dbContext.Users
                .SingleOrDefault(u => u.Id == formdata.AccountID);

            if (user == null) return NotFound(new { message = "User Not Found" });


            user.AccountEnabled = true;

            var userDto = _mapper.Map<UserDto>(user);
            _logger.Information("Updated Account: " + userDto.ToString());

            MailRequest mailRequest = new MailRequest
            {
                RecipientEmail = user.Email,
                RecipientName = user.UserName,
                Subject = "Account Approved",
                Body = "Your account has enabled",
            };

            _mailNetService.SendEmail(mailRequest);


            // Return Bad Request Status With ErrorList
            return Ok(new
            {
                result = userDto,
                message = "Account Enabled"
            });
        }

        [HttpPut("[action]")]
        public IActionResult Disable([FromForm] AccountEnableVM formdata)
        {

            // Find User
            var user = _dbContext.Users
                .SingleOrDefault(u => u.Id == formdata.AccountID);

            if (user == null) return NotFound(new { message = "User Not Found" });


            user.AccountEnabled = false;

            var userDto = _mapper.Map<UserDto>(user);
            _logger.Information("Updated Account: " + userDto.ToString());


            // Return Bad Request Status With ErrorList
            return Ok(new
            {
                result = userDto,
                message = "Account Disabled"
            });
        }

        [HttpGet("[action]"), Authorize]
        public IActionResult GetUserList()
        {
            // Query All User Into A List
            var users = _dbContext.Users
                .ToList();

            return Ok(new
            {
                result = users,
                message = "Recieved User List"
            });
        }

    }
}
