import axiosInstance from '../axiosInstance';
import { appendPathAjax } from '../constants';

export const fetchEquipments = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/equipment_list.php`,
    data
  );
};

// equipment types
export const fetchEquipmentType = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/equipmentType_list.php`,
    data
  );
};

// fetch filtered equipments type based on the selected floors, buildings, and company
export const fetchFilteredEquipmentTypes = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/equipment_types.php`,
    data
  );
};

// fetch filtered equipments type based on the selected floors, buildings, and company
export const fetchFilteredEquipments = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/equipments.php`, data);
};

// fetch filtered vitals based on the selected entity
export const fetchFilteredVitals = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/vitals.php`, data);
};


// fetch details of selected equipment
export const fetchEquipmentDetails = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/equipment_data.php`, data);
};