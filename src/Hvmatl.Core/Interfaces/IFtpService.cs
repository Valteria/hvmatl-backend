using Hvmatl.Core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Hvmatl.Core.Interfaces
{
    public interface IFtpService
    {
        public Task<(FtpWebResponse, string)> CreateFolder(string folderPath);
        public Task<(FtpWebResponse, string)> UploadFile(string folderPath, IFormFile file);
        public Task<(FtpWebResponse, string)> UploadFile(string folderPath, IFormFile file, int height, int width);
        public Task<(FtpWebResponse, string)> DeleteFile(string folderPath, string fileName);
    }
}
