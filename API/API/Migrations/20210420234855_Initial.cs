using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ConfirmationCode = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RowDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Enabled = table.Column<bool>(type: "boolean", nullable: false),
                    RevokeCode = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmailConfigs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DisplayName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Password = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Host = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Port = table.Column<int>(type: "integer", maxLength: 100, nullable: false),
                    UserName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    IsDefaultReceiver = table.Column<bool>(type: "boolean", nullable: false),
                    EnableSSL = table.Column<bool>(type: "boolean", nullable: false),
                    IsDefaultSender = table.Column<bool>(type: "boolean", nullable: false),
                    Active = table.Column<bool>(type: "boolean", nullable: true),
                    RowDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailConfigs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmailTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Body = table.Column<string>(type: "text", nullable: true),
                    Subject = table.Column<string>(type: "text", nullable: true),
                    RowDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmailTemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Value = table.Column<int>(type: "integer", nullable: false),
                    Group = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Code = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: true),
                    ParentCodes = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Parents = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RowDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subscription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    RowDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscription", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ErrorLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Log = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    Method = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Path = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    RowDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErrorLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ErrorLogs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserPermissions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    PermissionsId = table.Column<int>(type: "integer", nullable: false),
                    RowDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Disabled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPermissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPermissions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserPermissions_Permissions_PermissionsId",
                        column: x => x.PermissionsId,
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "ConfirmationCode", "Email", "EmailConfirmed", "Enabled", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RevokeCode", "RowDate", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { new Guid("f8684da2-4887-4288-b841-af07477a54d1"), 0, "b141bd8d-ead0-4e13-af3c-f64cf23d8e62", null, "admin@admin.com", true, true, "CC", "API", false, null, "ADMIN@ADMIN.COM", "ADMIN@ADMIN.COM", "AQAAAAEAACcQAAAAEFP/5y7mPRDa2ZUjfLkwZ9M9kBq8f9gbHhuD7pdJxOO5SjT3kSVdexrbDNg0gUnRhw==", null, false, "b2f9f7e6-08c7-4ee8-8987-0416ffae2640", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "OYMY4LSEJV7NWVIQRYBDZ4FMP5F5BTCA", false, "admin@admin.com" });

            migrationBuilder.InsertData(
                table: "EmailConfigs",
                columns: new[] { "Id", "Active", "Disabled", "DisplayName", "Email", "EnableSSL", "Host", "IsDefaultReceiver", "IsDefaultSender", "Password", "Port", "RowDate", "UserName" },
                values: new object[,]
                {
                    { -1, true, false, "Sender", "noreply@email.com", true, "smtp.host.com", false, true, "password", 587, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "sender_username" },
                    { -2, true, false, "Receiver", "receiver@email.com", true, "imap.host.com", true, false, "password", 993, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "receiver_username" }
                });

            migrationBuilder.InsertData(
                table: "EmailTemplates",
                columns: new[] { "Id", "Body", "Disabled", "Name", "RowDate", "Subject" },
                values: new object[,]
                {
                    { -2, "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <head style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> </head> <body bgcolor=\"#f7f7f7\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;-webkit-font-smoothing: antialiased;-webkit-text-size-adjust: none;height: 100%;color: #676767;width: 100% !important;margin: 0 !important;\"> <table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"container-for-gmail-android\" width=\"100%\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;min-width: 600px;border-collapse: collapse !important;\"> <tbody style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td align=\"center\" valign=\"top\" width=\"100%\" style=\"background-color: #f7f7f7;font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 14px;color: #777777;text-align: center;line-height: 21px;border-collapse: collapse;padding: 20px 0 5px;\" class=\"content-padding\"> <center style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <table cellspacing=\"0\" cellpadding=\"0\" width=\"600\" class=\"w320\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;border-collapse: collapse !important;\"> <tbody style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"header-lg\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 32px;color: #4d4d4d;text-align: center;line-height: normal;border-collapse: collapse;font-weight: 700;padding: 35px 0 0;\"> <img src=\"https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;max-width: 600px;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;\"> </td></tr><tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"header-lg\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 32px;color: #4d4d4d;text-align: center;line-height: normal;border-collapse: collapse;font-weight: 700;padding: 35px 0 0;\"> Welcome! </td></tr><tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"free-text\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 14px;color: #777777;text-align: center;line-height: 21px;border-collapse: collapse;padding: 10px 60px 0px;width: 100% !important;\"> Hello{0}{1}! <br style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> Please click the link below to finalize your registration. </td></tr><tr style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"> <td class=\"button\" style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;font-size: 14px;color: #777777;text-align: center;line-height: 21px;border-collapse: collapse;padding: 30px 0;\"> <div style=\"font-family: 'Oxygen', 'Helvetica Neue', 'Arial', 'sans-serif' !important;\"><!--[if mso]> <v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"http://\" style=\"height:45px;v-text-anchor:middle;width:155px;\" arcsize=\"15%\" strokecolor=\"#ffffff\" fillcolor=\"#296196\"> <w:anchorlock/> <center style=\"color:#ffffff;font-family:Helvetica, Arial, sans-serif;font-size:14px;font-weight:regular;\">Track Order</center> </v:roundrect><![endif]--><a href=\"{2}\" style=\"background-color:#623062;border-radius:5px;color:#ffffff;display:inline-block;font-family:'Cabin', Helvetica, Arial, sans-serif;font-size:14px;font-weight:regular;line-height:45px;text-align:center;text-decoration:none;width:155px;-webkit-text-size-adjust:none;mso-hide:all;\">Confirm Registration</a> </div></td></tr></tbody> </table> </center> </td></tr></tbody> </table> </body></html>", false, "Account.RegistrationCode", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Welcome!" },
                    { -3, "<!DOCTYPE html PUBLIC \\\"-//W3C//DTD XHTML 1.0 Transitional//EN\\\" \\\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\\"><html xmlns='http://www.w3.org/1999/xhtml' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><head style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><meta name='viewport' content='width=device-width,initial-scale=1' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'></head><body bgcolor='#f7f7f7' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;height:100%;color:#676767;width:100%!important;margin:0!important'><table align='center' cellpadding='0' cellspacing='0' class='container-for-gmail-android' width='100%' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;min-width:600px;border-collapse:collapse!important'><tbody style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td align='center' valign='top' width='100%' style='background-color:#f7f7f7;font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:14px;color:#777;text-align:center;line-height:21px;border-collapse:collapse;padding:20px 0 5px' class='content-padding'><center style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><table cellspacing='0' cellpadding='0' width='600' class='w320' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;border-collapse:collapse!important'><tbody style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='header-lg' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:32px;color:#4d4d4d;text-align:center;line-height:normal;border-collapse:collapse;font-weight:700;padding:35px 0 0'><img src='https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo4.png' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;max-width:600px;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic'></td></tr><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='header-lg' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:32px;color:#4d4d4d;text-align:center;line-height:normal;border-collapse:collapse;font-weight:700;padding:35px 0 0'>Forgot your Password?</td></tr><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='free-text' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:14px;color:#777;text-align:center;line-height:21px;border-collapse:collapse;padding:10px 60px 0;width:100%!important'>Hello{0}{1}!<br style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'>Please use the code below to confirm your account</td></tr><tr style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><td class='button' style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important;font-size:14px;color:#777;text-align:center;line-height:21px;border-collapse:collapse;padding:30px 0'><div style='font-family:Oxygen,&#39;Helvetica Neue&#39;,Arial,sans-serif!important'><h2>{2}</h2></div></td></tr></tbody></table></center></td></tr></tbody></table></body></html>", false, "Account.ForgotPassword", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Forgot your password?" }
                });

            migrationBuilder.InsertData(
                table: "Permissions",
                columns: new[] { "Id", "Code", "Description", "Disabled", "Group", "Name", "ParentCodes", "Parents", "RowDate", "Value" },
                values: new object[,]
                {
                    { -2, null, "Locked or Error", false, "System", "Locked", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0 },
                    { -1, null, "This allows the user to access every feature and bypasses every restriction", false, "System", "AccessAll", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 65535 },
                    { 1, null, "Administrator", false, "System", "System Administrator", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, null, "Administrator", false, "Administrator", "Administrator", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 3 },
                    { 3, null, "Client", false, "Client", "Client", null, null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 }
                });

            migrationBuilder.InsertData(
                table: "Subscription",
                columns: new[] { "Id", "Date", "Disabled", "RowDate" },
                values: new object[] { 1, new DateTime(2021, 5, 20, 23, 48, 54, 920, DateTimeKind.Utc).AddTicks(8852), false, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.InsertData(
                table: "UserPermissions",
                columns: new[] { "Id", "Disabled", "PermissionsId", "RowDate", "UserId" },
                values: new object[,]
                {
                    { -1, false, -1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("f8684da2-4887-4288-b841-af07477a54d1") },
                    { -2, false, -2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new Guid("f8684da2-4887-4288-b841-af07477a54d1") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_Email",
                table: "AspNetUsers",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserName",
                table: "AspNetUsers",
                column: "UserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmailTemplates_Name",
                table: "EmailTemplates",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ErrorLogs_UserId",
                table: "ErrorLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Permissions_Name",
                table: "Permissions",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_PermissionsId_UserId",
                table: "UserPermissions",
                columns: new[] { "PermissionsId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserPermissions_UserId",
                table: "UserPermissions",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "EmailConfigs");

            migrationBuilder.DropTable(
                name: "EmailTemplates");

            migrationBuilder.DropTable(
                name: "ErrorLogs");

            migrationBuilder.DropTable(
                name: "Subscription");

            migrationBuilder.DropTable(
                name: "UserPermissions");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Permissions");
        }
    }
}
