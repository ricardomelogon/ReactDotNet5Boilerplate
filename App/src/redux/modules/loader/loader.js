import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const initialState = {
  Show: false,
};

export const loading = createAction('LOADING');

export const hideLoading = createAction('HIDE_LOADING');

export const actionsLoader = {
  loading: loading,
  hideLoading: hideLoading,
}

const reducer = handleActions(new Map([
  [loading, produce((state) => {
    state.Show = true;
  })],
  [hideLoading, produce((state) => {
    state.Show = false;
  })],
]), initialState);

export default reducer;