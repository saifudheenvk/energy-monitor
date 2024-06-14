export const removeAndGetCompanies = (filterOptions, item) => {
  return {
    ...filterOptions,
    companies: filterOptions.companies.filter(comp => comp.Id !== item.Id),
  };
};

export const removeAndGetBuildings = (filterOptions, item) => {
  return {
    ...filterOptions,
    buildings: filterOptions.buildings.filter(
      building =>
        !(building.Id === item.Id && building.CompanyId === item.CompanyId)
    ),
  };
};

export const removeAndGetFloors = (filterOptions, item) => {
  return {
    ...filterOptions,
    floors: filterOptions.floors.filter(
      floor =>
        !(
          floor.Id === item.Id &&
          floor.CompanyId === item.CompanyId &&
          item.BuildingId === floor.BuildingId
        )
    ),
  };
};
export const removeAndGetEquipmentTypes = (filterOptions, item) => {
  return {
    ...filterOptions,
    equipmentTypes: filterOptions.equipmentTypes.filter(
      equipmentType =>
        !(
          equipmentType.EquipmentTypeId === item.EquipmentTypeId &&
          equipmentType.floor_id === item.floor_id &&
          equipmentType.company_id === item.company_id &&
          equipmentType.building_id === item.building_id
        )
    ),
  };
};
export const removeAndGetEquipments = (filterOptions, item) => {
  return {
    ...filterOptions,
    equipments: filterOptions.equipments.filter(
      equipment =>
        !(
          equipment.ApplianceTypeId === item.ApplianceTypeId &&
          equipment.ApplianceId === item.ApplianceId
        )
    ),
  };
};
