import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { PermissionActions } from "../../../permissions/Permissions";

const initialState = {
  Token: '',
  EmailConfirmed: false,
  Permissions: [],
  User: {
    Id: '',
    FirstName: '',
    LastName: '',
    Username: '',
    Email: '',
    PhoneNumber: '',
  },
};

export const authLogin = createAction('AUTH_LOGIN', (data) => ({
  email: data.email,
  firstName: data.firstName,
  id: data.id,
  lastName: data.lastName,
  phoneNumber: data.phoneNumber,
  token: data.token,
  username: data.username,
  emailConfirmed: data.emailConfirmed,
  permissions: data.permissions,
}));

export const confirmEmail = createAction('AUTH_CONFIRM_EMAIL');

export const authLogout = createAction('AUTH_LOGOUT');

export const authRegister = createAction('AUTH_REGISTER');

export const actionsAuth = {
  authLogin: authLogin,
  authRegister: authRegister,
  authLogout: authLogout,
  confirmEmail: confirmEmail,
}

const reducer = handleActions(new Map([
  [authLogin, produce((state, action) => {
    const payload = action.payload;
    state.Token = payload.token;
    state.User.Id = payload.id;
    state.User.FirstName = payload.firstName;
    state.User.LastName = payload.lastName;
    state.User.Username = payload.username;
    state.User.Email = payload.email;
    state.User.PhoneNumber = payload.phoneNumber;
    state.EmailConfirmed = !!payload.emailConfirmed;
    state.Permissions = PermissionActions.getUserPermissions(payload.permissions);
  })],
  [authLogout, produce((state) => {
    state.Token = ''; state.User.Id = ''; state.User.FirstName = ''; state.User.LastName = ''; state.User.Username = ''; state.User.Email = ''; state.User.PhoneNumber = ''; state.EmailConfirmed = false; state.Permissions = '';
  })],
  [confirmEmail, produce((state) => {
    state.EmailConfirmed = true;
  })],
]), initialState);

export default reducer;