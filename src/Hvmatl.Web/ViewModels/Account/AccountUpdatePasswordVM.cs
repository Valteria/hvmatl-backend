using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class AccountUpdatePasswordVM
    {
        [Required(ErrorMessage = "Username is a required field.")]
        [Display(Name = "User Name")]
        public string Username { get; set; }
        
        [Required(ErrorMessage = "Token is a required field.")]
        [Display(Name = "Token")]
        public string Token { get; set; }

        [Required(ErrorMessage = "Password is a required field.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
