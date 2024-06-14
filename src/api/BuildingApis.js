import axiosInstance from '../axiosInstance';
import { appendPathAjax } from '../constants';

export const fetchBuildings = data => {
  return axiosInstance.post(
    `${appendPathAjax}/datatable/building_datatable.php`,
    data
  );
};
export const fetchFilteredBuildings = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/buildings.php`, data);
};

export const fetchFilteredFloors = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/floors.php`, data);
};

export const fetchBuildingDetails = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/get_building.php`, data);

}

// floor fetching
export const FetchFloor = data => {
  return axiosInstance.post(
    `${appendPathAjax}/datatable/floor_datatable.php`,
    data
  );
};
