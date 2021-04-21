import axios from 'axios';
import { User as UserRoute } from '../../constants/ApiRoutes';
import { ApiUrl } from '../../constants/ApiSettings';
import { actionsAuth } from '../../redux/modules';

/*

Based off of https://gist.github.com/Godofbrowser/bf118322301af3fc334437c683887c5f

*/

const interceptor = (storeAPI) => {
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    })

    failedQueue = [];
  }

  axios.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const state = storeAPI.getState();
    const dispatch = storeAPI.dispatch;
    const originalRequest = error.config;

    if (error && error.response && error.response.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        try {
          const token = await new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers['Authorization'] = 'bearer ' + token;
          return axios(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        let data = { idToken: state.auth.Token };
        axios.post(ApiUrl + UserRoute.RefreshToken, data)
          .then(({ data }) => {
            dispatch(actionsAuth.authLogin(data.data));
            axios.defaults.headers.common['Authorization'] = 'bearer ' + data.token;
            originalRequest.headers['Authorization'] = 'bearer ' + data.token;
            processQueue(null, data.token);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
            dispatch(actionsAuth.authLogout());
          })
          .finally(() => { isRefreshing = false })
      })
    }
  });

  axios.interceptors.request.use(
    async (config) => {
      const state = storeAPI.getState();
      config.headers.Authorization = `bearer ${state.auth.Token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default {
  interceptor,
};