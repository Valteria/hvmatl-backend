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
        [Required(ErrorMessage = "User Date Created is a required field.")]
        public DateTimeOffset DateCreated { get; set; }
    }
}
