using Hvmatl.Core.Helper;
using Hvmatl.Core.Interfaces;
using Hvmatl.Core.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Serilog;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace Hvmatl.Core.Services
{
    public class FtpService : IFtpService
    {
        private readonly FtpSettings _ftpSettings;
        private readonly ILogger _logger;

        public FtpService(IOptions<FtpSettings> ftpSettings, ILogger logger)
        {
            _ftpSettings = ftpSettings.Value;
            _logger = logger;
        }

        public async Task<(FtpWebResponse, string)> CreateFolder(string folderPath)
        {
            string requestUrl = string.Concat("ftp://", _ftpSettings.Host, folderPath);

            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(requestUrl);
                request.Method = WebRequestMethods.Ftp.MakeDirectory;
                request.Credentials = new NetworkCredential(_ftpSettings.User, _ftpSettings.Password);
                using (FtpWebResponse response = (FtpWebResponse)await request.GetResponseAsync())
                {
                    return (response, requestUrl);
                }
            }
            catch (WebException ex)
            {
                _logger.Error(ex.ToString());
                return ((FtpWebResponse)ex.Response, null);
            }
        }

        public async Task<(FtpWebResponse, string)> UploadFile(string folderPath, IFormFile file)
        {
            string requestUrl = string.Concat("ftp://", _ftpSettings.Host, folderPath, file.FileName);

            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(requestUrl);
                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.UseBinary = true;
                request.UsePassive = true;
                request.KeepAlive = true;
                request.Credentials = new NetworkCredential(_ftpSettings.User, _ftpSettings.Password);

                using (Stream ftpStream = await request.GetRequestStreamAsync())
                {
                    file.CopyTo(ftpStream);
                }

                using (FtpWebResponse response = (FtpWebResponse)await request.GetResponseAsync())
                {
                    return (response, requestUrl);
                }
            }
            catch (WebException ex)
            {
                _logger.Error(ex.ToString());
                return ((FtpWebResponse)ex.Response, null);
            }
        }

        public async Task<(FtpWebResponse, string)> UploadFile(string folderPath, IFormFile file, int height, int width)
        {
            string requestUrl = string.Concat("ftp://", _ftpSettings.Host, folderPath, file.FileName);

            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(requestUrl);
                request.Method = WebRequestMethods.Ftp.UploadFile;
                request.UseBinary = true;
                request.UsePassive = true;
                request.KeepAlive = true;
                request.Credentials = new NetworkCredential(_ftpSettings.User, _ftpSettings.Password);

                Image image;
                byte[] fileData;

                using (var fileStream = file.OpenReadStream())
                using (var output = new MemoryStream())
                using (image = Image.Load(fileStream))
                {
                    var encoder = ImageSharpResizer.GetEncoder(Path.GetExtension(file.FileName));
                    image.Mutate(x => x.Resize(height, width));
                    image.Save(output, encoder);
                    fileData = output.ToArray();
                    output.Position = 0;
                }

                using (Stream ftpStream = await request.GetRequestStreamAsync())
                {
                    ftpStream.Write(fileData, 0, fileData.Length);
                }

                using (FtpWebResponse response = (FtpWebResponse)await request.GetResponseAsync())
                {
                    return (response, requestUrl);
                }
            }
            catch (WebException ex)
            {
                _logger.Error(ex.ToString());
                return ((FtpWebResponse)ex.Response, null);
            }
        }

        public async Task<(FtpWebResponse, string)> DeleteFile(string folderPath, string fileName)
        {
            string requestUrl = string.Concat("ftp://", _ftpSettings.Host, folderPath, fileName);

            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(requestUrl);
                request.Method = WebRequestMethods.Ftp.DeleteFile;
                request.Credentials = new NetworkCredential(_ftpSettings.User, _ftpSettings.Password);

                using (FtpWebResponse response = (FtpWebResponse)await request.GetResponseAsync())
                {
                    return (response, requestUrl);
                }

                
            }
            catch (WebException ex)
            {
                _logger.Error(ex.ToString());
                return ((FtpWebResponse)ex.Response, null);
            }
        }

        
    }
}
