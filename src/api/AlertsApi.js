import axiosInstance from "../axiosInstance";
import { appendPathAjax } from "../constants";

export const fetchAlerts = data => {
    return axiosInstance.post(
      `${appendPathAjax}/RestApi/alert_list.php`,
      data
    );
  };

  export const setAlertActions = data => {
    return axiosInstance.post(
      `${appendPathAjax}/alerts_actions_android.php`,
      data
    );
  }