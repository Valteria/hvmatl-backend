using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hvmatl.Core.Entities
{
    public class Member
    {

        [KeyAttribute]
        public int MemberID { get; set; }

        [Required(ErrorMessage = "Email Address is a required field")]
        [Index(IsUnique = true)]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage = "Member Name is a required field.")]
        public string Name { get; set; }

        public string Title { get; set; }

        public string Image { get; set; }

        public string Phone { get; set; }

        //Foreign Key to Project
        public Department Department { get; set; }
        public int? DepartmentID { get; set; }
    }
}
