import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { FilterSelect, FilterCol } from './styledComponents';
import { fetchEquipmentType } from '../../api/EquipmentsApi';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Type = ({ filterOptions, handleChange }) => {
  const [types, setTypes] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchEquipmentType({
      companyId: filterOptions.company && filterOptions.company.Id,
      buildingId: filterOptions.building && filterOptions.building.Id,
      floorId: filterOptions.floor && filterOptions.floor.Id,
    }).then(res => {
      if (res.data.data) setTypes(res.data.data);
    });
  }, [filterOptions]);
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t('Type')}</p>
      <FilterSelect
        showSearch
        value={
          filterOptions.equipmentType &&
          filterOptions.equipmentType.EquipmentType
        }
        onChange={val =>
          handleChange(
            types.find(type => type.EquipmentType === val),
            'equipmentType'
          )
        }
        placeholder={t('Select type')}
        optionFilterProp="children"
      >
        {types &&
          types.map(type => {
            return (
              <Option value={type.EquipmentType}>{type.EquipmentType}</Option>
            );
          })}
      </FilterSelect>
    </FilterCol>
  );
};
Type.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Type;
