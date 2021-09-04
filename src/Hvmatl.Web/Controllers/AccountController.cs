using AutoMapper;
using Hvmatl.Core.Entities;
using Hvmatl.Core.Helper;
using Hvmatl.Core.Interfaces;
using Hvmatl.Core.Models;
using Hvmatl.Infrastructure.Data;
using Hvmatl.Web.DateTransferObjects;
using Hvmatl.Web.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("[action]")]
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
