using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class AccountEnableVM
    {
        [Required(ErrorMessage = "Account ID is a required field.")]
        public int AccountID { get; set; }

    }
}
