import { fetchCompany } from '../../api/companyApis';
import {
  fetchFilteredBuildings,
  fetchFilteredFloors,
} from '../../api/BuildingApis';
import {
  fetchFilteredEquipmentTypes,
  fetchFilteredEquipments,
} from '../../api/EquipmentsApi';

const getDataSource = (
  listType,
  setDataSource,
  filterOptions,
  setLoading,
  searchTerm = ''
) => {
  switch (listType) {
    case 'companies':
      setLoading(true);
      fetchCompany({
        search_term: searchTerm,
      }).then(({ data }) => {
        setDataSource(data.data);
        setLoading(false);
      });
      break;
    case 'buildings':
      setLoading(true);
      fetchFilteredBuildings({
        search_term: searchTerm,
        companies: JSON.stringify({
          companies: filterOptions.companies.map(item => ({
            company_id: item.Id,
          })),
        }),
      }).then(({ data }) => {
        setDataSource(data.data);
        setLoading(false);
      });
      break;
    case 'floors':
      setLoading(true);
      fetchFilteredFloors({
        search_term: searchTerm,
        buildings: JSON.stringify({
          buildings: filterOptions.buildings.map(item => ({
            building_id: item.Id,
            company_id: item.CompanyId,
          })),
        }),
      }).then(({ data }) => {
        setDataSource(data.data);
        setLoading(false);
      });
      break;
    case 'equipmentTypes':
      setLoading(true);
      fetchFilteredEquipmentTypes({
        search_term: searchTerm,
        floors: JSON.stringify({
          floors: filterOptions.floors.map(item => ({
            floor_id: item.Id,
            building_id: item.BuildingId,
            company_id: item.CompanyId,
          })),
        }),
      }).then(({ data }) => {
        setDataSource(data.data);
        setLoading(false);
      });
      break;
    case 'equipments':
      setLoading(true);
      fetchFilteredEquipments({
        search_term: searchTerm,
        appliance_types: JSON.stringify({
          appliance_types: filterOptions.equipmentTypes.map(item => ({
            appliance_type_id: item.EquipmentTypeId,
            floor_id: item.floor_id,
            building_id: item.building_id,
            company_id: item.company_id,
          })),
        }),
      }).then(({ data }) => {
        setDataSource(data.data);
        setLoading(false);
      });
      break;
    default:
      setDataSource([]);
  }
};
export default getDataSource;
