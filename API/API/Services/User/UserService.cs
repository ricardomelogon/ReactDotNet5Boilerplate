using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Authorization;
using API.Data;
using API.Data.Entities;
using API.Dtos;
using API.Helpers;
using API.Support.Extensions;
using System.IO;
using API.Support;
using Z.EntityFramework.Plus;

namespace API.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext db;
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IErrorLogService errorLogService;
        private readonly IEmailSenderService emailSenderService;
        private readonly IConfiguration configuration;
        private readonly IPermissionService permissionService;

        public UserService
        (
            DataContext context,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            IHttpContextAccessor httpContextAccessor,
            IErrorLogService logService,
            IEmailSenderService emailSenderService,
            IConfiguration configuration,
            IPermissionService permissionService
        )
        {
            db = context;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            this.httpContextAccessor = httpContextAccessor;
            this.errorLogService = logService;
            this.emailSenderService = emailSenderService;
            this.configuration = configuration;
            this.permissionService = permissionService;
        }

        public async Task<AuthStatusDto> AuthenticateAsync(User user, string password)
        {
            Guid? UserId;
            AuthStatusDto model = new AuthStatusDto { Status = AuthStatus.Error };
            try
            {
                if (user == null || (string.IsNullOrEmpty(user.Email) && string.IsNullOrEmpty(user.UserName)))
                {
                    model.Status = AuthStatus.NoUsernameOrEmail;
                    throw new Exception("User can't be null");
                }

                if (string.IsNullOrEmpty(password))
                {
                    model.Status = AuthStatus.PasswordRequired;
                    throw new Exception("User password is required");
                }

                User CurrentUser = new User();
                if (!string.IsNullOrEmpty(user.Email)) CurrentUser = await userManager.FindByEmailAsync(user.Email);
                else if (!string.IsNullOrEmpty(user.UserName)) CurrentUser = await userManager.FindByNameAsync(user.UserName);

                if (CurrentUser == null)
                {
                    model.Status = AuthStatus.LoginInvalid;
                    throw new Exception("User not found");
                }

                UserId = CurrentUser.Id;

                SignInResult result = await signInManager.PasswordSignInAsync(CurrentUser.UserName, password, false, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    if (CurrentUser.LockoutEnd.HasValue && CurrentUser.LockoutEnd.Value > DateTime.Now)
                    {
                        model.Status = AuthStatus.UserLocked;
                        throw new Exception("Locked user");
                    }
                    model.AuthDto = await GetUserAuthAsync(CurrentUser);
                    if (model.AuthDto != null)
                    {
                        model.Status = CurrentUser.EmailConfirmed ? AuthStatus.Ok : AuthStatus.NoEmailConfirm;
                    }
                }
                else model.Status = AuthStatus.LoginInvalid;

                return model;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<AuthStatusDto> GoogleAuthAsync(string idToken)
        {
            AuthStatusDto model = new AuthStatusDto { Status = AuthStatus.Error };
            try
            {
                GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new List<string> { configuration.GetSection("Google").GetSection("ClientID").Value }
                };
                GoogleJsonWebSignature.Payload Payload = await GoogleJsonWebSignature.ValidateAsync(idToken);

                if (Payload == null) throw new Exception("Could not get a payload from google");

                if (string.IsNullOrWhiteSpace(Payload.Email)) { model.Status = AuthStatus.NoEmail; throw new Exception("Could not get an user e-mail from google"); }
                return await SocialAuthAsync(Payload.Email, Payload.GivenName, Payload.FamilyName, Payload.EmailVerified);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<AuthStatusDto> FacebookAuthAsync(string idToken)
        {
            AuthStatusDto model = new AuthStatusDto { Status = AuthStatus.Error };
            try
            {
                HttpClient HttpClient = new HttpClient();

                #region Check Validity and Permissions

                string AcessToken = configuration.GetSection("Facebook").GetSection("AccessToken").Value;
                Uri fbTokenDetailsUri = new Uri($"https://graph.facebook.com/v4.0/debug_token?input_token={idToken}&access_token={AcessToken}");
                HttpResponseMessage fbTokenDetailsResponse = await HttpClient.GetAsync(fbTokenDetailsUri);
                if (!fbTokenDetailsResponse.IsSuccessStatusCode) throw new Exception("Could not get a response from Facebook");
                string fbTokenDetailsResult = await fbTokenDetailsResponse.Content.ReadAsStringAsync();
                FBTokenDetails FBDetails = JsonConvert.DeserializeObject<FBTokenDetails>(fbTokenDetailsResult);
                if (FBDetails == null) throw new Exception("Could not get a response from Facebook");
                if (FBDetails.data == null)
                {
                    if (FBDetails.error == null || string.IsNullOrWhiteSpace(FBDetails.error.message)) throw new Exception("There was an error with an unspecified error message");
                    throw new Exception(FBDetails.error.message);
                }
                else
                {
                    if (FBDetails.data.is_valid == null) throw new Exception("Facebook data doesn't have a validity property");
                    bool is_valid = (FBDetails.data.is_valid as bool?) ?? false;
                    if (!is_valid)
                    {
                        if (FBDetails.data.error == null || string.IsNullOrWhiteSpace(FBDetails.data.error.message)) throw new Exception("There was an error with an unspecified error message");
                        throw new Exception(FBDetails.data.error.message);
                    }
                    if (FBDetails.data.scopes == null) throw new Exception("Facebook user didn't grant the necessary permissions");
                    List<string> Permissions = FBDetails.data.scopes as List<string>;
                    if (!Permissions.Contains(FacebookPermissions.PublicProfile)) throw new Exception("Facebook user didn't grant the necessary permissions");
                    if (!Permissions.Contains(FacebookPermissions.Email))
                    {
                        model.Status = AuthStatus.NoEmail;
                        throw new Exception("Facebook user didn't grant the necessary permissions");
                    }
                }

                #endregion Check Validity and Permissions

                HttpResponseMessage response = await HttpClient.GetAsync($"https://graph.facebook.com/v4.0/me?access_token={idToken}&fields=id,name,email,first_name,last_name,age_range,birthday,gender,locale,picture");
                if (!response.IsSuccessStatusCode) throw new Exception("Could not get a response from Facebook");
                string fbresult = await response.Content.ReadAsStringAsync();
                FBUserInfo user = JsonConvert.DeserializeObject<FBUserInfo>(fbresult);

                if (user == null) throw new Exception("Could not get the user information from Facebook");

                if (string.IsNullOrWhiteSpace(user.email)) { model.Status = AuthStatus.NoEmail; throw new Exception("Could not get an user e-mail from Facebook"); }

                return await SocialAuthAsync(user.email, user.first_name, user.last_name, true);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<AuthStatusDto> RefreshAsync(string idToken)
        {
            Guid? UserId = null;
            AuthStatusDto model = new AuthStatusDto { Status = AuthStatus.Error };
            try
            {
                SecurityToken SecurityToken = await DecryptToken(idToken);
                if (SecurityToken == null)
                {
                    model.Status = AuthStatus.TokenNotValid;
                    return model;
                }

                JwtSecurityToken Token = (JwtSecurityToken)SecurityToken;

                UserId = Token.Id();
                if (!UserId.HasValue)
                {
                    model.Status = AuthStatus.TokenNotValid;
                    throw new Exception("Token doesn't contain a user Id");
                }

                User user = await GetById(UserId.Value);
                if (user == null)
                {
                    model.Status = AuthStatus.LoginInvalid;
                    throw new Exception("No valid user with the given Id");
                }

                //Locked users shouldn't get a refreshed token
                if (user.LockoutEnd.HasValue && user.LockoutEnd.Value > DateTime.Now)
                {
                    model.Status = AuthStatus.UserLocked;
                    throw new Exception("User is not authorized to access the application");
                }

                string Email = Token.Claims.Where(s => s.Type == JwtClaimType.Email).FirstOrDefault().Value;
                //This should only occur if the token was tampered with
                if (user.Email.ToLower() != Email.ToLower())
                {
                    model.Status = AuthStatus.LoginInvalid;
                    throw new Exception("Token e-mail does not match user's e-mail");
                }

                string RevokeCode = Token.Claims.Where(s => s.Type == JwtClaimType.RevokeCode).FirstOrDefault().Value;

                //If the user's revoke code has changed, all tokens prior to the change have to be revoked
                if (RevokeCode != user.RevokeCode)
                {
                    model.Status = AuthStatus.TokenRevoked;
                    throw new Exception("Token password does not match user's password");
                }

                model.AuthDto = await GetUserAuthAsync(user);
                if (model.AuthDto != null)
                {
                    model.Status = user.EmailConfirmed ? AuthStatus.Ok : AuthStatus.NoEmailConfirm;
                }

                return model;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public IEnumerable<User> GetAll()
        {
            return db.Users;
        }

        public async Task<User> GetById(Guid id)
        {
            return await db.Users.FindAsync(id);
        }

        public async Task<AuthStatusDto> CreateAsync(User user, string ReturnLink, params Permission[] Permissions)
        {
            AuthStatusDto model = new AuthStatusDto { Status = AuthStatus.Error };
            using IDbContextTransaction Transaction = await db.Database.BeginTransactionAsync();
            try
            {
                // validation
                if (user == null)
                    throw new Exception("User information is empty");

                if (!string.IsNullOrWhiteSpace(user.UserName) && user.UserName.Contains('@'))
                {
                    model.Status = AuthStatus.UsernameNotValid;
                    throw new Exception("Username cannot use the @ Symbol");
                }

                if (string.IsNullOrWhiteSpace(user.Email))
                {
                    model.Status = AuthStatus.NoEmail;
                    throw new Exception("E-mail is required");
                }

                if (!string.IsNullOrWhiteSpace(user.UserName) && db.Users.Any(x => x.UserName == user.UserName))
                {
                    model.Status = AuthStatus.UsernameTaken;
                    throw new Exception("Username \"" + user.UserName + "\" is already taken");
                }

                if (db.Users.Any(x => x.Email == user.Email))
                {
                    model.Status = AuthStatus.EmailTaken;
                    throw new Exception("E-mail \"" + user.Email + "\" is already taken");
                }

                if (string.IsNullOrWhiteSpace(user.UserName)) user.UserName = Guid.NewGuid().ToString();

                string ConfirmationCode = GenerateConfirmationCode(6);

                user.ConfirmationCode = HashCode(ConfirmationCode);
                user.RowDate = DateTime.Now.ToUniversalTime();

                user.RevokeCode = Guid.NewGuid().ToString();

                IdentityResult result = await userManager.CreateAsync(user);

                model.AuthDto = await GetUserAuthAsync(user);
                if (model.AuthDto == null) throw new Exception("Could not generate user token");
                model.Status = AuthStatus.NoEmailConfirm;

                if (result.Succeeded)
                {
                    foreach (Permission permission in Permissions)
                    {
                        await permissionService.AddToUser(user.Id, permission);
                    }
                    await emailSenderService.SendEmail(user.Email, EmailTemplates.Account.RegistrationCode, user.FirstName, user.LastName, $"{ReturnLink}/{Crypto.EncryptEncode(JsonConvert.SerializeObject(new ConfirmationToken(user.Email, ConfirmationCode)))}");
                }

                await Transaction.CommitAsync();
                await Transaction.DisposeAsync();
                return model;
            }
            catch (Exception e)
            {
                await Transaction.RollbackAsync();
                await Transaction.DisposeAsync();
                await errorLogService.InsertException(e);
                throw;
            }
        }

        [Authorize]
        public async Task<AuthStatusDto> RevokeAccess(Guid UserId)
        {
            AuthStatusDto model = new AuthStatusDto { Status = AuthStatus.Error };
            try
            {
                User User = await GetById(UserId);
                if (User == null)
                {
                    model.Status = AuthStatus.LoginInvalid;
                    throw new Exception("No user found with the given user id");
                }

                if (!User.EmailConfirmed)
                {
                    model.Status = AuthStatus.NoEmailConfirm;
                    throw new Exception("Users with no e-mail confirmation cannot revoke tokens");
                }

                User.RevokeCode = Guid.NewGuid().ToString();

                db.Entry(User).State = EntityState.Modified;
                await db.SaveChangesAsync();

                model.AuthDto = await GetUserAuthAsync(User);
                if (model.AuthDto != null)
                {
                    model.Status = AuthStatus.Ok;
                }

                return model;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        [Authorize]
        public async Task<bool> UpdateAsync(EditUserDto user)
        {
            User CurrentUser = await userManager.FindByIdAsync(httpContextAccessor.HttpContext.User.FindFirstValue(JwtClaimType.UserId));

            if (CurrentUser == null)
                throw new Exception("User not found");

            // update user properties
            if (!string.IsNullOrWhiteSpace(user.FirstName)) CurrentUser.FirstName = user.FirstName;
            if (!string.IsNullOrWhiteSpace(user.LastName)) CurrentUser.FirstName = user.LastName;
            if (!string.IsNullOrWhiteSpace(user.PhoneNumber)) CurrentUser.FirstName = user.PhoneNumber;

            bool result1, result2;

            if (!string.IsNullOrWhiteSpace(user.OldPassword) && !string.IsNullOrWhiteSpace(user.NewPassword))
            {
                IdentityResult r1 = await userManager.ChangePasswordAsync(CurrentUser, user.OldPassword, user.NewPassword);
                result1 = r1.Succeeded;
            }
            else result1 = true;

            IdentityResult r2 = await userManager.UpdateAsync(CurrentUser);
            result2 = r2.Succeeded;

            return result1 && result2;
        }

        public async Task<bool> AddToRoleAsync(User user, IEnumerable<string> roles)
        {
            try
            {
                IdentityResult result = await userManager.AddToRolesAsync(user, roles);
                return !result.Succeeded ? throw new Exception(result.Errors.FirstOrDefault().Description) : true;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<bool> ConfirmEmailCodeAsync(string ConfirmationCode, string Email, string Password)
        {
            IDbContextTransaction transaction = await db.Database.BeginTransactionAsync();
            try
            {
                if (string.IsNullOrWhiteSpace(ConfirmationCode)) throw new ArgumentNullException("No Confirmation Code");
                User User = await db.Users.Where(a => a.Email == Email).SingleOrDefaultAsync();
                if (User == null) throw new NullReferenceException("User not Found");
                if (User.ConfirmationCode == HashCode(ConfirmationCode))
                {
                    User.EmailConfirmed = true;
                    AccessClear(User);
                    await userManager.RemovePasswordAsync(User);
                    await userManager.AddPasswordAsync(User, Password);
                    await userManager.UpdateAsync(User);
                    await transaction.CommitAsync();
                    await transaction.DisposeAsync();
                    return true;
                }
                else
                {
                    await transaction.RollbackAsync();
                    await transaction.DisposeAsync();
                    await AccessFailed(User);
                    return false;
                }
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<bool> IsEmailCodeAsync(string ConfirmationCode, string Email = "")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(ConfirmationCode)) throw new ArgumentNullException("No Confirmation Code");

                Claim UserIdClaim = httpContextAccessor.HttpContext.User.FindFirst(JwtClaimType.UserId);
                User User = null;
                if (UserIdClaim != null) User = await userManager.FindByIdAsync(httpContextAccessor.HttpContext.User.FindFirst(JwtClaimType.UserId).Value);

                if (User == null && !string.IsNullOrWhiteSpace(Email)) User = await userManager.FindByEmailAsync(Email);
                return User == null ? throw new NullReferenceException("User not Found") : User.ConfirmationCode == HashCode(ConfirmationCode);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        [Authorize]
        public async Task<bool> ResendEmailConfirmationAsync(Guid UserId, string ReturnLink)
        {
            IDbContextTransaction transaction = await db.Database.BeginTransactionAsync();
            try
            {
                User CurrentUser = await db.Users.Where(a => a.Id == UserId).SingleOrDefaultAsync();
                if (CurrentUser == null) throw new Exception("User not found");
                string ConfirmationCode = GenerateConfirmationCode(6);
                CurrentUser.ConfirmationCode = HashCode(ConfirmationCode);
                IdentityResult result = await userManager.UpdateAsync(CurrentUser);
                if (!result.Succeeded) throw new Exception("Could not change user confirmation code");
                bool sendSuccess = await emailSenderService.SendEmail(CurrentUser.Email, EmailTemplates.Account.RegistrationCode, CurrentUser.FirstName, CurrentUser.LastName, $"{ReturnLink}/{Crypto.EncryptEncode(JsonConvert.SerializeObject(new ConfirmationToken(CurrentUser.Email, ConfirmationCode)))}");
                if (!sendSuccess) throw new Exception("Failed to send e-mail");
                await transaction.CommitAsync();
                await transaction.DisposeAsync();
                return true;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                await transaction.DisposeAsync();
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<bool> Remove(Guid UserId)
        {
            try
            {
                User CurrentUser = await db.Users.Where(a => a.Id == UserId).SingleOrDefaultAsync();
                if (CurrentUser == null) throw new Exception("User not found");

                db.Remove(CurrentUser);
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e); throw;
            }
        }

        public async Task<bool> Disable(Guid UserId, bool IsSysAdmin)
        {
            try
            {
                User CurrentUser = null;
                if (IsSysAdmin) CurrentUser = await db.Users.Where(a => a.Id == UserId).SingleOrDefaultAsync();
                if (CurrentUser == null) throw new Exception("User not found");

                CurrentUser.Enabled = false;
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e); throw;
            }
        }

        public async Task<bool> Enable(Guid UserId, bool IsSysAdmin)
        {
            try
            {
                User CurrentUser = null;
                if (IsSysAdmin) CurrentUser = await db.Users.Where(a => a.Id == UserId).SingleOrDefaultAsync();
                if (CurrentUser == null) throw new Exception("User not found");

                CurrentUser.Enabled = true;
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e); throw;
            }
        }

        public async Task<bool> ResetPasswordAsync(string Email, string Password)
        {
            User user = await userManager.FindByEmailAsync(Email);
            if (user == null) return false;
            IDbContextTransaction transaction = await db.Database.BeginTransactionAsync();
            try
            {
                IdentityResult result = await userManager.RemovePasswordAsync(user);
                if (!result.Succeeded) throw new Exception("User password could not be removed");

                result = await userManager.AddPasswordAsync(user, Password);
                if (!result.Succeeded) throw new Exception("New user password could not be added");

                await transaction.CommitAsync();
                await transaction.DisposeAsync();
                return result.Succeeded;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                await transaction.DisposeAsync();
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<bool> SendForgotPwdEmailAsync(string email)
        {
            User CurrentUser = await userManager.FindByEmailAsync(email);
            if (CurrentUser == null) return true; // Don't reveal that the user does not exist
            try
            {
                string OldCode = CurrentUser.ConfirmationCode;
                string ConfirmationCode = GenerateConfirmationCode(6);
                CurrentUser.ConfirmationCode = HashCode(ConfirmationCode);
                IdentityResult result = await userManager.UpdateAsync(CurrentUser);
                if (result.Succeeded)
                {
                    bool sendSuccess = await emailSenderService.SendEmail(CurrentUser.Email, EmailTemplates.Account.ForgotPassword, CurrentUser.FirstName, CurrentUser.LastName, ConfirmationCode);
                    if (sendSuccess) return true;

                    //Could't send the email, revert to old code
                    CurrentUser.ConfirmationCode = OldCode;
                    result = await userManager.UpdateAsync(CurrentUser);
                    if (result.Succeeded) return true;
                    else return false; //Can't send the email, can't revert the user to old code. Server or Network error during process, user will have to try again later.
                }
                else return false;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        [Authorize]
        public async Task<bool?> IsLockedAsync()
        {
            try
            {
                User User = await userManager.FindByIdAsync(httpContextAccessor.HttpContext.User.FindFirstValue(JwtClaimType.UserId));
                return User == null ? throw new NullReferenceException("No User With Specified ID") : (bool?)await userManager.IsLockedOutAsync(User);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        [Authorize]
        public async Task<bool?> IsLockedAsync(User user)
        {
            try
            {
                return user == null ? throw new NullReferenceException("No User With Specified ID") : (bool?)await userManager.IsLockedOutAsync(user);
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

        public async Task<IEnumerable<UserListItemDto>> List(bool Disabled, params Permission[] chosenpermissions)
        {
            try
            {
                chosenpermissions = chosenpermissions.Where(a => a != Permission.AccessAll).ToArray();
                IQueryable<User> Users_Q = db.Permissions.Where(a => a.Enum.HasValue && chosenpermissions.Contains(a.Enum.Value)).SelectMany(a => a.Users).Distinct().Select(a => a.User).Where(a => a.Enabled == !Disabled);

                QueryFutureEnumerable<UserListItemDto> Users_F = Users_Q.Select(a => new UserListItemDto
                {
                    Email = a.Email,
                    EmailConfirmed = a.EmailConfirmed,
                    FirstName = a.FirstName,
                    Id = a.Id,
                    LastName = a.LastName,
                }).Future();

                var Permissions_F = db.UserPermissions.Where(a => a.User.Enabled).Select(a => new { a.UserId, a.Permissions.Name, a.Permissions.Value }).Future();

                IEnumerable<UserListItemDto> result = await Users_F.ToListAsync();
                var permissions = (await Permissions_F.ToListAsync()).GroupBy(a => a.UserId).ToDictionary(a => a.Key, a => a);
                foreach (UserListItemDto user in result)
                {
                    user.Permissions = string.Join(", ", permissions[user.Id].Select(a => a.Name));
                }
                return result;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e); throw;
            }
        }

        public async Task<IEnumerable<UserSysAdminListItemDto>> SysAdminList()
        {
            try
            {
                IQueryable<User> Users_Q = db.Permissions.Where(a => a.Value == (ushort)Permission.SystemAdmin).SelectMany(a => a.Users).Distinct().Select(a => a.User).Where(a => a.Enabled);

                IEnumerable<UserSysAdminListItemDto> result = await Users_Q.Select(a => new UserSysAdminListItemDto
                {
                    Email = a.Email,
                    EmailConfirmed = a.EmailConfirmed,
                    FirstName = a.FirstName,
                    Id = a.Id,
                    LastName = a.LastName,
                }).ToListAsync();

                return result;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e); throw;
            }
        }

        // private helper methods
        private async Task AccessFailed(User user)
        {
            await userManager.AccessFailedAsync(user);
            if (user.AccessFailedCount > IdentitySettings.LockoutTries) await userManager.SetLockoutEndDateAsync(user, DateTime.Now.Add(new TimeSpan(0, IdentitySettings.LockoutTime, 0)));
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("CodeQuality", "IDE0051:Remove unused private members", Justification = "For future use")]
        private void UnlockUser(User user)
        {
            userManager.SetLockoutEndDateAsync(user, DateTime.Now.Subtract(new TimeSpan(1, 0, 0)));
            AccessClear(user);
        }

        private void AccessClear(User user)
        {
            userManager.ResetAccessFailedCountAsync(user);
        }

        public string GenerateConfirmationCode(int length)
        {
            const string valid = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
            {
                byte[] uintBuffer = new byte[sizeof(uint)];

                while (length-- > 0)
                {
                    rng.GetBytes(uintBuffer);
                    uint num = BitConverter.ToUInt32(uintBuffer, 0);
                    res.Append(valid[(int)(num % (uint)valid.Length)]);
                }
            }

            return res.ToString();
        }

        private string HashCode(string Code)
        {
            if (string.IsNullOrEmpty(Code))
                return string.Empty;

            using SHA256Managed sha = new SHA256Managed();
            byte[] textData = Encoding.UTF8.GetBytes(Code);
            byte[] hash = sha.ComputeHash(textData);
            return BitConverter.ToString(hash).Replace("-", string.Empty);
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("CodeQuality", "IDE0051:Remove unused private members", Justification = "For future use")]
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using HMACSHA512 hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("CodeQuality", "IDE0051:Remove unused private members", Justification = "For future use")]
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (HMACSHA512 hmac = new HMACSHA512(storedSalt))
            {
                byte[] computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        private async Task<AuthStatusDto> SocialAuthAsync(string Email, string FirstName = "", string LastName = "", bool EmailConfirmed = false)
        {
            AuthStatusDto model = new AuthStatusDto { Status = AuthStatus.Error };
            try
            {
                User CurrentUser = await userManager.FindByEmailAsync(Email);
                if (CurrentUser == null)
                {
                    string ConfirmationCode = GenerateConfirmationCode(6);
                    User User = new User
                    {
                        Email = Email,
                        FirstName = FirstName,
                        LastName = LastName,
                        EmailConfirmed = EmailConfirmed,
                        ConfirmationCode = HashCode(ConfirmationCode),
                        RowDate = DateTime.Now.ToUniversalTime(),
                        UserName = Guid.NewGuid().ToString(),
                        RevokeCode = Guid.NewGuid().ToString()
                    };
                    IdentityResult result = await userManager.CreateAsync(User);
                    if (result.Succeeded)
                    {
                        CurrentUser = await userManager.FindByEmailAsync(User.Email);
                        model.AuthDto = await GetUserAuthAsync(CurrentUser);
                        model.Status = AuthStatus.Ok;

                        if (model.AuthDto == null)
                        {
                            model.Status = AuthStatus.Error;
                        }
                        else if (!User.EmailConfirmed)
                        {
                            model.Status = AuthStatus.NoEmailConfirm;
                            await emailSenderService.SendEmail(CurrentUser.Email, EmailTemplates.Account.RegistrationCode, CurrentUser.FirstName, CurrentUser.LastName, ConfirmationCode);
                        }
                    }
                    else
                    {
                        model.Status = AuthStatus.Error;
                    }
                }
                else
                {
                    if (CurrentUser.LockoutEnd.HasValue && CurrentUser.LockoutEnd.Value >= DateTime.Now)
                    {
                        model.Status = AuthStatus.UserLocked;
                    }
                    else
                    {
                        await signInManager.SignInAsync(CurrentUser, true);

                        model.AuthDto = await GetUserAuthAsync(CurrentUser);
                        CurrentUser.EmailConfirmed = EmailConfirmed;
                        db.Update(CurrentUser);
                        await db.SaveChangesAsync();

                        model.Status = EmailConfirmed ? AuthStatus.Ok : AuthStatus.NoEmailConfirm;
                    }
                }
                return model;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

#pragma warning disable CS0162 // Unreachable code detected - Parts of the token are bound by flags and may be unreachable by default

        public async Task<AuthDto> GetUserAuthAsync(User CurrentUser)
        {
            try
            {
                List<Claim> claims = new List<Claim>
                {
                    new Claim(JwtClaimType.UserId, CurrentUser.Id.ToString()),
                    new Claim(JwtClaimType.Email, CurrentUser.Email),
                    new Claim(JwtClaimType.RevokeCode, CurrentUser.RevokeCode),
                };

                PermissionCalculator PermissionCalculator = new PermissionCalculator(db);
                string Permissions = await PermissionCalculator.CalculatePermissions(CurrentUser.Id);

                claims.Add(new Claim(PermissionConstants.ClaimType, Permissions));

                string FirstName = "User";
                if (!string.IsNullOrEmpty(CurrentUser.FirstName)) FirstName = CurrentUser.FirstName;
                claims.Add(new Claim(JwtClaimType.FirstName, FirstName));

                string LastName = string.Empty;
                if (!string.IsNullOrEmpty(CurrentUser.LastName)) LastName = CurrentUser.LastName;
                claims.Add(new Claim(JwtClaimType.LastName, LastName));

                string Email = string.Empty;
                if (!string.IsNullOrEmpty(CurrentUser.Email)) Email = CurrentUser.Email;
                claims.Add(new Claim(JwtClaimType.Email, Email));

                if (PermissionConstants.SubscriptionEnabled)
                {
                    DateTime SubscriptionDate = await PermissionCalculator.CalculateSubscription();
                    if (DateTime.UtcNow < SubscriptionDate) claims.Add(new Claim(PermissionConstants.SubscriptionClaimType, DateTime.UtcNow.ToString("s", CultureInfo.InvariantCulture)));
                }

                byte[] Secret = Encoding.Default.GetBytes(appSettings.SigningKey);
                byte[] Key = Encoding.Default.GetBytes(appSettings.EncryptionKey);

                SymmetricSecurityKey securitySecret = new SymmetricSecurityKey(Secret);
                SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Key);

                SigningCredentials signingCredentials = new SigningCredentials(securitySecret, SecurityAlgorithms.HmacSha512);

                EncryptingCredentials encryptingCredentials = new EncryptingCredentials(securityKey, SecurityAlgorithms.Aes256KW, SecurityAlgorithms.Aes128CbcHmacSha256);

                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

                SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddMinutes(JwtSettings.Expiration),
                    SigningCredentials = signingCredentials,
                    EncryptingCredentials = encryptingCredentials,
                    IssuedAt = DateTime.Now,
                    NotBefore = DateTime.Now
                };

                JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);

                string tokenString = tokenHandler.WriteToken(token);

                AuthDto dto = new AuthDto
                {
                    Email = CurrentUser.Email,
                    FirstName = CurrentUser.FirstName,
                    Id = CurrentUser.Id,
                    LastName = CurrentUser.LastName,
                    PhoneNumber = CurrentUser.PhoneNumber,
                    Token = tokenString,
                    Username = CurrentUser.UserName,
                    EmailConfirmed = CurrentUser.EmailConfirmed,
                    Permissions = Permissions
                };
                return dto;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }

#pragma warning restore CS0162 // Unreachable code detected

        private async Task<SecurityToken> DecryptToken(string idToken)
        {
            try
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                SymmetricSecurityKey SigningKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(appSettings.SigningKey));
                SymmetricSecurityKey EncryptionKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(appSettings.EncryptionKey));

                if (!tokenHandler.CanReadToken(idToken)) throw new Exception("No readable token");

                TokenValidationParameters tokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = SigningKey,
                    TokenDecryptionKey = EncryptionKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = false,
                    ValidateActor = false
                };

                tokenHandler.ValidateToken(idToken, tokenValidationParameters, out SecurityToken Token);

                return Token;
            }
            catch (Exception e)
            {
                await errorLogService.InsertException(e);
                throw;
            }
        }
    }

    internal class ConfirmationToken
    {
        public string Email { get; }
        public string Code { get; }

        public ConfirmationToken(string email, string code)
        {
            Email = email;
            Code = code;
        }

        public override bool Equals(object obj)
        {
            return obj is ConfirmationToken other &&
                   Email == other.Email &&
                   Code == other.Code;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Email, Code);
        }
    }
}