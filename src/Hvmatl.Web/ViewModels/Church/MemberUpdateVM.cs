using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class MemberUpdateVM
    {
        [Required(ErrorMessage = "Member ID is a required field.")]
        public int MemberID { get; set; }

        public string EmailAddress { get; set; }

        public string Name { get; set; }

        public string Title { get; set; }

        public string Image { get; set; }

        public string Phone { get; set; }

    }
}
