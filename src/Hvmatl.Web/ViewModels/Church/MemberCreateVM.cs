using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class MemberCreateVM
    {
        [Required(ErrorMessage = "Member Name is a required field.")]
        public string Name { get; set; }

        public string Title { get; set; }

        public string Image { get; set; }

        public string Phone { get; set; }

        public string EmailAddress { get; set; }

        public int? DepartmentID { get; set; }
    }
}
