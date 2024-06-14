import axiosInstance from '../axiosInstance';
import { appendPathAjax } from '../constants';

const fetchAggregationStatistics = data => {
  return axiosInstance.post(
    `${appendPathAjax}/RestApi/get_statistics.php`,
    data
  );
};
export default fetchAggregationStatistics;
