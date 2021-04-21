import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  message: '',
  place: 'br',
  color: 'info',
  open: false,
  callback: null,
  closeBtn: false
};

export const toast = createAction('TOAST', (params) => ({
  message: params.message ?? '',
  place: params.place ?? 'br',
  color: params.color ?? 'info',
  open: params.open ?? true,
  callback: params.callback ?? null,
  closeBtn: params.closeBtn ?? true
}));

export const hideToast = createAction('HIDE_TOAST');

export const showToast = (dispatch, params, timer = 2000) => {
  dispatch(toast(params));
  setTimeout(() => {
    dispatch(hideToast());
  }, timer);
};

export const actionsToast = {
  toast: toast,
  hideToast: hideToast,
  showToast: showToast
}

const reducer = handleActions(new Map([
  [toast, produce((state, action) => {
    state.message = action.payload.message;
    state.place = action.payload.place;
    state.color = action.payload.color;
    state.open = action.payload.open;
    state.callback = action.payload.callback;
    state.closeBtn = action.payload.closeBtn;
  })],
  [hideToast, produce((state) => {
    state.message = '';
    state.place = 'br';
    state.color = 'info';
    state.open = false;
    state.callback = null;
    state.closeBtn = false;
  })],
]), initialState);

export default reducer;