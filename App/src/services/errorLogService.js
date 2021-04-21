import axios from 'axios';
import { ApiUrl } from '../constants/ApiSettings';
import { ErrorLog as ErrorLogRoute } from '../constants/ApiRoutes';
import { actionsAlert, actionsLoader } from '../redux/modules';

const getErrorLogs = async (dispatch, callback, errorcallback) => {
  await axios.get(ApiUrl + ErrorLogRoute.List)
    .then(async data => {
      if (data && data.data && data.data.success) {
        if (callback) callback(data.data.data);
      }
      else {
        dispatch(actionsAlert.alert({
          Message: 'We were unable to get the error list at this moment',
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
        Text: 'We were unable to send a new confirmation code at this moment',
        Type: 'error'
      }));
      return;
    });
}


const errorLogService = {
  getErrorLogs: getErrorLogs
};

export default errorLogService;