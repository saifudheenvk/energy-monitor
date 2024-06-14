const getAggregationName = (aggregationLevel, row, vital, mode) => {
  console.log('roww', row);
  switch (aggregationLevel) {
    case 'equipments':
      return mode === 'live'
        ? `${vital}-${row.key.applianceName}`
        : `${row.key.applianceName}-${row.key.BuildingName}`;
    case 'equipmentTypes':
      return `${row.key.EquipmentType}-${row.key.FloorName}-${row.key.BuildingName}`;
    case 'floors':
      return `${row.key.FloorName}-${row.key.BuildingName}`;
    case 'buildings':
      return `${row.key.BuildingName}-${row.key.CompanyName}`;
    case 'companies':
      return row.key.CompanyName;
    default:
      return 'label';
  }
};
const setDefaultLabel = (
  labels,
  aggregationLevel,
  row,
  setColors,
  setLabels,
  vital,
  mode,
  granularity,
  widgetType,
  statistics
) => {
  const label = labels.find(l => l[aggregationLevel].indexOf(row.key) !== -1);
  if (label === undefined) {
    setLabels(prevState => {
      if (widgetType === 'pie' && granularity !== aggregationLevel) {
        if (prevState.length === 0) {
          return [
            {
              name: ' Default label',
              [aggregationLevel]: [row.key],
              aggregation_statistics: statistics && statistics[0],
              vital,
            },
          ];
        }
        const singleLabel = prevState.find(p => p[aggregationLevel].length > 0);
        singleLabel[aggregationLevel] = [
          ...singleLabel[aggregationLevel],
          row.key,
        ];
        return [singleLabel];
      }
      // finding greatest number by iterating through all labels.then appending that number plus one
      const maxArray = prevState.map(l => Math.max(l.name.match(/\d+/)));
      const uniqNumber = maxArray.length === 0 ? 0 : Math.max(...maxArray);
      const aggregationName = getAggregationName(
        aggregationLevel,
        row,
        vital,
        mode
      );
      const newLabelName =
        prevState.find(l => l.name === aggregationName) === undefined
          ? aggregationName
          : `${aggregationName}-${uniqNumber + 1}`;
      setColors(pre => ({
        ...pre,
        [newLabelName]: '#f9a825',
      }));
      const defaultLabel =
        widgetType === 'number' && mode !== 'live'
          ? {
              name: newLabelName,
              [aggregationLevel]: [row.key],
              duration: 5,
              duration_unit: 'hours',
              aggregation_statistics: statistics && statistics[0],
              vital,
            }
          : {
              name: newLabelName,
              [aggregationLevel]: [row.key],
              aggregation_statistics: statistics && statistics[0],
              vital,
            };
      return [...prevState, defaultLabel];
    });
  }
};

// comaparing an object is possible by comparing all the ids present in one object to the second one.
// but for live graph vital is the unique field in an object

const compareObjects = (object1, object2, mode) => {
  const keysFirst = Object.keys(object1);
  const keysSecond = Object.keys(object2);
  if (JSON.stringify(keysFirst) === JSON.stringify(keysSecond)) {
    const keysWithId = keysFirst.filter(key =>
      key.toLowerCase().includes('id')
    );
    const flag = keysWithId.every(key => object1[key] === object2[key]);
    return mode !== 'live' ? flag : flag && object1.vital === object2.vital;
  }
  return false;
};

const selectLabels = (
  setLabels,
  aggregationLevel,
  row,
  e,
  widgetType,
  granularity,
  existingElements
) => {
  setLabels(prevState => {
    if (widgetType === 'pie' && granularity !== aggregationLevel) {
      return prevState.map(label => {
        const clonedLabel = { ...label };
        if (clonedLabel.name === e) {
          clonedLabel[aggregationLevel] = existingElements;
        } else {
          clonedLabel[aggregationLevel] = [];
        }
        return clonedLabel;
      });
    }
    return prevState.map(label => {
      const index = label[aggregationLevel].indexOf(row.key);
      const clonedLabel = { ...label };
      if (index === -1) {
        if (label.name === e) {
          clonedLabel[aggregationLevel] = [...label[aggregationLevel], row.key];
        }
      } else {
        clonedLabel[aggregationLevel].splice(index, 1);
      }
      return clonedLabel;
    });
  });
};

const updateDataSourceOnChangingTab = (
  filterOptions,
  request,
  setVital,
  additionalInfo,
  dataSource,
  setDataSource
) => {
  if (filterOptions.vitals.length !== 0) {
    if (request.mode !== 'live') {
      setVital(filterOptions.vitals[0]);
      filterOptions[additionalInfo.aggregation_level].forEach(el => {
        if (
          dataSource.find(d => compareObjects(d.key, el, request.mode)) ===
          undefined
        ) {
          setDataSource(prevState => [
            ...prevState,
            {
              key: el,
            },
          ]);
        }
      });
    } else {
      filterOptions.vitals.forEach(el => {
        if (
          dataSource.find(d => compareObjects(d.key, el, request.mode)) ===
          undefined
        ) {
          setDataSource(prevState => [
            ...prevState,
            { key: el, details: el.description },
          ]);
        }
      });
    }
  }
};

const addNewLabel = (
  setLabels,
  aggregationLevel,
  row,
  newLabel,
  vital,
  widgetType,
  granularity,
  existingElements,
  statistics
) => {
  setLabels(prevState => {
    if (widgetType === 'pie' && granularity !== aggregationLevel) {
      const updated = prevState.map(label => ({
        ...label,
        [aggregationLevel]: [],
      }));
      return [
        ...updated,
        {
          name: newLabel.label,
          [aggregationLevel]: existingElements,
          vital,
          aggregation_statistics: statistics && statistics[0],
        },
      ];
    }
    return [
      ...prevState.map(label => {
        const index =
          label[aggregationLevel] && label[aggregationLevel].indexOf(row.key);
        const clonedLabel = { ...label };
        if (index !== -1) {
          clonedLabel[aggregationLevel].splice(index, 1);
        }
        return clonedLabel;
      }),
      {
        name: newLabel.label,
        [aggregationLevel]: [row.key],
        vital,
        aggregation_statistics: 'sum',
      },
    ];
  });
};

const functions = {
  setDefaultLabel,
  compareObjects,
  updateDataSourceOnChangingTab,
  selectLabels,
  addNewLabel,
};
export default functions;
