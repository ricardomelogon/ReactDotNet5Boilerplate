using API.Authorization;
using API.Data.Entities;
using API.Dtos;
using API.Services;
using API.Support;
using API.Support.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ErrorLogController : Controller
    {

        private readonly IErrorLogService errorLogService;

        public ErrorLogController(
            IErrorLogService errorLogService)
        {
            this.errorLogService = errorLogService;
        }


        [Authorize]
        [Permitted(Permission.AccessAll)]
        [HttpGet("list")]
        public async Task<IActionResult> List()
        {
            Guid? UserId = null;
            RequestFeedback<IEnumerable<ErrorLogDto>> request = new RequestFeedback<IEnumerable<ErrorLogDto>>();
            try
            {
                UserId = User.Id();
                request.Data = await errorLogService.Log();
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

    }
}
