import {
  removeAndGetCompanies,
  removeAndGetBuildings,
  removeAndGetFloors,
  removeAndGetEquipmentTypes,
} from './filterOptionHelper';

export const removeCompanyWithChildren = (filterOptions, item) => {
  let filtered = removeAndGetCompanies(filterOptions, item);
  // remove biuldings belongs to selected companies
  filtered = {
    ...filtered,
    buildings: filtered.buildings.filter(
      build => !(build.CompanyId === item.Id)
    ),
  };
  // remove floors belongs to selected companies
  filtered = {
    ...filtered,
    floors: filtered.floors.filter(flr => !(flr.CompanyId === item.Id)),
  };
  // remove equipmentTypes belongs to selected companies
  filtered = {
    ...filtered,
    equipmentTypes: filtered.equipmentTypes.filter(
      eqType => !(eqType.company_id === item.Id)
    ),
  };
  // remove equipments belongs to selected companies
  filtered = {
    ...filtered,
    equipments: filtered.equipments.filter(eq => !(eq.CompanyId === item.Id)),
  };
  return filtered;
};

export const removeBuildingsWithChildren = (filterOptions, item) => {
  let filtered = removeAndGetBuildings(filterOptions, item);
  // remove floors belongs to selected buildings

  filtered = {
    ...filtered,
    floors: filtered.floors.filter(
      flr => !(flr.BuildingId === item.Id && flr.CompanyId === item.CompanyId)
    ),
  };
  // remove equipmentTypes belongs to selected buildings
  filtered = {
    ...filtered,
    equipmentTypes: filtered.equipmentTypes.filter(
      eqType =>
        !(
          eqType.building_id === item.Id && eqType.company_id === item.CompanyId
        )
    ),
  };
  // remove equipments belongs to selected buildings
  filtered = {
    ...filtered,
    equipments: filtered.equipments.filter(
      eq => !(eq.BuildingId === item.Id && eq.CompanyId === item.CompanyId)
    ),
  };
  return filtered;
};
export const removeFloorsWithChildren = (filterOptions, item) => {
  let filtered = removeAndGetFloors(filterOptions, item);
  // remove equipmentTypes belongs to selected floors
  filtered = {
    ...filtered,
    equipmentTypes: filtered.equipmentTypes.filter(
      eqType =>
        !(
          eqType.floor_id === item.Id &&
          eqType.company_id === item.CompanyId &&
          eqType.building_id === item.BuildingId
        )
    ),
  };
  // remove equipments belongs to selected floors
  filtered = {
    ...filtered,
    equipments: filtered.equipments.filter(
      eq =>
        !(
          eq.FloorId === item.Id &&
          eq.CompanyId === item.CompanyId &&
          eq.BuildingId === item.BuildingId
        )
    ),
  };
  return filtered;
};
export const removeEquipmentTypesWithChildren = (filterOptions, item) => {
  let filtered = removeAndGetEquipmentTypes(filterOptions, item);
  // remove equipments belongs to selected EquipmentTypes
  filtered = {
    ...filtered,
    equipments: filtered.equipments.filter(
      eq =>
        !(
          eq.ApplianceTypeId === item.EquipmentTypeId &&
          eq.FloorId === item.floor_id &&
          eq.CompanyId === item.company_id &&
          eq.BuildingId === item.building_id
        )
    ),
  };
  return filtered;
};
