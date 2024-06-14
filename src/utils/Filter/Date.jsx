import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FilterDatePicker, FilterCol } from './styledComponents';

const Date = ({ name, filterOptions, handleChange }) => {
  const { t } = useTranslation();
  const setSelectedDatePickerValue = () => {
    if (name === 'Created') {
      return filterOptions.created_date
        ? moment(filterOptions.created_date)
        : '';
    }
    if (name === 'Last Updated') {
      return filterOptions.last_updated_date
        ? moment(filterOptions.last_updated_date)
        : '';
    }
    return filterOptions.filter_date ? moment(filterOptions.filter_date) : '';
  };
  return (
    <FilterCol xs={24} md={24} lg={12}>
      <p>{t(name)}</p>
      <FilterDatePicker
        size="small"
        placeholder={t('select date')}
        value={setSelectedDatePickerValue()}
        onChange={val => {
          if (val) {
            if (name === 'Created') {
              handleChange(val.format('YYYY-MM-DD'), 'created_date');
            } else if (name === 'Last Updated') {
              handleChange(val.format('YYYY-MM-DD'), 'last_updated_date');
            } else {
              handleChange(val.format('YYYY-MM-DD'), 'filter_date');
            }
          }
        }}
      />
    </FilterCol>
  );
};
Date.propTypes = {
  name: PropTypes.string.isRequired,
  filterOptions: PropTypes.instanceOf({}).isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Date;
