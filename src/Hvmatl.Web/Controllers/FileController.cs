using AutoMapper;
using Hvmatl.Core.Entities;
using Hvmatl.Core.Helper;
using Hvmatl.Core.Interfaces;
using Hvmatl.Core.Models;
using Hvmatl.Infrastructure.Data;
using Hvmatl.Web.DateTransferObjects;
using Hvmatl.Web.Extensions;
using Hvmatl.Web.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Hvmatl.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFtpService _ftpService;

        public FileController(IFtpService ftpService)
        {
            _ftpService = ftpService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateFolder([FromBody] String path)
        {

            (FtpWebResponse response, string responseString) result = await _ftpService.CreateFolder(path);

            if (result.responseString == null)
                return StatusCode((int)result.response.StatusCode, result.response.StatusDescription);

            return Ok(result.responseString);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UploadFile([FromForm] FileUploadVM formdata)
        {
            (FtpWebResponse response, string responseString) result;
            if (formdata.File.IsImage() && formdata.Height != 0 && formdata.Width != 0)
                result = await _ftpService.UploadFile(formdata.Directory, formdata.File, formdata.Height, formdata.Width);
            else
                result = await _ftpService.UploadFile(formdata.Directory, formdata.File);

            if (result.responseString == null)
                return StatusCode((int)result.response.StatusCode, result.response.StatusDescription);

            return Ok(result.responseString);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> DeleteFile([FromForm] FileDeleteVM formdata)
        {
            (FtpWebResponse response, string responseString) result = await _ftpService.DeleteFile(formdata.Directory, formdata.FileName);

            if (result.responseString == null)
                return StatusCode((int)result.response.StatusCode, result.response.StatusDescription);

            return Ok(result.responseString);
        }
    }
}
