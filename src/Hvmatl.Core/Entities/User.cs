using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hvmatl.Core.Entities
{
    public class User : IdentityUser<int>
    {
        [Required(ErrorMessage = "First Name is a required field.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is a required field.")]
        public string LastName { get; set; }

        public string Address {get; set;}

        public string City {get; set;}

        public string State {get; set;}

        public int ZipCode {get; set;}
        
        [Required(ErrorMessage = "Date Created is a required field.")]
        public DateTimeOffset DateCreated { get; set; }

        public DateTimeOffset LastOnline { get; set; }

        [Required(ErrorMessage = "User Account Enabled is a required field.")]
        public bool AccountEnabled { get; set; }
        
        [Required(ErrorMessage = "User Account Approved is a required field.")]
        public bool AccountApproved { get; set; }
    }
}
