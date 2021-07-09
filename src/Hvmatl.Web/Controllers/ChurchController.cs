using Hvmatl.Core.Entities;
using Hvmatl.Core.Helper;
using Hvmatl.Infrastructure.Data;
using Hvmatl.Web.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hvmatl.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChurchController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ChurchController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateMember([FromForm] MemberCreateVM formdata)
        {
            // Check if Member Exist
            var member = _dbContext.Member
                .SingleOrDefault(m => m.Name == formdata.Name);

            if (member != null) return Conflict(new { message = "Member Already Exist" });

            // Create Member
            var newMember = new Member
            {
                Name = formdata.Name,
                Title = formdata.Title,
                Image = formdata.Image,
                Phone = formdata.Phone,
                EmailAddress = formdata.EmailAddress,
            };

            // Add Department if exist
            if (formdata.DepartmentID != null) {
                // Check if Member Exist
                var department = _dbContext.Department
                    .SingleOrDefault(d => d.DepartmentID == formdata.DepartmentID);

                if (department == null) return NotFound(new { message = "Department Does Not Exist" });

                newMember.DepartmentID = formdata.DepartmentID;
            }

            // Add Project And Save Change
            await _dbContext.Member.AddAsync(newMember);
            await _dbContext.SaveChangesAsync();

            // Return Ok Request
            return Ok(new
            {
                result = newMember,
                message = "Member Successfully Created"
            });
        }

        [HttpGet("[action]")]
        public IActionResult GetMember([FromQuery(Name = "id")] int? id, [FromQuery(Name = "emailAddress")] string emailAddress)
        {
            // Find Member by either id or emailAddress
            var member = _dbContext.Member
                .SingleOrDefault(u => (id != null && u.MemberID == id) || (emailAddress != null && u.EmailAddress == emailAddress));

            if (member == null) return NotFound(new { message = "Member Not Found" });

            // Return Ok Request
            return Ok(new
            {
                result = member,
                message = "Recieved Member"
            });
        }

        [HttpGet("[action]")]
        public IActionResult GetMemberList()
        {
            // Find Member
            var member = _dbContext.Member
                .Include(m => m.Department)
                .ToList();

            if (member.Count == 0) return NotFound(new { message = "No Member Found" });

            // Return Ok Request
            return Ok(new
            {
                result = member,
                message = "Recieved Member List"
            });
        }

        [HttpPut("[action]")]
        public IActionResult UpdateMember([FromForm] MemberUpdateVM formdata)
        {
            // Find Member by either id or emailAddress
            var member = _dbContext.Member
                .SingleOrDefault(u => (u.MemberID == formdata.MemberID));

            if (member == null) return NotFound(new { message = "Member Not Found" });

            if (formdata.Name != null)
                member.Name = formdata.Name;
            if (formdata.Title != null)
                member.Title = formdata.Title;
            if (formdata.Image != null)
                member.Image = formdata.Image;
            if (formdata.Phone != null)
                member.Phone = formdata.Phone;

            // Find Member by emailAddress
            var newEmailAddress = _dbContext.Member
                .SingleOrDefault(u => (u.EmailAddress == formdata.EmailAddress));

            // Check if emailAddress is taken
            if (newEmailAddress == null || (newEmailAddress != null && newEmailAddress.MemberID == formdata.MemberID))
            {
                member.EmailAddress = formdata.EmailAddress;
            }
            else { 
                return Conflict(new { message = "Email Address is already Taken"});
            }

            // Save Change
            _dbContext.SaveChanges();

            // Return Ok Request
            return Ok(new
            {
                result = member,
                message = "Updated Member"
            });
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteMember([FromRoute] int id)
        {
            // Find Member by either id or emailAddress
            var member = _dbContext.Member
                .SingleOrDefault(u => (u.MemberID == id));

            if (member == null) return NotFound(new { message = "Member Not Found" });

            // Remove Project
            _dbContext.Member.Remove(member);

            // Save Change
            _dbContext.SaveChanges();

            // Return Ok Request
            return Ok(new
            {
                result = member,
                message = "Deleted Member"
            });
        }


        /*
       * Type : POST
       * URL : /api/project/createproject
       * Param : ProjectViewModel
       * Description: Create Project
       */
        [HttpPost("[action]")]
        public async Task<IActionResult> CreateDepartment([FromForm] DepartmentCreateVM formdata)
        {
            // Check if Department Exist
            var department = _dbContext.Department
                .SingleOrDefault(d => d.Name == formdata.Name);

            if (department != null) return Conflict(new { message = "Department Already Exist" });

            // Create Project
            var newDepartment = new Department
            {
                Name = formdata.Name,
                Acronym = formdata.Acronym
            };

            // Add Project And Save Change
            await _dbContext.Department.AddAsync(newDepartment);
            await _dbContext.SaveChangesAsync();

            // Return Ok Request
            return Ok(new
            {
                result = newDepartment,
                message = "Department Successfully Created"
            });
        }

        [HttpGet("[action]")]
        public IActionResult GetDepartment([FromQuery(Name = "id")] int? id, [FromQuery(Name = "name")] string name)
        {
            // Find Department by either id or name
            var department = _dbContext.Department
                .Include(m => m.Members)
                .ToList()
                .Where(d => (id != null && d.DepartmentID == id) || (name != null && d.Name == name));

            if (department == null) return NotFound(new { message = "Department Not Found" });

            // Return Ok Request
            return Ok(new
            {
                result = department,
                message = "Recieved Member"
            });
        }

        [HttpGet("[action]")]
        public IActionResult GetDepartmentList()
        {
            // Find Department by either id or name
            var department = _dbContext.Department
                .Include(m => m.Members)
                .ToList();

            if (department.Count == 0) return NotFound(new { message = "No Department Found" });

            // Return Ok Request
            return Ok(new
            {
                result = department,
                message = "Recieved Member"
            });
        }

    }
}
