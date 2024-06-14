import axiosInstance from '../axiosInstance';
import { appendPathAjax } from '../constants';

const fetchVitals = data => {
  return axiosInstance.post(`${appendPathAjax}/RestApi/vitals.php`, data);
};
export default fetchVitals;
