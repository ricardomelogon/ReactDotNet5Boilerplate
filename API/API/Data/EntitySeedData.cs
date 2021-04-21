using System;
using API.Authorization;
using API.Data.Entities;

namespace API.Data
{
    public static class EntitySeedData
    {
        public static EmailTemplate[] EmailTemplates()
        {
            return emailtemplates;
        }

        private readonly static EmailTemplate[] emailtemplates =
        {
            new EmailTemplate { Id = -2, Name = API.EmailTemplates.Account.RegistrationCode, Disabled = false, RowDate = DateTime.MinValue, Subject = "Welcome!", Body = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <head style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> </head> <body bgcolor=\"#f7f7f7\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: none;height: 100%;color: #676767;width: 100% !important;margin: 0 !important;\"> <table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"container-for-gmail-android\" width=\"100%\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;min-width: 600px;border-collapse: collapse !important;\"> <tbody style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td align=\"center\" valign=\"top\" width=\"100%\" style=\"background-color: #f7f7f7;font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 14px;color: #777777;text-align: center;line-height: 21px;border-collapse: collapse;padding: 20px 0 5px;\" class=\"content-padding\"> <center style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <table cellspacing=\"0\" cellpadding=\"0\" width=\"600\" class=\"w320\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;border-collapse: collapse !important;\"> <tbody style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"header-lg\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 32px;color: #4d4d4d;text-align: center;line-height: normal;border-collapse: collapse;font-weight: 700;padding: 35px 0 0;\"> <img src=\"https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;max-width: 600px;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;\"> </td></tr><tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"header-lg\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 32px;color: #4d4d4d;text-align: center;line-height: normal;border-collapse: collapse;font-weight: 700;padding: 35px 0 0;\"> Welcome! </td></tr><tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"free-text\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 14px;color: #777777;text-align: center;line-height: 21px;border-collapse: collapse;padding: 10px 60px 0px;width: 100% !important;\"> Hello{0}{1}! <br style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> Please click the link below to finalize your registration. </td></tr><tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"button\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 14px;color: #777777;text-align: center;line-height: 21px;border-collapse: collapse;padding: 30px 0;\"> <div style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"><!--[if mso]> <v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"http://\" style=\"height:45px;v-text-anchor:middle;width:155px;\" arcsize=\"15%\" strokecolor=\"#ffffff\" fillcolor=\"#296196\"> <w:anchorlock/> <center style=\"color:#ffffff;font-family:Helvetica, Arial, sans-serif;font-size:14px;font-weight:regular;\">Track Order</center> </v:roundrect><![endif]--><a href=\"{2}\" style=\"background-color:#623062;border-radius:5px;color:#ffffff;display:inline-block;font-family:'Cabin', Helvetica, Arial, sans-serif;font-size:14px;font-weight:regular;line-height:45px;text-align:center;text-decoration:none;width:155px;-webkit-text-size-adjust:none;mso-hide:all;\">Confirm Registration</a> </div></td></tr></tbody> </table> </center> </td></tr></tbody> </table> </body></html>" },
            new EmailTemplate { Id = -3, Name = API.EmailTemplates.Account.ForgotPassword, RowDate = DateTime.MinValue, Subject = "Forgot your password?", Body = "<!DOCTYPE html PUBLIC \\\"-//W3C//DTD XHTML 1.0 Transitional//EN\\\" \\\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\\"><html xmlns='http://www.w3.org/1999/xhtml' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><head style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><meta name='viewport' content='width=device-width,initial-scale=1' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'></head><body bgcolor='#f7f7f7' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;height:100%;color:#676767;width:100%!important;margin:0!important'><table align='center' cellpadding='0' cellspacing='0' class='container-for-gmail-android' width='100%' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;min-width:600px;border-collapse:collapse!important'><tbody style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td align='center' valign='top' width='100%' style='background-color:#f7f7f7;font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:14px;color:#777;text-align:center;line-height:21px;border-collapse:collapse;padding:20px 0 5px' class='content-padding'><center style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><table cellspacing='0' cellpadding='0' width='600' class='w320' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;border-collapse:collapse!important'><tbody style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='header-lg' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:32px;color:#4d4d4d;text-align:center;line-height:normal;border-collapse:collapse;font-weight:700;padding:35px 0 0'><img src='https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;max-width:600px;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic'></td></tr><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='header-lg' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:32px;color:#4d4d4d;text-align:center;line-height:normal;border-collapse:collapse;font-weight:700;padding:35px 0 0'>Forgot your Password?</td></tr><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='free-text' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:14px;color:#777;text-align:center;line-height:21px;border-collapse:collapse;padding:10px 60px 0;width:100%!important'>Hello{0}{1}!<br style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'>Please use the code below to confirm your account</td></tr><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='button' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:14px;color:#777;text-align:center;line-height:21px;border-collapse:collapse;padding:30px 0'><div style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><h2>{2}</h2></div></td></tr></tbody></table></center></td></tr></tbody></table></body></html>" },
        };

        public static EmailConfig[] EmailConfigs()
        {
            return emailconfigs;
        }

        private readonly static EmailConfig[] emailconfigs =
        {
            new EmailConfig { Id = -1, Active = true, Disabled = false, IsDefaultReceiver = false, DisplayName = "Sender", Email = "noreply@email.com", EnableSSL = true, Host = "smtp.host.com", IsDefaultSender = true, Password = "password", Port = 587, RowDate = DateTime.MinValue, UserName = "sender_username" },
            new EmailConfig { Id = -2, Active = true, Disabled = false, IsDefaultReceiver = true, DisplayName = "Receiver", Email = "receiver@email.com", EnableSSL = true, Host = "imap.host.com", IsDefaultSender = false, Password = "password", Port = 993, RowDate = DateTime.MinValue, UserName = "receiver_username" }
        };

        public static Permissions[] Permissions()
        {
            return permissions;
        }

        private readonly static Permissions[] permissions =
        {
            new Permissions { Id = -2, Name = "Locked", Group="System", Value = (ushort)Permission.Locked, RowDate = DateTime.MinValue, Description = "Locked or Error" },
            new Permissions { Id = -1, Name = "AccessAll", Group="System", Value = (ushort)Permission.AccessAll, RowDate = DateTime.MinValue, Description = "This allows the user to access every feature and bypasses every restriction" },
            new Permissions { Id = 1, Name = "System Administrator", Group="System", Value = (ushort)Permission.SystemAdmin, RowDate = DateTime.MinValue, Description = "Administrator" },
            new Permissions { Id = 2, Name = "Administrator", Group="Administrator", Value = (ushort)Permission.Administrator, RowDate = DateTime.MinValue, Description = "Administrator" },
            new Permissions { Id = 3, Name = "Client", Group="Client", Value = (ushort)Permission.Client, RowDate = DateTime.MinValue, Description = "Client" },
        };

        public static User[] Users()
        {
            return users;
        }

        private readonly static User[] users =
        {
            //Admin Password: Admin@1010
            new User { Id = new Guid("f8684da2-4887-4288-b841-af07477a54d1"), Email="admin@admin.com", FirstName = "CC", LastName = "API", EmailConfirmed = true, Enabled = true, LockoutEnabled = false, PasswordHash = "AQAAAAEAACcQAAAAEFP/5y7mPRDa2ZUjfLkwZ9M9kBq8f9gbHhuD7pdJxOO5SjT3kSVdexrbDNg0gUnRhw==", RowDate = DateTime.MinValue, AccessFailedCount = 0, NormalizedEmail = "ADMIN@ADMIN.COM", NormalizedUserName = "ADMIN@ADMIN.COM", SecurityStamp = "OYMY4LSEJV7NWVIQRYBDZ4FMP5F5BTCA", UserName = "admin@admin.com", RevokeCode = "b2f9f7e6-08c7-4ee8-8987-0416ffae2640" }
        };

        public static UserPermissions[] UserPermissions()
        {
            return userPermissions;
        }

        private readonly static UserPermissions[] userPermissions =
        {
            new UserPermissions{Id = -1, PermissionsId = -1, UserId = new Guid("f8684da2-4887-4288-b841-af07477a54d1"), RowDate = DateTime.MinValue },
            new UserPermissions{Id = -2, PermissionsId = -2, UserId = new Guid("f8684da2-4887-4288-b841-af07477a54d1"), RowDate = DateTime.MinValue }
        };

        public static Subscription[] Subscriptions()
        {
            return subscriptions;
        }

        private readonly static Subscription[] subscriptions =
        {
            new Subscription{ Id = 1, Date = DateTime.UtcNow.AddDays(30), Disabled = false, RowDate = DateTime.MinValue }
        };
    }
}