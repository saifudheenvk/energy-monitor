import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { FilterSelect, FilterCol } from './styledComponents';
import { fetchBuildings } from '../../api/BuildingApis';

const { Option } = Select;

const Buildings = ({ filterOptions, handleChange }) => {
  const [buildings, setBuilding] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchBuildings({
      filter_option: JSON.stringify({
        companyName: filterOptions.company && filterOptions.company.CompanyName,
      }),
    }).then(res => {
      if (res.data.data) setBuilding(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions]);
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t("Building")}</p>
      <FilterSelect
        value={filterOptions.building && filterOptions.building.BuildingName}
        onChange={val =>
          handleChange(
            buildings.find(building => building.BuildingName === val),
            'building'
          )
        }
        placeholder={t("Select building")}
        optionFilterProp="children"
      >
        {buildings.map(building => {
          return (
            <Option value={building.BuildingName}>
              {building.BuildingName}
            </Option>
          );
        })}
      </FilterSelect>
    </FilterCol>
  );
};

Buildings.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Buildings;
