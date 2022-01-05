using Hvmatl.Web.ViewModels;
using System.Threading.Tasks;

namespace Hvmatl.Web.Interface
{
    public interface IAuthenticationManager
    {
        Task<bool> ValidateUser(AuthenticationLoginVM userForAuth);
        Task<string> CreateToken();
    }
}
