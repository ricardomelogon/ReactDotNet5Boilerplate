import axios from 'axios';
import { ApiUrl } from '../constants/ApiSettings';
import { EmailConfig as EmailConfigRoute } from '../constants/ApiRoutes';
import { actionsAlert, actionsLoader } from '../redux/modules';

const getConfiguration = async (dispatch, callback, errorcallback) => {
  await axios.get(ApiUrl + EmailConfigRoute.GetConfiguration)
    .then(async data => {
      if (data && data.data && data.data.success) {
        if (callback) callback(data.data.data);
      }
      else {
        dispatch(actionsAlert.alert({
          Message: 'We were unable to get the email receiver at this moment',
          Text: data.data.message,
          Type: 'error',
          ConfirmCallback: () => {
            if (errorcallback) errorcallback();
            dispatch(actionsLoader.hideLoading());
          }
        }));
      }
    })
    .catch((err) => {
      dispatch(actionsAlert.alert({
        Message: 'Sorry!',
        Text: 'We were unable to get your configuration data',
        Type: 'error'
      }));
      return;
    });
}


//Update
const updateEmailInfo = async (dispatch, data, callback) => {
  dispatch(actionsLoader.loading());
  await axios({
    method: 'post',
    url: ApiUrl + EmailConfigRoute.Update,
    data: data
  }).then((data) => {
    if (data && data.data && data.data.success) {
      dispatch(actionsAlert.alert({
        Message: data.data.message,
        Type: 'success',
        ConfirmCallback: () => {
          if (callback) callback();
          dispatch(actionsLoader.hideLoading());
        },
      }));
    }
    else {
      dispatch(actionsAlert.alert({
        Message: 'We were unable to update your email configurations at this moment',
        Text: data.data.message,
        Type: 'error',
        ConfirmCallback: () => {
          dispatch(actionsLoader.hideLoading());
        },
      }));
    }
  }).catch((err) => {
    dispatch(actionsAlert.alert({
      Message: 'We were unable to update your email configurations',
      Text: 'Please reload the page and try again in a few moments',
      Type: 'error',
      ConfirmCallback: () => {
        dispatch(actionsLoader.hideLoading());
      },
    }));
    return;
  });
};

const errorLogService = {
  getConfiguration: getConfiguration,
  updateEmailInfo: updateEmailInfo
};

export default errorLogService;