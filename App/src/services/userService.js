import { User as UserRoute } from '../constants/ApiRoutes';
import { ApiUrl } from '../constants/ApiSettings';
import axios from 'axios';
import { call } from "./config/axiosCalls";
import { actionsAlert, actionsAuth, actionsLoader } from '../redux/modules';

import { isEmail } from '../helpers/regexHelpers';
import * as AuthStatus from '../constants/AuthStatus';

//Email Confirm

const resendEmailConfirmationCode = async (dispatch, data) => {
  await axios({
    method: 'post',
    url: ApiUrl + UserRoute.ResendEmailConfirmationCode,
    data: data
  }).then((response) => {
    if (response && response.data && response.data.success) {
      dispatch(actionsAlert.alert({
        Message: response.data.message,
        Text: 'All previous codes have been revoked.',
        Type: 'success'
      }));
    }
    else {
      dispatch(actionsAlert.alert({
        Message: response.data.message,
        Type: 'error'
      }));
    }
  }).catch((err) => {
    dispatch(actionsAlert.alert({
      Message: 'Sorry!',
      Text: 'We were unable to send a new confirmation code at this moment',
      Type: 'error'
    }));
    return;
  });
};

const createPassword = async (dispatch, data, callback) => {
  await axios({
    method: 'post',
    url: ApiUrl + UserRoute.ConfirmEmail,
    data: {
      Data: JSON.stringify(data)
    }
  }).then((response) => {
    if (response && response.data && response.data.success) {
      if (callback) callback(response.data.message);
    }
    else {
      dispatch(actionsAlert.alert({
        Message: 'We were unable to create your password at this moment',
        Type: 'error'
      }));
    }
  }).catch((err) => {
    console.log(err);
    dispatch(actionsAlert.alert({
      Message: 'We were unable to create your password at this moment',
      Text: 'Please try again later or contact us if the problem persists',
      Type: 'error'
    }));
    return;
  });
};

const decryptConfirmationToken = async (dispatch, code, callback) => {
  await axios({
    method: 'post',
    url: ApiUrl + UserRoute.DecryptConfirmationToken,
    data: {
      Code: code
    }
  }).then((response) => {
    if (response && response.data && response.data.success) {
      if (callback) callback(response.data.data);
    }
    else {
      dispatch(actionsAlert.alert({
        Message: 'We were unable to confirm your email at this moment',
        Text: 'Please try again later or contact us if the problem persists',
        Type: 'error'
      }));
    }
  }).catch((err) => {
    console.log(err);
    dispatch(actionsAlert.alert({
      Message: 'We were unable to confirm your email at this moment',
      Text: 'Please try again later or contact us if the problem persists',
      Type: 'error'
    }));
    return;
  });
};

//Password Reset

const resetPasswordEmailCode = async (dispatch, email) => {
  await axios({
    method: 'post',
    url: ApiUrl + UserRoute.ForgotPasswordSendCode,
    data: {
      Email: email
    },
  }).then((response) => {
    if (response && response.data && response.data.success) {
      dispatch(actionsAlert.alert({
        Message: response.data.message,
        Text: 'Please check your email for your new confirmation code. All previous codes have been revoked.',
        Type: 'success'
      }));
    }
    else {
      dispatch(actionsAlert.alert({
        Message: 'Sorry!',
        Text: 'We were unable to send a new confirmation code at this moment',
        Type: 'error'
      }));
    }
  }).catch((err) => {
    dispatch(actionsAlert.alert({
      Message: 'Sorry!',
      Text: 'We were unable to send a new confirmation code at this moment',
      Type: 'error'
    }));
    return;
  });
};

const resetPassword = async (dispatch, history, data) => {
  await axios({
    method: 'post',
    url: ApiUrl + UserRoute.ForgotPasswordConfirmCode,
    data: data,
  }).then((response) => {
    if (response && response.data && response.data.success) {
      dispatch(actionsAlert.alert({
        Message: response.data.message,
        Type: 'success',
        ConfirmCallback: () => { history.push('/auth/login'); },
      }));
    }
    else {
      let Message = 'We were unable to reset your password at this moment';
      if (response && response.data && response.data.message) Message = response.data.message;
      dispatch(actionsAlert.alert({
        Message: Message,
        Text: 'Please be sure the code is corretly typed with no extra spaces and it is the latest one we have sent you',
        Type: 'error'
      }));
    }
  }).catch((err) => {
    dispatch(actionsAlert.alert({
      Message: 'We were unable to confirm your code at this moment',
      Text: 'Please be sure the code is corretly typed with no extra spaces and it is the latest one we have sent you',
      Type: 'error'
    }));
    return;
  });
};

//Login

export const authForm = async (dispatch, args) => {
  let Userkey = isEmail(args.Email) ? 'Email' : 'Username';
  let data = {};
  data['Password'] = args.Password;
  data[Userkey] = args.Email;
  await AuthExecute(dispatch, UserRoute.Auth, data);
  if (args.Callback) args.Callback();
};

export const authSocial = async (dispatch, idToken, route) => {
  let data = { idToken: idToken };
  await AuthExecute(dispatch, route, data);
};

const AuthExecute = async (dispatch, route, data) => {
  var response = await axios({
    method: 'post',
    url: ApiUrl + route,
    data: data,
  }).catch((err) => {
    response = false;
    if (!err || !err.response || !err.response.data || !err.response.data.status || err.response.data.status === AuthStatus.Error) {
      dispatch(actionsAlert.alert({
        Message: 'Sorry!',
        Text: 'We were unable to log you in at this moment',
      }));
      return;
    }
    let Status = err.response.data.status;
    if (Status === AuthStatus.NoUsernameOrEmail) dispatch(actionsAlert.alert({ Message: 'Please enter a valid Username or Email' }));
    if (Status === AuthStatus.PasswordRequired) dispatch(actionsAlert.alert({ Message: 'Please enter a valid Password' }));
    if (Status === AuthStatus.LoginInvalid) dispatch(actionsAlert.alert({ Message: 'Wrong Username/Email or Password' }));
    if (Status === AuthStatus.NoEmail) dispatch(actionsAlert.alert({ Message: 'Sorry!', Text: 'We were unable to validate your email' }));
    if (Status === AuthStatus.UserLocked) dispatch(actionsAlert.alert({ Message: 'This account has been suspended', Text: 'If you believe this is an error, please contact us through our support channel' }));
  });
  if (!!response) {
    dispatch(actionsAuth.authLogin(response.data.data));
  }
  else {
    dispatch(actionsAlert.alert({ Message: 'Sorry!', Text: 'We were unable to log you in at this moment' }));
  }
};

export const refreshAuth = idToken => async dispatch => {
  let data = { idToken: idToken };
  var response = await axios({
    method: 'post',
    url: ApiUrl + UserRoute.RefreshToken,
    data: data,
  }).catch((err) => {
    response = false;
  });
  if (response) dispatch(actionsAuth.authLogin(response.data.data));
};

//Register
export const registerSystemAdmin = async (dispatch, data, callback, errorCallback) => {
  await axios({
    method: 'post',
    url: ApiUrl + UserRoute.RegisterSysAdmin,
    data: data,
  }).then((response) => {
    if (response && response.data && response.data.success) {
      dispatch(actionsAlert.alert({
        Message: response.data.message,
        Type: 'success',
        Text: 'A message has been sent to the email provided with instructions to proceed.',
        ConfirmCallback: () => { if (callback) callback(); },
      }));
    }
    else {
      let Text = '';
      if (response && response.data && response.data.status) {
        if (response.data.status === AuthStatus.NoEmail) Text = 'Given email not valid';
        if (response.data.status === AuthStatus.EmailTaken) Text = 'Given email is already registered';
      }
      dispatch(actionsAlert.alert({
        Message: 'We were unable to register this user at this moment',
        Text: Text,
        Type: 'error',
        ConfirmCallback: () => { if (errorCallback) errorCallback(); }
      }));
    }
  }).catch((err) => {
    dispatch(actionsAlert.alert({
      Message: 'We were unable to register this user at this moment',
      Type: 'error',
      ConfirmCallback: () => { if (errorCallback) errorCallback(); }
    }));
    return;
  });
};

//User List
const getSysAdmins = async (dispatch, callback, errorcallback) => {
  await axios({
    method: 'get',
    url: ApiUrl + UserRoute.SysAdminList,
  }).then((data) => {
    if (data && data.data && data.data.success) {
      if (callback) callback(data.data.data);
    }
    else {
      dispatch(actionsAlert.alert({
        Message: 'We were unable to get the system administrator list at this moment',
        Text: data.data.message,
        Type: 'error',
        ConfirmCallback: () => {
          if (errorcallback) errorcallback();
          dispatch(actionsLoader.hideLoading());
        }
      }));
    }
  }).catch((err) => {
    dispatch(actionsAlert.alert({
      Message: 'We were unable to get the system administrator list at this moment',
      Text: 'Please try again in a few moments',
      Type: 'error',
      ConfirmCallback: () => {
        if (errorcallback) errorcallback();
        dispatch(actionsLoader.hideLoading());
      }
    }));
    return;
  });
}

const removeUser = async (dispatch, id, callback) => {
  await axios({
    method: 'post',
    url: ApiUrl + UserRoute.Remove,
    data: {
      id: id
    }
  }).then((response) => {
    if (response && response.data && response.data.success) {
      dispatch(actionsAlert.alert({
        Message: response.data.message,
        Type: 'success',
        ConfirmCallback: () => { if (callback) callback(); }
      }));
    }
    else {
      dispatch(actionsAlert.alert({
        Message: response.data.message,
        Type: 'error'
      }));
    }
  }).catch((err) => {
    dispatch(actionsAlert.alert({
      Message: 'Sorry!',
      Text: 'We were unable to remove this user at the moment',
      Type: 'error'
    }));
    return;
  });
};

const disableUser = async (dispatch, data, callback) => await call({
  dispatch: dispatch,
  data: data,
  route: UserRoute.Disable,
  callback: callback,
  errorMessage: 'We were unable to disable this user at this moment',
  showErrorMessage: true,
  showSuccessMessage: true,
});

const enableUser = async (dispatch, data, callback) => await call({
  dispatch: dispatch,
  data: data,
  route: UserRoute.Enable,
  callback: callback,
  errorMessage: 'We were unable to enable this user at this moment',
  showErrorMessage: true,
  showSuccessMessage: true,
});

const userService = {
  resendEmailConfirmationCode: resendEmailConfirmationCode,
  decryptConfirmationToken: decryptConfirmationToken,
  resetPassword: resetPassword,
  resetPasswordEmailCode: resetPasswordEmailCode,
  authForm: authForm,
  authSocial: authSocial,
  refreshAuth: refreshAuth,
  registerSystemAdmin: registerSystemAdmin,
  createPassword: createPassword,
  getSysAdmins: getSysAdmins,
  removeUser: removeUser,
  disableUser: disableUser,
  enableUser: enableUser,
};

export default userService;