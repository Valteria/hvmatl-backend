using Hvmatl.Core.Helper;
using Hvmatl.Core.Interfaces;
using Hvmatl.Core.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

namespace Hvmatl.Core.Services
{
    public class MailNetService : IMailNetService
    {
        private readonly EmailSettings _emailSettings;
        public MailNetService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public async Task SendEmail(MailRequest mailRequest)
        {
            MimeMessage email = new MimeMessage();

            email.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
            email.To.Add(new MailboxAddress(mailRequest.RecipientName, mailRequest.RecipientEmail));
            email.Subject = mailRequest.Subject;

            email.Body = new TextPart(TextFormat.Text) { Text = mailRequest.Body };
            email.Body = new TextPart(TextFormat.Html) { Text = mailRequest.Body };

            using (var smtp = new SmtpClient())
            {
                smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await smtp.ConnectAsync(_emailSettings.Server, _emailSettings.Port, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }
        }
    }
}
