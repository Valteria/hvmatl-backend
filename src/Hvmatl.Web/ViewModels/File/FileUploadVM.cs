using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hvmatl.Web.ViewModels
{
    public class FileUploadVM
    {
        [Required(ErrorMessage = "File is a required field.")]
        public IFormFile File { get; set; }

        [Required(ErrorMessage = "Directory is a required field.")]
        public string Directory { get; set; }

        public int Height { get; set; } = 0;

        public int Width { get; set; } = 0;

    }
}
