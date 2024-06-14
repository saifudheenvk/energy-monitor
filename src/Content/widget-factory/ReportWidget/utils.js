//TODO add a logic to show short titles
const xHeadings = {
  Yearly: 'Years',
  Monthly: 'Months',
  Hourly: 'Hours',
  Daily: 'Days',
  Equipments: 'Equipments',
  Buildings: 'Buildings',
  Companies: 'Companies',
  EquipmentTypes: 'Equipment Types',
};
const getHeading = (granularity, label) => {
  switch (label) {
    case 'x':
      return xHeadings[granularity];
    default:
      return label;
  }
};

export const getKeys = data => {
  return Object.keys(data);
};
export const getTableColumns = (data, granularity) => {
  return getKeys(data).map(key => ({
    title: getHeading(granularity, key),
    key: key,
    dataIndex: key,
  }));
};
