using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Authorization;
using API.Dtos;
using API.Services;
using API.Support;
using API.Support.Extensions;
using Newtonsoft.Json;
using API.Data.Entities;

namespace API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService userService;
        private readonly IErrorLogService errorLogService;

        public UserController(
            IUserService userService,
            IErrorLogService errorLogService)
        {
            this.userService = userService;
            this.errorLogService = errorLogService;
        }

        [AllowAnonymous]
        [HttpPost("auth")]
        public async Task<IActionResult> AuthenticateAsync(UserDto userDto)
        {
            Guid? UserId = null;
            RequestFeedback<AuthDto> request = new RequestFeedback<AuthDto>();
            try
            {
                UserId = User.Id();

                AuthStatusDto Auth = await userService.AuthenticateAsync(userDto.ToUser(), userDto.Password);
                request.Status = Auth.Status;
                request.Data = Auth.AuthDto;
                request.Success = Auth.Status switch
                {
                    AuthStatus.Ok => true,
                    AuthStatus.NoEmailConfirm => true,
                    AuthStatus.NoUsernameOrEmail => false,
                    AuthStatus.PasswordRequired => false,
                    AuthStatus.LoginInvalid => false,
                    AuthStatus.UserLocked => false,
                    AuthStatus.Error => false,
                    _ => false,
                };
                return request.Success ? Ok(request) : (IActionResult)BadRequest(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("googleauth")]
        public async Task<IActionResult> GoogleAuthAsync(AuthToken token)
        {
            Guid? UserId = null;
            RequestFeedback<AuthDto> request = new RequestFeedback<AuthDto>();
            try
            {
                UserId = User.Id();

                AuthStatusDto Auth = await userService.GoogleAuthAsync(token.idToken);
                request.Status = Auth.Status;
                request.Data = Auth.AuthDto;
                request.Success = Auth.Status switch
                {
                    AuthStatus.Ok => true,
                    AuthStatus.NoEmailConfirm => true,
                    AuthStatus.NoEmail => false,
                    AuthStatus.UserLocked => false,
                    AuthStatus.Error => false,
                    _ => false,
                };
                return request.Success ? Ok(request) : (IActionResult)BadRequest(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("facebookauth")]
        public async Task<IActionResult> FacebookAuthAsync(AuthToken token)
        {
            Guid? UserId = null;
            RequestFeedback<AuthDto> request = new RequestFeedback<AuthDto>();
            try
            {
                UserId = User.Id();

                AuthStatusDto Auth = await userService.FacebookAuthAsync(token.idToken);
                request.Status = Auth.Status;
                request.Data = Auth.AuthDto;
                request.Success = Auth.Status switch
                {
                    AuthStatus.Ok => true,
                    AuthStatus.NoEmailConfirm => true,
                    AuthStatus.NoEmail => false,
                    AuthStatus.Error => false,
                    _ => false,
                };
                return request.Success ? Ok(request) : (IActionResult)BadRequest(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshAsync(AuthToken token)
        {
            Guid? UserId = null;
            RequestFeedback<AuthDto> request = new RequestFeedback<AuthDto>();
            try
            {
                UserId = User.Id();

                AuthStatusDto result = await userService.RefreshAsync(token.idToken);
                request.Status = result.Status;
                request.Data = result.AuthDto;
                request.Success = result.Status switch
                {
                    AuthStatus.Ok => true,
                    AuthStatus.NoEmailConfirm => true,
                    AuthStatus.TokenNotValid => false,
                    AuthStatus.LoginInvalid => false,
                    AuthStatus.UserLocked => false,
                    AuthStatus.TokenRevoked => false,
                    AuthStatus.Error => false,
                    _ => false,
                };
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("registerclient")]
        public async Task<IActionResult> RegisterClientAsync(UserRegisterDto client)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                AuthStatusDto result = await userService.CreateAsync(client.ToUser(), client.ReturnLink);
                request.Status = result.Status;
                request.Success = result.Status switch
                {
                    AuthStatus.NoEmailConfirm => true,
                    AuthStatus.UsernameNotValid => true,
                    AuthStatus.NoEmail => false,
                    AuthStatus.UsernameTaken => false,
                    AuthStatus.EmailTaken => false,
                    AuthStatus.Error => false,
                    _ => false,
                };
                request.Message = "User registered successfully";
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
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(UserRegisterDto newUser)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                User user = newUser.ToUser();
                AuthStatusDto result = await userService.CreateAsync(user, newUser.ReturnLink, newUser.Permission);
                request.Status = result.Status;
                request.Success = result.Status switch
                {
                    AuthStatus.NoEmailConfirm => true,
                    AuthStatus.UsernameNotValid => true,
                    AuthStatus.NoEmail => false,
                    AuthStatus.UsernameTaken => false,
                    AuthStatus.EmailTaken => false,
                    AuthStatus.Error => false,
                    _ => false,
                };
                request.Message = "User registered successfully";
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
        [HttpPost("[action]")]
        public async Task<IActionResult> RegisterSysAdmin(UserRegisterModelDto newUser)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                User user = newUser.ToUser();
                AuthStatusDto result = await userService.CreateAsync(user, newUser.ReturnLink, Permission.SystemAdmin);
                request.Status = result.Status;
                request.Success = result.Status switch
                {
                    AuthStatus.NoEmailConfirm => true,
                    AuthStatus.UsernameNotValid => true,
                    AuthStatus.NoEmail => false,
                    AuthStatus.UsernameTaken => false,
                    AuthStatus.EmailTaken => false,
                    AuthStatus.Error => false,
                    _ => false,
                };
                request.Message = "User registered successfully";
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest(request);
            }
        }


        [AllowAnonymous]
        [HttpPost("forgotpwdsendcode")]
        public async Task<ActionResult> ForgotPasswordEmailAsync(ForgotPwdDto model)
        {
            RequestFeedback request = new RequestFeedback();
            try
            {
                if (!TextHelper.IsValidEmail(model.Email)) throw new Exception("E-mail not valid");
                request.Success = await userService.SendForgotPwdEmailAsync(model.Email);
                if (request.Success) request.Message = "New e-mail code has been sent successfully";
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                return BadRequest(request);
            }
        }

        [AllowAnonymous]
        [HttpPost("forgotpwdconfirm")]
        public async Task<ActionResult> ForgotPasswordAsync(ForgotPwdDto model)
        {
            RequestFeedback request = new RequestFeedback();
            try
            {
                if (string.IsNullOrWhiteSpace(model.ConfirmationCode) || string.IsNullOrWhiteSpace(model.NewPassword) || !TextHelper.IsValidEmail(model.Email))
                {
                    request.Message = "Please enter a valid confirmation code, password and email";
                    return Ok(request);
                }

                if (!await userService.IsEmailCodeAsync(model.ConfirmationCode, model.Email))
                {
                    request.Message = "The given confirmation code is not valid";
                    return Ok(request);
                }

                request.Success = await userService.ResetPasswordAsync(model.Email, model.NewPassword);
                if (!request.Success) return Ok(request);
                request.Message = "Your password has been changed successfully";
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                return BadRequest();
            }

        }

        [Authorize]
        [Permitted(Permission.Client)]
        [HttpPost("resetpassword")]
        public async Task<ActionResult> ResetPasswordAsync(ForgotDto model)
        {
            RequestFeedback request = new RequestFeedback();
            try
            {
                if (string.IsNullOrWhiteSpace(model.NewPassword) || !TextHelper.IsValidEmail(model.Email))
                {
                    request.Message = "Please enter a valid password and email";
                    return Ok(request);
                }

                request.Success = await userService.ResetPasswordAsync(model.Email, model.NewPassword);
                if (!request.Success) return Ok(request);
                request.Message = "Your password has been changed successfully";
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                return BadRequest();
            }

        }

        [AllowAnonymous]
        [HttpGet("index")]
        public async Task<IActionResult> Index()
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                request.Success = true;
                request.Message = "Welcome!";
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            Guid? UserId = null;
            RequestFeedback<User> request = new RequestFeedback<User>();
            try
            {
                UserId = User.Id();
                request.Data = await userService.GetById(new Guid("f8684da2-4887-4288-b841-af07477a54d1"));
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
        [HttpPost("revoke")]
        public async Task<ActionResult> RevokeAccess()
        {
            try
            {
                Guid? UserId = User.Id();
                if (!UserId.HasValue) throw new Exception("User Id not found");
                AuthStatusDto result = await userService.RevokeAccess(UserId.Value);
                return result.Status switch
                {
                    AuthStatus.Ok => Ok(new { Status = AuthStatus.Ok, User = result.AuthDto }),
                    AuthStatus.LoginInvalid => BadRequest(new { Status = AuthStatus.LoginInvalid }),
                    AuthStatus.NoEmailConfirm => BadRequest(new { Status = AuthStatus.PasswordRequired }),
                    AuthStatus.Error => BadRequest(new { Status = AuthStatus.Error }),
                    _ => BadRequest(new { Status = AuthStatus.Error }),
                };
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(ConfirmCodeStringDto model)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                if (string.IsNullOrEmpty(model.Data)) return BadRequest("Confirmation code not found");

                ConfirmCodeDto ConfirmationData = JsonConvert.DeserializeObject<ConfirmCodeDto>(model.Data);

                request.Success = await userService.ConfirmEmailCodeAsync(ConfirmationData.Code, ConfirmationData.Email, ConfirmationData.Password);
                if (request.Success)
                {
                    request.Message = "Account confirmed and password successfully created";
                    request.Status = AuthStatus.Ok;
                    return Ok(request);
                }
                else return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("decryptconfirmationtoken")]
        public async Task<IActionResult> DecryptConfirmationToken(DecryptCodeDto model)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                if (string.IsNullOrEmpty(model.Code)) return BadRequest("Confirmation code not found");

                ConfirmationToken ConfirmationToken = JsonConvert.DeserializeObject<ConfirmationToken>(Crypto.DecryptDecode(model.Code));

                request.Data = JsonConvert.SerializeObject(ConfirmationToken);
                request.Message = string.Empty;
                request.Status = AuthStatus.Ok;
                request.Success = true;
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
        [HttpPost("resendconfirm")]
        public async Task<ActionResult> ResendEmailConfirmationAsync(UserRegistrationResendEmailDto model)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                if (!model.Id.HasValue) throw new Exception("Selected User Id not found");
                request.Success = await userService.ResendEmailConfirmationAsync(model.Id.Value, model.ReturnLink);
                if (request.Success) request.Message = "New e-mail code has been sent successfully";
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
        [HttpPost("remove")]
        public async Task<ActionResult> Remove(UserRemoveDto model)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                if (!model.Id.HasValue) throw new Exception("Selected User Id not found");
                if (UserId == model.Id) throw new Exception("User connot remove themselves");
                request.Success = await userService.Remove(model.Id.Value);
                if (request.Success) request.Message = "User has been successfully removed";
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
        public async Task<ActionResult> Disable(UserRemoveDto model)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                if (!model.Id.HasValue) throw new Exception("Selected User Id not found");
                if (UserId == model.Id) throw new Exception("User connot remove themselves");
                //If user is DepotAdmin, can only disable DepotEmployees and DepotDrivers
                request.Success = await userService.Disable(model.Id.Value, User.HasPermissions(Permission.SystemAdmin));
                if (request.Success) request.Message = "User has been successfully removed";
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
        public async Task<ActionResult> Enable(UserRemoveDto model)
        {
            Guid? UserId = null;
            RequestFeedback request = new RequestFeedback();
            try
            {
                UserId = User.Id();
                if (!model.Id.HasValue) throw new Exception("Selected User Id not found");
                if (UserId == model.Id) throw new Exception("User connot remove themselves");
                //If user is DepotAdmin, can only enable DepotEmployees and DepotDrivers
                request.Success = await userService.Enable(model.Id.Value, User.HasPermissions(Permission.SystemAdmin));
                if (request.Success) request.Message = "User has been successfully removed";
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
        [HttpGet("[action]")]
        public async Task<IActionResult> SysAdminList()
        {
            Guid? UserId = null;
            RequestFeedback<IEnumerable<UserSysAdminListItemDto>> request = new RequestFeedback<IEnumerable<UserSysAdminListItemDto>>();
            try
            {
                UserId = User.Id();
                request.Data = await userService.SysAdminList();
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

        [HttpGet("get")]
        public async Task<IActionResult> GetById(Guid? id)
        {
            Guid? UserId = null;
            RequestFeedback<UserDto> request = new RequestFeedback<UserDto>();
            try
            {
                UserId = User.Id();
                if (!UserId.HasValue || !id.HasValue)
                {
                    request.Message = "User Id not found";
                    throw new Exception("User Id not found");
                }

                User user = await userService.GetById(id.Value);
                request.Data = UserDto.ToDto(user);
                return Ok(request);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e, UserId);
                return BadRequest();
            }
        }

        [HttpPut("update")]
        public IActionResult Update(EditUserDto user)
        {
            try
            {
                // save
                userService.UpdateAsync(user);
                return Ok();
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}