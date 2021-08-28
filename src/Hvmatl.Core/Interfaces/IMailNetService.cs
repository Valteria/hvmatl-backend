using Hvmatl.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hvmatl.Core.Interfaces
{
    public interface IMailNetService
    {
        public Task SendEmail(MailRequest mailRequest);
    }
}
