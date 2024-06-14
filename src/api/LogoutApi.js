import axiosInstance from "../axiosInstance";

import { appendPathAjax } from '../constants';

export const logout = data => {
  console.log("req data", data);
  return axiosInstance.post(`${appendPathAjax}/logout.php`, data);
};
