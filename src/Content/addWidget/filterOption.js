import { removeAndGetEquipments } from './filterOptionHelper';
import {
  removeCompanyWithChildren,
  removeBuildingsWithChildren,
  removeFloorsWithChildren,
  removeEquipmentTypesWithChildren,
} from './chooseVitalHierarchyHandler';

const setFilterOptionHandler = (
  listType,
  item,
  filterOptions,
  setFilterOptions
) => {
  switch (listType) {
    case 'companies':
      // eslint-disable-next-line no-case-declarations
      const obj = filterOptions.companies.find(comp => comp.Id === item.Id);
      if (obj) {
        setFilterOptions(removeCompanyWithChildren(filterOptions, item));
      } else {
        setFilterOptions({
          ...filterOptions,
          companies: [...filterOptions.companies, item],
        });
      }
      break;
    case 'buildings':
      // eslint-disable-next-line no-case-declarations
      const builsobj = filterOptions.buildings.find(
        building =>
          building.Id === item.Id && building.CompanyId === item.CompanyId
      );
      if (builsobj) {
        setFilterOptions(removeBuildingsWithChildren(filterOptions, item));
      } else {
        setFilterOptions({
          ...filterOptions,
          buildings: [...filterOptions.buildings, item],
        });
      }
      break;
    case 'floors':
      // eslint-disable-next-line no-case-declarations
      const isExistingFloor = filterOptions.floors.find(
        floor =>
          floor.Id === item.Id &&
          floor.CompanyId === item.CompanyId &&
          item.BuildingId === floor.BuildingId
      );
      if (isExistingFloor) {
        setFilterOptions(removeFloorsWithChildren(filterOptions, item));
      } else {
        setFilterOptions({
          ...filterOptions,
          floors: [...filterOptions.floors, item],
        });
      }
      break;

    case 'equipmentTypes':
      // eslint-disable-next-line no-case-declarations
      const isExistingEquipmentTypes = filterOptions.equipmentTypes.find(
        equipmentType =>
          equipmentType.EquipmentTypeId === item.EquipmentTypeId &&
          equipmentType.floor_id === item.floor_id &&
          equipmentType.company_id === item.company_id &&
          equipmentType.building_id === item.building_id
      );
      if (isExistingEquipmentTypes) {
        setFilterOptions(removeEquipmentTypesWithChildren(filterOptions, item));
      } else {
        setFilterOptions({
          ...filterOptions,
          equipmentTypes: [...filterOptions.equipmentTypes, item],
        });
      }
      break;
    case 'equipments':
      // eslint-disable-next-line no-case-declarations
      const isExistingEquipments = filterOptions.equipments.find(
        equipment =>
          equipment.ApplianceTypeId === item.ApplianceTypeId &&
          equipment.ApplianceId === item.ApplianceId
      );
      if (isExistingEquipments) {
        setFilterOptions(removeAndGetEquipments(filterOptions, item));
      } else {
        setFilterOptions({
          ...filterOptions,
          equipments: [...filterOptions.equipments, item],
        });
      }
      break;
    default:
      setFilterOptions({
        companys: [],
        buildings: [],
        floors: [],
        equipmentTypes: [],
        equipments: [],
        vitals: [],
      });
      break;
  }
};
export default setFilterOptionHandler;
