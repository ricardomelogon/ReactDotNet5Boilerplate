using System.Threading.Tasks;
using API.Data.Entities;
using API.Dtos;

namespace API.Services
{
    public partial interface IEmailConfigService
    {
        Task<EmailConfigDto> GetConfiguration();

        Task<EmailConfig> GetById(int id);

        Task Update(EmailConfigDto model);

        Task<EmailAccount> GetDefaultSender();

        Task<EmailAccount> GetDefaultReceiver();
    }
}