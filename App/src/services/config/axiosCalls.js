import axios from 'axios';
import PropTypes from "prop-types";
import { ApiUrl } from '../../constants/ApiSettings';
import { actionsAlert, actionsLoader } from '../../redux/modules';

export async function call({
  dispatch,
  data,
  params,
  route,
  callback,
  errorcallback,
  errorMessage = "We were unable to execute this action",
  successMessage = "Operation completed successfully",
  showSuccessMessage = false,
  showErrorMessage = false,
  showLoader = true,
  method = 'post'
}) {
  if (showLoader) dispatch(actionsLoader.loading());
  await axios({
    method: method,
    url: `${ApiUrl}${route}`,
    data: data,
    params: params
  }).then((data) => {
    if (data && data.data && data.data.success) {
      if (showSuccessMessage) {
        dispatch(actionsAlert.alert({
          Message: successMessage,
          Text: data.data.message,
          Type: 'success',
          ConfirmCallback: () => {
            if (callback) callback();
            if (showLoader) dispatch(actionsLoader.hideLoading());
          }
        }));
      }
      else {
        if (callback) callback(data.data.data);
        if (showLoader) dispatch(actionsLoader.hideLoading());
      }
    }
    else {
      if (showErrorMessage) {
        dispatch(actionsAlert.alert({
          Message: errorMessage,
          Text: data?.data.message,
          Type: 'error',
          ConfirmCallback: () => {
            if (errorcallback) errorcallback();
            if (showLoader) dispatch(actionsLoader.hideLoading());
          }
        }));
      }
      else {
        if (errorcallback) errorcallback();
        if (showLoader) dispatch(actionsLoader.hideLoading());
      }
    }
  }).catch((err) => {
    console.log(err);
    if (showErrorMessage) {
      dispatch(actionsAlert.alert({
        Message: errorMessage,
        Text: 'Please reload and try again in a few moments',
        Type: 'error',
        ConfirmCallback: () => {
          if (errorcallback) errorcallback();
          if (showLoader) dispatch(actionsLoader.hideLoading());
        }
      }));
    }
    else {
      if (errorcallback) errorcallback();
      if (showLoader) dispatch(actionsLoader.hideLoading());
    }
    return;
  });
};

export async function request({
  dispatch,
  data,
  params,
  route,
  showLoader = true,
  method = 'post'
}) {
  if (showLoader) dispatch(actionsLoader.loading());
  await axios({
    method: method,
    url: `${ApiUrl}${route}`,
    data: data,
    params: params
  }).then((data) => {
    return data.data;
  }).catch((err) => {
    console.log(err);
    return data.data;
  });
};

call.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.any,
  params: PropTypes.any,
  route: PropTypes.string,
  callback: PropTypes.func,
  errorcallback: PropTypes.func,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  showSuccessMessage: PropTypes.bool,
  showErrorMessage: PropTypes.bool,
  showLoader: PropTypes.bool,
  method: PropTypes.oneOf([
    "POST",
    "GET",
    "PUT",
    "PATCH",
    "DELETE",
  ]),
}

request.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.any,
  params: PropTypes.any,
  route: PropTypes.string,
  showLoader: PropTypes.bool,
  method: PropTypes.oneOf([
    "POST",
    "GET",
    "PUT",
    "PATCH",
    "DELETE",
  ]),
}