const getListProps = state => {
  switch (state) {
    case 'companies':
      return { keySet: [], headKey: 'CompanyName', selectedItemKey: ['Id'] };
    case 'buildings':
      return {
        keySet: ['CompanyName'],
        headKey: 'BuildingName',
        selectedItemKey: ['Id'],
      };
    case 'floors':
      return {
        keySet: ['CompanyName', 'BuildingName'],
        headKey: 'FloorName',
        selectedItemKey: ['Id', 'CompanyId', 'BuildingId'],
      };
    case 'equipmentTypes':
      return {
        keySet: ['CompanyName', 'BuildingName', 'FloorName'],
        headKey: 'EquipmentType',
        selectedItemKey: [
          'EquipmentTypeId',
          'company_id',
          'building_id',
          'floor_id',
        ],
      };
    case 'equipments':
      return {
        keySet: ['CompanyName', 'BuildingName', 'FloorName', 'applianceType'],
        headKey: 'applianceName',
        selectedItemKey: ['ApplianceId', 'ApplianceTypeId'],
      };
    default:
      return {};
  }
};

export default getListProps;
