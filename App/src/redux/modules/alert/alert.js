import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  Message: '',
  Text: '',
  Show: false,
  Type: 'default',
  Confirm: false,
  ConfirmCallback: null,
  CancelCallback: null,
  ConfirmBtnText: 'Ok',
  CancelBtnText: 'Cancel',
  CancelBtnClass: '',
  ConfirmBtnClass: 'primary',
};

export const alert = createAction('ALERT', (params) => ({
  Message: params.Message ?? '',
  Show: params.Show ?? true,
  Type: params.Type ?? 'default',
  Text: params.Text ?? '',
  Confirm: params.Confirm ?? false,
  ConfirmCallback: params.ConfirmCallback ?? null,
  CancelCallback: params.CancelCallback ?? null,
  ConfirmBtnText: params.ConfirmBtnText ?? 'Ok',
  CancelBtnText: params.CancelBtnText ?? 'Cancel',
  CancelBtnClass: params.CancelBtnClass ?? '',
  ConfirmBtnClass: params.ConfirmBtnClass ?? 'primary'
}));

export const hideAlert = createAction('HIDE_ALERT');

export const actionsAlert = {
  alert: alert,
  hideAlert: hideAlert,
}

const reducer = handleActions(new Map([
  [alert, produce((state, action) => {
    state.Message = action.payload.Message;
    state.Text = action.payload.Text;
    state.Show = action.payload.Show;
    state.Type = action.payload.Type;
    state.Confirm = action.payload.Confirm;
    state.CancelCallback = action.payload.CancelCallback;
    state.ConfirmCallback = action.payload.ConfirmCallback;
    state.ConfirmBtnText = action.payload.ConfirmBtnText;
    state.CancelBtnText = action.payload.CancelBtnText;
    state.CancelBtnClass = action.payload.CancelBtnClass;
    state.ConfirmBtnClass = action.payload.ConfirmBtnClass;
  })],
  [hideAlert, produce((state) => {
    state.Message = '';
    state.Text = '';
    state.Show = false;
    state.Type = '';
    state.Confirm = false;
    state.CancelCallback = null;
    state.ConfirmCallback = null;
    state.ConfirmBtnText = 'Ok';
    state.CancelBtnText = 'Cancel';
    state.CancelBtnClass = '';
    state.ConfirmBtnClass = 'primary';
  })],
]), initialState);

export default reducer;