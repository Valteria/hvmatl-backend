using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class AccountCreateVM
    {
        [Required(ErrorMessage = "Email Address is a required field.")]
        [DataType(DataType.EmailAddress)]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "Username is a required field.")]
        [Display(Name = "User Name")]
        public string Username { get; set; }
    }
}
