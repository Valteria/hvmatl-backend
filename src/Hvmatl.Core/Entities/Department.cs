using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hvmatl.Core.Entities
{
    public class Department
    {
        [KeyAttribute]
        public int DepartmentID { get; set; }

        [Required(ErrorMessage = "Department Name is a required field.")]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        public string Acronym { get; set; }

        public ICollection<Member> Members { get; } = new List<Member>();
    }
}
