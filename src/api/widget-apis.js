import axiosInstance from '../axiosInstance';
import { appendPathAjax } from '../constants';

export const addWidget = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/add_widget.php`, {
    ...data,
    btnSubmit: 'Save',
  });
};

export const deleteWidget = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/delete_widget.php`,
    data
  );
};

export const fetchLegents = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/get_chart_legends.php`,
    data
  );
};
export const wireFrameAddwidget = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/add_widget.php`, {
    ...data,
    btnSubmit: 'Save',
  });
};
export const fetchWidgetData = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/dashboard_widget_data.php`,
    data
  );
};
