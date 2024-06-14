import axiosInstance from '../axiosInstance';
import { appendPathAjax } from '../constants';

export const fetchProfile = data => {
  return axiosInstance.post(`${appendPathAjax}/user_form.php`, data);
};

export const updateProfile = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/update_user_profile.php`,
    data
  );
};

export const confirmCurrentPassword = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/confirm_password.php`,
    data
  );
};

export const updatePassword = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/change_password.php`,
    data
  );
};
