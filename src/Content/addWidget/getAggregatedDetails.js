// for aggregated charts there is no details in dataSource so that we have to make details here
const getDetails = (record, aggregationLevel, vital) => {
  switch (aggregationLevel) {
    case 'companies':
      return [`${record.CompanyName}`, vital].join(' > ');
    case 'buildings':
      return [record.CompanyName, record.BuildingName, vital].join(' > ');
    case 'floors':
      return [
        record.CompanyName,
        record.BuildingName,
        record.FloorName,
        vital,
      ].join(' > ');
    case 'equipmentTypes':
      return [
        record.CompanyName,
        record.BuildingName,
        record.FloorName,
        record.applianceType,
        vital,
      ].join(' > ');
    case 'equipments':
      return [
        record.CompanyName,
        record.BuildingName,
        record.FloorName,
        record.applianceType,
        record.applianceName,
        vital,
      ].join(' > ');
    default:
      return 'no details';
  }
};
export default getDetails;
