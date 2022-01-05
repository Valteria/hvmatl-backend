using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class FileDeleteVM
    {
        [Required(ErrorMessage = "Directory is a required field.")]
        public string Directory { get; set; }
        [Required(ErrorMessage = "FileName is a required field.")]
        public string FileName { get; set; }
    }
}
