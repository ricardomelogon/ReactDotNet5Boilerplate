using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Authorization;
using API.Data.Entities;

namespace API.Services
{
    public interface IUserService
    {
        Task<AuthStatusDto> AuthenticateAsync(User user, string password);

        Task<AuthStatusDto> GoogleAuthAsync(string idToken);

        Task<AuthStatusDto> FacebookAuthAsync(string idToken);

        Task<AuthStatusDto> RefreshAsync(string idToken);

        Task<AuthStatusDto> RevokeAccess(Guid UserId);

        IEnumerable<User> GetAll();

        Task<User> GetById(Guid id);

        Task<AuthStatusDto> CreateAsync(User user, string ReturnLink, params Permission[] Permissions);

        Task<bool> UpdateAsync(EditUserDto user);

        Task<bool> AddToRoleAsync(User user, IEnumerable<string> roles);

        Task<bool> ConfirmEmailCodeAsync(string ConfirmationCode, string Email, string Password);

        Task<bool> IsEmailCodeAsync(string ConfirmationCode, string Email = "");

        Task<bool> ResendEmailConfirmationAsync(Guid UserId, string ReturnLink);

        Task<bool> SendForgotPwdEmailAsync(string email);

        Task<bool> ResetPasswordAsync(string Email, string Password);

        Task<bool?> IsLockedAsync(User user);

        Task<bool?> IsLockedAsync();

        Task<IEnumerable<UserListItemDto>> List(bool Disabled, params Permission[] chosenpermissions);

        Task<IEnumerable<UserSysAdminListItemDto>> SysAdminList();

        Task<bool> Remove(Guid UserId);

        Task<bool> Disable(Guid UserId, bool IsSysAdmin);

        Task<bool> Enable(Guid UserId, bool IsSysAdmin);

        string GenerateConfirmationCode(int length);

        Task<AuthDto> GetUserAuthAsync(User CurrentUser);
    }
}