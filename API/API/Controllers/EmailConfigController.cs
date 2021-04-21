using API.Authorization;
using API.Data.Entities;
using API.Dtos;
using API.Services;
using API.Support;
using API.Support.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EmailConfigController : Controller
    {
        private readonly IEmailConfigService emailConfigService;
        private readonly IErrorLogService errorLogService;

        public EmailConfigController(
            IEmailConfigService emailConfigService,
            IErrorLogService errorLogService)
        {
            this.emailConfigService = emailConfigService;
            this.errorLogService = errorLogService;
        }

        [Authorize]
        [Permitted(Permission.SystemAdmin)]
        [HttpGet("getsender")]
        public async Task<IActionResult> GetDefaultSender()
        {
            Guid? UserId = null;
            RequestFeedback<EmailAccount> request = new RequestFeedback<EmailAccount>();
            try
            {
                UserId = User.Id();
                request.Data = await emailConfigService.GetDefaultSender();
                request.Success = true;
                request.Message = string.Empty;
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [Authorize]
        [Permitted(Permission.SystemAdmin)]
        [HttpGet("getreceiver")]
        public async Task<IActionResult> GetDefaultReceiver()
        {
            Guid? UserId = null;
            RequestFeedback<EmailAccount> request = new RequestFeedback<EmailAccount>();
            try
            {
                UserId = User.Id();
                request.Data = await emailConfigService.GetDefaultReceiver();
                request.Success = true;
                request.Message = string.Empty;
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [Authorize]
        [Permitted(Permission.SystemAdmin)]
        [HttpPost("[action]")]
        public async Task<IActionResult> Update(EmailConfigDto emailConfig)
        {

            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                await emailConfigService.Update(emailConfig);
                request.Success = true;
                request.Message = "Email configurations updated successfully";
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest(request);
            }
        }

        [Authorize]
        [Permitted(Permission.SystemAdmin)]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetConfiguration()
        {
            Guid? UserId = null;
            RequestFeedback<EmailConfigDto> request = new RequestFeedback<EmailConfigDto>();
            try
            {
                UserId = User.Id();
                request.Data = await emailConfigService.GetConfiguration();
                request.Success = true;
                request.Message = string.Empty;
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest(request);
            }
        }
    }
}
