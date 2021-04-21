using API.Authorization;
using API.Data.Entities;
using System;
using System.Text.Json.Serialization;

namespace API.Dtos
{
    public class UserDto
    {
        public Guid? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public User ToUser()
        {
            return new User
            {
                Id = Id.GetValueOrDefault(),
                FirstName = FirstName,
                LastName = LastName,
                UserName = Username,
                Email = Email,
                PhoneNumber = PhoneNumber
            };
        }

        public static UserDto ToDto(User user)
        {
            return new UserDto
            {
                Email = user.Email,
                FirstName = user.FirstName,
                Id = user.Id,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Username = user.UserName
            };
        }
    }

    public class ForgotDto
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }

    public class ForgetPasswordSendEmailDto
    {
        [JsonPropertyName("returnLink")]
        public string ReturnLink { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }
    }

    public class ForgotPwdDto
    {
        public string Email { get; set; }

        public string ConfirmationCode { get; set; }

        public string NewPassword { get; set; }
    }

    public class AuthDto
    {
        public Guid? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Token { get; set; }
        public string Permissions { get; set; }
        public bool EmailConfirmed { get; set; }
    }

    public class EditUserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class ConfirmCodeStringDto
    {
        public string Data { get; set; }
    }

    public class ConfirmCodeDto
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("code")]
        public string Code { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }
    }

    public class DecryptCodeDto
    {
        public string Code { get; set; }
    }

    public class UserRegisterModelDto
    {
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("returnLink")]
        public string ReturnLink { get; set; }

        public User ToUser()
        {
            return new User
            {
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                Enabled = true,
                AccessFailedCount = 0,
                LockoutEnabled = true
            };
        }
    }

    public class UserRegisterEmployeeDto
    {
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("username")]
        public string UserName { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        public User ToUser()
        {
            return new User
            {
                FirstName = FirstName,
                LastName = LastName,
                UserName = UserName,
                Email = $"{Guid.NewGuid()}@noemail.com",
                EmailConfirmed = true,
                Enabled = true,
                AccessFailedCount = 0,
                LockoutEnabled = true
            };
        }
    }

    public class UserRegisterDto
    {
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("permission")]
        public Permission Permission { get; set; }

        [JsonPropertyName("returnLink")]
        public string ReturnLink { get; set; }

        public User ToUser()
        {
            return new User
            {
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                Enabled = true,
                AccessFailedCount = 0,
                LockoutEnabled = true
            };
        }
    }

    public class UserListItemDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Permissions { get; set; }
        public bool EmailConfirmed { get; set; }
        public Guid Id { get; set; }
    }

    public class UserSysAdminListItemDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public Guid Id { get; set; }
    }

    public class UserDepotEmployeeListItemDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Type { get; set; }
        public Guid Id { get; set; }
    }

    public class UserRegistrationResendEmailDto
    {
        [JsonPropertyName("id")]
        public Guid? Id { get; set; }

        [JsonPropertyName("returnLink")]
        public string ReturnLink { get; set; }
    }

    public class UserRemoveDto
    {
        [JsonPropertyName("id")]
        public Guid? Id { get; set; }
    }

    public class UserDepotEmployeeUpdateDto
    {
        [JsonPropertyName("password")]
        public string Password { get; set; }

        [JsonPropertyName("userId")]
        public Guid? UserId { get; set; }
    }
}