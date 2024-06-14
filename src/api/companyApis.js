import axiosInstance from "../axiosInstance";
import { appendPathAjax } from '../constants';

export const fetchCompany = (data)=>{
    return axiosInstance.post(
        `${appendPathAjax}/datatable/company_datatable.php`, data
      );
}

export const fetchLocations =(data)=>{
    return axiosInstance.post(
        `${appendPathAjax}/RestApi/building_location_list.php`, data
      );
}