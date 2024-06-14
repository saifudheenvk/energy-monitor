import axiosInstance from "../axiosInstance";
import { appendPathAjax } from '../constants';

export const login = data => {
  return axiosInstance.post( `${appendPathAjax}/login_page.php`, data);
};

export const forgetPassword = data => {
  return axiosInstance.post( `${appendPathAjax}/pwd_req_form.php`, data);
}