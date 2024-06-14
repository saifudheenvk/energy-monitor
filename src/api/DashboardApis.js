import axiosInstance from '../axiosInstance';
import { appendPathAjax } from '../constants';

export const fetchAllDashboards = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/dashboard_list.php`,
    data
  );
};
export const addDashboards = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/add_dashboard.php`,
    data
  );
};

export const fetchDashboard = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/widget_list.php`, data);
};

export const fetchDashboardWidgetList = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/dashboard_widget_list.php`, data);
};

export const fetchLiveData = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/get_widget_by_id.php`,
    data
  );
};

export const fetchFavoritedDashboards = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/favourited_dashboard_widget.php`,
    data
  );
};
export const deleteDashboard = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/delete_dashboard.php`,
    data
  );
};
