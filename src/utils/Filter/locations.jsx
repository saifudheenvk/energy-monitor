/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { FilterSelect, FilterCol } from './styledComponents';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const Location = ({ filterOptions, handleChange, fetchCity, locations }) => {
  const { t } = useTranslation();
  useEffect(() => {
    fetchCity();
  }, []);
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t('Location')}</p>
      <FilterSelect
        value={filterOptions.cityName}
        onChange={val => handleChange(val, 'cityName')}
        placeholder={t('Select location')}
        optionFilterProp="children"
      >
        {locations.map(location => {
          return <Option value={location}>{location}</Option>;
        })}
      </FilterSelect>
    </FilterCol>
  );
};
Location.propTypes = {
  filterOptions: PropTypes.instanceOf({}).isRequired,
  fetchCity: PropTypes.func.isRequired,
  locations: PropTypes.instanceOf([]).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Location;
