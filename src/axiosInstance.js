import axios from 'axios';
import * as queryString from 'querystring';
import { message } from 'antd';

import { baseUrl, callerId, appendPathAjax } from './constants';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axios.defaults.timeout = 2500;
const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled
    ? false
    : true;
};
const requestHandler = request => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    const { data, url } = request;
    if (data) {
      data['CallerId'] = callerId;
      const userCredentials = localStorage.getItem('userCredentials');
      if (userCredentials) {
        const userAccessDetails = JSON.parse(userCredentials);
        const { UserToken } = userAccessDetails;
        data['UserToken'] = UserToken;
        if (url === `${appendPathAjax}/logout.php`) {
          const { UserId, Username, LoggedInIp } = userAccessDetails;
          data['UserId'] = UserId;
          data['Username'] = Username;
          data['LoggedInIp'] = LoggedInIp;
        }
      }
      request.data = queryString.stringify({ ...data });
    }
  }
  return request;
};
axiosInstance.interceptors.request.use(request => requestHandler(request));
const errorHandler = error => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }
  return Promise.reject({ ...error });
};

const successHandler = response => {
  if (isHandlerEnabled(response.config)) {
    if (!response) message.error('Something went wrong at server side!');
    // handle success response
    const { data, status } = response;
    if (status == 500) {
      message.error('Something went wrong at server side');
    } else {
      if (data && data.status === 401) {
        localStorage.clear();
        window.location.replace('/login');
      }
    }
  }
  return response;
};
axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

export default axiosInstance;
