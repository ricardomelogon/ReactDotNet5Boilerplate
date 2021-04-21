using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Dtos;
using Z.EntityFramework.Plus;
using System.Collections.Generic;

namespace API.Services
{
    public partial class EmailConfigService : IEmailConfigService
    {
        private readonly DataContext db;
        private readonly IErrorLogService errorLogService;

        public EmailConfigService(DataContext context, IErrorLogService errorLogService)
        {
            this.db = context;
            this.errorLogService = errorLogService;
        }

        public async Task<EmailConfig> GetById(int id)
        {
            try
            {
                return await db.EmailConfigs.Where(m => m.Id == id).FirstOrDefaultAsync();
            }
            catch (Exception e)
            {
                if (!await errorLogService.InsertException(e)) throw;
                return null;
            }
        }

        public async Task Update(EmailConfigDto model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.Sender.Email) || string.IsNullOrWhiteSpace(model.Sender.Host) || string.IsNullOrWhiteSpace(model.Sender.Username) || string.IsNullOrWhiteSpace(model.Receiver.Email) || string.IsNullOrWhiteSpace(model.Receiver.Host) || string.IsNullOrWhiteSpace(model.Receiver.Username)) throw new Exception("One or more required fields are missing");
                Dictionary<int, EmailConfig> Configs = (await db.EmailConfigs.Where(q => q.Id == model.Sender.Id || q.Id == model.Receiver.Id).ToListAsync()).ToDictionary(a => a.Id);
                if (Configs == null || Configs.Count != 2) throw new Exception("Email config not found");

                if (!string.IsNullOrWhiteSpace(model.Sender.Password)) Configs[model.Sender.Id].Password = model.Sender.Password;
                Configs[model.Sender.Id].DisplayName = model.Sender.DisplayName;
                Configs[model.Sender.Id].Email = model.Sender.Email;
                Configs[model.Sender.Id].Host = model.Sender.Host;
                Configs[model.Sender.Id].Port = model.Sender.Port;
                Configs[model.Sender.Id].UserName = model.Sender.Username;
                Configs[model.Sender.Id].EnableSSL = model.Sender.EnableSsl;

                if (!string.IsNullOrWhiteSpace(model.Receiver.Password)) Configs[model.Receiver.Id].Password = model.Receiver.Password;
                Configs[model.Receiver.Id].DisplayName = model.Receiver.DisplayName;
                Configs[model.Receiver.Id].Email = model.Receiver.Email;
                Configs[model.Receiver.Id].Host = model.Receiver.Host;
                Configs[model.Receiver.Id].Port = model.Receiver.Port;
                Configs[model.Receiver.Id].UserName = model.Receiver.Username;
                Configs[model.Receiver.Id].EnableSSL = model.Receiver.EnableSsl;
                await db.SaveChangesAsync();
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<EmailAccount> GetDefaultSender()
        {
            try
            {
                EmailConfig emailconfig = await db.EmailConfigs.Where(i => i.IsDefaultSender == true).FirstOrDefaultAsync();
                EmailAccount emailAccount = new EmailAccount();

                if (emailconfig != null)
                {
                    emailAccount.Id = emailconfig.Id;
                    emailAccount.DisplayName = emailconfig.DisplayName;
                    emailAccount.Email = emailconfig.Email;
                    emailAccount.Password = emailconfig.Password;
                    emailAccount.Host = emailconfig.Host;
                    emailAccount.Port = emailconfig.Port;
                    emailAccount.Username = emailconfig.UserName;
                    emailAccount.EnableSsl= emailconfig.EnableSSL;
                }

                return emailAccount;
            }
            catch (Exception e)
            {
                if (!await errorLogService.InsertException(e)) throw;
                return null;
            }
        }

        public async Task<EmailAccount> GetDefaultReceiver()
        {
            try
            {
                EmailConfig emailconfig = await db.EmailConfigs.Where(i => i.Active.HasValue && i.Active.Value && i.IsDefaultReceiver).FirstOrDefaultAsync();
                if (emailconfig == null) return null;
                EmailAccount emailAccount = new EmailAccount();

                if (emailconfig != null)
                {
                    emailAccount.Id = emailconfig.Id;
                    emailAccount.DisplayName = emailconfig.DisplayName;
                    emailAccount.Email = emailconfig.Email;
                    emailAccount.Password = emailconfig.Password;
                    emailAccount.Host = emailconfig.Host;
                    emailAccount.Port = emailconfig.Port;
                    emailAccount.Username = emailconfig.UserName;
                    emailAccount.EnableSsl = emailconfig.EnableSSL;
                }

                return emailAccount;
            }
            catch (Exception e)
            {
                if (!await errorLogService.InsertException(e)) throw;
                return null;
            }
        }

        public async Task<EmailConfigDto> GetConfiguration()
        {
            try
            {
                QueryFutureValue<EmailConfigItemDto> Sender_F = db.EmailConfigs.Where(a => a.IsDefaultSender).Select(a => new EmailConfigItemDto
                {
                    DisplayName = a.DisplayName,
                    Email = a.Email,
                    EnableSsl = a.EnableSSL,
                    Host = a.Host,
                    Id = a.Id,
                    Port = a.Port,
                    Username = a.UserName,
                    Password = ""
                }).DeferredSingleOrDefault().FutureValue();
                QueryFutureValue<EmailConfigItemDto> Receiver_F = db.EmailConfigs.Where(a => a.IsDefaultReceiver).Select(a => new EmailConfigItemDto
                {
                    DisplayName = a.DisplayName,
                    Email = a.Email,
                    EnableSsl = a.EnableSSL,
                    Host = a.Host,
                    Id = a.Id,
                    Port = a.Port,
                    Username = a.UserName,
                    Password = ""
                }).DeferredSingleOrDefault().FutureValue();

                return new EmailConfigDto
                {
                    Receiver = await Receiver_F.ValueAsync(),
                    Sender = await Sender_F.ValueAsync()
                };
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e); throw;
            }
        }
    }
}