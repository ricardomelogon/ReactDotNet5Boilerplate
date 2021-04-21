export const User = {
  Auth: '/user/auth',
  GoogleAuth: '/user/googleauth',
  FacebookAuth: '/user/facebookauth',
  RefreshToken: '/user/refresh',
  RegisterSysAdmin: '/user/registersysadmin',
  ForgotPasswordSendCode: '/user/forgotpwdsendcode',
  ForgotPasswordConfirmCode: '/user/forgotpwdconfirm',
  RevokeAccess: '/user/revoke',
  ConfirmEmail: '/user/confirmemail',
  ResendEmailConfirmationCode: '/user/resendconfirm',
  UpdateUser: '/user/update',
  DecryptConfirmationToken: '/user/decryptconfirmationtoken',
  List: '/user/list',
  SysAdminList: '/user/sysadminlist',
  Remove: '/user/remove',
  Disable: '/user/disable',
  Enable: '/user/enable',
  GetById: '/user/get',
};

export const ErrorLog = {
  List: '/errorlog/list',
};

export const EmailConfig = {
  GetConfiguration: '/emailconfig/getconfiguration',
  Update: '/emailconfig/update',
};