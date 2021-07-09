using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class DepartmentCreateVM
    {
        [Required(ErrorMessage = "Department Name is a required field.")]
        public string Name { get; set; }

        public string Acronym { get; set; }

    }
}
